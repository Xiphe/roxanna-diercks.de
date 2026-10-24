import { Prose, Button } from '@roxanna/content-components'

export const title = 'Wie bleibe ich, wenn ich gehen möchte?'

export default (
  <>
    <Prose>
      <h1>Wie bleibe ich, wenn ich gehen möchte?</h1>
      <p>
        Manchmal ist das Mutigste, nicht weiterzugehen – sondern bei dem zu bleiben, was wehtut.
        <br />
        In meinem Van, geparkt in der Nähe von Tarifa, habe ich gelernt: Bleiben heißt nicht,
        stillzustehen.
        <br />
        Es heißt, mich selbst nicht im Stich zu lassen, wenn die Wellen kommen.
      </p>
    </Prose>
    <Prose
      top={true}
      bottom={true}
    >
      <Button
        href={'/zwischen-den-zeilen'}
        variant={'secondary'}
        icon={'ArrowLeftIcon'}
      >
        Zurück zum Blog
      </Button>
    </Prose>
  </>
)
