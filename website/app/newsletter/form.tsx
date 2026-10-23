import { on, type Handle, type RemixNode } from 'remix/component'

export interface SignupFormProps {
  id: string
  locale: 'de' | 'en'
  fields: ('name' | 'surname')[]
  success?: RemixNode
}
export function SignupForm(handle: Handle<SignupFormProps>) {
  let pending = false,
    sent = false,
    confirmed = false,
    error = '',
    email = '',
    name = '',
    surname = ''
  const de = handle.props.locale === 'de'
  handle.queueTask(() => {
    const params = new URLSearchParams(window.location.search)
    confirmed = params.get('newsletterSuccess') === handle.props.id
    void handle.update()
  })
  async function submit(event: SubmitEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (pending) return
    const form = event.currentTarget as HTMLFormElement
    if (!form.reportValidity()) return
    const body = new FormData(form)
    email = String(body.get('email') ?? '')
    name = String(body.get('name') ?? '')
    surname = String(body.get('surname') ?? '')
    pending = true
    error = ''
    void handle.update()
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
        mode: 'same-origin',
        signal: handle.signal,
      })
      if (response.ok) sent = true
      else if (response.status === 400)
        error = de
          ? 'Bitte gib eine gültige E-Mail-Adresse ein.'
          : 'Please enter a valid email address.'
      else if (response.status === 429)
        error = de
          ? 'Bitte warte kurz, bevor du es erneut versuchst.'
          : 'Please wait a moment before trying again.'
      else
        error = de
          ? 'Das hat gerade nicht geklappt. Bitte versuche es später erneut.'
          : 'That did not work. Please try again later.'
    } catch {
      if (!handle.signal.aborted)
        error = de
          ? 'Keine Verbindung. Bitte versuche es erneut.'
          : 'Could not connect. Please try again.'
    } finally {
      if (!handle.signal.aborted) {
        pending = false
        void handle.update()
      }
    }
  }
  return () =>
    confirmed ? (
      <div
        class="prose"
        role="status"
      >
        {handle.props.success}
      </div>
    ) : sent ? (
      <p role="status">
        {de
          ? 'Danke! Bitte bestätige deine Anmeldung über den Link in deiner E-Mail.'
          : 'Thank you! Please confirm your subscription using the link in your email.'}
      </p>
    ) : (
      <form
        action="/_newsletter/subscribe"
        method="post"
        class="signup-form"
        aria-busy={pending}
        mix={on<HTMLFormElement, 'submit'>('submit', submit)}
      >
        <input
          type="hidden"
          name="signup"
          value={handle.props.id}
        />
        <label>
          <span>{de ? 'E-Mail' : 'Email'}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            disabled={pending}
            defaultValue={email}
          />
        </label>
        {handle.props.fields.map((field) => (
          <label>
            <span>{field === 'name' ? 'Name' : de ? 'Nachname' : 'Surname'}</span>
            <input
              type="text"
              name={field}
              autoComplete={field === 'name' ? 'given-name' : 'family-name'}
              maxLength={100}
              disabled={pending}
              defaultValue={field === 'name' ? name : surname}
            />
          </label>
        ))}
        <label
          class="signup-trap"
          aria-hidden="true"
        >
          <span>Website</span>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
        >
          {pending ? (de ? 'Wird gesendet…' : 'Sending…') : de ? 'Abonnieren' : 'Subscribe'}
        </button>
        {error && (
          <p
            class="signup-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </form>
    )
}
