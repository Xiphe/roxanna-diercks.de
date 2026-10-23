import type { ContentLoader } from '../document-host/index.ts'
import { readSignupInput, subscribe } from './service.ts'

const headers = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' }
async function hash(value: string) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
export async function handleNewsletter(
  request: Request,
  env: Env,
  content: ContentLoader,
): Promise<Response | undefined> {
  const url = new URL(request.url)
  if (url.pathname === '/_newsletter/status')
    return Response.json({ ready: !!env.BREVO_API_KEY }, { headers })
  if (url.pathname !== '/_newsletter/subscribe') return undefined
  const fail = (status: number) => Response.json({ ok: false }, { status, headers })
  if (request.method !== 'POST')
    return new Response('Method not allowed', {
      status: 405,
      headers: { ...headers, Allow: 'POST' },
    })
  if (
    request.headers.get('Origin') !== url.origin ||
    request.headers.get('Sec-Fetch-Site') === 'cross-site'
  )
    return fail(403)
  if (
    !/^(multipart\/form-data|application\/x-www-form-urlencoded)(;|$)/i.test(
      request.headers.get('Content-Type') ?? '',
    )
  )
    return fail(415)
  const declared = request.headers.get('Content-Length')
  if (declared && Number(declared) > 8192) return fail(413)
  // Bound streamed input as well as clients that provide Content-Length.
  const reader = request.body?.getReader()
  if (!reader) return fail(400)
  const chunks: Uint8Array[] = []
  let bytes = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    bytes += value.byteLength
    if (bytes > 8192) {
      await reader.cancel()
      return fail(413)
    }
    chunks.push(value)
  }
  const raw = new Uint8Array(bytes)
  let offset = 0
  for (const chunk of chunks) {
    raw.set(chunk, offset)
    offset += chunk.length
  }
  let data: FormData
  try {
    data = await new Request(request.url, {
      method: 'POST',
      headers: request.headers,
      body: raw,
    }).formData()
  } catch {
    return fail(400)
  }
  if (data.get('website')) return Response.json({ ok: true }, { headers })
  const { site } = await content(request)
  const config = site.signups[String(data.get('signup') ?? '')]
  if (!config) return fail(400)
  const input = readSignupInput(data, config)
  if (!input) return fail(400)
  if (!env.BREVO_API_KEY) return fail(503)
  const allowed = await env.SIGNUP_LIMITS.getByName('signups').reserve(
    await hash(input.email.toLowerCase()),
    await hash(request.headers.get('CF-Connecting-IP') ?? 'local'),
  )
  if (!allowed)
    return Response.json(
      { ok: false },
      { status: 429, headers: { ...headers, 'Retry-After': '60' } },
    )
  try {
    if (
      !(await subscribe(
        config,
        input,
        env.BREVO_API_KEY,
        'https://roxanna-diercks.de',
        fetch,
        env.BREVO_NAME_ATTRIBUTE || 'FIRSTNAME',
      ))
    )
      return fail(502)
  } catch {
    return fail(502)
  }
  if (request.headers.get('Accept')?.includes('application/json'))
    return Response.json({ ok: true }, { headers })
  const de = config.locale === 'de'
  return new Response(
    '<!doctype html><html lang="' +
      config.locale +
      '"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>' +
      (de ? 'Bitte bestätige deine Anmeldung' : 'Please confirm your subscription') +
      '</title><h1>' +
      (de ? 'Bitte schau in dein E-Mail-Postfach.' : 'Please check your inbox.') +
      '</h1><p>' +
      (de
        ? 'Bestätige deine Anmeldung über den Link in deiner E-Mail.'
        : 'Confirm your subscription using the link in your email.') +
      '</p><a href="' +
      config.path +
      '">' +
      (de ? 'Zurück' : 'Back') +
      '</a></html>',
    { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } },
  )
}
