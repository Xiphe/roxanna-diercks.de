import { Prose } from '@roxanna/content-components'

export const title = 'Impressum'

export default (
  <>
    <Prose
      top={true}
      bottom={true}
    >
      <h1 style={{ textAlign: 'left' }}>Impressum</h1>
      <p>
        Hannes Diercks
        <br />
        Rotdornallee 16
        <br />
        22175 Hamburg
      </p>
      <h3>Kontakt:</h3>
      <p style={{ textAlign: 'left' }}>
        Telefon: +49 (0) 151 405 111 98
        <br />
        E-Mail: <a href={'mailto:impressum@xiphe.net'}>impressum@xiphe.net</a>
      </p>
      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
        <a href={'https://ec.europa.eu/consumers/odr/'}>https://ec.europa.eu/consumers/odr/</a> .
      </p>
      <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
    </Prose>
  </>
)
