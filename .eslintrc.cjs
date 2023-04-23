process.env.ESLINT_TSCONFIG = 'tsconfig.json';

/** @type {import('eslint').ESLint.ConfigData}  */
module.exports = {
    extends: [
        '@antfu',
        'plugin:astro/recommended',
        'plugin:tailwindcss/recommended',
    ],
    overrides: [
        {
            files: ['*.astro'],
            parser: 'astro-eslint-parser',
            parserOptions: {
                extraFileExtensions: ['.astro'],
                parser: '@typescript-eslint/parser',
            },
        },
    ],
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/object-curly-spacing': ['error', 'never'],
        '@typescript-eslint/semi': ['error', 'always'],
        'no-multi-spaces': 'error',
        'sort-keys': 'error',

        'vue/attributes-order': ['error', {alphabetical: true}],
        'vue/first-attribute-linebreak': ['error', {
            multiline: 'below',
            singleline: 'beside',
        }],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ['error', {
            multiline: {max: 1},
            singleline: {max: 1},
        }],
        'vue/padding-line-between-tags': [
            'error',
            [{blankLine: 'always', next: '*', prev: '*'}],
        ],
    },
    settings: {
        tailwindcss: {
            config: 'tailwind.config.cjs',
        },
    },
};
