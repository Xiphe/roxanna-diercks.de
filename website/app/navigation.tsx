import type { Handle } from 'remix/component'
import { SiteContent } from './ui-library/context.ts'

export function alternateLanguageHref(path: string, locale: 'de' | 'en') {
  const pair = [
    ['/', '/en'],
    ['/ueber-mich', '/en/about'],
    ['/tiertrauer', '/en/pet-loss-support'],
    ['/trauer-im-unternehmen', '/en/grief-in-the-workplace'],
    ['/zwischen-den-zeilen', '/en/between-words'],
    ['/blog/schreiben-bei-trauer', '/en/blog/writing-through-grief'],
    ['/blog/bleiben-wenn-du-gehen-moechtest', '/en/blog/how-to-stay-when-you-want-to-run'],
  ].find((pair) => pair.includes(path))
  return pair?.[locale === 'de' ? 1 : 0] ?? (locale === 'de' ? '/en' : '/')
}

export function TopNavigation(handle: Handle) {
  const { site, route, path } = handle.context.get(SiteContent)
  const locale = route?.locale ?? (path.startsWith('/en') ? 'en' : 'de')
  const de = locale === 'de'
  const home = de ? '/' : '/en'
  const hasRoute = (href: string) =>
    site.routes.some((candidate) => candidate.path === href.split('#')[0])
  const services = de
    ? [
        {
          title: 'Trauerbegleitung',
          description: 'Online oder beim Trauerspaziergang in Tarifa',
          href: '/#Trauerbegleitung',
        },
        {
          title: 'Tiertrauer',
          description: 'Begleitung nach dem Verlust eines Tieres',
          href: '/tiertrauer',
        },
        {
          title: 'Trauer im Unternehmen',
          description: 'Unterstützung für Teams und Führungskräfte',
          href: '/trauer-im-unternehmen',
        },
      ]
    : [
        {
          title: 'Grief companionship',
          description: 'Online or on a grief walk in Tarifa',
          href: '/en#Trauerbegleitung',
        },
        {
          title: 'Pet loss support',
          description: 'Companionship after losing an animal',
          href: '/en/pet-loss-support',
        },
        {
          title: 'Grief in the workplace',
          description: 'Support for teams and leaders',
          href: '/en/grief-in-the-workplace',
        },
      ]
  const availableServices = services.filter((link) => hasRoute(link.href))
  const links: { title: string; href: string; pathPrefix?: string }[] = [
    { title: de ? 'Über mich' : 'About me', href: de ? '/ueber-mich' : '/en/about' },
    {
      title: de ? 'Blog & Newsletter' : 'Blog & newsletter',
      href: de ? '/zwischen-den-zeilen' : '/en/between-words',
      pathPrefix: de ? '/blog/' : '/en/blog/',
    },
  ].filter((link) => hasRoute(link.href))
  const hasHome = hasRoute(home)
  const languageHref = alternateLanguageHref(path, locale)
  const hasLanguage = hasRoute(languageHref)
  const serviceIsCurrent = availableServices.some((link) => link.href === path)
  const navigationLinks = () => (
    <>
      <ul class="top-nav-links">
        {availableServices.length > 0 && (
          <li>
            <details class="top-nav-group">
              <summary data-current={serviceIsCurrent || undefined}>
                {de ? 'Begleitung' : 'Companionship'}
                <span
                  class="nav-chevron"
                  aria-hidden="true"
                />
              </summary>
              <div class="top-nav-submenu-clip">
                <div class="top-nav-submenu">
                  <ul class="top-nav-services">
                    {availableServices.map((link) => (
                      <li>
                        <a
                          data-rmx-document=""
                          href={link.href}
                          aria-current={link.href === path ? 'page' : undefined}
                        >
                          <span class="service-title">{link.title}</span>
                          <span class="service-description">{link.description}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {hasHome && (
                    <ul class="top-nav-practical">
                      <li>
                        <a
                          data-rmx-document=""
                          href={home + '#pricing'}
                        >
                          {de ? 'Ablauf & Preise' : 'How it works & pricing'}
                        </a>
                      </li>
                      <li>
                        <a
                          data-rmx-document=""
                          href={home + '#faq'}
                        >
                          {de ? 'Häufige Fragen' : 'FAQs'}
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </details>
          </li>
        )}
        {links.map((link) => (
          <li>
            <a
              data-rmx-document=""
              href={link.href}
              data-current-prefix={link.pathPrefix}
              aria-current={
                link.href === path
                  ? 'page'
                  : link.pathPrefix && path.startsWith(link.pathPrefix)
                    ? 'true'
                    : undefined
              }
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <div class="top-nav-actions">
        {hasHome && (
          <a
            data-rmx-document=""
            class="top-nav-contact"
            href={home + '#contact'}
          >
            {de ? 'Kontakt' : 'Contact'}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </a>
        )}
        {hasLanguage && (
          <a
            data-rmx-document=""
            class="top-nav-language"
            href={languageHref}
            lang={de ? 'en' : 'de'}
            hrefLang={de ? 'en' : 'de'}
            aria-label={de ? 'Switch to English' : 'Auf Deutsch wechseln'}
          >
            {de ? 'EN' : 'DE'}
          </a>
        )}
      </div>
    </>
  )

  return () => (
    <header class="site-header">
      <div class="top-nav-inner">
        <a
          data-rmx-document=""
          class="site-brand"
          href={hasHome ? home : (site.routes[0]?.path ?? home)}
        >
          <span
            class="site-brand-star"
            aria-hidden="true"
          />
          <span>
            <span class="site-brand-name">Roxanna Diercks</span>
            <span class="site-brand-description">
              {de ? 'Trauerbegleitung' : 'Bereavement support'}
            </span>
          </span>
        </a>
        <nav
          class="top-nav-desktop"
          aria-label={de ? 'Hauptnavigation' : 'Main navigation'}
        >
          {navigationLinks()}
        </nav>
        <details class="top-nav-mobile">
          <summary aria-controls="mobile-navigation">
            <span class="menu-label-closed sr-only">{de ? 'Menü' : 'Menu'}</span>
            <span class="menu-label-open sr-only">{de ? 'Schließen' : 'Close'}</span>
            <span
              class="menu-icon"
              aria-hidden="true"
            />
          </summary>
          <nav
            id="mobile-navigation"
            class="top-nav-panel"
            aria-label={de ? 'Hauptnavigation' : 'Main navigation'}
          >
            {navigationLinks()}
          </nav>
        </details>
      </div>
    </header>
  )
}
