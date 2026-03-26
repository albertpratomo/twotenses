import antfu from '@antfu/eslint-config'
import pluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu(
  {
    astro: true,

    stylistic: {
      indent: 2,
      overrides: {
        'style/object-curly-spacing': ['error', 'never'],
      },
    },

    typescript: true,
    vue: true,
  },

  // Vue-specific rule overrides
  {
    files: ['**/*.vue'],
    rules: {
      'vue/attributes-order': ['error', {alphabetical: true}],
      'vue/first-attribute-linebreak': ['error', {
        multiline: 'below',
        singleline: 'beside',
      }],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        multiline: {max: 1},
        singleline: {max: 1},
      }],
      'vue/object-curly-spacing': ['error', 'never'],
      'vue/padding-line-between-tags': [
        'error',
        [{blankLine: 'always', next: '*', prev: '*'}],
      ],
    },
  },

  // Global rules
  {
    rules: {
      'no-multi-spaces': 'error',
      'sort-keys': 'error',
    },
  },

  // Allow process global in config files
  {
    files: ['astro.config.mjs'],
    rules: {
      'node/prefer-global/process': 'off',
    },
  },

  // Allow top-level await in store modules
  {
    files: ['src/store/**/*.ts'],
    rules: {
      'antfu/no-top-level-await': 'off',
    },
  },

  // Ignore thoughts directory
  {
    ignores: ['thoughts/**'],
  },

  // eslint-plugin-better-tailwindcss for Vue files
  {
    files: ['**/*.vue'],
    plugins: {
      'better-tailwindcss': pluginBetterTailwindcss,
    },
    rules: {
      ...pluginBetterTailwindcss.configs['recommended-error'].rules,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/main.css',
      },
    },
  },

  // eslint-plugin-better-tailwindcss for Astro files
  // Disable line-wrapping in .astro — multiline template literals in class attrs break Astro's compiler
  {
    files: ['**/*.astro'],
    plugins: {
      'better-tailwindcss': pluginBetterTailwindcss,
    },
    rules: {
      ...pluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/main.css',
      },
    },
  },
)
