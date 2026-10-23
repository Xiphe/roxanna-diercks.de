import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build } from 'esbuild'
import { Miniflare, convertV4MiniflareOptions } from 'miniflare'
import { publishCmxDocuments } from '@cmx-tools/publish'
import { appendSignature, createSignature, webcrypto } from 'http-message-sig'
import {
  manifestConditionHeader,
  publicationDigest,
  signatureComponents,
  signatureLifetime,
  signatureTag,
} from '../../contracts/publication.ts'
async function signPublicationRequest(request: Request, key: CryptoKey, keyId: string) {
  const body = new Uint8Array(await request.arrayBuffer()),
    headers = new Headers(request.headers)
  headers.set('Content-Type', 'application/json')
  headers.set('Content-Digest', await publicationDigest(body))
  if (request.method === 'GET') {
    headers.set(manifestConditionHeader, headers.get('If-None-Match') ?? '\"\"')
    headers.delete('If-None-Match')
  }
  const message = new Request(request.url, {
      method: request.method,
      headers,
      body: request.method === 'GET' ? undefined : body,
    }),
    now = Math.floor(Date.now() / 1000)
  const signature = await createSignature(message, {
    label: 'cmx',
    components: signatureComponents(request.method),
    parameters: {
      alg: 'ed25519',
      keyid: keyId,
      tag: signatureTag,
      created: now,
      expires: now + signatureLifetime,
      nonce: crypto.randomUUID(),
    },
    signer: webcrypto.signer(key),
  })
  return new Request(message, { headers: appendSignature(message.headers, signature) })
}
import { documents as fixture } from './fixture.ts'
import type { SiteMetadata } from '../../contracts/content.ts'

test('signed publications activate atomically, reject replay and persist across Worker restarts', async (t) => {
  const keys = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']),
    publicKey = await crypto.subtle.exportKey('jwk', keys.publicKey)
  const directory = await mkdtemp(join(tmpdir(), 'roxanna-publication-'))
  const { outputFiles } = await build({
    stdin: {
      resolveDir: process.cwd(),
      contents:
        "import {createWorker,ContentState,SignupLimits} from './website/app/worker.ts';export {ContentState,SignupLimits};export default createWorker({purge:async()=>({success:true})});",
    },
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'browser',
    external: ['cloudflare:workers'],
    jsx: 'automatic',
    jsxImportSource: 'remix/component',
  })
  const options = {
    ...convertV4MiniflareOptions({
      modules: true,
      script: outputFiles[0].text,
      compatibilityDate: '2026-10-23',
      compatibilityFlags: ['nodejs_compat'],
      durableObjects: {
        CONTENT_STATE: { className: 'ContentState', useSQLite: true },
        SIGNUP_LIMITS: { className: 'SignupLimits', useSQLite: true },
      },
      bindings: { CMX_PUBLISH_PUBLIC_KEYS: JSON.stringify({ publisher: publicKey }) },
    }),
    resourcePersistencePath: directory,
  }
  let runtime = new Miniflare(options)
  t.after(async () => {
    await runtime.dispose()
    await rm(directory, { recursive: true, force: true })
  })
  const endpoint = 'https://example.com/_cmx/publication'
  const dispatch = async (
    request: Pick<Request, 'url' | 'method' | 'headers' | 'body' | 'arrayBuffer'>,
  ): Promise<Response> => {
    const r = await runtime.dispatchFetch(request.url, {
      method: request.method,
      headers: Object.fromEntries(request.headers),
      body: request.body ? await request.arrayBuffer() : undefined,
      redirect: 'manual',
    })
    return new Response([204, 304].includes(r.status) ? null : await r.arrayBuffer(), {
      status: r.status,
      headers: Object.fromEntries(r.headers),
    })
  }
  const transport: typeof fetch = async (input, init) =>
    dispatch(await signPublicationRequest(new Request(input, init), keys.privateKey, 'publisher'))
  const publish = (documents: typeof fixture) =>
    publishCmxDocuments({ endpoint, documents, fetch: transport })
  const get = (path: string) => runtime.dispatchFetch('https://example.com' + path)
  assert.equal((await get('/fixture')).status, 503)
  assert.equal((await dispatch(new Request(endpoint))).status, 401)
  const probe = await signPublicationRequest(new Request(endpoint), keys.privateKey, 'publisher'),
    replay = probe.clone()
  assert.equal((await dispatch(probe)).status, 200)
  assert.equal((await dispatch(replay)).status, 401)
  const documents = structuredClone(fixture)
  documents.fixture.content.default = 'First independent publication'
  const first = await publish(documents),
    page = await get('/fixture')
  assert.equal(page.status, 200)
  assert.equal(page.headers.get('X-Content-Revision'), first.contentHash)
  assert.match(await page.text(), /First independent publication/)
  const invalid = structuredClone(documents)
  delete invalid['404']
  await assert.rejects(publish(invalid), (error: { status?: number }) => error.status === 422)
  assert.match(await (await get('/fixture')).text(), /First independent publication/)
  documents.fixture.content.default = 'Second independent publication'
  await publish(documents)
  const saved = await signPublicationRequest(new Request(endpoint), keys.privateKey, 'publisher'),
    again = saved.clone()
  assert.equal((await dispatch(saved)).status, 200)
  await runtime.dispose()
  runtime = new Miniflare(options)
  assert.match(await (await get('/fixture')).text(), /Second independent publication/)
  assert.equal((await dispatch(again)).status, 401)
  const site = documents._site.content.site as SiteMetadata
  site.routes = []
  site.signups = {}
  delete documents.fixture
  await publish(documents)
  assert.equal((await get('/fixture')).status, 404)
  assert.doesNotMatch(await (await get('/sitemap.xml')).text(), /\/fixture/)
})
