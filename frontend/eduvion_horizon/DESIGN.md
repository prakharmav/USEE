# Design System Specification: The Intelligent Voyager

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Digital Curator."** In an era of information overload for international students, this system acts as a sophisticated, calm, and authoritative guide. 

We move beyond the "standard SaaS" look by rejecting rigid, boxed-in layouts in favor of **Organic Editorialism.** The experience should feel like a premium digital publication—utilizing intentional asymmetry, significant breathing room, and overlapping elements to suggest a journey that is both high-tech and deeply human. By leveraging tonal depth over structural lines, we create an interface that doesn't just display information but "holds" it with grace.

## 2. Color & Surface Philosophy
The palette balances the deep, academic weight of `primary` (#002045) with the energetic, tech-forward spark of `secondary` (#006b5f). 

### The "No-Line" Rule
To achieve a premium, custom feel, **1px solid borders are strictly prohibited for sectioning.** We define boundaries through background color shifts. Use `surface_container_low` for secondary content areas sitting on a `surface` background. The eye should perceive change through value, not outlines.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of frosted glass and fine vellum.
- **Level 0 (Foundation):** Use `surface` (#faf9fd) for the overall page background.
- **Level 1 (Nesting):** Use `surface_container_low` (#f4f3f7) for large content blocks.
- **Level 2 (Interaction):** Use `surface_container_lowest` (#ffffff) for cards and active elements to create a "lifted" effect.

### The Glass & Gradient Rule
To evoke "Intelligence" and "Innovation," apply Glassmorphism to floating navigation or modal overlays. 
- **Effect:** 60% opacity of `surface_container_lowest` with a 20px backdrop-blur. 
- **Signature Gradients:** For primary CTAs and Hero accents, use a subtle linear gradient from `primary` (#002045) to `primary_container` (#043669) at a 135-degree angle. This adds "soul" and prevents the deep navy from feeling flat or dated.

## 3. Typography: Editorial Authority
We utilize a dual-font strategy to balance character with utility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern warmth. Use `display-lg` and `headline-lg` with tight letter-spacing (-2%) to create an authoritative, editorial impact.
*   **Body & Labels (Inter):** The workhorse. Inter provides exceptional legibility at scale. Use `body-md` for the bulk of student information to ensure zero cognitive friction.

**The Metric Rule:** For key statistics (e.g., acceptance rates, visa success), use `display-md` in `primary` color. These are the "hero moments" of our data—they should be bold, high-contrast, and impossible to miss.

## 4. Elevation & Depth: Tonal Layering
We reject "standard" drop shadows. Depth is an atmospheric quality, not a structural one.

*   **The Layering Principle:** Instead of shadows, stack `surface_container` tiers. A `surface_container_highest` header sitting on a `surface_dim` background provides all the hierarchy needed.
*   **Ambient Shadows:** Where floating is required (e.g., a "Quick Apply" FAB), use a custom shadow: `Y: 12px, Blur: 32px, Color: rgba(26, 28, 30, 0.06)`. This mimics soft, natural light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` (#c4c6cf) at **15% opacity**. It should be felt, not seen.

## 5. Components & Interaction

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `xl` (1.5rem) roundedness. No border. Text in `on_primary`.
- **Secondary:** Surface-based. `surface_container_highest` background with `on_surface` text. This feels integrated, not "pasted on."
- **Tertiary:** Pure text in `secondary` (#006b5f) with a `sm` (0.25rem) bottom-indicator on hover.

### Cards & Information Architecture
- **Rule:** Forbid divider lines. 
- **Execution:** Separate "Program Details" from "University Info" using a 32px vertical gap or by nesting the University Info inside a `surface_container_low` sub-block.
- **Roundedness:** All cards must use `lg` (1rem) or `xl` (1.5rem) corners to maintain the "Supportive" brand personality.

### AI Intelligence Chips
- Use `secondary_container` (#76f4e0) with `on_secondary_container` (#006f63) text. These should feel like "glowing" highlights of intelligence within the navy/white layout.

### Input Fields
- **State:** Default state uses `surface_container_high` background.
- **Active State:** Transitions to `surface_container_lowest` with a 1px "Ghost Border" of `primary` at 20% opacity. This creates a "focusing in" effect.

## 6. Do’s and Don’ts

### Do:
- **Do** use asymmetrical imagery placement. Let student photos break the grid and overlap background shapes.
- **Do** use `secondary` (Teal) as a "whisper" of AI presence—small pips, active states, and success icons.
- **Do** prioritize `primary_fixed_dim` for "read-only" or "archived" academic data to maintain a sophisticated blue-wash throughout the UI.

### Don’t:
- **Don’t** use pure black (#000000). Always use `on_surface` (#1a1c1e) for text to maintain a high-end, softened contrast.
- **Don’t** use the `DEFAULT` (0.5rem) roundedness for large containers; it looks like a generic template. Stick to `lg` or `xl`.
- **Don’t** use "alert red" for non-critical errors. Use `error_container` with `on_error_container` to keep the experience supportive rather than alarming.