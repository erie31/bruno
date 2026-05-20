# Learnings - Expandable Project Section

## Project Patterns
- Tailwind CSS v4 with `@theme` custom colors
- Fonts: `Surgena_Personal_use_only` (decorative titles), `ITC_Avant_Garde_Gothic_Std` (body)
- Glassmorphism: `bg-[rgba(255,255,255,0.05)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.15)]`
- Border radius: `rounded-[24px]` for cards, `rounded-[80px]` for large containers
- Background: `#010101` (dark)
- Routes: `/` (PortfolioPage), `/trabajos` (TrabajosPage)
- Mountain images: `montana-parallax@2x.png` (front rocks), `montana@2x.png` (far mountain)

## Key Decisions
- Desktop-only (no mobile)
- Expandable section uses mountain background (`montana-parallax@2x.png`) with gradient overlay
- Only one project open at a time (accordion pattern)
- Click same card to close, click different to switch

## Implementation Notes
- Used `Fragment` to wrap card + expandable section pairs
- `expandedId` state with `toggleProject` function handles accordion logic
- Active card gets `ring-2 ring-white/30` highlight
- Mountain background via inline `style={{ backgroundImage }}` with gradient overlay for readability
- `from-black/80 via-black/40 to-black/80` gradient overlay
- CSS transition `duration-500 ease-in-out` for expand/collapse animation
- Build passes successfully (`bun run build` → exit 0)

## 2026-05-20 13:46

### Implemented: Expandable Project Section on TrabajosPage.jsx

**What was done:**
- Added useState and Fragment imports from React
- Enriched the projects array with description (empty string) and 
ota ('Descripci�n pr�ximamente') fields
- Added expandedId state and 	oggleProject handler (accordion behavior � click same card closes, different card switches)
- Added onClick handler to each project card div with ing-2 ring-white/30 active highlight
- Built expandable section that renders below the clicked card using col-span-1 md:col-span-2 lg:col-span-3 to span the grid
- Mountain background image: /images/montana-parallax@2x.png with g-cover bg-center
- Dark gradient overlay (rom-black/80 via-black/40 to-black/80) for text readability
- Shows: project title (80px Surgena), description (20px Avant Garde), and nota section with italic label
- Scroll-triggered expand/collapse via conditional mount + CSS transition 	ransition-all duration-500 ease-in-out

**Files modified:** src/pages/TrabajosPage.jsx only

**Conventions followed:**
- Existing font usage: Surgena_Personal_use_only (titles), ITC_Avant_Garde_Gothic_Std (body)
- Existing spacing/rounded patterns: ounded-[24px], dark #010101 background
- Desktop-only (no mobile/responsive classes added)
- CSS-only animation (no GSAP or libraries)

**Build result:** ? Success (60 modules, 1.96s)
