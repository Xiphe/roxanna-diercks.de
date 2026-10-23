import assert from 'node:assert/strict'
import { test } from 'node:test'
import { build } from 'esbuild'
import { Miniflare, convertV4MiniflareOptions } from 'miniflare'

test('Worker validates signup input, protects request boundaries, sends DOI and limits repeated delivery', async (t) => {
  const { outputFiles } = await build({
    entryPoints: ['website/tests/worker.ts'],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'browser',
    external: ['cloudflare:workers'],
    jsx: 'automatic',
    jsxImportSource: 'remix/component',
  })
  const deliveries: Record<string, unknown>[] = []
  let providerStatus = 201
  const runtime = new Miniflare(
    convertV4MiniflareOptions({
      modules: true,
      script: outputFiles[0].text,
      compatibilityDate: '2026-10-23',
      compatibilityFlags: ['nodejs_compat'],
      durableObjects: {
        CONTENT_STATE: { className: 'ContentState', useSQLite: true },
        SIGNUP_LIMITS: { className: 'SignupLimits', useSQLite: true },
      },
      bindings: { CMX_PUBLISH_PUBLIC_KEYS: '{}', BREVO_API_KEY: 'test-only-key' },
      r2Buckets: ['MEDIA'],
      outboundService: async (request) => {
        assert.equal(request.url, 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation')
        assert.equal(request.headers.get('api-key'), 'test-only-key')
        deliveries.push((await request.json()) as Record<string, unknown>)
        return new Response(null, {
          status: providerStatus,
          headers: providerStatus === 302 ? { Location: 'https://unexpected.example' } : {},
        })
      },
    }),
  )
  t.after(() => runtime.dispose())
  const submit = (params: Record<string, string>, origin = 'https://example.com') =>
    runtime.dispatchFetch('https://example.com/_newsletter/subscribe', {
      method: 'POST',
      headers: { Origin: origin, Accept: 'application/json' },
      body: new URLSearchParams({ signup: 'fixture-signup', ...params }),
    })
  assert.equal(
    (await submit({ email: 'reader@example.org' }, 'https://attacker.example')).status,
    403,
  )
  assert.equal((await submit({ email: 'invalid' })).status, 400)
  assert.equal((await submit({ email: 'reader@example.org', signup: 'forged-list' })).status, 400)
  assert.equal(deliveries.length, 0)
  const sent = await submit({ email: 'reader@example.org', name: 'Ada' })
  assert.equal(sent.status, 200)
  assert.equal(sent.headers.get('Cache-Control'), 'no-store')
  assert.deepEqual(deliveries[0], {
    email: 'reader@example.org',
    includeListIds: [3],
    templateId: 6,
    redirectionUrl:
      'https://roxanna-diercks.de/fixture?newsletterSuccess=fixture-signup#signup-fixture-signup',
    attributes: { LOCALE: 'en', FIRSTNAME: 'Ada' },
  })
  assert.equal((await submit({ email: 'reader@example.org' })).status, 429)
  assert.equal(deliveries.length, 1)
  assert.equal((await submit({ email: 'bot@example.org', website: 'spam' })).status, 200)
  assert.equal(deliveries.length, 1)
  providerStatus = 302
  assert.equal((await submit({ email: 'redirect@example.org' })).status, 502)
  assert.equal(deliveries.length, 2)
  assert.equal((await submit({ email: 'reader@example.org', name: 'x'.repeat(9000) })).status, 413)
  const publicPage = await runtime.dispatchFetch(
    'https://example.com/fixture?newsletterSuccess=fixture-signup',
  )
  assert.equal(publicPage.status, 200)
  assert.equal(publicPage.headers.get('Set-Cookie'), null)
  assert.match(publicPage.headers.get('Cloudflare-CDN-Cache-Control') ?? '', /public/)
  assert.equal((await runtime.dispatchFetch('https://example.com/_test/seed-media')).status, 200)
  const partial = await runtime.dispatchFetch('https://example.com/media/video-fixture.mp4', {
    headers: { Range: 'bytes=2-5' },
  })
  assert.equal(partial.status, 206)
  assert.equal(partial.headers.get('Content-Range'), 'bytes 2-5/10')
  assert.equal(await partial.text(), 'cdef')
  const fresh = await runtime.dispatchFetch('https://example.com/media/video-fixture.mp4')
  const etag = fresh.headers.get('ETag')!
  await fresh.body?.cancel()
  assert.equal(
    (
      await runtime.dispatchFetch('https://example.com/media/video-fixture.mp4', {
        headers: { 'If-None-Match': etag },
      })
    ).status,
    304,
  )
  assert.equal(
    (
      await runtime.dispatchFetch('https://example.com/media/video-fixture.mp4', {
        headers: { 'If-Match': '"different"' },
      })
    ).status,
    412,
  )
})
