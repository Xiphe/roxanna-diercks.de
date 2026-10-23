import type { SignupConfig } from '../contracts/content.ts'

export const signups = {
  '69ea327185c6566c2565f1a4': {
    id: '69ea327185c6566c2565f1a4',
    path: '/en',
    locale: 'en',
    listId: 3,
    templateId: 6,
    fields: [],
  },
  '69eb620cc2351c738f9206eb': {
    id: '69eb620cc2351c738f9206eb',
    path: '/blog/schreiben-bei-trauer',
    locale: 'de',
    listId: 9,
    templateId: 6,
    fields: ['name'],
  },
  '6961281bc8c9380004f93ef1': {
    id: '6961281bc8c9380004f93ef1',
    path: '/en/pet-loss-support',
    locale: 'en',
    listId: 6,
    templateId: 6,
    fields: ['name'],
  },
  '69ea331e2850143e8ec7d86d': {
    id: '69ea331e2850143e8ec7d86d',
    path: '/',
    locale: 'de',
    listId: 9,
    templateId: 6,
    fields: [],
  },
  '695ae5f0025edb85baaaf8b6': {
    id: '695ae5f0025edb85baaaf8b6',
    path: '/en/between-words',
    locale: 'en',
    listId: 3,
    templateId: 6,
    fields: ['name'],
  },
} satisfies Record<string, SignupConfig>
