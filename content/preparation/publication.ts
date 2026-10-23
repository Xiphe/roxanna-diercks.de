import { CMX_DOCUMENT_SCHEMA, CMX_DOCUMENT_VERSION, type CmxDocument } from '@cmx-tools/contracts'
import { readFile, writeFile } from 'node:fs/promises'
import { routes } from '../routes.ts'
import { colors } from '../colors.ts'
import { navigation } from '../navigation.ts'
import { signups } from '../signups.ts'
import { site } from '../site.ts'
import {
  siteEntry,
  validatePublication,
  type PublishedDocuments,
  type SiteMetadata,
} from '../../contracts/content.ts'
const documents: PublishedDocuments = {}
for (const key of ['404', ...routes.map((r) => r.document)])
  documents[key] = JSON.parse(await readFile('.cmx/documents/' + key + '.json', 'utf8'))
documents[siteEntry] = {
  $schema: CMX_DOCUMENT_SCHEMA,
  cmxVersion: CMX_DOCUMENT_VERSION,
  interface: { imports: {}, exports: { site: {} } },
  content: {
    site: {
      version: 1,
      ...site,
      routes,
      colors,
      navigation,
      signups,
      media: JSON.parse(await readFile('.generated/media.json', 'utf8')),
      redirects: [],
    } satisfies SiteMetadata,
  },
} satisfies CmxDocument
validatePublication(documents)
await writeFile('.generated/publication.json', JSON.stringify(documents) + '\n')
console.log(`Prepared ${Object.keys(documents).length} CMX documents.`)
