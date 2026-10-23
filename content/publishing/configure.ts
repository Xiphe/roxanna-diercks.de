import { execFileSync } from 'node:child_process'
import { generateKeyPairSync, createPrivateKey, createPublicKey } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'

const repository = 'Xiphe/roxanna-diercks.de'
const run = (command: string, args: string[], input?: string) =>
  execFileSync(command, args, { input, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim()
const get = (entry: string) => run('gopass', ['show', '-o', entry])
const entry = 'projects/roxanna-diercks.de/cmx/publishing-private-key'
let privateKey: string
try {
  privateKey = get(entry)
} catch {
  privateKey = JSON.stringify(generateKeyPairSync('ed25519').privateKey.export({ format: 'jwk' }))
  run('gopass', ['insert', '--multiline', '--force', entry], privateKey)
}
const key = createPrivateKey({ key: JSON.parse(privateKey), format: 'jwk' })
const publicKeys = JSON.stringify({
  'publisher-v1': createPublicKey(key).export({ format: 'jwk' }),
})
mkdirSync('.generated', { recursive: true })
writeFileSync('.generated/public-keys.json', publicKeys + '\n')
const secrets = {
  CMX_PUBLISH_PRIVATE_KEY: privateKey,
  CLOUDFLARE_API_TOKEN: get('projects/roxanna-diercks.de/cloudflare/deploy-api-token'),
  CLOUDFLARE_ACCOUNT_ID: get('projects/sites/cloudflare/admin/account-id'),
  R2_ACCESS_KEY_ID: get('projects/roxanna-diercks.de/cloudflare/access-key-id'),
  R2_SECRET_ACCESS_KEY: get('projects/roxanna-diercks.de/cloudflare/secret-access-key'),
}
for (const [name, value] of Object.entries(secrets))
  run('gh', ['secret', 'set', name, '--env', 'production', '--repo', repository], value)
for (const [name, value] of Object.entries({
  CMX_PUBLISH_KEY_ID: 'publisher-v1',
  CMX_PUBLISH_PUBLIC_KEYS: publicKeys,
  SITE_URL: process.env.SITE_URL ?? 'https://roxanna-diercks.cloudflare-sites-f0b.workers.dev',
  R2_ACCOUNT_ID: secrets.CLOUDFLARE_ACCOUNT_ID,
}))
  run('gh', ['variable', 'set', name, '--env', 'production', '--repo', repository], value)
console.log(
  'Configured site-specific GitHub publication and deployment credentials. Signing key retained in gopass.',
)
