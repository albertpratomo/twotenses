# Twotenses

Twotenses is a creative/design agency website built with Astro, Vue 3, and Tailwind CSS v4. Content is managed via Storyblok CMS. Deployed on Vercel with optional SSR.

## Figma-to-Code Workflow

This project converts Figma designs into Astro (.astro) or Vue (.vue) components styled with Tailwind CSS.

### Design Tokens

All design tokens are defined in `src/styles/main.css`. When converting Figma designs, use the project's existing Tailwind theme tokens instead of raw hex values:

- **Colors:** `black` (#1D1D16), `gray-light` (#E3E3E3), `gray` (#CBCBCB), `gray-dark` (#B1B1B1), `red` (#9B3629), `white` (#F4F4F4)
- **Font:** `font-sans` (Work Sans)
- **Breakpoints:** standard Tailwind + `3xl` (1920px)
- **Custom cursors:** `cursor-arrow-left`, `cursor-arrow-right`

### Custom Utilities

Use these project-specific utilities from `main.css` instead of writing equivalent classes:

- `container-fluid` — max-width at 3xl + mx-auto
- `flex-center` — flex + items-center + justify-center
- `inset-center`, `inset-x-center`, `inset-y-center` — absolute centering
- `px-container` — responsive horizontal padding (px-4 / md:px-8 / xl:px-14)
- `uppercase-wide` — uppercase + tracking-wider
- `skeleton` — loading placeholder

### Rules

- Always use Tailwind classes referencing the theme tokens (e.g., `text-red`, `bg-black`, `text-white`) — never hardcode hex values.
- Use the Figma MCP tools (`get_design_context`, `get_screenshot`) to inspect designs.
- Adapt Figma output to the project's existing components, layout patterns, and tokens.
- Prefer Astro components (.astro) for static content, Vue components (.vue) for interactive content.
