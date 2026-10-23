import type { SignupConfig } from '../../../contracts/content.ts'

export interface SignupInput {
  email: string
  name?: string
  surname?: string
}
export function readSignupInput(data: FormData, config: SignupConfig): SignupInput | undefined {
  const email = String(data.get('email') ?? '').trim()
  if (email.length > 254 || !/^\S+@[^\s@]+\.[^\s@]+$/.test(email)) return undefined
  const result: SignupInput = { email }
  for (const field of config.fields) {
    const value = String(data.get(field) ?? '').trim()
    if (value.length > 100 || /[\u0000-\u001f]/.test(value)) return undefined
    if (value) result[field] = value
  }
  return result
}
export async function subscribe(
  config: SignupConfig,
  input: SignupInput,
  key: string,
  origin: string,
  fetcher: typeof fetch = fetch,
  nameAttribute = 'FIRSTNAME',
) {
  const redirect = new URL(config.path, origin)
  redirect.searchParams.set('newsletterSuccess', config.id)
  redirect.hash = 'signup-' + config.id
  const response = await fetcher('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
    method: 'POST',
    redirect: 'manual',
    signal: AbortSignal.timeout(12000),
    headers: { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email: input.email,
      includeListIds: [config.listId],
      templateId: config.templateId,
      redirectionUrl: redirect.href,
      attributes: {
        LOCALE: config.locale,
        ...(input.name ? { [nameAttribute]: input.name } : {}),
        ...(input.surname ? { LASTNAME: input.surname } : {}),
      },
    }),
  })
  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      code?: unknown
      message?: unknown
    } | null
    const detail = typeof error?.message === 'string' ? error.message.toLowerCase() : ''
    console.error(
      JSON.stringify({
        message: 'Brevo DOI request rejected',
        status: response.status,
        code:
          typeof error?.code === 'string' && /^[a-z_]{1,64}$/.test(error.code)
            ? error.code
            : 'unknown',
        category:
          detail.includes('smtp') && detail.includes('not') && detail.includes('activat')
            ? 'account_inactive'
            : detail.includes('template')
              ? 'template'
              : detail.includes('permission') || detail.includes('access')
                ? 'permissions'
                : detail.includes('ip') && detail.includes('authoriz')
                  ? 'ip_allowlist'
                  : 'other',
      }),
    )
  }
  return response.ok
}
