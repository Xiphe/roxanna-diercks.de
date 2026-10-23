import { DurableObject } from 'cloudflare:workers'

export class SignupLimits extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    ctx.storage.sql.exec(
      'CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL)',
    )
  }
  reserve(emailHash: string, ipHash: string): boolean {
    return this.ctx.storage.transactionSync(() => {
      const now = Date.now()
      this.ctx.storage.sql.exec('DELETE FROM limits WHERE expires <= ?', now)
      const emailKey = 'email:' + emailHash,
        ipKey = 'ip:' + ipHash
      const email = this.ctx.storage.sql
        .exec('SELECT count FROM limits WHERE key = ?', emailKey)
        .toArray()[0]
      const ip = this.ctx.storage.sql
        .exec<{ count: number }>('SELECT count FROM limits WHERE key = ?', ipKey)
        .toArray()[0]
      if (email || (ip?.count ?? 0) >= 20) return false
      this.ctx.storage.sql.exec(
        'INSERT INTO limits (key,count,expires) VALUES (?,1,?)',
        emailKey,
        now + 60000,
      )
      this.ctx.storage.sql.exec(
        'INSERT INTO limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1',
        ipKey,
        now + 3600000,
      )
      return true
    })
  }
}
