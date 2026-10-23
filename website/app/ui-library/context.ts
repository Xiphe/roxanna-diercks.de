import type { Handle, RemixNode } from 'remix/component'
import type { ContentRoute, SiteMetadata } from '../../../contracts/content.ts'

export interface PageContext {
  site: SiteMetadata
  route?: ContentRoute
  path: string
}
export function SiteContent(handle: Handle<PageContext & { children?: RemixNode }, PageContext>) {
  handle.context.set(handle.props)
  return () => handle.props.children
}
