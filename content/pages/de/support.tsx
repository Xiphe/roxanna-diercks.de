import { Hero, Prose, Button } from '@roxanna/content-components'

export const title = 'Support'

export default (
  <>
    <Hero
      video={'waves_full.mp4'}
      image={'waves.png'}
      title={'Wenn du gerade nicht alleine sein willst'}
      subtitle={
        'Manchmal wird es zu viel. Dann kann es helfen, mit jemandem zu sprechen – jetzt, nicht später.'
      }
      first={true}
    />
    <Prose
      top={true}
      bottom={true}
    >
      <p>Hier findest du Anlaufstellen, die rund um die Uhr erreichbar sind.</p>
      <h1>Soforthilfe</h1>
      <p>
        <strong>Telefonseelsorge</strong>
        <br />
        📞 116 123 (kostenfrei, 24/7)
      </p>
      <p>Du kannst anonym anrufen. Es hört dir jemand zu.</p>
      <p></p>
      <h1>Online-Angebote</h1>
      <p>
        <strong>VIA – Online-Plattform für Trauer (Malteser)</strong>
        <br />
        <a
          href={'https://www.malteser.de/online/trauern'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          malteser.de/online/trauern
        </a>
      </p>
      <p></p>
      <p>
        <strong>Telefonseelsorge Chat</strong>
        <br />
        <a
          href={'https://www.telefonseelsorge.de'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          telefonseelsorge.de
        </a>
      </p>
      <p></p>
      <p>
        <strong>Befrienders Worldwide </strong>(International)
        <br />
        <a
          href={'https://www.befrienders.org'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          befrienders.org
        </a>
      </p>
    </Prose>
    <Prose
      color={'rust-clay'}
      top={true}
      bottom={true}
    >
      <h1 style={{ textAlign: 'center' }}>Wenn du lieber schreiben möchtest</h1>
      <p style={{ textAlign: 'center' }}>Manche Dinge lassen sich leichter schreiben als sagen.</p>
      <p style={{ textAlign: 'center' }}>
        <Button
          href={'mailto:moin@roxanna-diercks.de'}
          size={'normal'}
          variant={'secondary'}
        >
          Schreib mir
        </Button>
      </p>
      <p style={{ textAlign: 'center' }}>
        Ich antworte nicht sofort, aber ich lese jede Nachricht.
      </p>
      <p style={{ textAlign: 'center' }}>
        <em>Ich begleite Menschen in Trauer. Mehr dazu </em>
        <a href={'https://roxanna-diercks.de/de'}>
          <em>hier</em>
        </a>
        <em>.</em>
      </p>
    </Prose>
  </>
)
