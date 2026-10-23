import { isCmxDocument, type CmxDocument } from '@cmx-tools/contracts'
import type { Locale } from '@roxanna/content-components'

export interface ContentRoute {
  path: string
  document: string
  locale: Locale
  title: string
  kind: 'page' | 'blog'
  description?: string
  metaTitle?: string
  image?: string
  noindex?: boolean
  createdAt: string
  updatedAt: string
  summary?: string
  hasContent?: boolean
}
export interface MediaImage {
  src: string
  srcSet?: string
  width: number
  height: number
  alt: Partial<Record<Locale, string>>
  type: string
  credit?: string
  creditLink?: string
  focalX?: number
  focalY?: number
  color?: string
}
export interface ColorSet {
  mode: 'light' | 'dark' | 'auto'
  light: { bg: string; fg: string; interactive: string; accent: string }
  dark: { bg: string; fg: string; interactive: string; accent: string }
}
export interface SignupConfig {
  id: string
  path: string
  locale: Locale
  listId: number
  templateId: number
  fields: ('name' | 'surname')[]
}
export interface SiteMetadata {
  version: 1
  name: string
  defaultColor: string
  favicon: string
  routes: ContentRoute[]
  media: Record<string, MediaImage>
  colors: Record<string, ColorSet>
  navigation: Record<Locale, { title: string; href: string }[]>
  signups: Record<string, SignupConfig>
  redirects: { path: string; to: string; status: 307 | 308; preserveSearch?: boolean }[]
}
export const siteEntry = '_site'
export type PublishedDocuments = Record<string, CmxDocument>
const object = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v)
const path = (v: unknown): v is string =>
  typeof v === 'string' &&
  /^\/(?!\/)[^?#\\]*$/.test(v) &&
  (v === '/' || !v.endsWith('/')) &&
  !/^\/(_|assets\/|font\/|media\/|health$|sitemap\.xml$|robots\.txt$)/.test(v)
const url = (v: unknown): v is string =>
  typeof v === 'string' &&
  ((v.startsWith('/') && !v.startsWith('//')) || v.startsWith('https://')) &&
  !/[\s\\]/.test(v)

export function readSite(document: CmxDocument | undefined): SiteMetadata {
  const s = document?.content.site
  if (
    !object(s) ||
    s.version !== 1 ||
    typeof s.name !== 'string' ||
    !Array.isArray(s.routes) ||
    !object(s.media) ||
    !object(s.colors) ||
    !object(s.signups) ||
    !object(s.navigation) ||
    !Array.isArray(s.redirects)
  )
    throw new Error('Invalid site metadata')
  const paths = new Set<string>()
  for (const r of s.routes) {
    if (
      !object(r) ||
      !path(r.path) ||
      paths.has(r.path) ||
      typeof r.document !== 'string' ||
      r.document === siteEntry ||
      typeof r.title !== 'string' ||
      !['de', 'en'].includes(String(r.locale)) ||
      !['page', 'blog'].includes(String(r.kind))
    )
      throw new Error('Invalid or duplicate content route')
    paths.add(r.path)
  }
  for (const m of Object.values(s.media))
    if (
      !object(m) ||
      !url(m.src) ||
      typeof m.width !== 'number' ||
      m.width <= 0 ||
      typeof m.height !== 'number' ||
      m.height <= 0 ||
      !object(m.alt) ||
      typeof m.type !== 'string'
    )
      throw new Error('Invalid media metadata')
  for (const locale of ['de', 'en'])
    if (
      !Array.isArray(s.navigation[locale]) ||
      !s.navigation[locale].every(
        (l: unknown) => object(l) && typeof l.title === 'string' && url(l.href),
      )
    )
      throw new Error('Invalid navigation')
  if (
    typeof s.defaultColor !== 'string' ||
    !Object.hasOwn(s.colors, s.defaultColor) ||
    typeof s.favicon !== 'string' ||
    !Object.hasOwn(s.media, s.favicon)
  )
    throw new Error('Invalid site theme')
  for (const [id, c] of Object.entries(s.signups))
    if (
      !object(c) ||
      c.id !== id ||
      !paths.has(String(c.path)) ||
      !['de', 'en'].includes(String(c.locale)) ||
      !Number.isSafeInteger(c.listId) ||
      Number(c.listId) <= 0 ||
      !Number.isSafeInteger(c.templateId) ||
      Number(c.templateId) <= 0 ||
      !Array.isArray(c.fields) ||
      !c.fields.every((f) => ['name', 'surname'].includes(String(f)))
    )
      throw new Error('Invalid signup configuration')
  for (const r of s.redirects) {
    if (
      !object(r) ||
      !path(r.path) ||
      paths.has(r.path) ||
      !url(r.to) ||
      ![307, 308].includes(Number(r.status))
    )
      throw new Error('Invalid redirect')
    paths.add(r.path)
  }
  return s as unknown as SiteMetadata
}
export function validatePublication(documents: PublishedDocuments): SiteMetadata {
  const site = readSite(documents[siteEntry])
  for (const key of ['404', ...site.routes.map((r) => r.document)]) {
    const d = documents[key]
    if (
      !isCmxDocument(d) ||
      typeof d.content.title !== 'string' ||
      !Object.hasOwn(d.content, 'default')
    )
      throw new Error(`Missing or invalid page: ${key}`)
  }
  return site
}
