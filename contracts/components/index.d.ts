import type { Handle, RemixNode } from 'remix/component'

type Component<P> = (handle: Handle<P>) => () => RemixNode
export type Locale = 'de' | 'en'
export interface SectionProps {
  anchor?: string
  color?: string
  background?: string
  children?: RemixNode
}
export interface ColumnsProps extends SectionProps {
  width?: 'full' | 'normal' | 'narrow'
  reverse?: boolean
  spans: number[]
  rightColor?: string
}
export interface ColumnProps extends SectionProps {
  span?: number
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  imagesOnly?: boolean
}
export interface ProseProps extends SectionProps {
  top?: boolean
  bottom?: boolean
}
export interface HeroProps extends SectionProps {
  title: string
  subtitle?: string
  image?: string
  video?: string
  first?: boolean
}
export interface ImageProps extends SectionProps {
  image: string
  variant?: 'default' | 'decorative' | 'full'
  rounded?:
    | 'none'
    | 'full'
    | 'circle'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
  align?: 'left' | 'center' | 'right'
  maxWidth?: string
  maxHeight?: string
  tint?: 'white'
  paddingInline?: string
  top?: boolean
  bottom?: boolean
  fill?: boolean
}
export interface ButtonProps {
  href: string
  size?: 'small' | 'normal' | 'big'
  variant?: 'primary' | 'secondary'
  icon?: string
  blank?: boolean
  children?: RemixNode
}
export interface ContactLinksProps {
  columns: { title: string; href?: string }[][]
  social: { title: string; href: string; icon: string }[]
}
export interface SignupProps extends ProseProps {
  id: string
  fields?: ('name' | 'surname')[]
}
export interface BlogProps extends ProseProps {
  limit: number
  sort: 'oldest' | 'newest'
  align?: 'left' | 'center' | 'right'
}
export declare const Hero: Component<HeroProps>
export declare const Columns: Component<ColumnsProps>
export declare const Column: Component<ColumnProps>
export declare const Prose: Component<ProseProps>
export declare const Image: Component<ImageProps>
export declare const Button: Component<ButtonProps>
export declare const Buttons: Component<{ children?: RemixNode }>
export declare const ContactLinks: Component<ContactLinksProps>
export declare const Signup: Component<SignupProps>
export declare const Blog: Component<BlogProps>
