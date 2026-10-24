import {
  Hero,
  Columns,
  Column,
  Prose,
  Image,
  Button,
  Buttons,
  ContactLinks,
  Signup,
} from '@roxanna/content-components'

export const title = 'Willkommen'

export default (
  <>
    <Hero
      anchor={'top'}
      color={'sand'}
      video={'waves_full.mp4'}
      image={'waves.png'}
      title={'Zwischen Bewegung & Verlust'}
      subtitle={'Trauerbegleitung für Menschen in bewegten Lebensrealitäten.'}
      first={true}
    />
    <Columns
      anchor={'Trauerbegleitung'}
      color={'grey-green'}
      width={'normal'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        span={1}
        justify={'end'}
        imagesOnly={false}
      >
        <Image
          image={'loekken_drone.png'}
          variant={'decorative'}
          rounded={'top'}
          top={true}
          bottom={true}
          fill={true}
        />
      </Column>
      <Column
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          top={true}
          bottom={true}
        >
          <h2>Zwischen Orten</h2>
          <p>
            Trauer verändert vieles – besonders dann, wenn dein Leben nicht an einem festen Ort
            gebunden ist.
          </p>
          <p>
            Wenn du im Ausland lebst, nomadisch unterwegs bist oder zwischen Welten pendelst, fehlt
            oft ein vertrauter Rahmen.
          </p>
          <p>
            Meine Begleitung richtet sich an Menschen, die ortsunabhängig leben und in Zeiten von
            Verlust einen stabilen Anker suchen. Unabhängig davon, wo sie gerade sind.
          </p>
        </Prose>
      </Column>
    </Columns>
    <Columns
      anchor={'beginning'}
      color={'haute'}
      width={'normal'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Image
          image={'Roxy-mit-Zitrone.jpeg'}
          rounded={'top'}
          top={true}
          bottom={true}
          fill={true}
        />
      </Column>
      <Column
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          top={true}
          bottom={true}
        >
          <p>
            <strong>Hej, ich bin Roxanna.</strong>
          </p>
          <p>Ich begleite Menschen weltweit in Zeiten von Verlust – online und ortsunabhängig.</p>
          <p>
            Seit vielen Jahren lebe und arbeite ich zwischen Hamburg, Tarifa und unterwegs. Mein
            buttermilchgelber Oldtimer-Van „Susy“ ist dabei zu einem vielschichtigen Lebensgefühl
            und Gedankenmotor geworden.
          </p>
          <p>
            Aus eigener Erfahrung weiß ich, wie unterschiedlich Trauer erlebt wird – und welche
            zusätzlichen Fragen entstehen, wenn Familie, Verpflichtung und eigenes Leben an
            verschiedenen Orten verankert sind.
          </p>
          <p>
            Mein eigenes Leben zwischen Orten hat mich gelehrt, Ambivalenz auszuhalten – zwischen
            Nähe und Distanz, Bleiben und Weitergehen.
            <br />
            Diese Haltung bringe ich in meine Arbeit ein.
          </p>
        </Prose>
      </Column>
    </Columns>
    <Columns
      color={'grey-green'}
      width={'normal'}
      reverse={false}
      spans={[2, 1]}
    >
      <Column
        anchor={''}
        span={2}
        justify={'center'}
        imagesOnly={false}
      >
        <Prose
          anchor={'values'}
          top={true}
          bottom={true}
        >
          <h1>Mein Kompass</h1>
          <ul>
            <li>
              <strong>Mut</strong>
              <br />
              Schwieriges darf benannt werden.
              <br />
              Verlust fordert uns heraus – und wir dürfen ihm begegnen.
            </li>
            <li>
              <strong>Ehrlichkeit &amp; Transparenz</strong>
              <br />
              Gedanken dürfen entstehen, bevor sie fertig sind. Unsicherheit und Irrwege gehören zum
              Prozess. Wir trauen uns sie zu benennen und einen anderen Weg einzuschlagen.
            </li>
            <li>
              <strong>Respekt</strong>
              <br />
              Deine Lebensrealität verdient Achtung.
              <br />
              Tempo, Grenzen und Entscheidungen bleiben bei Dir.
            </li>
            <li>
              <strong>Fokus</strong>
              <br />
              Wir verlieren uns nicht im Großen.
              <br />
              Wir schauen auf das, was jetzt gerade wichtig ist.
              <br />
              Kleine Schritte zählen – wenn sie Richtung geben.
            </li>
          </ul>
        </Prose>
      </Column>
      <Column
        span={1}
        imagesOnly={false}
      >
        <Image
          image={'Kompass.svg'}
          paddingInline="0"
          rounded={'none'}
          align={'center'}
          maxWidth={'min(100%, clamp(15rem, 60vw, 27rem))'}
          maxHeight={''}
          top={true}
          bottom={true}
          fill={true}
        />
      </Column>
    </Columns>
    <Columns
      color={'haute'}
      rightColor={'platinum'}
      width={'normal'}
      reverse={false}
      spans={[2, 3]}
    >
      <Column
        anchor={''}
        color={'haute'}
        span={2}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          anchor={'pricing'}
          top={true}
          bottom={true}
        >
          <h2>Preise</h2>
          <p>Trauerbegleitung braucht Klarheit – auch finanziell.</p>
          <p>
            • Online-Sitzung (60 Min): 95 €<br />• Trauerspaziergang (90 Min): 140 €<br />•
            Kennenlerngespräch (20 Min): kostenfrei
          </p>
          <p>
            Bei finanziellen Engpässen sprich mich bitte an.
            <br />
            Wir finden eine Lösung.
          </p>
        </Prose>
      </Column>
      <Column
        color={'platinum'}
        span={3}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          anchor={'faq'}
          top={true}
          bottom={true}
        >
          <h2>Häufige Fragen</h2>
          <h3>Ist das Therapie?</h3>
          <p>
            Nein. Meine Begleitung bietet einen strukturierten Gesprächsraum in Zeiten von Verlust.
            Wir arbeiten manchmal mit Methoden aus der systemischen Arbeit, Kunst- und
            Körpertherapie. Ich stelle keine Diagnosen und biete keine Psychotherapie an.
          </p>
          <hr />
          <h3>Wie funktioniert Online-Begleitung?</h3>
          <p>
            Wir treffen uns via Zoom oder telefonisch. Alles Weitere erkläre ich im kostenfreien
            Kennenlerngespräch.
          </p>
          <hr />
          <h3>Wie oft sollte ich kommen?</h3>
          <p>Es gibt keinen festen Rhythmus.</p>
          <p>Du entscheidest, ob und wann du wiederzukommen willst.</p>
        </Prose>
      </Column>
    </Columns>
    <Columns
      anchor={'blog'}
      color={'rust-clay'}
      width={'normal'}
      reverse={false}
      spans={[2, 3]}
    >
      <Column
        span={2}
        justify={'start'}
        imagesOnly={false}
      >
        <Image
          image={'star_light.svg'}
          variant={'default'}
          rounded={'none'}
          maxWidth={''}
          maxHeight={''}
          top={true}
          bottom={false}
          fill={false}
        />
        <Prose
          top={false}
          bottom={false}
        >
          <h3>Zwischen den Zeilen</h3>
          <p>Ein digitaler Brief über das, wofür wir selten Worte finden.</p>
        </Prose>
        <Signup
          id={'69ea331e2850143e8ec7d86d'}
          fields={[]}
          top={false}
          bottom={true}
        >
          <p>Danke für dein interesse!</p>
        </Signup>
      </Column>
      <Column
        span={3}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          top={true}
          bottom={true}
        >
          <h3 style={{ textAlign: 'right' }}>Wie bleibe ich, wenn ich gehen möchte?</h3>
          <p style={{ textAlign: 'right' }}>
            Trauer löst häufig den Impuls aus, sich zu entziehen.
            <br />
            Nicht hinzusehen. Weiterzumachen.{' '}
          </p>
          <p style={{ textAlign: 'right' }}>
            Doch manchmal liegt Stabilität genau darin, nicht auszuweichen.
          </p>
          <p style={{ textAlign: 'right' }}>
            Diesen und weitere Gedanken teile ich in „<strong>Zwischen den Zeilen</strong>“ –<br />
            als monatlichen Newsletter für deutschsprachige Menschen weltweit.
          </p>
        </Prose>
      </Column>
    </Columns>
    <Prose
      anchor={'contact'}
      top={true}
      bottom={true}
    >
      <h1>Kontakt</h1>
      <ContactLinks
        columns={[
          [{ title: 'Roxanna Diercks' }],
          [{ title: 'moin@roxanna-diercks.de', href: 'mailto:moin@roxanna-diercks.de' }],
        ]}
        social={[
          { title: 'Instagram', href: 'https://www.instagram.com/susy.world/', icon: 'instagram' },
          {
            title: 'Pinterest',
            href: 'https://de.pinterest.com/RoxannaDiercks/',
            icon: 'pinterest',
          },
        ]}
      />
      <Buttons>
        <Button
          href={'mailto:moin@roxanna-diercks.de'}
          size={'normal'}
          variant={'secondary'}
        >
          Schreib mir
        </Button>
      </Buttons>
      <p></p>
      <p></p>
    </Prose>
  </>
)
