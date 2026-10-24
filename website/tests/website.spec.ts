import { expect, test, type Page } from '@playwright/test'

// Exercise Remix client navigation, which requires Navigation API sourceElement support.
test.use({ launchOptions: { args: ['--enable-experimental-web-platform-features'] } })

test.describe('navigation after page changes', () => {
  for (const home of ['/', '/en']) {
    for (const mobile of [false, true]) {
      test(`${home} anchor highlights without a manual reload on ${mobile ? 'mobile' : 'desktop'}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: mobile ? 390 : 1280, height: 900 })
        await page.goto(home === '/' ? '/en' : '/')
        await page.evaluate(async () => {
          await import(document.querySelector<HTMLScriptElement>('script[type="module"][src]')!.src)
        })
        expect(await page.evaluate(() => 'sourceElement' in NavigateEvent.prototype)).toBe(true)
        const nav = page.locator(mobile ? '.top-nav-mobile' : '.top-nav-desktop')
        if (mobile) await nav.locator(':scope > summary').click()
        await nav.locator('.top-nav-language').click()
        await expect(page).toHaveURL(home === '/' ? /\/$/ : /\/en$/)

        const openGroup = async () => {
          if (mobile && (await nav.getAttribute('open')) === null)
            await nav.locator(':scope > summary').click()
          if ((await nav.locator('.top-nav-group').getAttribute('open')) === null)
            await nav.locator('.top-nav-group > summary').click()
        }
        await openGroup()
        await nav.locator(`a[href="${home}#pricing"]`).click()
        await expect(nav.locator(`a[href="${home}#pricing"]`)).toHaveAttribute(
          'aria-current',
          'location',
        )
        await expect(nav.locator('.top-nav-group > summary')).toHaveAttribute('data-current', '')
        await openGroup()
        await nav.locator(`a[href="${home}#faq"]`).click()
        await expect(nav.locator(`a[href="${home}#faq"]`)).toHaveAttribute(
          'aria-current',
          'location',
        )
        await expect(nav.locator(`a[href="${home}#pricing"]`)).not.toHaveAttribute('aria-current')
        await page.goBack()
        await expect(nav.locator(`a[href="${home}#pricing"]`)).toHaveAttribute(
          'aria-current',
          'location',
        )
        await page.goForward()
        await expect(nav.locator(`a[href="${home}#faq"]`)).toHaveAttribute(
          'aria-current',
          'location',
        )
      })
    }
  }
})

for (const de of [true, false]) {
  test(`blog overview and language switch work in ${de ? 'German' : 'English'}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    const overview = de ? '/zwischen-den-zeilen' : '/en/between-words'
    const translatedOverview = de ? '/en/between-words' : '/zwischen-den-zeilen'
    const newer = de ? '/blog/schreiben-bei-trauer' : '/en/blog/writing-through-grief'
    const older = de
      ? '/blog/bleiben-wenn-du-gehen-moechtest'
      : '/en/blog/how-to-stay-when-you-want-to-run'
    const translatedArticle = de ? '/en/blog/writing-through-grief' : '/blog/schreiben-bei-trauer'
    await page.goto(overview)
    const entries = page.locator('.blog-preview a')
    await expect(entries).toHaveCount(2)
    await expect(entries.nth(0)).toHaveAttribute('href', newer)
    await expect(entries.nth(1)).toHaveAttribute('href', older)
    const nav = page.locator('.top-nav-desktop')
    await expect(nav.locator(`a[href="${overview}"]`)).toHaveAttribute('aria-current', 'page')
    await expect(nav.locator('.top-nav-language')).toHaveAttribute('href', translatedOverview)
    await entries.nth(0).click()
    await expect(nav.locator(`a[href="${overview}"]`)).toHaveAttribute('aria-current', 'true')
    await expect(nav.locator('.top-nav-language')).toHaveAttribute('href', translatedArticle)
    await nav.locator('.top-nav-language').click()
    await expect(page).toHaveURL(new RegExp(translatedArticle + '$'))
    await page.goto(de ? '/' : '/en')
    await expect(entries).toHaveCount(1)
    await expect(entries.first()).toHaveAttribute('href', newer)
    await expect(nav.locator(`a[href="${overview}"]`)).toBeVisible()
  })
}

test('public HTML renders without JavaScript and unknown URLs return 404', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  const response = await page.goto('/fixture')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'Synthetic fixture' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
  expect((await page.goto('/de_old'))?.status()).toBe(404)
  expect((await page.goto('/missing'))?.status()).toBe(404)
  await context.close()
})
test('signup island shows pending, success and recoverable failures', async ({ page }) => {
  let fail = true
  let releaseResponse!: () => void
  const responseGate = new Promise<void>((resolve) => (releaseResponse = resolve))
  await page.route('**/_newsletter/subscribe', async (route) => {
    await responseGate
    await route.fulfill({
      status: fail ? 503 : 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: !fail }),
    })
  })
  await page.goto('/fixture')
  // The entry module awaits app.ready(); native form submission is covered separately.
  await page.evaluate(async () => {
    const entry = document.querySelector<HTMLScriptElement>('script[type="module"][src]')!
    await import(entry.src)
  })
  await page.getByRole('textbox', { name: 'Email' }).fill('reader@example.org')
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Ada')
  await page.getByRole('button', { name: 'Subscribe', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled()
  releaseResponse()
  await expect(page.getByRole('alert')).toContainText('Please try again later')
  fail = false
  await page.getByRole('button', { name: 'Subscribe', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('confirm your subscription')
})
test('old confirmation query activates the matching success content', async ({ page }) => {
  await page.goto('/fixture?newsletterSuccess=fixture-signup#signup-fixture-signup')
  await expect(page.getByRole('status')).toContainText('Subscription confirmed')
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveCount(0)
})

async function openScrollFixture(page: Page) {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.route('**/fixture', async (route) => {
    const response = await route.fetch()
    await route.fulfill({
      response,
      body: (await response.text()).replace(
        '</main>',
        '<div style="height:1200px"></div><div class="prose"><p id="scroll-target" style="height:400px">Scroll reveal</p><p id="later-target" style="height:400px">Later reveal</p></div></main>',
      ),
    })
  })
  await page.goto('/fixture')
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    await import(document.querySelector<HTMLScriptElement>('script[type="module"][src]')!.src)
    await document.fonts.ready
  })
}

test('scroll reveals start hidden offscreen and never hide again after appearing', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await openScrollFixture(page)
  await expect(page.getByRole('heading', { name: 'Synthetic fixture' })).toHaveCSS('opacity', '1')
  const target = page.locator('#scroll-target')
  // This catches the original flash: content was opaque until 5% entered the viewport.
  await expect(target).toHaveCSS('opacity', '0')
  await target.evaluate((element) => {
    scrollTo(0, scrollY + element.getBoundingClientRect().top - innerHeight + 2)
  })
  await expect.poll(() => target.evaluate((e) => e.getAnimations()[0]?.playState)).toBe('running')
  const opacity = await target.evaluate((element) => {
    const animation = element.getAnimations()[0]!
    animation.pause()
    return [0, 100, 300, 600].map((time) => {
      animation.currentTime = time
      return Number(getComputedStyle(element).opacity)
    })
  })
  expect(opacity[0]).toBe(0)
  expect(opacity).toEqual([...opacity].sort((a, b) => a - b))
  expect(opacity.at(-1)).toBeGreaterThan(0.8)
  await target.evaluate((e) => {
    const animation = e.getAnimations()[0]!
    animation.play()
    animation.finish()
  })
  await expect(target).toHaveCSS('opacity', '1')
  await expect.poll(() => target.evaluate((e) => e.getAnimations().length)).toBe(0)
  await page.evaluate(() => scrollTo(0, 0))
  await page.setViewportSize({ width: 390, height: 740 })
  await target.scrollIntoViewIfNeeded()
  await expect(target).toHaveCSS('opacity', '1')
  expect(await target.evaluate((e) => e.getAnimations().length)).toBe(0)
})

test('reduced motion leaves offscreen content visible, including when enabled while browsing', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await openScrollFixture(page)
  await expect(page.locator('#later-target')).toHaveCSS('opacity', '0')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('#later-target')).toHaveCSS('opacity', '1')
  await expect
    .poll(() => page.locator('#later-target').evaluate((e) => e.getAnimations().length))
    .toBe(0)
  await page.reload()
  await expect(page.locator('#later-target')).toHaveCSS('opacity', '1')
})
