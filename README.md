# roxanna-diercks.de

Roxanna's German and English website, authored in typed CMX and rendered by Remix 3 on Cloudflare Workers. The former Jekyll site is preserved on the `pages` branch.

```sh
git lfs install
git lfs pull
npm ci
npx playwright install --with-deps --only-shell chromium
npm run build
npm run check
npm run dev
```

The development server listens on port 8791. From your computer:

```sh
sand tunnel 8791
sand code /workspace/roxanna-diercks.de
```

Edit pages under `content/pages/`; layout components are typed by `contracts/components/` and implemented in `website/app/ui-library/`. Content and media preparation live under `content/`. Images are prepared as responsive WebP variants; SVGs and video retain their original formats. Source media is stored with Git LFS.

GitHub Actions uses the lowercase `production` environment. Website-only changes deploy the Worker; content-only changes prepare media and publish a signed CMX collection without deploying website code. Shared contract changes run both jobs in order. Existing immutable media objects are skipped on upload.

Environment secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `CMX_PUBLISH_PRIVATE_KEY`, `BREVO_API_KEY`. Environment variables: `CMX_PUBLISH_KEY_ID`, `CMX_PUBLISH_PUBLIC_KEYS`, `R2_ACCOUNT_ID`, `SITE_URL`. The restricted Brevo key needs **Contacts: All** and **Transactional email: All**. A Contacts-only key passed the empty-body DOI validation probe but rejected real delivery with HTTP 403; adding Transactional email access made the signup succeed. CI checks template read access without sending mail; a real confirmation remains an acceptance check. Provisioning credentials remain in gopass; `node content/publishing/configure.ts` configures the environment without printing secret values.

The initial `SITE_URL` targets the Workers preview. Production cutover requires acceptance of that preview. See [migration decisions](docs/migration.md) and [publication architecture](docs/adr/0001-independent-content-publication.md).
