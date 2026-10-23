import { readFile } from 'node:fs/promises'
import { readSite } from '../../contracts/content.ts'
const documents = JSON.parse(await readFile('.generated/publication.json', 'utf8'))
const site = readSite(documents._site),
  origin = process.env.SITE_URL
if (!origin) throw new Error('Set SITE_URL.')
for (const route of site.routes) {
  const r = await fetch(new URL(route.path, origin), { signal: AbortSignal.timeout(20000) })
  if (r.status !== 200) throw new Error('Route check failed: ' + route.path)
  await r.body?.cancel()
}
for (const image of Object.values(site.media)) {
  const r = await fetch(new URL(image.src, origin), {
    method: 'HEAD',
    signal: AbortSignal.timeout(20000),
  })
  if (!r.ok || !r.headers.get('Cache-Control')?.includes('immutable'))
    throw new Error('Media check failed: ' + image.src)
}
for (const path of ['/de_old', '/not-a-real-page'])
  if ((await fetch(new URL(path, origin))).status !== 404) throw new Error('Expected 404: ' + path)
console.log('Verified published routes, immutable media and removed/unknown URLs.')
