import { createHash } from 'node:crypto'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, extname } from 'node:path'
import sharp from 'sharp'
import type { MediaImage } from '../../contracts/content.ts'

const sources: Record<string, Omit<MediaImage, 'src' | 'srcSet'>> = JSON.parse(
  await readFile('content/media.json', 'utf8'),
)
const manifest: Record<string, MediaImage> = {}
const files: { key: string; path: string; contentType: string; sha256: string }[] = []
await rm('.generated/media', { recursive: true, force: true })
async function save(key: string, bytes: Buffer, type: string) {
  const sha256 = createHash('sha256').update(bytes).digest('hex')
  const ext = extname(key)
  const immutable = key.slice(0, -ext.length) + '-' + sha256.slice(0, 16) + ext
  const path = '.generated/media/' + immutable
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, bytes)
  files.push({ key: immutable, path, contentType: type, sha256 })
  return '/media/' + immutable
}
for (const [filename, source] of Object.entries(sources)) {
  if (filename.includes('/') || filename.includes('\\') || filename.startsWith('.'))
    throw new Error('Unsafe media filename')
  const input = await readFile('content/media/' + filename),
    stem = filename
      .slice(0, filename.length - extname(filename).length)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
  if (
    source.type === 'image/svg+xml' ||
    source.type === 'image/heic' ||
    source.type.startsWith('video/')
  ) {
    manifest[filename] = {
      ...source,
      src: await save('originals/' + filename.replace(/[^a-zA-Z0-9_.-]/g, '-'), input, source.type),
    }
    continue
  }
  const metadata = await sharp(input).rotate().metadata(),
    rotated = [5, 6, 7, 8].includes(metadata.orientation ?? 1)
  const width = (rotated ? metadata.height : metadata.width)!,
    height = (rotated ? metadata.width : metadata.height)!
  const widths = [
    ...new Set([320, 480, 960, 1440, 1920, Math.min(width, 2560)].filter((w) => w <= width)),
  ].sort((a, b) => a - b)
  const variants = []
  for (const w of widths) {
    const image = await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer()
    variants.push({
      src: await save('images/' + stem + '-' + w + '.webp', image, 'image/webp'),
      width: w,
    })
  }
  const { dominant } = await sharp(input).stats()
  manifest[filename] = {
    ...source,
    width,
    height,
    src: variants.at(-1)!.src,
    srcSet: variants.map((v) => `${v.src} ${v.width}w`).join(', '),
    color: `rgb(${dominant.r} ${dominant.g} ${dominant.b})`,
  }
}
await mkdir('.generated', { recursive: true })
await writeFile('.generated/media.json', JSON.stringify(manifest, null, 2) + '\n')
await writeFile('.generated/media-files.json', JSON.stringify(files, null, 2) + '\n')
console.log(
  `Prepared ${Object.keys(manifest).length} media sources as ${files.length} immutable objects.`,
)
