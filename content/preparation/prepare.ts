import { execFileSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
const run = (file: string) =>
  execFileSync(process.execPath, ['content/preparation/' + file], { stdio: 'inherit' })
for (const folder of ['.cmx/bundle', '.cmx/documents'])
  rmSync(folder, { recursive: true, force: true })
run('compile.ts')
execFileSync(
  'npx',
  [
    '--no-install',
    'cmx-document',
    'render',
    '.cmx/bundle',
    '--complete-only',
    '--out-dir',
    '.cmx/documents',
  ],
  { stdio: 'inherit' },
)
if (!process.argv.includes('--reuse-media') || !existsSync('.generated/media.json')) run('media.ts')
run('publication.ts')
