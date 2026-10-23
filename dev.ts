import { execFileSync } from 'node:child_process'
import { closeSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

if (process.env.WRANGLER_COMMAND === 'dev') {
  // Wrangler may start a second custom build while the first is still writing output.
  mkdirSync('.generated', { recursive: true })
  const lock = '.generated/build.lock',
    deadline = Date.now() + 120000
  while (true) {
    try {
      const fd = openSync(lock, 'wx')
      writeFileSync(fd, String(process.pid))
      closeSync(fd)
      break
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
      try {
        process.kill(Number(readFileSync(lock, 'utf8')), 0)
      } catch {
        rmSync(lock, { force: true })
        continue
      }
      if (Date.now() > deadline)
        throw new Error('Timed out waiting for the previous development build.')
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100)
    }
  }
  try {
    const run = (...args: string[]) => execFileSync('npm', ['run', ...args], { stdio: 'inherit' })
    if (process.env.WEBSITE_TEST === 'true') run('build:app')
    else {
      run('content:build', '--', '--reuse-media')
      run('build:app', '--', '--local-media')
    }
  } finally {
    rmSync(lock, { force: true })
  }
}
