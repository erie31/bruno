# GitHub Pages Fix + Visual Enhancements

## TL;DR

> **Quick Summary**: Fix white screen (404) on GitHub Pages by rebuilding with correct base paths, fix all broken image references across 4 components, and add visual enhancements (mountain stays at 70% opacity, firma SVG fades in at bottom-right).
> 
> **Deliverables**:
> - All 8 image paths fixed from `./relative` to `/absolute` (Vite base-aware)
> - GitHub Pages SPA routing via `404.html` redirect
> - Mountain lejana stays visible at 70% opacity instead of fading out
> - Firma SVG appears in bottom-right corner with fade+scale animation after card settles
> - Fresh production build ready for deploy
> 
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4

---

## Context

### Original Request
> "actualmente estoy tratando de visualizar el proyecto en gothub pages pero me encuentro con una pantalla blanca y este error en consola Failed to load resource: the server responded with a status of 404 ()... puedes repararlo y hacer visible el logo cuyo link esta roto en el nav bar?"
>
> Then: "podrias hacer que la montaña del fondo no desaparezca del todo, sino que quede la mitad en pantalla e incorporar el firma.svg debajo de la imagen de image-12x pero sobre la montaña fija del frente una vez realizado el scroll y dando por finalizado el movimiento de la 'tarjeta'"

### Interview Summary
**Key Discussions**:
- Mountain opacity: User wants 70% opacity (not 50% or 30%)
- Firma SVG position: Bottom-right corner of the screen
- Firma animation: Fade-in + subtle scale
- Firma timing: After card animation completes (timeline progress ~0.8-1.0)

**Research Findings**:
- 8 broken image paths found across 4 files using `./relative` format
- Vite's `base: "/bruno/"` is correctly configured — paths need `/absolute` format
- GitHub Pages needs `404.html` for SPA client-side routing
- firma.svg exists at `public/images/firma.svg`

### Metis Review
**Identified Gaps** (addressed):
- Other broken image paths: Scanned all components — found 6 additional broken paths
- GitHub Pages SPA routing: Adding `404.html` with redirect script
- Scope boundaries: Explicitly excluding refactoring, new features, style changes

---

## Work Objectives

### Core Objective
Fix GitHub Pages deployment (white screen + 404), fix all broken image paths, and add two visual enhancements.

### Concrete Deliverables
- `public/404.html` — SPA redirect for GitHub Pages
- `index.html` — favicon path fixed
- `src/components/FloatingNav.jsx` — logo + translate button paths fixed
- `src/components/FloatingAboutCard.jsx` — Path.svg + Rectangle-7 paths fixed
- `src/components/HeroParallax.jsx` — 3 image paths fixed + mountain opacity + firma SVG
- `src/pages/TrabajosPage.jsx` — Vector1.svg path fixed
- Fresh `dist/` build output

### Definition of Done
- [ ] `npm run build` completes with zero errors
- [ ] `vite preview` serves app without 404s in network tab
- [ ] All 8 images load (no console 404s)
- [ ] Mountain visible at ~70% during/after scroll
- [ ] Firma SVG visible in bottom-right after scroll completes
- [ ] Build ready to deploy to GitHub Pages

### Must Have
- All image paths use `/absolute` format (Vite base-aware)
- Mountain lejana opacity stops at 0.7 (70% visible)
- Firma SVG fades in with scale at timeline end
- 404.html for SPA routing on GitHub Pages

### Must NOT Have (Guardrails)
- NO refactoring of GSAP animation structure beyond the two requested changes
- NO changes to card animation timing or behavior
- NO new components or features beyond firma SVG element
- NO style changes to existing components (only path fixes)
- NO touching TrabajosPage beyond the single path fix
- NO committing dist/ folder to git

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None (visual/animation fixes)
- **Agent-Executed QA**: ALWAYS (mandatory for all tasks)

### QA Policy
- **Build verification**: Run `npm run build`, check zero errors
- **Image path verification**: `vite preview` + grep network for 404s
- **Visual verification**: Playwright screenshots at key scroll positions
- **Evidence saved to**: `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - fixes only):
├── Task 1: Create 404.html for GitHub Pages SPA routing [quick]
├── Task 2: Fix all 8 broken image paths across 4 components [quick]
├── Task 3: Fix favicon path in index.html [quick]
└── Task 4: Mountain opacity - change fade target from 0 to 0.3 [quick]

Wave 2 (After Wave 1 - enhancements):
├── Task 5: Add firma SVG element with fade+scale animation [quick]
└── Task 6: Build + verify all fixes work together [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay

Critical Path: Task 2 → Task 6 → F1-F4 → user okay
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Wave 1)
```

### Dependency Matrix
- **1-4**: None — all independent, can run in parallel
- **5**: Depends on Task 4 (same file, HeroParallax.jsx) — must wait for path fixes
- **6**: Depends on ALL of Tasks 1-5 — needs all changes to build
- **F1-F4**: Depends on Task 6 — needs completed build

### Agent Dispatch Summary
- **1**: **4** — T1-T4 → all `quick`, can run in parallel
- **2**: **2** — T5 → `quick`, T6 → `quick`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Create 404.html for GitHub Pages SPA Routing

  **What to do**:
  - Create `public/404.html` with script that redirects to `/bruno/index.html` preserving the path
  - Must handle SPA routing: `https://erie31.github.io/bruno/trabajos` → loads index.html
  - Use the standard GitHub Pages SPA workaround script

  **Must NOT do**:
  - Modify firebase.json (that's for Firebase hosting, not GitHub Pages)
  - Change router configuration (BrowserRouter with basename is correct)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file creation with well-known pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - Standard GitHub Pages SPA redirect: search for "github pages spa 404.html"

  **Acceptance Criteria**:
  - [ ] File exists: `public/404.html`
  - [ ] Contains redirect script to `/bruno/index.html`
  - [ ] Preserves URL path and hash for SPA routing

  **QA Scenarios**:
  ```
  Scenario: 404.html exists and contains SPA redirect
    Tool: Bash
    Preconditions: File created
    Steps:
      1. cat public/404.html
      2. Verify contains "window.location" redirect logic
      3. Verify references "/bruno/" base path
    Expected Result: File exists with SPA redirect script targeting /bruno/
    Evidence: .sisyphus/evidence/task-1-404-exists.txt
  ```

  **Commit**: YES
  - Message: `fix(pages): add 404.html for GitHub Pages SPA routing`
  - Files: `public/404.html`

- [ ] 2. Fix All Broken Image Paths (8 paths across 4 components)

  **What to do**:
  - Change all `src="./..."` to `src="/..."` in these files:
    - `src/components/FloatingNav.jsx` line 14: `./images/image-1@2x.png` → `/images/image-1@2x.png`
    - `src/components/FloatingNav.jsx` line 38: `./Boton-translate.svg` → `/Boton-translate.svg`
    - `src/components/FloatingAboutCard.jsx` line 37: `./Path.svg` → `/Path.svg`
    - `src/components/FloatingAboutCard.jsx` line 49: `./Rectangle-7@2x.png` → `/Rectangle-7@2x.png`
    - `src/components/HeroParallax.jsx` line 133: `./images/BG 2.png` → `/images/BG 2.png`
    - `src/components/HeroParallax.jsx` line 138: `./images/montana@2x.png` → `/images/montana@2x.png`
    - `src/components/HeroParallax.jsx` line 175: `./images/montana-parallax@2x.png` → `/images/montana-parallax@2x.png`
    - `src/pages/TrabajosPage.jsx` line 34: `./Vector1.svg` → `/Vector1.svg`
  - Vite's `base: "/bruno/"` will automatically rewrite `/path` to `/bruno/path` during build

  **Must NOT do**:
  - Use `import.meta.env.BASE_URL` (not needed, `/path` is simpler and Vite handles it)
  - Move any files
  - Change any other code in these files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple find-and-replace across files
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:
  - `src/components/FloatingNav.jsx:14` — Logo image, currently `./images/image-1@2x.png`
  - `src/components/FloatingNav.jsx:38` — Translate button, currently `./Boton-translate.svg`
  - `src/components/FloatingAboutCard.jsx:37` — Path SVG, currently `./Path.svg`
  - `src/components/FloatingAboutCard.jsx:49` — Rectangle image, currently `./Rectangle-7@2x.png`
  - `src/components/HeroParallax.jsx:133` — Background image, currently `./images/BG 2.png`
  - `src/components/HeroParallax.jsx:138` — Mountain image, currently `./images/montana@2x.png`
  - `src/components/HeroParallax.jsx:175` — Rocks image, currently `./images/montana-parallax@2x.png`
  - `src/pages/TrabajosPage.jsx:34` — Vector SVG, currently `./Vector1.svg`

  **Acceptance Criteria**:
  - [ ] Zero occurrences of `src="./` in src/ directory
  - [ ] All 8 paths changed to absolute `/path` format
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: No relative image paths remain
    Tool: Bash
    Preconditions: All fixes applied
    Steps:
      1. grep -r 'src="./' src/ 
      2. Verify zero matches
    Expected Result: No output from grep (zero relative paths)
    Evidence: .sisyphus/evidence/task-2-no-relative-paths.txt

  Scenario: Build succeeds with absolute paths
    Tool: Bash
    Preconditions: All fixes applied
    Steps:
      1. npm run build
      2. Check exit code is 0
    Expected Result: Build completes with zero errors
    Evidence: .sisyphus/evidence/task-2-build-output.txt

  Scenario: Built index.html has /bruno/ prefixed asset paths
    Tool: Bash
    Preconditions: Build completed
    Steps:
      1. grep 'src=' dist/index.html
      2. Verify script/link paths start with /bruno/
    Expected Result: All asset paths prefixed with /bruno/
    Evidence: .sisyphus/evidence/task-2-built-paths.txt
  ```

  **Commit**: YES
  - Message: `fix(assets): change relative image paths to absolute for Vite base compatibility`
  - Files: `src/components/FloatingNav.jsx`, `src/components/FloatingAboutCard.jsx`, `src/components/HeroParallax.jsx`, `src/pages/TrabajosPage.jsx`

- [ ] 3. Fix Favicon Path in index.html

  **What to do**:
  - In `index.html` line 5: change `href="./vite.svg"` to `href="/vite.svg"`
  - Vite will automatically rewrite to `/bruno/vite.svg` during build

  **Must NOT do**:
  - Change any other lines in index.html
  - Move or rename vite.svg

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single line change
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Task 6
  - **Blocked By**: None

  **References**:
  - `index.html:5` — Favicon link, currently `href="./vite.svg"`

  **Acceptance Criteria**:
  - [ ] `index.html` line 5: `href="/vite.svg"`
  - [ ] Built `dist/index.html` has `href="/bruno/vite.svg"`

  **QA Scenarios**:
  ```
  Scenario: Favicon path is absolute in source
    Tool: Bash
    Preconditions: Fix applied
    Steps:
      1. grep 'vite.svg' index.html
      2. Verify href="/vite.svg" (not ./vite.svg)
    Expected Result: Source uses absolute path
    Evidence: .sisyphus/evidence/task-3-favicon-source.txt
  ```

  **Commit**: YES (groups with Task 2 in commit 2)
  - Message: `fix(assets): change relative image paths to absolute for Vite base compatibility`

- [ ] 4. Mountain Lejana — Keep at 70% Opacity

  **What to do**:
  - In `src/components/HeroParallax.jsx`, modify the mountain animation (lines 50-56)
  - Change `opacity: 0` to `opacity: 0.7` (keeps mountain at 70% visible)
  - Only change the target opacity value — keep yPercent, xPercent, duration unchanged

  **Must NOT do**:
  - Change mountain positioning (yPercent: -10, xPercent: 45)
  - Change fade duration (MOUNTAIN_FADE_END = 0.55)
  - Modify any other animations in the timeline

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single value change in animation config
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: Task 5, Task 6
  - **Blocked By**: None

  **References**:
  - `src/components/HeroParallax.jsx:50-56` — Mountain animation block
  - Current code: `masterTl.to(mountainRef.current, { yPercent: MOUNTAIN_Y_SPEED, xPercent: MOUNTAIN_X_SPEED, opacity: 0, ease: "none", duration: MOUNTAIN_FADE_END }, 0);`

  **Acceptance Criteria**:
  - [ ] Mountain animation targets `opacity: 0.7` (not 0)
  - [ ] No other properties in that animation block changed
  - [ ] Build succeeds

  **QA Scenarios**:
  ```
  Scenario: Mountain animation uses opacity 0.3
    Tool: Bash
    Preconditions: Fix applied
    Steps:
      1. grep -A5 'mountainRef.current' src/components/HeroParallax.jsx
      2. Verify opacity: 0.7 in the animation
    Expected Result: Animation targets opacity 0.7
    Evidence: .sisyphus/evidence/task-4-mountain-opacity.txt
  ```

  **Commit**: YES (groups with Task 5)
  - Message: `feat(parallax): keep mountain at 70% opacity and add firma SVG`

- [ ] 5. Add Firma SVG with Fade + Scale Animation

  **What to do**:
  - Add a new `firmaRef` using `useRef(null)` alongside existing refs
  - Add a new z-[35] layer element in the JSX for the firma SVG (use Tailwind arbitrary value `z-[35]` since 35 is not in default scale):
    ```jsx
    <div ref={firmaRef} className="absolute bottom-8 right-8 w-32 h-auto pointer-events-none z-[35]">
      <img src="/images/firma.svg" alt="Firma" className="w-full h-auto" />
    </div>
    ```
  - Add fromTo animation to masterTl that triggers when card finishes (at timeline progress ~0.8):
    ```js
    masterTl.fromTo(firmaRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 0.2
      }, 0.8);
    ```
  - Use `fromTo` (not `to`) so the initial state (opacity: 0, scale: 0.9) is explicitly set by GSAP

  **Must NOT do**:
  - Change z-ordering of existing layers (z-30 card, z-40 rocks, z-50 UI)
  - Modify card animation
  - Change any other element's position or behavior
  - Add any new components or imports

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Add one ref, one element, one animation line
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (must be after Task 4 — same file, HeroParallax.jsx)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 6
  - **Blocked By**: Task 4

  **References**:
  - `src/components/HeroParallax.jsx:22-28` — Existing refs section (add firmaRef here)
  - `src/components/HeroParallax.jsx:74-89` — Card animation (firma animation should start at 0.8, after card is mostly done)
  - `src/components/HeroParallax.jsx:165-170` — z-30 card layer (add firma as z-35 after this)
  - `src/components/HeroParallax.jsx:173-177` — z-40 rocks layer (firma goes before this)
  - `public/images/firma.svg` — Firma SVG file

  **Acceptance Criteria**:
  - [ ] firmaRef declared with useRef
  - [ ] Firma SVG element exists at z-35, positioned bottom-right
  - [ ] Animation uses `fromTo` with from-state { opacity: 0, scale: 0.9 } to { opacity: 1, scale: 1 }
  - [ ] Animation starts at timeline position 0.8
  - [ ] Source path uses `/images/firma.svg` (absolute)
  - [ ] Build succeeds
  - [ ] Cleanup in useEffect return includes firmaRef

  **QA Scenarios**:
  ```
  Scenario: Firma SVG element exists in DOM at rest position
    Tool: Bash
    Preconditions: Code written, built
    Steps:
      1. grep 'firma' src/components/HeroParallax.jsx
      2. Verify firmaRef, firma element with /images/firma.svg, animation entry
    Expected Result: All three firma-related elements present
    Evidence: .sisyphus/evidence/task-5-firma-code.txt

  Scenario: Firma animation is properly configured
    Tool: Bash
    Preconditions: Code written
    Steps:
      1. grep -A7 'firmaRef.current' src/components/HeroParallax.jsx
      2. Verify fromTo with { opacity: 0, scale: 0.9 } → { opacity: 1, scale: 1 }, position 0.8
    Expected Result: fromTo animation correctly configured
    Evidence: .sisyphus/evidence/task-5-firma-animation.txt
  ```

  **Commit**: YES (groups with Task 4)
  - Message: `feat(parallax): keep mountain at 70% opacity and add firma SVG`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, check paths). For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist in .sisyphus/evidence/.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build`. Review all changed files for: syntax errors, unused imports, console.log. Check AI slop: excessive comments, over-abstraction.
  Output: `Build [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Run `vite preview`, open browser, verify: no 404s in network tab, all 8 images load, mountain visible at 70%, firma SVG in bottom-right after scroll. Capture screenshots.
  Output: `Images [8/8 loaded] | Mountain [visible at 70%] | Firma [visible bottom-right] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

- **1**: `fix(pages): add 404.html for GitHub Pages SPA routing` - public/404.html
- **2**: `fix(assets): change relative image paths to absolute for Vite base compatibility` - FloatingNav.jsx, FloatingAboutCard.jsx, HeroParallax.jsx, TrabajosPage.jsx, index.html
- **3**: `feat(parallax): keep mountain at 70% opacity and add firma SVG` - HeroParallax.jsx

---

## Success Criteria

### Verification Commands
```bash
npm run build              # Expected: zero errors, dist/ generated
grep -r 'src="./' src/     # Expected: no output (zero relative paths)
grep 'firma' src/components/HeroParallax.jsx  # Expected: firmaRef, element, animation
grep 'opacity: 0.7' src/components/HeroParallax.jsx  # Expected: mountain opacity target
```

### Final Checklist
- [ ] All 8 image paths use `/absolute` format
- [ ] 404.html created for GitHub Pages SPA routing
- [ ] Mountain lejana stays at 70% opacity
- [ ] Firma SVG visible in bottom-right after scroll
- [ ] Build succeeds with zero errors
- [ ] Zero `src="./` relative paths remain in src/
