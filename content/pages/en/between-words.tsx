import { Columns, Column, Prose, Image, Button, Signup, Blog } from '@roxanna/content-components'

export const title = 'Between Words'

export default (
  <>
    <Prose
      top={true}
      bottom={true}
    >
      <h1 style={{ textAlign: 'center' }}>Between Words</h1>
      <p style={{ textAlign: 'center' }}>
        Words for the in-between. A monthly place to return to.
        <br />
        For what wants attention, care, and honest presence.
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
          <h3>Between Words</h3>
          <p>— also travels as a monthly letter.</p>
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
            Between Words appears when the world pauses for a moment. It’s a letter from your lived
            in-between: between freedom and loss, between everyday life and depth, between
            experience and meaning.
          </p>
        </Prose>
        <Signup
          id={'695ae5f0025edb85baaaf8b6'}
          fields={['name']}
          top={false}
          bottom={true}
        >
          <p>Thank you! Your subscription is confirmed.</p>
        </Signup>
      </Column>
    </Columns>
    <Prose
      top={true}
      bottom={true}
    >
      <p style={{ textAlign: 'center' }}>
        <Button
          href={'/en'}
          size={'normal'}
          variant={'secondary'}
          icon={'ArrowLeftIcon'}
        >
          Back to home
        </Button>
      </p>
    </Prose>
  </>
)
