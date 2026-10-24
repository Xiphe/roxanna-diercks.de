import { Columns, Column, Prose, Image, Button, Signup, Blog } from '@roxanna/content-components'

export const title = 'Zwischen den Zeilen'

export default (
  <>
    <Prose
      top={true}
      bottom={true}
    >
      <h1 style={{ textAlign: 'center' }}>Zwischen den Zeilen</h1>
      <p style={{ textAlign: 'center' }}>
        Worte für das Dazwischen. Ein Ort, zu dem du zurückkehren kannst.
        <br />
        Für das, was Aufmerksamkeit braucht, Fürsorge und ehrliches Dasein.
      </p>
    </Prose>
    <Columns
      width={'normal'}
      reverse={false}
      spans={[1]}
    >
      <Column
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Blog
          sort={'newest'}
          align={'left'}
          top={true}
          bottom={true}
        />
      </Column>
    </Columns>
    <Columns
      color={'rust-clay'}
      width={'full'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Image
          image={'star_light.svg'}
          variant={'default'}
          rounded={'none'}
          align={'center'}
          maxWidth={'150px'}
          top={true}
          bottom={false}
          fill={false}
        />
        <Prose
          top={false}
          bottom={true}
        >
          <h3>Zwischen den Zeilen</h3>
          <p>– auch als monatlicher Brief.</p>
        </Prose>
      </Column>
      <Column
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          top={true}
          bottom={false}
        >
          <p style={{ textAlign: 'left' }}>
            Zwischen den Zeilen entsteht, wenn die Welt für einen Moment innehält. Ein Brief aus dem
            gelebten Dazwischen: zwischen Freiheit und Verlust, zwischen Alltag und Tiefe, zwischen
            Erleben und Bedeutung.
          </p>
        </Prose>
        <Signup
          id={'between-words-de'}
          fields={['name']}
          top={false}
          bottom={true}
        >
          <p>Danke! Deine Anmeldung ist bestätigt.</p>
        </Signup>
      </Column>
    </Columns>
    <Prose
      top={true}
      bottom={true}
    >
      <p style={{ textAlign: 'center' }}>
        <Button
          href={'/'}
          size={'normal'}
          variant={'secondary'}
          icon={'ArrowLeftIcon'}
        >
          Zurück zur Startseite
        </Button>
      </p>
    </Prose>
  </>
)
