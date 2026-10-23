import { createWorker } from '../app/worker.ts'
import { createContentSource } from '../app/document-host/index.ts'
import { documents } from './fixture.ts'
export { ContentState, SignupLimits } from '../app/worker.ts'
const worker = createWorker({ source: createContentSource(documents, 'fixture') })
export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname === '/_test/seed-media') {
      await env.MEDIA.put('video-fixture.mp4', 'abcdefghij', {
        httpMetadata: { contentType: 'video/mp4' },
      })
      return new Response('Seeded')
    }
    return worker.fetch!(request, env, ctx)
  },
} satisfies ExportedHandler<Env>
