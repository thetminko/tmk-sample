import nx from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended';
import sonar from 'eslint-plugin-sonarjs';
import security from 'eslint-plugin-security';
import pluginRouter from '@tanstack/eslint-plugin-router';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/react'],
  ...pluginRouter.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
  sonar.configs.recommended,
  security.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['**/dist', '**/build', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: ['scope:core', 'scope:app']
            },
            {
              sourceTag: 'type:shared',
              onlyDependOnLibsWithTags: ['type:shared']
            },
            {
              sourceTag: 'type:backend',
              onlyDependOnLibsWithTags: ['type:backend', 'type:shared']
            },
            {
              sourceTag: 'type:web',
              onlyDependOnLibsWithTags: ['type:web', 'type:shared']
            }
          ]
        }
      ]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {}
  }
];
