import { createConfig, vueRules, vueExtends, vuePlugins } from '@kgabryel-dev/code-quality/eslint/VueConfigBuilder';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { vueOrderConfig } from './vueOrder.config.js';

const config = createConfig()
  .useTsConfig('./tsconfig.eslint.json')
  .setRules(vueRules)
  .setExtends(vueExtends)
  .setPlugins(vuePlugins(vueOrderConfig))
  .setLanguageOptions({
    globals: {
      ...globals.browser,
    },
    parserOptions: {
      extraFileExtensions: ['.vue'],
      parser: tseslint.parser,
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  })
  .addOverride({
    files: ['src/composables/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  })
  .addOverride({
    files: ['src/store/*.ts'],
    rules: {
      '@typescript-eslint/typedef': ['error', { variableDeclaration: false }],
    },
  })
  .addOverride({
    files: ['src/router/**/*.ts'],
    rules: {
      '@typescript-eslint/typedef': 'off',
    },
  })
  .addOverride({
    files: ['src/api/schema.d.ts'],
    rules: {
      'max-lines': 'off',
    },
  })
  .addOverride({
    files: [
      'src/api/*.ts',
      'src/config/*.ts',
      'src/main.ts',
      'src/models/**/*.ts',
      'src/plugins/*.ts',
      'src/router/**/*.ts',
      'src/store/index.ts',
      'src/services/axios.interceptor.ts',
    ],
    rules: {
      'vue-order/vue-order': 'off',
    },
  });

export default config.get();
