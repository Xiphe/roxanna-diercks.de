import type { ColorSet } from '../contracts/content.ts'

export const colors = {
  'rust-clay': {
    mode: 'light',
    light: { bg: '#ba4b2f', fg: '#f0ebe1', interactive: '#fffbf5', accent: '#f0ebe1' },
    dark: { bg: '#111111', fg: '#EEEEEE', interactive: '#3d5cd6', accent: '#EEEEEE' },
  },
  sand: {
    mode: 'light',
    light: { bg: '#f0ebe1', fg: '#323232', interactive: '#d59e7d', accent: '#ffffff' },
    dark: { bg: '#111111', fg: '#EEEEEE', interactive: '#3d5cd6', accent: '#EEEEEE' },
  },
  haute: {
    mode: 'light',
    light: { bg: '#d59e7d', fg: '#323232', interactive: '#60745d', accent: '#323232' },
    dark: { bg: '#111111', fg: '#EEEEEE', interactive: '#3d5cd6', accent: '#EEEEEE' },
  },
  platinum: {
    mode: 'light',
    light: { bg: '#eee4db', fg: '#050d18', interactive: '#ba4b2f', accent: '#ffffff' },
    dark: { bg: '#111111', fg: '#EEEEEE', interactive: '#3d5cd6', accent: '#EEEEEE' },
  },
  'grey-green': {
    mode: 'light',
    light: { bg: '#60745D', fg: '#F0EBE1', interactive: '#ffffff', accent: '#F0EBE1' },
    dark: { bg: '#111111', fg: '#EEEEEE', interactive: '#3d5cd6', accent: '#EEEEEE' },
  },
} satisfies Record<string, ColorSet>
