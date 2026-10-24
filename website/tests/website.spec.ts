import { expect, test, type Page } from '@playwright/test'

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
