import { Hero, Columns, Column, Prose, Image, Button } from '@roxanna/content-components'

export const title = 'Trauer im Unternehmen begleiten'

export default (
  <>
    <Hero
      anchor={'top'}
      color={'sand'}
      video={'waves_full.mp4'}
      image={'waves.png'}
      title={'Trauer im Unternehmen'}
      subtitle={'– handlungsfähig bleiben, wenn es schwierig wird'}
      first={true}
    />
    <Prose
      color={'sand'}
      top={true}
      bottom={true}
    >
      <h1 style={{ textAlign: 'center' }}>Trauer ist kein privates Thema.</h1>
      <p style={{ textAlign: 'center' }}>
        Sie wirkt im Team, in Entscheidungen und in der Zusammenarbeit.
      </p>
      <p style={{ textAlign: 'center' }}>
        Ich unterstütze Unternehmen dabei, auch in Ausnahmesituationen klar zu handeln –<br />
        mit Struktur, Haltung und einer Sprache, die trägt.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Button
          href={'mailto:moin@roxanna-diercks.de'}
          size={'normal'}
          variant={'secondary'}
        >
          Termin anfragen
        </Button>
      </p>
    </Prose>
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
          <h1>Wenn ein Verlust ins Unternehmen kommt</h1>
          <p>
            Wenn ein Mensch im Unternehmen betroffen ist, verändert sich mehr als nur seine
            Leistungsfähigkeit.
          </p>
          <ul>
            <li>Gespräche werden vorsichtiger</li>
            <li>Entscheidungen werden unsicherer</li>
            <li>Teams reagieren – oft still</li>
            <li>Führungskräfte suchen nach den richtigen Worten</li>
          </ul>
          <p>Und gleichzeitig läuft das Geschäft weiter.</p>
          <p>
            Genau hier entsteht Spannung.
            <br />
            Zwischen Funktionieren und Fühlen.
            <br />
            Zwischen Tempo und Realität.
          </p>
          <p>
            Unternehmen brauchen dafür keine Theorie.
            <br />
            Sie brauchen Orientierung.
          </p>
        </Prose>
      </Column>
      <Column
        span={1}
        imagesOnly={false}
      >
        <Image
          image={'star_light.svg'}
          rounded={'none'}
          align={'center'}
          maxWidth={''}
          maxHeight={''}
          top={true}
          bottom={true}
          fill={true}
        />
      </Column>
    </Columns>
    <Columns
      rightColor={'platinum'}
      width={'normal'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        anchor={''}
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          anchor={'pricing'}
          top={true}
          bottom={true}
        >
          <h3>Was im System passiert</h3>
          <p>
            Trauer bringt Dynamiken ins Unternehmen,
            <br />
            für die es selten eine klare Struktur gibt.
          </p>
        </Prose>
      </Column>
      <Column
        color={'platinum'}
        span={1}
        justify={'end'}
        imagesOnly={false}
      >
        <Prose
          anchor={'faq'}
          top={true}
          bottom={true}
        >
          <ul>
            <li>Nähe und professionelle Distanz verschieben sich</li>
            <li>Funktionieren trifft auf emotionale Realität</li>
            <li>Erwartungen bleiben unausgesprochen</li>
            <li>Teams reagieren unterschiedlich</li>
            <li>Tempo der Arbeit passt nicht zum Tempo der Trauer</li>
          </ul>
        </Prose>
      </Column>
    </Columns>
    <Columns
      color={'sand'}
      rightColor={'haute'}
      width={'normal'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        anchor={''}
        color={'sand'}
        span={1}
        justify={'center'}
        imagesOnly={false}
      >
        <Prose
          anchor={''}
          top={true}
          bottom={true}
        >
          <h3 style={{ textAlign: 'left' }}>Mein Ansatz</h3>
          <p>Ich arbeite an der Schnittstelle von Organisation und menschlicher Realität.</p>
          <p>Ich bringe Struktur in Situationen, in denen sonst improvisiert wird.</p>
          <p>
            Ich schaffe Klarheit.
            <br />
            Und eine Sprache, die trägt.
          </p>
        </Prose>
      </Column>
      <Column
        color={'haute'}
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          anchor={''}
          top={true}
          bottom={true}
        >
          <h3>Krisenplan</h3>
          <p>Wenn ein Trauerfall eintritt, braucht es Orientierung.</p>
          <ul>
            <li>klare Rollen im Ernstfall</li>
            <li>einfache Leitlinien für Kommunikation</li>
            <li>konkrete nächste Schritte</li>
          </ul>
        </Prose>
      </Column>
    </Columns>
    <Columns
      color={'haute'}
      rightColor={'sand'}
      width={'normal'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        color={'haute'}
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          anchor={''}
          top={true}
          bottom={true}
        >
          <h3>Workshops</h3>
          <p>Führungskräfte und Teams gewinnen Sicherheit im Umgang mit Trauer.</p>
          <ul>
            <li>Gespräche führen, wenn Worte fehlen</li>
            <li>im Kontakt bleiben, ohne zu überfordern</li>
            <li>als Team stabil bleiben</li>
          </ul>
          <p>Praxisnah und direkt anwendbar.</p>
        </Prose>
      </Column>
      <Column
        color={'sand'}
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          top={true}
          bottom={true}
        >
          <h3>Begleitung</h3>
          <p>Trauer verändert den Arbeitsalltag.</p>
          <p>
            Ich begleite Mitarbeitende in Einzelgesprächen
            <br />
            und unterstütze sie dabei, Stabilität zurückzugewinnen.
          </p>
          <p>Das entlastet Führungskräfte und schafft Klarheit im Team.</p>
        </Prose>
      </Column>
    </Columns>
    <Columns
      color={'grey-green'}
      width={'normal'}
      reverse={false}
      spans={[3, 2]}
    >
      <Column
        anchor={''}
        span={3}
        justify={'center'}
        imagesOnly={false}
      >
        <Prose
          anchor={''}
          top={true}
          bottom={true}
        >
          <h3>Trauer als Teil moderner Zusammenarbeit</h3>
          <p>Unternehmen gestalten bewusst, wie Zusammenarbeit funktioniert. Trauer gehört dazu.</p>
          <p>Ein emotionaler Krisenplan kann wie ein agiles Framework funktionieren.</p>
          <p>
            Er schafft Orientierung.
            <br />
            Er bleibt anpassbar.
            <br />
            Er wird gemeinsam getragen.
          </p>
        </Prose>
      </Column>
      <Column
        span={2}
        justify={'end'}
        imagesOnly={false}
      >
        <Prose
          anchor={'faq-2'}
          top={true}
          bottom={true}
        >
          <ul>
            <li>Transparenz statt Unsicherheit</li>
            <li>Verantwortung wird geteilt</li>
            <li>Kleine Schritte geben Richtung</li>
            <li>Kommunikation bleibt offen</li>
          </ul>
        </Prose>
      </Column>
    </Columns>
    <Columns
      color={'platinum'}
      width={'normal'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        anchor={''}
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          anchor={''}
          top={true}
          bottom={true}
        >
          <h3>Ein Blick in die Praxis</h3>
          <p>In der Zusammenarbeit entstehen oft kleine, entscheidende Veränderungen:</p>
        </Prose>
      </Column>
      <Column
        span={1}
        justify={'end'}
        imagesOnly={false}
      >
        <Prose
          anchor={''}
          top={true}
          bottom={true}
        >
          <ul>
            <li>Teams dürfen sagen, wenn sie sprachlos sind</li>
            <li>Erwartungen werden bewusst neu verhandelt</li>
            <li>Betroffene bestimmen ihr Tempo</li>
            <li>Gespräche entstehen, statt vermieden zu werden</li>
          </ul>
          <p>Das schafft Sicherheit. Nicht Perfektion.</p>
        </Prose>
      </Column>
    </Columns>
    <Columns
      anchor={'beginning'}
      color={'haute'}
      width={'normal'}
      reverse={false}
      spans={[1, 2]}
    >
      <Column
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Image
          image={'20220629-DSC05058_22-06-30-12-26-14-Jochen-Kilian.jpg'}
          variant={'default'}
          rounded={'top'}
          maxWidth={''}
          maxHeight={''}
          top={true}
          bottom={true}
          fill={true}
        />
      </Column>
      <Column
        span={2}
        justify={'center'}
        imagesOnly={false}
      >
        <Prose
          top={true}
          bottom={true}
        >
          <p>
            <strong>Ich bin Roxanna,</strong>
          </p>
          <p>
            ich habe Betriebswirtschaft studiert und viele Jahre im Marketing- und Eventmanagement
            gearbeitet.
          </p>
          <p>
            Ich habe Remote-Arbeit in Unternehmen eingeführt und Teams in Veränderungsprozessen
            begleitet.
          </p>
          <p>Heute verbinde ich Organisationsverständnis mit Trauerbegleitung.</p>
          <p>
            Ich kenne die Anforderungen von Unternehmen – und die Realität von Menschen in
            Ausnahmesituationen.
          </p>
        </Prose>
      </Column>
    </Columns>
    <Columns
      color={'platinum'}
      width={'normal'}
      reverse={false}
      spans={[1, 1]}
    >
      <Column
        anchor={''}
        span={1}
        justify={'start'}
        imagesOnly={false}
      >
        <Prose
          anchor={'pricing-2'}
          top={true}
          bottom={true}
        >
          <h3>Was sich im Unternehmen verändert</h3>
          <p>
            Wenn Trauer nicht mehr improvisiert wird,
            <br />
            sondern einen klaren Rahmen bekommt,
          </p>
          <p>verändert sich die Zusammenarbeit spürbar.</p>
        </Prose>
      </Column>
      <Column
        span={1}
        justify={'end'}
        imagesOnly={false}
      >
        <Prose
          anchor={'faq-3'}
          top={true}
          bottom={true}
        >
          <ul>
            <li>Führungskräfte gewinnen Sicherheit im Umgang mit schwierigen Situationen</li>
            <li>Teams bleiben stabiler, auch wenn einzelne betroffen sind</li>
            <li>Unsicherheit wird reduziert, Kommunikation wird klarer</li>
            <li>Mitarbeitende fühlen sich gesehen und getragen</li>
            <li>Entscheidungen werden bewusster getroffen</li>
          </ul>
        </Prose>
      </Column>
    </Columns>
    <Prose
      color={'sand'}
      top={true}
      bottom={true}
    >
      <h3 style={{ textAlign: 'center' }}>Lassen Sie uns sprechen</h3>
      <p style={{ textAlign: 'center' }}>
        Wenn Sie sich mit dem Thema Trauer im Unternehmen auseinandersetzen möchten – präventiv oder
        im konkreten Fall.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Button
          href={'mailto:moin@roxanna-diercks.de'}
          size={'normal'}
          variant={'secondary'}
        >
          Termin anfragen
        </Button>
      </p>
      <p style={{ textAlign: 'center' }}></p>
      <hr />
      <p style={{ textAlign: 'center' }}>
        <sub>Trauer wird nicht erst im Ernstfall sichtbar.</sub>
      </p>
      <p style={{ textAlign: 'center' }}>
        <sub>
          <strong>Sie zeigt, wie ein Unternehmen mit Realität umgeht.</strong>
        </sub>
      </p>
    </Prose>
  </>
)
