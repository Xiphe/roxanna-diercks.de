import type { Handle, RemixNode } from 'remix/component'
import assets from '../../.generated/assets.json' with { type: 'json' }
import { SiteContent } from './ui-library/context.ts'
import { colorStyle } from './ui-library/presentation.tsx'
import { alternateLanguageHref, TopNavigation } from './navigation.tsx'

export function Page(handle: Handle<{ title: string; body: RemixNode; noindex?: boolean }>) {
  const { site, route, path } = handle.context.get(SiteContent)
  return () => {
    const p = handle.props,
      locale = route?.locale ?? (path.startsWith('/en') ? 'en' : 'de'),
      image = route?.image ? site.media[route.image] : undefined
    const canonical = 'https://roxanna-diercks.de' + path
    return (
      <html lang={locale}>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <title>{p.title + ' • ' + site.name}</title>
          <link
            rel="canonical"
            href={canonical}
          />
          <meta
            name="description"
            content={route?.description}
          />
          {(p.noindex || route?.noindex) && (
            <meta
              name="robots"
              content="noindex, nofollow"
            />
          )}
          <meta
            property="og:site_name"
            content={site.name}
          />
          <meta
            property="og:title"
            content={route?.metaTitle ?? p.title}
          />
          <meta
            property="og:description"
            content={route?.description}
          />
          <meta
            property="og:type"
            content={route?.kind === 'blog' ? 'article' : 'website'}
          />
          <meta
            property="og:url"
            content={canonical}
          />
          {image && (
            <>
              <meta
                property="og:image"
                content={new URL(image.src, 'https://roxanna-diercks.de').href}
              />
              <meta
                property="og:image:width"
                content={String(image.width)}
              />
              <meta
                property="og:image:height"
                content={String(image.height)}
              />
              <meta
                property="og:image:alt"
                content={image.alt[locale] ?? image.alt.en ?? ''}
              />
            </>
          )}
          <meta
            name="twitter:card"
            content="summary_large_image"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={assets.favicon}
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href={site.media[site.favicon]?.src}
          />
          <link
            rel="stylesheet"
            href={assets.style}
          />
          <link
            rel="preload"
            href="/font/poppins-200.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <script
            type="module"
            src={assets.entry}
          ></script>
        </head>
        <body style={colorStyle(site, site.defaultColor)}>
          <a
            class="skip-link"
            href="#content"
          >
            {locale === 'de' ? 'Zum Inhalt' : 'Skip to content'}
          </a>
          <TopNavigation />
          <div class="site-wrapper">
            <main id="content">{p.body}</main>
            <nav
              class="footer"
              aria-label={locale === 'de' ? 'Fußzeile' : 'Footer'}
              id="footer"
            >
              <ul>
                {site.navigation[locale].map((link) => (
                  <li>
                    <a
                      href={
                        link.href === (locale === 'de' ? '/en' : '/')
                          ? alternateLanguageHref(path, locale)
                          : link.href
                      }
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
                <li>©{new Date().getUTCFullYear()} Roxanna Diercks</li>
              </ul>
            </nav>
          </div>
        </body>
      </html>
    )
  }
}
