import { appendFileSync } from 'node:fs'

// Run in CI, where the secret is available. These checks never send mail.
const key = process.env.BREVO_API_KEY
if (!key) throw new Error('Set the production environment Actions secret BREVO_API_KEY.')
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
if (!names.has('LOCALE')) throw new Error('Brevo contact attribute missing: LOCALE')
const nameAttribute = ['FIRSTNAME', 'FIRST_NAME', 'FNAME', 'VORNAME', 'PRENOM', 'NAME'].find(
  (name) => names.has(name),
)
for (const id of [3, 6, 9]) {
  const r = await request('/contacts/lists/' + id)
  if (!r.ok) throw new Error('Brevo signup list check failed (HTTP ' + r.status + ').')
}
// DOI delivery uses a transactional template even though its endpoint is under Contacts.
// https://developers.brevo.com/reference/get-smtp-template
const template = await request('/smtp/templates/6')
if (!template.ok)
  throw new Error(
    'Brevo transactional-template access check failed (HTTP ' +
      template.status +
      '). Set Transactional email: All alongside Contacts: All.',
  )
// An empty body must fail validation, without identifying or creating a contact.
// It does not verify sending rights: Contacts-only keys passed this probe but failed real delivery.
const probe = await request('/contacts/doubleOptinConfirmation', { method: 'POST', body: '{}' })
if (probe.status !== 400)
  throw new Error(
    'Brevo DOI validation probe returned an unexpected status (HTTP ' + probe.status + ').',
  )
if (!nameAttribute)
  throw new Error(
    'No existing first-name attribute found. Available attribute names: ' +
      [...names].sort().join(', '),
  )
if (process.env.GITHUB_OUTPUT)
  appendFileSync(process.env.GITHUB_OUTPUT, `name_attribute=${nameAttribute}\n`)
console.log('Brevo first-name mapping: ' + nameAttribute)
console.log(
  'Brevo Contacts, lists, attributes and transactional-template read access checked; no email sent. The empty DOI validation probe does not verify sending rights. Real confirmation delivery remains an acceptance check.',
)

export {}
