import { Hero, Columns, Column, Prose, Image, Button } from '@roxanna/content-components'

export const title = 'Grief support in the workplace'

export default (
  <>
    <Hero
      anchor={'top'}
      color={'sand'}
      video={'waves_full.mp4'}
      image={'waves.png'}
      title={'Grief in the workplace'}
      subtitle={'Knowing how to respond when things get difficult'}
      first={true}
    />
    <Prose
      color={'sand'}
      top={true}
      bottom={true}
    >
      <h1 style={{ textAlign: 'center' }}>Grief is not a purely private matter.</h1>
      <p style={{ textAlign: 'center' }}>
        It affects teams, decisions and the way people work together.
      </p>
      <p style={{ textAlign: 'center' }}>
        I help organisations respond clearly, even in exceptional circumstances, with
        <br />
        structure, a clear approach and language that supports people.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Button
          href={'mailto:moin@roxanna-diercks.de'}
          size={'normal'}
          variant={'secondary'}
        >
          Request a meeting
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
          <h1>When loss affects the workplace</h1>
          <p>
            When someone at work experiences a loss, more changes than their ability to do their
            job.
          </p>
          <ul>
            <li>Conversations become more cautious</li>
            <li>Decisions feel less certain</li>
            <li>Teams respond, often quietly</li>
            <li>Leaders search for the right words</li>
          </ul>
          <p>At the same time, business carries on.</p>
          <p>
            This is where tension arises.
            <br />
            Between doing the job and feeling the loss.
            <br />
            Between the pace of work and the reality of grief.
          </p>
          <p>
            Organisations need more than theory here.
            <br />
            They need guidance.
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
          <h3>What happens within the organisation</h3>
          <p>
            Grief brings dynamics into the workplace
            <br />
            that rarely have a clear framework.
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
            <li>Closeness and professional distance shift</li>
            <li>The need to keep working meets emotional reality</li>
            <li>Expectations remain unspoken</li>
            <li>Teams respond in different ways</li>
            <li>The pace of work does not match the pace of grief</li>
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
          <h3 style={{ textAlign: 'left' }}>My approach</h3>
          <p>I work where organisational needs meet human experience.</p>
          <p>I bring structure to situations that would otherwise depend on improvisation.</p>
          <p>
            I help create clarity.
            <br />
            And language that offers support.
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
          <h3>A crisis response plan</h3>
          <p>When a death affects the workplace, people need guidance.</p>
          <ul>
            <li>clear roles when a crisis occurs</li>
            <li>simple guidelines for communication</li>
            <li>specific next steps</li>
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
          <p>Leaders and teams become more confident in responding to grief.</p>
          <ul>
            <li>holding conversations when words are hard to find</li>
            <li>staying in contact without overwhelming people</li>
            <li>maintaining stability as a team</li>
          </ul>
          <p>Practical and ready to use.</p>
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
          <h3>Individual support</h3>
          <p>Grief changes everyday working life.</p>
          <p>
            I support employees through individual conversations
            <br />
            and help them regain a sense of stability.
          </p>
          <p>This eases the pressure on leaders and helps the team understand what is happening.</p>
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
          <h3>Making room for grief in the way we work</h3>
          <p>
            Organisations make deliberate choices about how people work together. Grief is part of
            that.
          </p>
          <p>A plan for dealing with emotional crises can work like an agile framework.</p>
          <p>
            It provides guidance.
            <br />
            It remains adaptable.
            <br />
            Everyone shares responsibility for it.
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
            <li>Transparency replaces uncertainty</li>
            <li>Responsibility is shared</li>
            <li>Small steps provide direction</li>
            <li>Communication stays open</li>
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
          <h3>What this looks like in practice</h3>
          <p>Working together often leads to small but important changes:</p>
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
            <li>Teams can say when they are at a loss for words</li>
            <li>Expectations are deliberately reconsidered</li>
            <li>Those affected set their own pace</li>
            <li>Conversations take place instead of being avoided</li>
          </ul>
          <p>This creates a sense of security, without expecting perfection.</p>
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
            <strong>I am Roxanna.</strong>
          </p>
          <p>
            I studied business administration and spent many years working in marketing and event
            management.
          </p>
          <p>I introduced remote working in organisations and supported teams through change.</p>
          <p>Today, I combine that understanding of organisations with grief support.</p>
          <p>
            I understand what organisations need, and what life is like for people facing
            exceptional circumstances.
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
          <h3>What changes in the workplace</h3>
          <p>
            When the response to grief no longer depends on improvisation
            <br />
            and has a clear framework,
          </p>
          <p>the way people work together changes noticeably.</p>
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
            <li>Leaders become more confident in difficult situations</li>
            <li>Teams remain more stable when individuals are affected</li>
            <li>Uncertainty decreases and communication becomes clearer</li>
            <li>Employees feel seen and supported</li>
            <li>Decisions are made more consciously</li>
          </ul>
        </Prose>
      </Column>
    </Columns>
    <Prose
      color={'sand'}
      top={true}
      bottom={true}
    >
      <h3 style={{ textAlign: 'center' }}>Let's talk</h3>
      <p style={{ textAlign: 'center' }}>
        Get in touch if you would like to address grief in your organisation, whether in preparation
        or in response to a loss.
      </p>
      <p style={{ textAlign: 'center' }}>
        <Button
          href={'mailto:moin@roxanna-diercks.de'}
          size={'normal'}
          variant={'secondary'}
        >
          Request a meeting
        </Button>
      </p>
      <p style={{ textAlign: 'center' }}></p>
      <hr />
      <p style={{ textAlign: 'center' }}>
        <sub>Grief is visible beyond moments of crisis.</sub>
      </p>
      <p style={{ textAlign: 'center' }}>
        <sub>
          <strong>It reveals how an organisation responds to real life.</strong>
        </sub>
      </p>
    </Prose>
  </>
)
