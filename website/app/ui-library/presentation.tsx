import { css, type Handle, type RemixNode } from 'remix/component'
import type {
  BlogProps,
  ButtonProps,
  ColumnProps,
  ColumnsProps,
  ContactLinksProps,
  HeroProps,
  ImageProps,
  ProseProps,
  SectionProps,
} from '@roxanna/content-components'
import type { MediaImage, SiteMetadata } from '../../../contracts/content.ts'
import { SiteContent } from './context.ts'
type CSSProperties = Record<string, string | number | undefined>

export function colorStyle(site: SiteMetadata, color?: string): CSSProperties {
  const set = color ? site.colors[color] : undefined
  if (!set) return {}
  const values = set.mode === 'dark' ? set.dark : set.light
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => ['--color-' + key, value]),
  ) as CSSProperties
}
function media(site: SiteMetadata, name?: string) {
  return name ? site.media[name] : undefined
}
function alt(image: MediaImage, locale: 'de' | 'en') {
  return image.alt[locale] ?? image.alt.de ?? image.alt.en ?? ''
}
export function Anchor(handle: Handle<{ id?: string }>) {
  return () =>
    handle.props.id ? (
      <a
        id={handle.props.id}
        class="section-anchor"
      />
    ) : null
}
export function Credit(handle: Handle<{ image: MediaImage; rounded?: string; hero?: boolean }>) {
  return () => {
    const { image, rounded, hero } = handle.props
    if (!image.credit) return null
    return (
      <span
        class="credit"
        data-rounded={rounded}
        data-hero={hero || undefined}
      >
        {image.creditLink ? (
          <a
            href={image.creditLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image.credit}
          </a>
        ) : (
          image.credit
        )}
      </span>
    )
  }
}
export function Section(handle: Handle<SectionProps & { class?: string; style?: CSSProperties }>) {
  const { site, route } = handle.context.get(SiteContent)
  return () => {
    const p = handle.props
    const image = media(site, p.background)
    return (
      <div
        class={p.class}
        data-color={p.color || undefined}
        style={{
          ...colorStyle(site, p.color),
          ...(image
            ? { position: 'relative', isolation: 'isolate', backgroundColor: image.color }
            : {}),
          ...p.style,
        }}
      >
        <Anchor id={p.anchor} />
        {image && (
          <>
            <img
              class="section-background"
              src={image.src}
              srcSet={image.srcSet}
              sizes="100vw"
              width={image.width}
              height={image.height}
              alt={alt(image, route?.locale ?? 'de')}
              loading="lazy"
            />
            <Credit
              image={image}
              hero
            />
          </>
        )}
        {p.children}
      </div>
    )
  }
}
const heroCss = css({
  position: 'relative',
  display: 'flex',
  minHeight: '80vh',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  '& .hero-copy': {
    position: 'relative',
    zIndex: 1,
    maxWidth: 'min(72rem, 100%)',
    overflowWrap: 'anywhere',
    padding: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  '& h1,& h2.hero-title': {
    fontFamily: 'var(--font-display)',
    fontWeight: 400,
    fontSize: '2.25rem',
    lineHeight: 1.111,
    textTransform: 'uppercase',
  },
  '& .hero-subtitle': {
    fontSize: '1rem',
    lineHeight: 1.5,
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  '@media (width >= 48rem)': {
    '& .hero-copy': { padding: '4rem' },
    '& h1,& h2.hero-title': { fontSize: '3rem', lineHeight: 1 },
    '& .hero-subtitle': { fontSize: '1.125rem' },
  },
  '@media (width >= 80rem)': {
    '& h1,& h2.hero-title': { fontSize: '4.5rem' },
    '& .hero-subtitle': { fontSize: '1.875rem', lineHeight: 1.2 },
  },
})
export function Hero(handle: Handle<HeroProps>) {
  const { site, route } = handle.context.get(SiteContent)
  return () => {
    const p = handle.props
    const image = media(site, p.image),
      video = media(site, p.video)
    const Head = p.first ? 'h1' : 'h2'
    const Sub = p.first ? 'h2' : 'h3'
    return (
      <>
        <Anchor id={p.anchor} />
        <div
          class="hero"
          data-color={p.color}
          mix={heroCss}
          style={{ ...colorStyle(site, p.color), backgroundColor: image?.color }}
        >
          {image && (
            <>
              <img
                class="hero-media"
                src={image.src}
                srcSet={image.srcSet}
                width={image.width}
                height={image.height}
                sizes="100vw"
                alt={alt(image, route?.locale ?? 'de')}
                fetchPriority="high"
              />
              <Credit
                image={image}
                hero
              />
            </>
          )}
          {video && (
            <video
              class="hero-media hero-video"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={image?.src}
              aria-hidden="true"
            >
              <source
                src={video.src}
                type={video.type}
              />
            </video>
          )}
          <div class="hero-copy">
            <Head class="hero-title">{p.title}</Head>
            {p.subtitle && <Sub class="hero-subtitle">{p.subtitle}</Sub>}
          </div>
        </div>
      </>
    )
  }
}
const columnsCss = css({
  display: 'flex',
  flexDirection: 'column',
  containerType: 'inline-size',
  width: '100%',
  marginInline: 'auto',
  '&[data-reverse]': { flexDirection: 'column-reverse' },
  '&[data-width="normal"]': { maxWidth: '80rem' },
  '&[data-width="narrow"]': { maxWidth: '42rem' },
  '@media (width >= 64rem)': { display: 'grid', gridTemplateColumns: 'var(--columns)' },
})
export function Columns(handle: Handle<ColumnsProps>) {
  const { site } = handle.context.get(SiteContent)
  return () => {
    const p = handle.props
    const left = p.color ? site.colors[p.color] : undefined,
      right = p.rightColor ? site.colors[p.rightColor] : undefined
    const leftBg = left?.[left.mode === 'dark' ? 'dark' : 'light'].bg ?? 'var(--color-bg)',
      rightBg = right?.[right.mode === 'dark' ? 'dark' : 'light'].bg ?? leftBg
    return (
      <>
        <Anchor id={p.anchor} />
        <Section
          color={p.color || p.rightColor}
          background={p.background}
          class="columns-section"
          style={{ '--left-bg': leftBg, '--right-bg': rightBg } as CSSProperties}
        >
          <div
            mix={columnsCss}
            data-width={p.width ?? 'normal'}
            data-reverse={p.reverse || undefined}
            style={
              {
                '--columns': `repeat(${p.spans.reduce((a, b) => a + b, 0)},minmax(0,1fr))`,
              } as CSSProperties
            }
          >
            {p.children}
          </div>
        </Section>
      </>
    )
  }
}
const columnCss = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  minWidth: 0,
  '&[data-images-only]': { gap: 0 },
})
export function Column(handle: Handle<ColumnProps>) {
  return () => {
    const p = handle.props
    return (
      <Section
        anchor={p.anchor}
        color={p.color}
        background={p.background}
        class="column"
        style={{
          gridColumn: `span ${p.span ?? 1} / span ${p.span ?? 1}`,
          justifyContent: (
            {
              start: 'flex-start',
              center: 'center',
              end: 'flex-end',
              between: 'space-between',
              around: 'space-around',
            } as const
          )[p.justify ?? 'start'],
        }}
      >
        <div
          class="column-content"
          data-images-only={p.imagesOnly || undefined}
          mix={columnCss}
          style={{ flexGrow: 1, justifyContent: 'inherit' }}
        >
          {p.children}
        </div>
      </Section>
    )
  }
}
export const paddingCss = css({
  paddingInline: '1.5rem',
  '&[data-top]': { paddingTop: '3rem' },
  '&[data-bottom]': { paddingBottom: '3rem' },
  '@container (width >= 40rem)': { paddingInline: '3rem' },
  '@container (width >= 48rem)': {
    paddingInline: '4rem',
    '&[data-top]': { paddingTop: '4rem' },
    '&[data-bottom]': { paddingBottom: '4rem' },
  },
  '@container (width >= 64rem)': {
    '&[data-top]': { paddingTop: '6rem' },
    '&[data-bottom]': { paddingBottom: '6rem' },
  },
})
export function Prose(handle: Handle<ProseProps>) {
  return () => {
    const p = handle.props
    return (
      <Section
        color={p.color}
        background={p.background}
      >
        <div
          mix={paddingCss}
          data-top={p.top !== false || undefined}
          data-bottom={p.bottom !== false || undefined}
        >
          <Anchor id={p.anchor} />
          <div class="prose">{p.children}</div>
        </div>
      </Section>
    )
  }
}
const imageCss = css({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  containerType: 'inline-size',
  '& .image-spacing': { position: 'relative', width: '100%', paddingInline: '2rem' },
  '& .image-spacing[data-top]': { paddingTop: '3rem' },
  '& .image-spacing[data-bottom]': { paddingBottom: '3rem' },
  '& .image-spacing[data-variant="decorative"]': {
    maxWidth: '72rem',
    marginInline: 'auto',
    paddingInline: '3rem',
  },
  '@container (width >= 40rem)': {
    '& .image-spacing[data-variant="decorative"]': { paddingInline: '6rem' },
  },
  '@container (width >= 48rem)': {
    '& .image-spacing': { paddingInline: '6rem' },
    '& .image-spacing[data-top]': { paddingTop: '4rem' },
    '& .image-spacing[data-bottom]': { paddingBottom: '4rem' },
  },
  '@container (width >= 64rem)': {
    '& .image-spacing': { paddingInline: '12rem' },
    '& .image-spacing[data-variant="decorative"]': { paddingInline: '12rem' },
    '& .image-spacing[data-top]': { paddingTop: '6rem' },
    '& .image-spacing[data-bottom]': { paddingBottom: '6rem' },
  },
})
export function Image(handle: Handle<ImageProps>) {
  const { site, route } = handle.context.get(SiteContent)
  return () => {
    const p = handle.props,
      image = media(site, p.image)
    if (!image) return null
    const full = p.variant === 'full'
    const svg = image.type === 'image/svg+xml'
    const img = (
      <img
        class="content-image"
        data-rounded={p.rounded ?? 'none'}
        src={image.src}
        srcSet={image.srcSet}
        alt={alt(image, route?.locale ?? 'de')}
        title={image.credit}
        width={image.width}
        height={image.height}
        loading="lazy"
        sizes="(min-width: 1024px) 50vw, 100vw"
        style={
          full
            ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
            : {
                width: svg ? image.width : 'auto',
                height: 'auto',
                maxWidth: p.maxWidth || '100%',
                maxHeight: p.maxHeight || undefined,
              }
        }
      />
    )
    return (
      <div
        mix={imageCss}
        style={{
          height: p.fill ? '100%' : undefined,
          justifyContent: ({ left: 'flex-start', center: 'center', right: 'flex-end' } as const)[
            p.align ?? 'center'
          ],
        }}
      >
        <Anchor id={p.anchor} />
        {full ? (
          <div
            class="reveal image-full"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              minHeight: `${Math.floor((image.height / image.width) * 100)}cqw`,
              maxHeight: p.maxHeight || undefined,
            }}
          >
            {img}
            <Credit
              image={image}
              rounded={p.rounded}
            />
          </div>
        ) : (
          <Section
            color={p.color}
            class="image-color"
            style={{
              width: '100%',
              alignSelf: !p.align && p.rounded === 'top' ? 'flex-end' : undefined,
            }}
          >
            <div
              class="image-spacing"
              data-variant={p.variant}
              data-rounded={p.rounded}
              data-edge={!p.align || undefined}
              data-top={p.top !== false || undefined}
              data-bottom={p.bottom !== false || undefined}
            >
              {p.variant === 'decorative' && (
                <span
                  class="decorative-star"
                  aria-hidden="true"
                />
              )}
              <div
                class="reveal image-arrangement"
                style={{
                  justifyContent: (
                    { left: 'flex-start', center: 'center', right: 'flex-end' } as const
                  )[p.align ?? 'center'],
                }}
              >
                <div class="image-position">
                  {img}
                  <Credit
                    image={image}
                    rounded={p.rounded}
                  />
                </div>
              </div>
            </div>
          </Section>
        )}
      </div>
    )
  }
}
export const buttonCss = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.75rem',
  border: '2px solid var(--color-fg)',
  padding: '.75rem 3rem',
  fontSize: '1rem',
  lineHeight: 1.5,
  fontWeight: 500,
  textDecoration: 'none',
  whiteSpace: 'normal',
  textAlign: 'center',
  transition: 'background-color 150ms,color 150ms',
  color: 'var(--color-fg)',
  '&:hover': { background: 'var(--color-fg)', color: 'var(--color-bg)' },
  '&[data-variant="primary"]': {
    borderColor: 'var(--color-interactive)',
    color: 'var(--color-interactive)',
  },
  '&[data-size="small"]': { padding: '.5rem 1.5rem', fontSize: '.875rem' },
  '&[data-size="big"]': { padding: '1rem 5rem', fontSize: '1.125rem' },
  '&:disabled': { opacity: 0.5, cursor: 'wait' },
})
export function Button(handle: Handle<ButtonProps>) {
  return () => (
    <a
      class="button"
      mix={buttonCss}
      data-size={handle.props.size}
      data-variant={handle.props.variant}
      href={handle.props.href}
      target={handle.props.blank ? '_blank' : undefined}
      rel={handle.props.blank ? 'noopener noreferrer' : undefined}
    >
      {handle.props.icon === 'ArrowLeftIcon' && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      )}
      {handle.props.children}
    </a>
  )
}
export function Buttons(handle: Handle<{ children?: RemixNode }>) {
  return () => <div class="buttons">{handle.props.children}</div>
}
export function ContactLinks(handle: Handle<ContactLinksProps>) {
  return () => (
    <nav
      class="contact-links"
      style={
        {
          '--contact-columns': handle.props.columns.length + (handle.props.social.length ? 1 : 0),
        } as CSSProperties
      }
    >
      {handle.props.columns.map((col, i) => (
        <ul key={i}>
          {col.map((item, j) => (
            <li key={j}>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</li>
          ))}
        </ul>
      ))}
      {handle.props.social.length > 0 && (
        <ul class="social-links">
          {handle.props.social.map((item) => (
            <li>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title}
              >
                <span
                  class={'social-icon social-' + item.icon}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
export function Blog(handle: Handle<BlogProps>) {
  const { site, route } = handle.context.get(SiteContent)
  return () => {
    const p = handle.props
    const entries = site.routes
      .filter((r) => r.kind === 'blog' && r.locale === route?.locale)
      .sort((a, b) => (p.sort === 'oldest' ? 1 : -1) * a.createdAt.localeCompare(b.createdAt))
      .slice(0, p.limit)
    if (!entries.length) return null
    return (
      <Prose {...p}>
        <div
          class="blog-preview"
          style={{
            textAlign: p.align ?? 'left',
            alignItems: ({ left: 'flex-start', center: 'center', right: 'flex-end' } as const)[
              p.align ?? 'left'
            ],
          }}
        >
          {entries.map((r) => (
            <a
              href={r.path}
              class="blog-link"
            >
              <h3>“ {r.title}</h3>
              <p>{r.summary}</p>
            </a>
          ))}
        </div>
      </Prose>
    )
  }
}
