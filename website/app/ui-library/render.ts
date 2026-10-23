import type { CmxDocument, CmxNode } from '@cmx-tools/contracts'
import { cmx } from '@cmx-tools/remix'
import { environment } from '../../../.cmx/environment.ts'

export function renderContent(document: CmxDocument) {
  const page = cmx<{ title: CmxNode; default: CmxNode }>(document, environment)
  if (typeof page.title !== 'string') throw new Error('CMX page title must be a string')
  return { title: page.title, body: page.default }
}
