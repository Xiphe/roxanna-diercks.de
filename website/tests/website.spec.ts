import { expect, test } from '@playwright/test'

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
