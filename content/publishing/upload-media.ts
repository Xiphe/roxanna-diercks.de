import { createHash, createHmac } from 'node:crypto'
import { readFile } from 'node:fs/promises'

type MediaFile = { key: string; path: string; contentType: string; sha256: string }
const sha = (bytes: string | Uint8Array) => createHash('sha256').update(bytes).digest('hex')
const hmac = (key: string | Uint8Array, value: string) =>
  createHmac('sha256', key).update(value).digest()
const encode = (value: string) =>
  encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase(),
  )
export async function uploadMedia(
  files: MediaFile[],
  account: string,
  access: string,
  secret: string,
) {
  if (!/^[a-f0-9]{32}$/i.test(account) || !access || !secret)
    throw new Error('Configure the site-scoped R2 credentials.')
  const host = account + '.r2.cloudflarestorage.com',
    bucket = 'roxanna-diercks-media'
  async function request(
    method: string,
    key: string,
    query: Record<string, string> = {},
    body?: Buffer,
    type?: string,
  ) {
    const path = '/' + bucket + (key ? '/' + key.split('/').map(encode).join('/') : '')
    const search = Object.entries(query)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => encode(k) + '=' + encode(v))
      .join('&')
    const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''),
      day = date.slice(0, 8),
      digest = sha(body ?? '')
    const headers: Record<string, string> = {
      host,
      'x-amz-content-sha256': digest,
      'x-amz-date': date,
    }
    if (type) {
      headers['content-type'] = type
      headers['cache-control'] = 'public, max-age=31536000, immutable'
    }
    const names = Object.keys(headers).sort(),
      signed = names.join(';'),
      canonical = names.map((n) => n + ':' + headers[n].trim() + '\n').join('')
    const scope = day + '/auto/s3/aws4_request',
      toSign =
        'AWS4-HMAC-SHA256\n' +
        date +
        '\n' +
        scope +
        '\n' +
        sha([method, path, search, canonical, signed, digest].join('\n'))
    const signing = hmac(hmac(hmac(hmac('AWS4' + secret, day), 'auto'), 's3'), 'aws4_request')
    headers.Authorization =
      'AWS4-HMAC-SHA256 Credential=' +
      access +
      '/' +
      scope +
      ', SignedHeaders=' +
      signed +
      ', Signature=' +
      hmac(signing, toSign).toString('hex')
    const response = await fetch('https://' + host + path + (search ? '?' + search : ''), {
      method,
      headers,
      body: body as BodyInit | undefined,
      redirect: 'error',
      signal: AbortSignal.timeout(60000),
    })
    if (!response.ok) throw new Error('R2 request failed (HTTP ' + response.status + ').')
    return response
  }
  const existing = new Set<string>()
  let token: string | undefined
  do {
    const response = await request('GET', '', {
      'list-type': '2',
      ...(token ? { 'continuation-token': token } : {}),
    })
    const xml = await response.text()
    for (const match of xml.matchAll(/<Key>(.*?)<\/Key>/g)) existing.add(match[1])
    token = xml.match(/<NextContinuationToken>(.*?)<\/NextContinuationToken>/)?.[1]
  } while (token)
  let next = 0,
    uploaded = 0
  await Promise.all(
    Array.from({ length: Math.min(6, files.length) }, async () => {
      while (next < files.length) {
        const file = files[next++],
          bytes = await readFile(file.path)
        if (sha(bytes) !== file.sha256 || !file.key.includes('-' + file.sha256.slice(0, 16) + '.'))
          throw new Error('Media changed after preparation: ' + file.key)
        if (existing.has(file.key)) continue
        await request('PUT', file.key, {}, bytes, file.contentType)
        uploaded++
      }
    }),
  )
  return { uploaded, skipped: files.length - uploaded }
}
if (import.meta.main) {
  const files: MediaFile[] = JSON.parse(await readFile('.generated/media-files.json', 'utf8'))
  console.log(
    await uploadMedia(
      files,
      process.env.R2_ACCOUNT_ID ?? '',
      process.env.AWS_ACCESS_KEY_ID ?? '',
      process.env.AWS_SECRET_ACCESS_KEY ?? '',
    ),
  )
}
