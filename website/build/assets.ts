import { execFileSync } from 'node:child_process'
import { build } from 'esbuild'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
execFileSync(
  'npx',
  [
    '--no-install',
    'cmx-environment',
    'generate',
    '.cmx/environment.ts',
    '--config',
    'website/cmx.config.ts',
  ],
  { stdio: 'inherit' },
)
await rm('dist', { recursive: true, force: true })
await mkdir('.generated', { recursive: true })
const inputs = {
  entry: 'website/app/browser.ts',
  signup: 'website/app/newsletter/form.tsx',
  style: 'website/app/style.css',
}
const result = await build({
  entryPoints: inputs,
  outdir: 'dist/assets',
  entryNames: '[name]-[hash]',
  chunkNames: 'shared-[hash]',
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  jsxImportSource: 'remix/component',
  minify: true,
  metafile: true,
  external: ['/font/*', '/assets/*.svg'],
})
for (const path of Object.keys(result.metafile.inputs))
  if (
    /^(?:content|\.cmx)\//.test(path) ||
    path.includes('node_modules/@cmx-tools/') ||
    /website\/app\/(?:document-host|ui-library|router|page|worker)/.test(path)
  )
    throw new Error('Server-only module in browser bundle: ' + path)
const assets = Object.fromEntries(
  Object.entries(result.metafile.outputs)
    .filter(([, v]) => v.entryPoint)
    .map(([path, v]) => [
      Object.keys(inputs).find((k) => inputs[k as keyof typeof inputs] === v.entryPoint),
      '/' + path.replace(/^dist\//, ''),
    ]),
)
await mkdir('dist/font', { recursive: true })
for (const font of ['playfair-display', 'poppins-200', 'poppins-600'])
  await cp('website/app/assets/' + font + '.woff2', 'dist/font/' + font + '.woff2')
for (const file of ['star', 'instagram', 'pinterest'])
  await cp('website/app/assets/' + file + '.svg', 'dist/assets/' + file + '.svg')
if (process.argv.includes('--local-media'))
  await cp('.generated/media', 'dist/media', { recursive: true })
await writeFile('.generated/assets.json', JSON.stringify(assets, null, 2) + '\n')
await writeFile('.generated/browser-meta.json', JSON.stringify(result.metafile, null, 2) + '\n')
await writeFile(
  'dist/_headers',
  '/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/font/*\n  Cache-Control: public, max-age=31536000, immutable\n/media/*\n  Cache-Control: public, max-age=31536000, immutable\n',
)
console.log('Built browser entries; CMX content and server modules excluded.')
