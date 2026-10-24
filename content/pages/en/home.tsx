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
  Blog,
} from '@roxanna/content-components'

export const title = 'Welcome'

export default (
  <>
    <Hero
      anchor={'top'}
      color={'sand'}
      video={'waves_full.mp4'}
      image={'waves.png'}
      title={'For those who carry both freedom and loss.'}
      subtitle={'Bereavement Support for travelers'}
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
          <h2>A gentle beginning</h2>
          <p>My approach is to offer a steady, nurturing space for your grief journey.</p>
          <p>
            Here, you can bring whatever is present — memories, emotions, silence, or questions.
          </p>
          <p>
            Grief work with me is companionship: being alongside you as you explore what life feels
            like after loss. Sometimes that means talking, sometimes creating, sometimes finding
            small rituals that bring calm or clarity. Together we listen to what needs attention and
            allow it to move in its own rhythm.
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
          <h2>About me</h2>
          <p>
            I’m Roxanna — a grief companion and traveller. I support travellers learning to live
            with loss.
          </p>
          <p>
            For more than nine years, I’ve been living part of my life in my van — spending every
            winter in Tarifa.
          </p>
          <p>
            I believe that grief deserves space. That we can move and still stay connected to what
            matters. And that being met with presence and honesty can change how we carry what we’ve
            lost.
          </p>
          <p></p>
          <p style={{ textAlign: 'center' }}>
            <Button
              href={'/en/about'}
              size={'big'}
              variant={'secondary'}
            >
              About me
            </Button>
          </p>
          <p></p>
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
          <h2>Values I Work By</h2>
          <ul>
            <li>Presence over fixing</li>
            <li style={{ textAlign: 'left' }}>Honesty over perfection</li>
            <li style={{ textAlign: 'left' }}>Gentle structure, not control</li>
            <li style={{ textAlign: 'left' }}>Resilience through connection</li>
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
          <h2>
            <strong>Pricing</strong>
          </h2>
          <p>
            Grief support should feel accessible and clear.
            <br />I offer flexible, transparent pricing — no packages, no subscriptions.
          </p>
          <p>
            • <strong>Online Session (60 min):</strong> €75
            <br /> • <strong>Grief Walk (90 min):</strong> €90
            <br /> • <strong>Say Hello Call (20 min):</strong> free
          </p>
          <p>
            If you’re currently in a difficult financial situation, please reach out. I’m happy to
            find a solution together.
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
          <h2>
            <strong>FAQs</strong>
          </h2>
          <h3>Is this therapy?</h3>
          <p>
            No. My work is about accompaniment, not diagnosis or treatment. It’s a space for
            reflection, conversation, and presence — not clinical therapy.
          </p>
          <hr />
          <h3>How does online support work?</h3>
          <p>
            We meet on Zoom. You just need a quiet space, a stable connection, and yourself. Some
            people join from home, some from nature, others from their van.
          </p>
          <hr />
          <h3>What language do you work in?</h3>
          <p>Sessions are available in English or German.</p>
          <hr />
          <h3>How often should I come?</h3>
          <p>
            There’s no fixed rhythm. Grief has its own timing — you decide when it feels right to
            return.
          </p>
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
          <h1>Between Words</h1>
          <h3>– thoughts and moments from the road.</h3>
        </Prose>
        <Signup
          id={'69ea327185c6566c2565f1a4'}
          fields={[]}
          top={false}
          bottom={true}
        >
          <h5>Thank you for your interest!</h5>
        </Signup>
      </Column>
      <Column
        span={3}
        justify={'start'}
        imagesOnly={false}
      >
        <Blog
          limit={1}
          sort={'oldest'}
          align={'left'}
          top={true}
          bottom={false}
        />
        <Prose
          top={false}
          bottom={true}
        >
          <p style={{ textAlign: 'center' }}>
            <Button
              href={'/en/between-words'}
              size={'normal'}
              variant={'secondary'}
            >
              Read Blog
            </Button>
          </p>
        </Prose>
      </Column>
    </Columns>
    <Prose
      anchor={'contact'}
      top={true}
      bottom={true}
    >
      <h1>Contact</h1>
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
          Write me
        </Button>
      </Buttons>
      <p></p>
    </Prose>
  </>
)
