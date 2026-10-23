import { createApp } from './router.tsx'
import { createDocumentHost, type DocumentHostOptions } from './document-host/cloudflare.ts'
import { PublicationRequestError } from './document-host/index.ts'
import { handleNewsletter } from './newsletter/http.ts'

export { ContentState } from './document-host/cloudflare.ts'
export { SignupLimits } from './newsletter/limits.ts'
async function media(request: Request, env: Env): Promise<Response | undefined> {
  const path = new URL(request.url).pathname
  if (!path.startsWith('/media/')) return undefined
  if (!['GET', 'HEAD'].includes(request.method))
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
  const key = decodeURIComponent(path.slice(7))
  if (key.includes('..') || key.includes('\\')) return new Response('Not found', { status: 404 })
  const object = await env.MEDIA.get(key, { range: request.headers, onlyIf: request.headers })
  if (!object) return new Response('Not found', { status: 404 })
  const headers = new Headers({
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Accept-Ranges': 'bytes',
  })
  object.writeHttpMetadata(headers)
  headers.set('ETag', object.httpEtag)
  if (!('body' in object))
    return new Response(null, {
      status:
        request.headers.has('If-Match') || request.headers.has('If-Unmodified-Since') ? 412 : 304,
      headers,
    })
  let status = 200
  if (object.range && 'offset' in object.range && 'length' in object.range) {
    status = 206
    headers.set(
      'Content-Range',
      `bytes ${object.range.offset}-${object.range.offset! + object.range.length! - 1}/${object.size}`,
    )
    headers.set('Content-Length', String(object.range.length))
  } else headers.set('Content-Length', String(object.size))
  return new Response(request.method === 'HEAD' ? null : object.body, { status, headers })
}
export function createWorker(options: DocumentHostOptions = {}): ExportedHandler<Env> {
  return {
    async fetch(request, env, ctx) {
      try {
        const file = await media(request, env)
        if (file) return file
        const host = createDocumentHost(env, ctx, options)
        const response =
          (await host.handle(request)) ??
          (await handleNewsletter(request, env, host.load)) ??
          (await createApp(host.load).fetch(request))
        if (new URL(request.url).hostname.endsWith('.workers.dev')) {
          const headers = new Headers(response.headers)
          headers.set('X-Robots-Tag', 'noindex, nofollow')
          return new Response(response.body, { status: response.status, headers })
        }
        return response
      } catch (error) {
        if (error instanceof PublicationRequestError)
          return new Response(error.message, {
            status: error.status,
            headers: { 'Cache-Control': 'no-store' },
          })
        console.error(
          JSON.stringify({ message: 'Request failed', path: new URL(request.url).pathname }),
        )
        return new Response('Internal server error', {
          status: 500,
          headers: { 'Cache-Control': 'no-store' },
        })
      }
    },
  }
}
export default createWorker()
