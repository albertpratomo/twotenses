# Upgrade ESLint & Linting Experience Implementation Plan

## Overview

Upgrade the entire linting stack from ESLint 8 (legacy config) to ESLint 10 (flat config), update `@antfu/eslint-config` from v0.38 to v7, add `eslint-plugin-better-tailwindcss` for Tailwind class linting in Vue and Astro files, and configure indentation fixing for `.astro` and `.vue` files.

## Current State Analysis

- **ESLint**: v8.39.0 with legacy `.eslintrc.cjs`
- **@antfu/eslint-config**: v0.38.5 (extends `@antfu` in legacy format)
- **@typescript-eslint/parser**: v5.59.0
- **eslint-plugin-astro**: v0.26.1
- **Config format**: `.eslintrc.cjs` (CommonJS, legacy)
- **Indentation**: 4 spaces everywhere
- **Lint scripts**: `eslint . --ext .astro` (uses removed `--ext` flag)

### Key Discoveries:
- `.eslintrc.cjs:1` — sets `ESLINT_TSCONFIG` env var (not needed with new antfu config)
- `.eslintrc.cjs:9-17` — manual Astro parser override (handled automatically by antfu v7)
- `.eslintrc.cjs:19-40` — custom rules for indentation, semicolons, spacing, Vue attributes
- `package.json:9` — `lint` script uses `--ext .astro` which is removed in ESLint 10
- No Prettier in the project — formatting is ESLint-only

## Desired End State

- ESLint v10.1.0 with flat config (`eslint.config.js`)
- `@antfu/eslint-config` v7.7.3 with `stylistic`, `vue`, and `astro` enabled
- `eslint-plugin-better-tailwindcss` v4.3.2 linting Tailwind classes in `.vue` and `.astro`
- 2-space indentation across all file types
- All existing Vue formatting rules preserved
- `sort-keys` rule preserved
- Lint scripts work without `--ext` flag

### Verification:
```bash
pnpm lint       # runs clean or with only tailwind warnings on existing code
pnpm lint:fix   # auto-fixes indentation and formatting
```

## What We're NOT Doing

- Not adding Prettier — continuing ESLint-only formatting
- Not changing any source code in this plan (lint fixes will be a separate step)
- Not adding `eslint-plugin-format` / dprint (start with antfu's built-in stylistic; revisit if Astro indentation has issues)
- Not changing TypeScript config or Astro config

## Implementation Approach

Single-phase migration: delete legacy config, create flat config, update all dependencies, update scripts. This is cleanest because the old config format is completely incompatible with ESLint 10.

---

## Phase 1: Dependency Updates

### Overview
Update all ESLint-related packages to ESLint 10-compatible versions and add `eslint-plugin-better-tailwindcss`.

### Changes Required:

#### 1. Update `package.json` devDependencies

**File**: `package.json`

Remove:
- `@antfu/eslint-config` `^0.38.5`
- `@typescript-eslint/parser` `^5.59.0` (bundled in antfu v7)
- `eslint` `^8.39.0`
- `eslint-plugin-astro` `^0.26.1` (bundled in antfu v7)

Add/update:
```json
{
  "devDependencies": {
    "@antfu/eslint-config": "^7.7.3",
    "eslint": "^10.1.0",
    "eslint-plugin-better-tailwindcss": "^4.3.2",
    "typescript": "^5.9.3"
  }
}
```

Note: `@antfu/eslint-config` v7 internally depends on `eslint-plugin-astro`, `eslint-plugin-vue`, `@typescript-eslint/*`, `astro-eslint-parser`, and `vue-eslint-parser` — no need to declare them separately.

#### 2. Update lint scripts in `package.json`

**File**: `package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

The `--ext` flag is removed in ESLint 10. File matching is handled by the flat config's `files` patterns.

### Success Criteria:

#### Automated Verification:
- [ ] `pnpm install` completes without errors
- [ ] `node -e "require('eslint/package.json').version"` returns 10.x
- [ ] No peer dependency warnings for ESLint-related packages

---

## Phase 2: Migrate Config to Flat Format

### Overview
Replace `.eslintrc.cjs` with `eslint.config.js` using `@antfu/eslint-config` v7's API, preserving all existing rules.

### Changes Required:

#### 1. Delete legacy config
**File**: `.eslintrc.cjs` — **DELETE**

#### 2. Create flat config
**File**: `eslint.config.js` — **CREATE**

```js
import antfu from '@antfu/eslint-config';
import pluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

export default antfu(
  {
    astro: true,
    vue: true,
    typescript: true,

    stylistic: {
      indent: 2,
      semi: true,
      overrides: {
        'style/object-curly-spacing': ['error', 'never'],
      },
    },
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
  {
    files: ['**/*.astro'],
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
);
```

### Key mapping from old config to new:

| Old (`.eslintrc.cjs`) | New (`eslint.config.js`) |
|---|---|
| `extends: ['@antfu']` | `antfu({ ... })` |
| `extends: ['plugin:astro/recommended']` | `astro: true` |
| `process.env.ESLINT_TSCONFIG` | `typescript: true` (auto-detected) |
| `overrides[].parser: 'astro-eslint-parser'` | Handled by `astro: true` |
| `@typescript-eslint/indent: ['error', 4]` | `stylistic: { indent: 2 }` |
| `@typescript-eslint/semi: ['error', 'always']` | `stylistic: { semi: true }` |
| `@typescript-eslint/object-curly-spacing` | `stylistic.overrides['style/object-curly-spacing']` |
| `vue/html-indent: ['error', 4]` | `vue/html-indent: ['error', 2]` |

### Success Criteria:

#### Automated Verification:
- [ ] `.eslintrc.cjs` is deleted
- [ ] `eslint.config.js` exists
- [ ] `pnpm lint` runs without config errors (rules may report violations — that's expected)
- [ ] `pnpm lint:fix` auto-fixes indentation in `.vue` and `.astro` files

#### Manual Verification:
- [ ] Open a `.vue` file, run lint:fix, verify 2-space indentation is applied
- [ ] Open an `.astro` file, run lint:fix, verify 2-space indentation is applied
- [ ] Tailwind class violations are reported in both `.vue` and `.astro` files
- [ ] No false positive lint errors from the new config

---

## Phase 3: Run Lint Fix and Verify

### Overview
Apply auto-fixes across the codebase and verify everything works.

### Steps:

1. Run `pnpm lint:fix` to auto-fix all fixable issues (indentation, formatting)
2. Run `pnpm lint` to see remaining violations
3. Run `pnpm build` to ensure no build regressions
4. Run `pnpm typecheck` to ensure no type regressions

### Success Criteria:

#### Automated Verification:
- [ ] `pnpm lint:fix` completes without errors
- [ ] `pnpm lint` reports zero errors (or only intentional `better-tailwindcss` violations that need manual attention)
- [ ] `pnpm build` succeeds
- [ ] `pnpm typecheck` passes

#### Manual Verification:
- [ ] Diff of auto-fixed files looks correct (only indentation/formatting changes, no logic changes)
- [ ] Dev server runs and pages render correctly
- [ ] Tailwind classes are being validated by the plugin

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation that the site still works correctly before committing.

---

## Testing Strategy

### Automated:
- `pnpm lint` — all lint rules pass
- `pnpm build` — build succeeds
- `pnpm typecheck` — types check out

### Manual:
1. Run `pnpm dev` and navigate the site
2. Check that no visual regressions occurred from formatting changes
3. Verify VS Code ESLint extension picks up the new flat config
4. Test that save-on-fix works in the editor for `.vue` and `.astro` files

## Risk Mitigation

- **Astro indentation issues**: If `eslint-stylistic` doesn't handle Astro indentation well (known issue), we can add `eslint-plugin-format` with dprint as a follow-up
- **better-tailwindcss false positives**: If the plugin reports too many false positives on custom utilities (e.g., `container-fluid`, `px-container`), we can configure `classAttributes` or add rule-level overrides
- **Build breakage**: The lint fix only changes whitespace/formatting, so build breakage is unlikely but we verify with `pnpm build`

## References

- [ESLint v10 migration guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0)
- [@antfu/eslint-config v7 docs](https://github.com/antfu/eslint-config)
- [eslint-plugin-better-tailwindcss docs](https://github.com/schoero/eslint-plugin-better-tailwindcss)
- [eslint-stylistic Astro indent issue #259](https://github.com/eslint-stylistic/eslint-stylistic/issues/259)
