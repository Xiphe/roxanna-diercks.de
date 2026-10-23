import { clientEntry, type Handle } from 'remix/component'
import type { SignupProps } from '@roxanna/content-components'
import assets from '../../../.generated/assets.json' with { type: 'json' }
import { SignupForm, type SignupFormProps } from '../newsletter/form.tsx'
import { Prose } from './presentation.tsx'
import { SiteContent } from './context.ts'

function Form(handle: Handle<SignupFormProps>) {
  return SignupForm(handle)
}
const HydratedForm = clientEntry(assets.signup + '#SignupForm', Form)
export function Signup(handle: Handle<SignupProps>) {
  const { route } = handle.context.get(SiteContent)
  return () => (
    <Prose {...handle.props}>
      <div
        class="signup"
        id={'signup-' + handle.props.id}
      >
        <HydratedForm
          id={handle.props.id}
          locale={route?.locale ?? 'de'}
          fields={handle.props.fields ?? []}
          success={handle.props.children}
        />
      </div>
    </Prose>
  )
}
