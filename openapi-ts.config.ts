import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: '../../ssm/ssm-be/docs/openapi-spec.order-company.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client',
  },
  plugins: [
    '@hey-api/client-axios',
    '@hey-api/schemas',
    {
      name: '@hey-api/sdk',
      asClass: true,
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
  ],
})
