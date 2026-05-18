## Task: LayerCharacterRocks.jsx — Dark Foreground Rocks Overlay
- Added `brightness-50` to the img element to darken the mountain image significantly
- Added an absolutely-positioned gradient overlay (`bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none`) so the image reads as dark foreground rocks, not a lit mountain
- The overlay is a sibling of the img inside the same container — GSAP animates the img with yPercent:50, while the overlay stays fixed relative to the container, creating a consistent rock silhouette occlusion effect
- GSAP animation, z-index, trigger, and cleanup left untouched

## FloatingNav Component - Task 13

- Created `src/components/FloatingNav.jsx` — clean floating navigation for ParallaxScene
- Positioned `absolute top-0 left-0 right-0 z-40` inside the parallax container
- Uses `pointer-events-auto` to be clickable within ParallaxBackground's `pointer-events-none`
- Logo: `Vector1.svg` (triangle, 31x53 viewBox) rendered at w-6 h-6
- 4 nav buttons: Inicio, Sobre mi, Mis trabajos, Contacto — `<button>` elements (onClick in Task 14)
- Language button: `Boton-translate.svg` (pill shape with "EN" text, 80x45 viewBox) at w-8 h-8
- All text white, `font-['ITC_Avant_Garde_Gothic_Std']`, tracking-wide
- Hover effect: `hover:opacity-70 transition-opacity`
- Pure Tailwind, no Locofy classes, no inline styles
- No imports needed — pure component, no state, no effects

## Task 4: LayerCharacterRocks.jsx
- Created src/components/ParallaxScene/LayerCharacterRocks.jsx following LayerFarMountain pattern
- z-index: 30 (highest layer, over PORTFOLIO text at z-20)
- yPercent: 50 (fastest parallax speed, enables oclusion effect)
- scrub: 1 (faster response than 1.5 used in other layers)
- Asset: /images/montana-parallax@2x.png`n- Oclusion mechanism: Character moves up faster (yPercent=50) than PORTFOLIO text (yPercent=30), revealing letters progressively on scroll

## Task 5: TrabajosPage.jsx
- Replaced placeholder at `src/pages/TrabajosPage.jsx` with full portfolio grid page
- Uses `react-router-dom` `Link` for "Volver" navigation (no `<a>` tag, no reload)
- Header: logo (`Vector1.svg`) right, "Volver" with SVG chevron left
- Title: "Mis Trabajos" at text-[80px] md:text-[120px] in Surgena font, text-icon-color
- Grid: 18 projects (`1.png`–`18.png`), `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap-6
- Cards: rounded-[24px], aspect-[4/3], `object-cover` images with hover scale-105 and dark overlay
- Footer: border-t white/10, copyright line with dynamic year and credit text
- Consistent dark theme (`bg-[#010101]`), ITC Avant Garde for body text
- Build verified: 45 modules, 0 errors

## Task: Clean App.css
- No files imported App.css — safe to delete
- Migrate

## 2026-05-15: AboutSection.jsx - Apple-style glassmorphism card

- Replaced `bg-[rgba(217,217,217,0.12)] backdrop-blur-md border border-white/20` with `bg-neutral-950/40 backdrop-blur-xl border border-white/10 shadow-2xl` for a darker, more premium Apple-style glass effect.
- Tailwind v4 fully supports `backdrop-blur-xl`, `shadow-2xl`, and `bg-neutral-950/40` — no custom CSS needed.
- Change is purely visual; no layout, content, or structural modifications.
- Build passes cleanly after the styling change.d to index.css: custom scrollbar styles (::-webkit-scrollbar) and html { scroll-behavior: smooth }
- Skipped: :root variables (duplicate), * box-sizing (Tailwind), body styles (duplicate), .portfolio-container (unused), mobile media query (desktop-only)
- Build passes: 61 modules, 0 errors

## Task: LayerBrunoPhoto.jsx — Bruno's photo parallax layer

- Created `src/components/ParallaxScene/LayerBrunoPhoto.jsx` — new layer for Bruno's photo at z-index 15
- Positioned between LayerFarMountain (z-10) and LayerPortfolioText (z-20)
- Asset: `/images/Foto mía.png`, constrained to `max-w-[526px]`, centered via flexbox
- GSAP: `yPercent: 25`, `scrub: 1.5` — slower parallax than foreground rocks (yPercent: 50)
- Container: `absolute inset-0 w-full h-full flex items-center justify-center`
- Exported from `src/components/ParallaxScene/index.js` as `LayerBrunoPhoto`
- Imported and rendered in `PortfolioPage.jsx` between LayerFarMountain and LayerPortfolioText
- Build verified: 60 modules, 0 errors

## Task 13 - FloatingAboutCard.jsx

- Created `src/components/FloatingAboutCard.jsx` — standalone glassmorphism card component.
- Uses the exact same styling pattern as Desktop1.jsx's "Sobre mí..." card.
- Key classes: `absolute bottom-12 right-12 z-40`, glassmorphism via `bg-[rgba(217,217,217,0.15)] backdrop-blur-md border border-[rgba(217,217,217,0.25)]`.
- Uses `text-icon-color` design token (defined in `index.css` as `--color-icon-color: #fff` in `@theme` block — Tailwind v4 convention).
- Hover state: `hover:bg-[rgba(217,217,217,0.25)] transition-all duration-300`.
- No onClick handler yet (will be added in Task 14 for About section navigation).
- Component is pure Tailwind, no external CSS impor

## Tasks 8-9 - Wave 2 Floating+Glassmorphism (2026-05-15)
- FloatingAboutCard: GSAP fromTo opacity 0→1, y 50→0, trigger: "#parallax-scene", start: "top 60%", end: "top 10%", scrub: 1. Starts with pointer-events:none.
- AboutSection: glassmorphism applied (bg-neutral-950/40, backdrop-blur-xl, border-white/10, shadow-2xl)

## Tasks 5-10 - Parallel Wave 1-2 (2026-05-15)
- LayerBackground: src changed to /images/BG 2.png ✓
- LayerCharacterRocks: brightness-50 + dark gradient overlay for foreground rock effect ✓
- LayerBrunoPhoto: new layer at z-index 15, yPercent:25, center-aligned ✓
- ClockIndicator: new component at bottom-8 left-8 z-50, HH:MM format ✓
- App.css: deleted, scrollbar migrated to index.css, scroll-behavior: smooth preserved ✓
- Build: 61 modules, 0 errors ✓

## Task 4 - GSAP ScrollTrigger Fix (2026-05-15)
- ParallaxScene.jsx: added `id="parallax-scene"` to container div for use as trigger target
- ParallaxScene.jsx: pin trigger saved as `pinTrigger`, cleanup does `pinTrigger.kill()` only
- All layers: changed `trigger: document.body` → `trigger: "#parallax-scene"`
- All layers: removed `gsap.registerPlugin(ScrollTrigger)` (redundant, only needed in ParallaxScene)
- All layers: saved tween ref and kill only `tween.scrollTrigger?.kill()` instead of `ScrollTrigger.getAll().forEach(kill)`
- LayerBackground: added GSAP animation (yPercent:5, trigger: "#parallax-scene") — was previously static
- Pattern: `const tween = gsap.to(...)` → `return () => tween.scrollTrigger?.kill()`t

## Task: GSAP ScrollTrigger Fix Across All Layers

- **ParallaxScene.jsx**: Added `id="parallax-scene"` to container div. Pin trigger now saved as `pinTrigger` variable, cleanup kills only `pinTrigger.kill()` instead of `ScrollTrigger.getAll().forEach(kill)`.
- **LayerFarMountain.jsx**: Removed `gsap.registerPlugin(ScrollTrigger)`. Changed `trigger: document.body` → `trigger: "#parallax-scene"`. Tween saved as `const tween`, cleanup uses `tween.scrollTrigger?.kill()`.
- **LayerPortfolioText.jsx**: Same pattern as FarMountain. Uses `el.querySelector("h1")` (not `img`), `yPercent: 30`, `scrub: 1`.
- **LayerCharacterRocks.jsx**: Same pattern. Uses `img`, `yPercent: 50`, `scrub: 1`, `zIndex: 30`.
- **LayerBackground.jsx**: Added full GSAP animation from scratch. `yPercent: 5`, `scrub: 1.5`, `zIndex: 0`. Uses same save/kill pattern as other layers.
- **Key rule**: `registerPlugin(ScrollTrigger)` lives ONLY in ParallaxScene.jsx — all layer files import gsap/ScrollTrigger but never call registerPlugin.
- **Key rule**: Cleanup kills only the local trigger (`tween.scrollTrigger?.kill()`), never uses `ScrollTrigger.getAll()`.
- **Key rule**: All layer triggers point to `"#parallax-scene"` — never `document.body`.t

## Task 13 — PortfolioPage.jsx Final Assembly

- Rewrote `src/pages/PortfolioPage.jsx` from placeholder to full integration of all components
- ParallaxScene wraps: LayerBackground → LayerFarMountain → LayerPortfolioText → LayerCharacterRocks → FloatingNav → FloatingAboutCard
- Order respects z-index stacking: Background(z-0) → FarMountain(z-10) → PortfolioText(z-20) → CharacterRocks(z-30) → FloatingNav/FloatingAboutCard(z-40)
- AboutSection and WorksSection rendered OUTSIDE ParallaxScene for normal scroll after pinned scene
- App.jsx verified: `/` → PortfolioPage, `/trabajos` → TrabajosPage (correct, no changes needed)
- main.jsx has BrowserRouter already
- Build verified: 59 modules, 0 errors
- No GlobalHeader, no FrameComponents, no Firebase — dead code excluded per spects, no Locofy artifacts.
- Note: In JSX, use literal `&` not `&amp;` — React renders JSX text content as plain text, not HTML.

## Task 3: LayerPortfolioText.jsx
- Created `src/components/ParallaxScene/LayerPortfolioText.jsx` — text layer with z-index 20
- Renders "PORTFOLIO" as `<h1>` using Surgena font: `font-['Surgena_Personal_use_only']`
- Tailwind arbitrary value syntax: underscores replace spaces in font-family name
- Container: `absolute inset-0 w-full h-full flex items-center justify-center`
- Text sizing: `text-[200px] md:text-[300px]` for large viewport-covering impact
- Color: `text-icon-color` (Tailwind theme → `#fff`)
- `leading-none` and `select-none` on the heading prevent selection overflow
- GSAP ScrollTrig

## Task 6: LayerFarMountain.jsx
- Created `src/components/ParallaxScene/LayerFarMountain.jsx` following LayerSky pattern.
- Repeats structure: `absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden`.
- Nested `<img>` with `w-full h-full object-cover`.
- z-index: 10 (same as LayerSky — sky and far mountain at same depth).
- yPercent: 10 (slow parallax, matching LayerSky).
- scrub: 1.5 (smooth easing like other layers).
- Asset: `/images/montana-lejana.svg` (far background mountain).
- All assets live in `public/images/`.

## Task 10 - AboutSection.jsx

- Created `src/components/AboutSection.jsx` — standalone about section OUTSIDE ParallaxScene.
- Full-screen dark section with glassmorphism card (2 columns: text | photo).
- Title "Sobre mi..." uses `font-['Surgena_Personal_use_only']` at `text-[80px]`.
- Body uses `font-['ITC_Avant_Garde_Gothic_Std']` at `text-[28px] text-white/80`.
- Card: `bg-[rgba(217,217,217,0.12)] backdrop-blur-md border border-white/20 rounded-[80px]`.
- Profile photo: `/images/Foto mía.png` at `w-[526px] rounded-[74.9px]`.
- id="sobre-mi" for smooth scroll target.
- Pure Tailwind v4, no Locofy classes, no external imports.
- Build verified: `npm run build` passes cleanly.

## 2026-05-15: WorksSection.jsx created

- Created src/components/WorksSection.jsx � standalone section outside ParallaxScene
- Uses 9 project thumbnails (/images/1.png through /images/9.png)
- 3-column CSS grid with overlay hover effect ("Ver proyecto")
- "MI TRABAJO" button links to /trabajos, styled as white rounded-full pill
- Fonts: Surgena for heading, ITC Avant Garde Gothic Std for body/overlay/button
- Design tokens used: g-[#010101], 	ext-icon-color, consistent with AboutSection.jsx
- Build passes cleanly with 0 errors

## FloatingAboutCard - GSAP ScrollTrigger Reveal
- Added `useRef`, `useEffect`, `gsap`, and `ScrollTrigger` imports
- Card starts invisible: `pointer-events-none` in className prevents clicks; GSAP `fromTo` (opacity: 0, y: 50 → opacity: 1, y: 0) handles reveal
- ScrollTrigger trigger: `#parallax-scene`, start: `top 60%`, end: `top 10%`, scrub: 1 — card fades in during the middle portion of the parallax scroll
- `onUpdate` callback toggles `el.style.pointerEvents` between `"none"` and `"auto"` based on `self.progress > 0.05`
- Cleanup kills both tween and scrollTrigger on unmount
- onClick scroll-to-section handler preserved
- All styling (glassmorphism, z-40, position bottom-12 right-12) unchanged
