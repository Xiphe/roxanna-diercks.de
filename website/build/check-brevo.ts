// Run in CI, where the secret is available. These checks never send mail.
const key = process.env.BREVO_API_KEY
if (!key) throw new Error('Set the repository Actions secret BREVO_API_KEY.')
const origin = 'https://api.brevo.com/v3'
const request = (path: string, options: RequestInit = {}) =>
  fetch(origin + path, {
    ...options,
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
    headers: { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/json' },
  })
const attributes = await request('/contacts/attributes')
if (!attributes.ok)
  throw new Error('Brevo Contacts access check failed (HTTP ' + attributes.status + ').')
const body = (await attributes.json()) as { attributes: { name: string }[] }
const names = new Set(body.attributes.map((a) => a.name))
for (const name of ['LOCALE', 'FIRSTNAME'])
  if (!names.has(name)) throw new Error('Brevo contact attribute missing: ' + name)
for (const id of [3, 6, 9]) {
  const r = await request('/contacts/lists/' + id)
  if (!r.ok) throw new Error('Brevo signup list check failed (HTTP ' + r.status + ').')
}
// An empty body must fail validation, without identifying or creating a contact.
const probe = await request('/contacts/doubleOptinConfirmation', { method: 'POST', body: '{}' })
if (probe.status !== 400)
  throw new Error('Brevo DOI endpoint access could not be verified (HTTP ' + probe.status + ').')
console.log(
  'Brevo Contacts, list IDs, attribute mapping and DOI endpoint validation checked; no email sent. A real confirmation remains an acceptance check.',
)

export {}
