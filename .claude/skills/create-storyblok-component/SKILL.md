---
name: create-storyblok-component
description: Creates a Storyblok CMS block and its matching Astro component for the Twotenses project from a design screenshot. Use when the user wants to add a new Storyblok section or component block with images, provides a design, and needs both the CMS schema and the Astro implementation.
compatibility: Designed for Claude Code in the Twotenses project. Requires curl and python3.
metadata:
  author: twotenses
  version: "1.0"
allowed-tools: Read Bash Write Edit Glob Grep
---

# Create Storyblok Component

Creates a Storyblok block and Astro component from a design for the Twotenses project.

## Inputs

The user provides:
1. **Component name** — PascalCase (e.g. `TwoImagesLeftTopRightBottom`)
2. **Design screenshots** — desktop and mobile layouts
3. **Notes** — constraints, spacing, special behavior

## Project constants

- Space ID: `210339`
- API token: read from `.mcp.json` → `mcpServers.Storyblok.headers.Authorization`, strip `"Bearer "`
- Sections folder UUID: `6fc22546-b824-4e09-874b-42442d1eb7ed`
- Components folder UUID: `8ec45af0-83cc-4d07-8a79-00a617cc53a7`
- Imports: `getSrcset` and `below` from `@/utils`

## Standard schema rules

Every component must include these two things, always:

- **`hide`** boolean field at the last `pos` of `schema`:
  ```json
  "hide": {"type": "boolean", "default_value": false, "display_name": "Hide", "inline_label": true, "pos": <last>}
  ```
- **`preview_tmpl`** on the component set to:
  ```
  {{it.hide ? '🙈 ' : ''}}
  ```
  This renders the 🙈 monkey emoji in the Storyblok sidebar when the editor toggles `hide` on.

`hide` is an editor-only convention — **do NOT destructure it from `Astro.props`, and do NOT wrap the template in `{!hide && (...)}`**. The `.astro` file ignores it.

## Grid & image sizing

Grid is `grid-cols-12 gap-x-4` (16px gaps) inside `container-fluid px-container`.

**Padding:** `px-4` (32px total) mobile · `md:px-8` (64px) tablet · `xl:px-14` (112px) desktop

**Formula:**
```
col_width = (viewport − padding − 11 × 16) / 12
image_px  = col_span × col_width + (col_span − 1) × 16
```

**Pre-computed col_width:**
| Source | Viewport | Padding | col_width |
|---|---|---|---|
| `below.sm` (≤639px) | 639 | 32 | 35.9px |
| `below.lg` (≤1023px) | 1023 | 64 | 65.25px |
| `<img>` fallback (3xl) | 1920 | 112 | 143.5px |

Round to whole numbers. Derive heights from the visual aspect ratio in the design. Always pass explicit height to `getSrcset` — never 0. `getSrcset(image, W, H)` generates `W×H` (1x) and `2W×2H` (2x retina) via the Storyblok CDN.

## Astro component skeleton

Always follow this exact structure:

```astro
---
import {storyblokEditable} from '@storyblok/astro'
import {below, getSrcset} from '@/utils'

const {blok, image1, image2, projectName} = Astro.props;
---

<section
  {...storyblokEditable(blok)}
  class="bg-gray py-4 md:py-12 lg:py-20"
>
  <div class="container-fluid px-container">
    <div class="[layout classes] grid grid-cols-12 gap-x-4">

      <div class="[column classes]">
        <picture>
          <source media={below.sm} srcset={getSrcset(imageN, W, H)} width="W" height="H" />
          <source media={below.lg} srcset={getSrcset(imageN, W, H)} width="W" height="H" />
          <img
            alt={imageN.alt || projectName}
            loading="lazy"
            class="w-full skeleton"
            srcset={getSrcset(imageN, W, H)}
            title={imageN.title || projectName}
            width="W"
            height="H"
          />
        </picture>
      </div>

    </div>
  </div>
</section>
```

- `py-4 md:py-12 lg:py-20` — always use this vertical padding (same as `TwoImage.astro`)
- Add `below.md` source only when layout changes at `md` breakpoint
- `<img>` fallback targets 3xl (1920px)

## Process

### Step 1 — Analyze design

From the screenshots identify:
- Image fields: name them `image1`, `image2`, etc.
- Column spans per breakpoint
- Aspect ratio of each image (visual inspection)
- Vertical stagger, alignment (`items-end`, `pb-*`, `mt-*`)
- Folder: Sections (page-level layout blocks) vs Components (reusable sub-blocks)

### Step 2 — Calculate image dimensions

Apply the formula above for every `<source>` and `<img>`. Show your work before writing code.

### Step 3 — Present plan (DO NOT execute yet)

Present:
1. Storyblok schema (fields, types, required, folder)
2. Full Astro component with all calculated dimensions
3. `astro.config.mjs` line to add

Wait for explicit approval.

### Step 4 — Execute (run all three in parallel)

**4a. Create Storyblok block**

Payload must include `preview_tmpl: "{{it.hide ? '🙈 ' : ''}}"` and a `hide` boolean at the end of `schema` (see "Standard schema rules").

```bash
curl -s -X POST "https://mapi.storyblok.com/v1/spaces/210339/components" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{ "component": { ... } }' | python3 -m json.tool
```

**4b. Write `src/storyblok/<ComponentName>.astro`** — follow the skeleton exactly.

**4c. Register in `astro.config.mjs`** — add to `components` map in alphabetical order:
```js
<ComponentName>: 'storyblok/<ComponentName>',
```

### Step 5 — Report

- [ ] Storyblok block created (show ID)
- [ ] `src/storyblok/<ComponentName>.astro` written
- [ ] `astro.config.mjs` updated
