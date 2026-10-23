import { createRouter } from 'remix/router'
import { render } from 'remix/middleware/render'
import { redirect } from 'remix/response/redirect'
import type { ContentLoader } from './document-host/index.ts'
import { SiteContent } from './ui-library/context.ts'
import { renderContent } from './ui-library/render.ts'
import { Page } from './page.tsx'

const publicHeaders = {
  'Cache-Control': 'no-cache',
  'Cloudflare-CDN-Cache-Control': 'public, max-age=60, stale-if-error=0',
  'Cache-Tag': 'content',
}
const escape = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
export function createApp(content: ContentLoader) {
  const router = createRouter({ middleware: [render()] })
  router.get('/health', () =>
    Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } }),
  )
  router.get(
    '/robots.txt',
    () =>
      new Response(
        'User-agent: *\nAllow: /\nDisallow: /_\nSitemap: https://roxanna-diercks.de/sitemap.xml\n',
        {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        },
      ),
  )
  router.get('/sitemap.xml', async ({ request }) => {
    const { site } = await content(request)
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
        site.routes
          .filter((r) => !r.noindex)
          .map(
            (r) =>
              '<url><loc>https://roxanna-diercks.de' +
              escape(r.path) +
              '</loc><lastmod>' +
              new Date(r.updatedAt).toISOString() +
              '</lastmod></url>',
          )
          .join('') +
        '</urlset>',
      { headers: { ...publicHeaders, 'Content-Type': 'application/xml; charset=utf-8' } },
    )
  })
  router.get('/*path', async ({ request, render }) => {
    const url = new URL(request.url),
      path = url.pathname
    if (path === '/de' || path.startsWith('/de/'))
      return redirect((path.slice(3) || '/') + url.search, 308)
    if (path.endsWith('/') && path !== '/') return redirect(path.slice(0, -1) + url.search, 308)
    const page = await content(request)
    const destination = page.site.redirects.find((r) => r.path === path)
    if (destination)
      return redirect(destination.to + (destination.preserveSearch ? url.search : ''), {
        status: destination.status,
        headers: publicHeaders,
      })
    return render(
      <SiteContent
        site={page.site}
        route={page.route}
        path={path}
      >
        <Page
          {...renderContent(page.document)}
          noindex={page.status === 404}
        />
      </SiteContent>,
      {
        status: page.status,
        headers:
          page.status === 404
            ? { 'Cache-Control': 'no-store' }
            : { ...publicHeaders, 'X-Content-Revision': page.contentHash },
      },
    )
  })
  return router
}
