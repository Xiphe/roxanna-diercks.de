import type { CmxConfig } from '@cmx-tools/contracts'
import config from '../contracts/cmx.ts'

export default {
  ...config,
  externals: [
    {
      contract: '@roxanna/content-components',
      implementation: { '.': '../website/app/ui-library/components.ts' },
    },
  ],
} satisfies CmxConfig
