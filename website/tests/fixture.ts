import { CMX_DOCUMENT_SCHEMA, type CmxDocument } from '@cmx-tools/contracts'
import type { PublishedDocuments, SiteMetadata } from '../../contracts/content.ts'

const page: CmxDocument = {
  $schema: CMX_DOCUMENT_SCHEMA,
  cmxVersion: 1,
  interface: {
    imports: {
      '@roxanna/content-components': {
        name: '@roxanna/content-components',
        specifier: 'file:contracts/components',
        version: '0.1.0',
      },
    },
    exports: { title: {}, default: { slots: [[]] } },
  },
  content: {
    title: 'Synthetic fixture',
    default: {
      type: 'component',
      from: '@roxanna/content-components',
      import: 'Prose',
      children: [
        { type: 'element', tag: 'h1', children: ['Synthetic fixture'] },
        {
          type: 'component',
          from: '@roxanna/content-components',
          import: 'Signup',
          props: { id: 'fixture-signup', fields: ['name'] },
          children: [{ type: 'element', tag: 'h3', children: ['Subscription confirmed'] }],
        },
      ],
    },
  },
}
const site: SiteMetadata = {
  version: 1,
  name: 'Fixture site',
  defaultColor: 'sand',
  favicon: 'star',
  colors: {
    sand: {
      mode: 'light',
      light: { bg: '#f0ebe1', fg: '#323232', interactive: '#ba4b2f', accent: '#fff' },
      dark: { bg: '#111', fg: '#eee', interactive: '#3d5cd6', accent: '#fff' },
    },
  },
  routes: [
    ...(
      [
        ['/zwischen-den-zeilen', 'de'],
        ['/en/between-words', 'en'],
      ] as const
    ).map(([path, locale]) => ({
      path,
      locale,
      document: 'blog-index',
      title: 'Blog index',
      kind: 'page' as const,
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    })),
    ...(
      [
        ['/blog/bleiben-wenn-du-gehen-moechtest', 'de', 'Older German entry', '2026-01-02'],
        ['/en/blog/how-to-stay-when-you-want-to-run', 'en', 'Older English entry', '2026-01-02'],
        ['/blog/schreiben-bei-trauer', 'de', 'Newer German entry', '2026-04-23'],
        ['/en/blog/writing-through-grief', 'en', 'Newer English entry', '2026-04-23'],
      ] as const
    ).map(([path, locale, title, createdAt]) => ({
      path,
      locale,
      title,
      createdAt,
      document: 'blog-article',
      kind: 'blog' as const,
      updatedAt: createdAt,
      summary: title,
    })),
    ...(['/', '/en'] as const).map((path) => ({
      path,
      document: 'home',
      locale: path === '/' ? ('de' as const) : ('en' as const),
      title: 'Navigation fixture',
      kind: 'page' as const,
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    })),
    {
      path: '/fixture',
      document: 'fixture',
      locale: 'en',
      title: 'Synthetic fixture',
      kind: 'page',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
  ],
  media: {
    star: {
      src: '/assets/star.svg',
      width: 215,
      height: 215,
      type: 'image/svg+xml',
      alt: { en: 'Star' },
    },
  },
  navigation: {
    de: [{ title: 'Fixture', href: '/fixture' }],
    en: [{ title: 'Fixture', href: '/fixture' }],
  },
  signups: {
    'fixture-signup': {
      id: 'fixture-signup',
      path: '/fixture',
      locale: 'en',
      listId: 3,
      templateId: 6,
      fields: ['name'],
    },
  },
  redirects: [],
}
export const documents: PublishedDocuments = {
  fixture: page,
  home: {
    ...structuredClone(page),
    content: {
      title: 'Navigation fixture',
      default: {
        type: 'fragment',
        children: [
          ...['Trauerbegleitung', 'pricing', 'faq', 'blog', 'contact'].map((id) => ({
            type: 'element' as const,
            tag: 'section',
            props: { id },
            children: [id],
          })),
          {
            type: 'component',
            from: '@roxanna/content-components',
            import: 'Blog',
            props: { limit: 1, sort: 'newest' },
          },
        ],
      },
    },
  },
  'blog-index': {
    ...structuredClone(page),
    content: {
      title: 'Blog index',
      default: {
        type: 'component',
        from: '@roxanna/content-components',
        import: 'Blog',
        props: { sort: 'newest' },
      },
    },
  },
  'blog-article': {
    ...structuredClone(page),
    content: { title: 'Blog article', default: 'Blog article' },
  },
  '404': { ...structuredClone(page), content: { title: 'Not found', default: 'Not found' } },
  _site: {
    $schema: CMX_DOCUMENT_SCHEMA,
    cmxVersion: 1,
    interface: { imports: {}, exports: { site: {} } },
    content: { site },
  },
}
