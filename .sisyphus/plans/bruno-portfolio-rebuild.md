# Bruno Portfolio — Refinements desde Figma (Post-Rebuild)

## TL;DR

> **Quick Summary**: Corregir y refinar el rebuild del portfolio para alinear exactamente con el prototipo de Figma. El esqueleto ya existe (ParallaxScene, layers, router, secciones). Ahora se trata de: sincronizar GSAP con el pinned container, reemplazar assets incorrectos, ocultar/revelar la tarjeta "Sobre mí" con scroll, añadir indicador horario, y aplicar glassmorphism puro.
>
> **Deliverables**:
> - LayerBackground con imagen correcta (no `/BACKROUND@2x.png`)
> - LayerCharacterRocks con personaje real (no montaña)
> - GSAP triggers sincronizados al pinned container (no `document.body`)
> - ScrollTrigger cleanup seguro (no matar triggers ajenos)
> - ClockIndicator component (reloj digital, izquierda del viewport inicial)
> - FloatingAboutCard oculta inicialmente, revelada con scroll
> - AboutSection con glassmorphism Apple (bg-neutral-950/40, backdrop-blur-xl, etc.)
> - App.css limpiado (código muerto removido)
>
> **Estimated Effort**: Medium (~10 tareas)
> **Parallel Execution**: YES — 3 waves + final verification
> **Critical Path**: Fix GSAP triggers → Layer fixes → Clock → Glassmorphism → Integration

---

## Context

### Original Request
"El resultado está muy lejos del proyecto original de Figma." El usuario refinó el flujo visual completo después del corte de luz.

### Refinements Post-Corte de Luz
- **Estado inicial**: 100vh limpio — "PORTFOLIO", montañas, reloj/indicador. SIN tarjeta "Sobre mí" visible.
- **Transición**: Scroll activa parallax (GSAP). Capas se desplazan a diferentes velocidades. La escena revela elementos desde abajo.
- **Desenlace**: Tarjeta "Sobre mí" sube desde abajo y se solapa fluidamente con el paisaje.
- **Glassmorphism**: Apple-style — `bg-neutral-950/40`, `backdrop-blur-xl`, `border border-white/10`, `shadow-2xl`.
- **Navbar logo**: Sin fondo/bg. Solo vector blanco. ✅ Ya correcto.
- **Reloj**: Indicador horario en la izquierda del viewport inicial.

### Metis Review (Gaps Detectados)
- `/BACKROUND@2x.png` **SÍ existe** en public root — no es link roto, pero el nombre es typo de Figma. También existe `public/images/BG 2.png` con el mismo tamaño (4.6MB). Decidir asset canónico.
- `LayerCharacterRocks.jsx` usa montaña en vez del personaje/figura central del diseño.
- GSAP: cada capa hace `ScrollTrigger.getAll().forEach(st => st.kill())` en cleanup — esto mata TODOS los triggers, incluyendo el pin del contenedor. Bug crítico.
- Cada capa registra GSAP plugins redundante: `gsap.registerPlugin(ScrollTrigger)` repetido.
- FloatingAboutCard visible desde el inicio con `absolute bottom-12 right-12` dentro de ParallaxScene.
- No existe componente ClockIndicator.
- AboutSection no tiene glassmorphism pedido (usa `backdrop-blur-md` en vez de `backdrop-blur-xl` y color distinto).
- App.css aún tiene código legacy (`.portfolio-container`, scrollbar custom, media queries mobile).

---

## Work Objectives

### Core Objective
Refinar el rebuild existente para que el portfolio de Bruno coincida exactamente con el flujo visual del prototipo de Figma.

### Concrete Deliverables
- [ ] LayerBackground corregido (imagen canónica + animación GSAP)
- [ ] LayerCharacterRocks con personaje real
- [ ] ClockIndicator component
- [ ] GSAP triggers sincronizados al contenedor pinneado
- [ ] FloatingAboutCard con fade/slide-in en scroll
- [ ] AboutSection con glassmorphism Apple
- [ ] App.css limpiado
- [ ] Build exitoso + QA visual

### Must Have
- Estado inicial = solo PORTFOLIO + montañas + reloj. Sin "Sobre mí" visible.
- Scroll reveal de "Sobre mí" con parallayering.
- FloatingAboutCard oculta inicialmente.
- Reloj/indicador horario funcional en la izquierda.
- Glassmorphism exacto en AboutSection.
- GSAP scrub smooth (scrub: 1 o 1.5, NUNCA scrub: true).

### Must NOT Have (Guardrails)
- NO cambiar la estructura de ParallaxScene (pin + scrub ya funciona).
- NO romper el router existente (App.jsx, PortfolioPage, TrabajosPage).
- NO añadir responsive (desktop-only).
- NO tocar `public/images/` existentes sin confirmación.
- NO instalar dependencias nuevas (GSAP y react-router-dom ya están).

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: NO
- **Agent-Executed QA**: ALWAYS (Playwright para verificación visual, curl para rutas)

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/`.

- **UI/Visual**: Playwright — navigate, assert DOM elements, verify z-index layering, screenshot
- **Animations**: Playwright — scroll, measure element positions before/after
- **Routing**: Bash (curl) — verify route "/trabajos" returns 200
- **Evidence**: Screenshots for UI, terminal output for builds

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — GSAP + Layer fixes):
├── Task 4: Fix GSAP ScrollTrigger cleanup + triggers (CRITICAL — unblocks everything)
├── Task 5: Fix LayerBackground image + parallax animation
├── Task 6: Restructure LayerCharacterRocks as foreground dark rocks (z-30)
├── Task 6b: Create LayerBrunoPhoto (Bruno's photo, z-15)
└── Task 7: Create ClockIndicator component

Wave 2 (After Wave 1 — FloatingCard + Glassmorphism):
├── Task 8: Fix FloatingAboutCard (hidden → reveal on scroll, z-40)
├── Task 9: Restyle AboutSection with glassmorphism Apple
└── Task 10: Clean App.css (dead code removal)

Wave 3 (Integration + Polish):
├── Task 11: Integration QA — full flow verification
└── Task 12: Final build + evidence

Wave FINAL (Verification):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA (unspecified-high + playwright)
└── F4: Scope fidelity check (deep)
```

### Dependency Matrix
- **4**: none → 5, 6, 6b, 7
- **5**: 4 → 8, 9, 11
- **6**: 4 → 8, 9, 11
- **6b**: 4 → 8, 9, 11
- **7**: none → 11
- **8**: 5, 6, 6b → 11
- **9**: 5, 6, 6b → 11
- **10**: none → 11
- **11**: 7, 8, 9, 10 → 12
- **12**: 11 → F1-F4

### Agent Dispatch Summary
- **Wave 1**: 5 agents — Task 4 (unspecified-high), Task 5 (quick), Task 6 (visual-engineering), Task 6b (visual-engineering), Task 7 (unspecified-low)
- **Wave 2**: 3 agents — Task 8 (visual-engineering), Task 9 (visual-engineering), Task 10 (quick)
- **Wave 3**: 1 agent — Task 11 (visual-engineering), Task 12 (quick)
- **FINAL**: 4 reviews in parallel

---

## TODOs

> **Task 1-3**: ✅ COMPLETED (Project Cleanup, Router, ParallaxScene container)
> **Now continuing from Task 4 onward**.

- [x] 4. **Fix GSAP ScrollTrigger — Trigger targets + Cleanup**

  **What to do**:
  - En `ParallaxScene.jsx`: asignar `id="parallax-scene"` al container ref y exponerlo (o pasar ref a hijos via context/props)
  - En `LayerFarMountain.jsx`, `LayerPortfolioText.jsx`, `LayerCharacterRocks.jsx`: cambiar `trigger: document.body` por `trigger: "#parallax-scene"`
  - En cada layer: reemplazar `ScrollTrigger.getAll().forEach((st) => st.kill())` con `thisTrigger.kill()` — guardar el trigger devuelto por `gsap.to()` y matar solo ese
  - Opcional pero recomendado: extraer `gsap.registerPlugin(ScrollTrigger)` a `ParallaxScene.jsx` solo una vez (no en cada layer)
  - Verificar que el pin del contenedor sigue funcionando después de los cambios

  **Must NOT do**:
  - NO cambiar la estructura del pin en ParallaxScene (debe seguir con `pin: true, scrub: 1.5`)
  - NO usar `trigger: document.body` en ningún layer

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requiere entender cómo GSAP ScrollTrigger maneja pin, trigger targets y cleanup. Fácil de romper si no se entiende bien.
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (debe hacerse primero — todos los layers dependen de esto)
  - **Parallel Group**: Wave 1 — Sequential (Task 4 solo)
  - **Blocks**: Tasks 5, 6, 8, 11
  - **Blocked By**: None (puede empezar inmediatamente)

  **References**:
  - `src/components/ParallaxScene/ParallaxScene.jsx:10-27` - Contenedor pinneado, necesita id/ref expuesto
  - `src/components/ParallaxScene/LayerFarMountain.jsx:17-23` - trigger: document.body → debe cambiar
  - `src/components/ParallaxScene/LayerPortfolioText.jsx:17-23` - trigger: document.body → debe cambiar
  - `src/components/ParallaxScene/LayerCharacterRocks.jsx:17-23` - trigger: document.body → debe cambiar
  - `src/components/ParallaxScene/LayerBackground.jsx` - No tiene animación → necesita una (yPercent: 5 o similar)

  **Acceptance Criteria**:
  - [ ] `npm run dev` build exitoso
  - [ ] Todos los layers usan `trigger: "#parallax-scene"` (verificar en código)
  - [ ] No hay `ScrollTrigger.getAll().forEach(st => st.kill())` en ningún archivo
  - [ ] Cada cleanup mata solo su propio trigger
  - [ ] LSP diagnostics sin errores

  **QA Scenarios**:
  ```
  Scenario: GSAP triggers sincronizados al container
    Tool: Bash (grep)
    Preconditions: Código modificado
    Steps:
      1. grep por 'trigger:' en src/components/ParallaxScene/ — verificar que TODOS apuntan a "#parallax-scene"
      2. grep por 'document.body' en src/components/ParallaxScene/ — verificar CERO ocurrencias como trigger
      3. grep por 'ScrollTrigger.getAll' en src/components/ParallaxScene/ — verificar CERO ocurrencias
    Expected Result: Todas las verificaciones pasan
    Evidence: .sisyphus/evidence/task-4-gsap-triggers.txt

  Scenario: Build exitoso y pin intacto
    Tool: Bash
    Preconditions: Código modificado
    Steps:
      1. npm run dev & — build sin errores
      2. curl http://localhost:5173/ — HTTP 200
    Expected Result: Build pasa, app carga
    Evidence: .sisyphus/evidence/task-4-build.txt
  ```

  **Commit**: YES (agrupa con Tasks 5-7)
  - Message: `fix(parallax): sync GSAP triggers to pinned container and fix cleanup`
  - Files: `src/components/ParallaxScene/*.jsx`
  - Pre-commit: `npm run dev`

---

- [x] 5. **Fix LayerBackground — Asset canónico + animación parallax**

  **What to do**:
  - Decidir asset canónico: usar `/BACKROUND@2x.png` (existe, 4.6MB) o `/images/BG 2.png` (mismo tamaño, mismo directorio que los otros assets). **Opción recomendada**: `/images/BG 2.png` por consistencia con los otros assets de montaña.
  - Si se cambia, actualizar `src` en LayerBackground.jsx
  - Añadir animación GSAP: `yPercent: 5` (movimiento muy lento para la capa más lejana, z-0)
  - Usar trigger correcto `"#parallax-scene"` (Task 4 debe estar hecha primero)

  **Must NOT do**:
  - NO borrar ningún archivo de asset sin confirmar

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Cambio simple de ruta de imagen + animación GSAP estándar
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (con Tasks 6, 7)
  - **Parallel Group**: Wave 1 (con Tasks 6, 7)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: Task 4

  **References**:
  - `src/components/ParallaxScene/LayerBackground.jsx:8` - src actual `/BACKROUND@2x.png`
  - `public/images/BG 2.png` - Alternativa canónica (mismo tamaño)
  - `src/components/ParallaxScene/LayerFarMountain.jsx:14-23` - Patrón de animación GSAP a seguir

  **Acceptance Criteria**:
  - [ ] LayerBackground usa asset canónico (ruta consistente con otros assets)
  - [ ] LayerBackground tiene animación GSAP (yPercent: 5) con trigger correcto
  - [ ] `npm run dev` sin errores

  **QA Scenarios**:
  ```
  Scenario: LayerBackground con asset correcto y animación
    Tool: Bash (grep + dev build)
    Preconditions: Task 4 completada
    Steps:
      1. Verificar que LayerBackground.jsx tiene src apuntando a /images/ (no /BACKROUND@2x.png)
      2. Verificar que tiene gsap.to() con yPercent
      3. npm run dev — build exitoso
    Expected Result: Asset corregido, animación presente, build pasa
    Evidence: .sisyphus/evidence/task-5-layer-background.txt
  ```

  **Commit**: YES (agrupa con Tasks 4, 6, 7)
  - Message: `fix(layers): correct LayerBackground asset and add parallax animation`
  - Files: `src/components/ParallaxScene/LayerBackground.jsx`

---

- [x] 6. **Restructure z-30 LayerCharacterRocks — Foreground dark rocks**

  **What to do**:
  - Renombrar conceptualmente LayerCharacterRocks como la capa de **rocas oscuras de primer plano** (z-30), NO el personaje
  - Las rocas deben recortar/tapar la base de la foto de Bruno y tapar parcialmente el texto "PORTFOLIO" desde abajo
  - Usar `/images/montana-parallax@2x.png` como imagen de rocas oscuras en primer plano (o buscar asset más oscuro en `public/images/`)
  - Ajustar animación GSAP: `yPercent: 50` (es la capa más rápida por ser la más frontal)
  - Usar trigger correcto `"#parallax-scene"` (Task 4)
  - Asegurar que la imagen tiene opacidad/estilo adecuado para verse como rocas oscuras recortando la escena

  **Must NOT do**:
  - NO poner la foto de Bruno aquí (va en una capa separada, ver Task 6b)
  - NO cambiar z-index de otros layers sin verificar el orden completo

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requiere ajuste visual para que las rocas se vean como foreground oscuro
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (con Tasks 5, 7)
  - **Parallel Group**: Wave 1 (con Tasks 5, 7)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: Task 4

  **References**:
  - `src/components/ParallaxScene/LayerCharacterRocks.jsx` - Componente a modificar
  - `src/components/ParallaxScene/LayerFarMountain.jsx` - Patrón de animación GSAP a seguir
  - `public/images/montana-parallax@2x.png` - Posible asset para rocas

  **Acceptance Criteria**:
  - [ ] LayerCharacterRocks usa imagen de rocas oscuras (no montaña brillante)
  - [ ] Animación GSAP con yPercent: 50 y trigger correcto
  - [ ] `npm run dev` sin errores

  **QA Scenarios**:
  ```
  Scenario: LayerCharacterRocks con rocas oscuras
    Tool: Bash (grep)
    Preconditions: Código modificado
    Steps:
      1. grep LayerCharacterRocks.jsx — verificar imagen usada
      2. Verificar gsap.to() con yPercent: 50
      3. npm run dev build
    Expected Result: Asset correcto, animación presente, build pasa
    Evidence: .sisyphus/evidence/task-6-rocks-layer.txt
  ```

  **Commit**: YES (agrupa con Tasks 4, 5, 7)
  - Message: `fix(layers): restructure CharacterRocks as foreground dark rocks layer`
  - Files: `src/components/ParallaxScene/LayerCharacterRocks.jsx`

---

- [x] 6b. **Create LayerBrunoPhoto — Bruno's photo between z-10 and z-20**

  **What to do**:
  - Crear `src/components/ParallaxScene/LayerBrunoPhoto.jsx`
  - Posicionar en z-index ~15 (entre LayerFarMountain z-10 y LayerPortfolioText z-20)
  - Usar la foto existente `/images/Foto mía.png` (526px width, misma que usa AboutSection)
  - La foto debe estar centrada o ligeramente desplazada, con su base siendo "pisada" por las rocas de z-30
  - Añadir animación GSAP: `yPercent: 25` (velocidad media entre montaña lejana y texto)
  - Usar trigger correcto `"#parallax-scene"` (Task 4)
  - Actualizar `src/components/ParallaxScene/index.js` para exportar el nuevo layer
  - Actualizar `src/pages/PortfolioPage.jsx` para importar y renderizar LayerBrunoPhoto

  **Must NOT do**:
  - NO agrandar la foto más allá de 526px (mantener dimensión del Figma)
  - NO poner la foto por encima de z-30 (debe estar detrás de las rocas)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Nuevo componente que requiere integración visual con layers existentes
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (con Tasks 5, 7)
  - **Parallel Group**: Wave 1 (con Tasks 5, 7)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: Task 4

  **References**:
  - `src/components/ParallaxScene/LayerFarMountain.jsx` - Patrón de componente layer
  - `src/components/ParallaxScene/LayerPortfolioText.jsx` - Patrón de animación GSAP
  - `src/components/ParallaxScene/index.js` - Actualizar exports
  - `src/pages/PortfolioPage.jsx` - Actualizar imports y render
  - `public/images/Foto mía.png` - Asset de la foto de Bruno

  **Acceptance Criteria**:
  - [ ] LayerBrunoPhoto.jsx creado en `src/components/ParallaxScene/`
  - [ ] Exportado desde index.js
  - [ ] Importado y renderizado en PortfolioPage.jsx (entre FarMountain y PortfolioText)
  - [ ] z-index ~15
  - [ ] Animación GSAP con yPercent: 25 y trigger correcto
  - [ ] `npm run dev` sin errores

  **QA Scenarios**:
  ```
  Scenario: LayerBrunoPhoto creado e integrado
    Tool: Bash (grep)
    Preconditions: Código modificado
    Steps:
      1. Verificar que LayerBrunoPhoto.jsx existe
      2. grep PortfolioPage.jsx por LayerBrunoPhoto — debe estar importado
      3. grep index.js por LayerBrunoPhoto — debe estar exportado
      4. npm run dev build
    Expected Result: Componente creado, importado, build pasa
    Evidence: .sisyphus/evidence/task-6b-photo-layer.txt
  ```

  **Commit**: YES (agrupa con Tasks 4, 5, 6, 7)
  - Message: `feat(layers): add Bruno photo layer between mountains and text`
  - Files: `src/components/ParallaxScene/LayerBrunoPhoto.jsx`, `src/components/ParallaxScene/index.js`, `src/pages/PortfolioPage.jsx`

---

- [x] 7. **Create ClockIndicator component**

  **What to do**:
  - Crear `src/components/ClockIndicator.jsx`
  - Mostrar la hora actual en formato digital (HH:MM) usando `new Date()` y `setInterval` para actualizar cada minuto
  - Posicionar en la esquina inferior izquierda de la escena parallax: `absolute bottom-8 left-8 z-50`
  - Estilo: texto blanco, opacidad 70-80%, fuente `ITC Avant Garde Gothic Std`, tamaño `text-sm` o `text-base`, tracking-wide
  - NO debe tener fondo ni bg
  - El reloj debe aparecer en el estado inicial (visible desde el principio)

  **Must NOT do**:
  - NO hacer un reloj complejo (solo HH:MM, sin segundos)
  - NO usar librerías externas

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Componente React simple, sin dependencias externas
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (con Tasks 5, 6)
  - **Parallel Group**: Wave 1 (con Tasks 5, 6)
  - **Blocks**: Task 11
  - **Blocked By**: None (no tiene dependencias)

  **References**:
  - `src/components/FloatingNav.jsx:21` - Patrón de uso de fuente ITC Avant Garde
  - `src/components/FloatingAboutCard.jsx` - Patrón de posicionamiento absoluto dentro de escena

  **Acceptance Criteria**:
  - [ ] ClockIndicator.jsx creado en `src/components/`
  - [ ] Muestra hora actual en formato HH:MM
  - [ ] Se actualiza cada minuto
  - [ ] Posicionado en bottom-8 left-8 dentro de ParallaxScene
  - [ ] `npm run dev` sin errores
  - [ ] Importado y renderizado en ParallaxScene (como child dentro del container)

  **QA Scenarios**:
  ```
  Scenario: ClockIndicator visible en estado inicial
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navegar a http://localhost:5173/
      2. Esperar a que cargue la página
      3. Buscar elemento en bottom-left que contenga formato HH:MM (regex: \d{2}:\d{2})
      4. Screenshot
    Expected Result: Reloj visible en esquina inferior izquierda con hora correcta
    Evidence: .sisyphus/evidence/task-7-clock-visible.png

  Scenario: ClockIndicator formato correcto
    Tool: Bash (grep)
    Preconditions: Componente creado
    Steps:
      1. grep por 'getHours' y 'getMinutes' en ClockIndicator.jsx
      2. grep por 'padding-zero' o 'toString().padStart' para formato 2 dígitos
    Expected Result: Usa lógica de formato HH:MM con padding
    Evidence: .sisyphus/evidence/task-7-clock-format.txt
  ```

  **Commit**: YES (agrupa con Tasks 4, 5, 6)
  - Message: `feat(ui): add ClockIndicator component for hour display`
  - Files: `src/components/ClockIndicator.jsx`

---

- [x] 8. **Fix FloatingAboutCard — Hidden initially, reveal on scroll**

  **What to do**:
  - Modificar `FloatingAboutCard.jsx` para que NO sea visible en el estado inicial
  - Añadir estado de visibilidad controlado por scroll position usando GSAP ScrollTrigger:
    - Crear un ScrollTrigger que anime opacity de 0 → 1 y translateY de 50px → 0
    - Trigger cuando el scroll progrese entre 60%-90% del pinned scene
    - Usar `scrub: 1` para transición suave
  - Mantener glassmorphism existente (bg con blur, border)
  - Después de revelada, la card debe permanecer visible

  **Must NOT do**:
  - NO cambiar el glassmorphism de la card (mantener estilo existente)
  - NO eliminar el scrollTo al hacer click
  - NO posicionar fuera del contenedor ParallaxScene
  - Verificar que la card esté en z-40 (junto con FloatingNav, por encima de rocas y foto)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requiere animación y timing preciso con GSAP ScrollTrigger + fade
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (con Tasks 9, 10)
  - **Parallel Group**: Wave 2 (con Tasks 9, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 5, 6, 6b (la escena parallax debe estar estable)

  **References**:
  - `src/components/FloatingAboutCard.jsx` - Componente actual (siempre visible)
  - `src/components/ParallaxScene/ParallaxScene.jsx:16-22` - Patrón de ScrollTrigger.create de referencia
  - `src/components/ParallaxScene/LayerFarMountain.jsx:14-23` - Patrón de gsap.to con scrollTrigger

  **Acceptance Criteria**:
  - [ ] FloatingAboutCard NO visible al cargar la página (opacity: 0 o display:none)
  - [ ] Aparece suavemente al hacer scroll entre 60-90% del pinned scene
  - [ ] El click sigue funcionando (scrollTo "sobre-mi")
  - [ ] `npm run dev` sin errores
  - [ ] No rompe el pin del parallax scene

  **QA Scenarios**:
  ```
  Scenario: FloatingAboutCard oculta inicialmente
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navegar a http://localhost:5173/
      2. Evaluar: document.querySelector('[class*="bottom-12"]') 
      3. Verificar que la card tiene opacity: 0 o no es visible
      4. Screenshot del estado inicial
    Expected Result: Card no visible al cargar
    Evidence: .sisyphus/evidence/task-8-card-hidden.png

  Scenario: FloatingAboutCard aparece al scrollear
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navegar a http://localhost:5173/
      2. window.scrollBy(0, 900)
      3. Esperar 1.5s para animación
      4. Verificar que la card ahora es visible (opacity > 0)
      5. Screenshot
    Expected Result: Card visible después de scroll
    Evidence: .sisyphus/evidence/task-8-card-visible.png
  ```

  **Commit**: YES (agrupa con Tasks 9, 10)
  - Message: `feat(ui): hide FloatingAboutCard initially, reveal on parallax scroll`
  - Files: `src/components/FloatingAboutCard.jsx`

---

- [x] 9. **Restyle AboutSection — Glassmorphism Apple**

  **What to do**:
  - Reemplazar los estilos de la tarjeta "Sobre mí" en `AboutSection.jsx`:
    - **Antes**: `bg-[rgba(217,217,217,0.12)] backdrop-blur-md`
    - **Después**: `bg-neutral-950/40 backdrop-blur-xl border border-white/10 shadow-2xl`
  - El `rounded-[80px]` y `p-16` y el layout (flex) deben mantenerse
  - Verificar que el glassmorphism se ve bien contra el fondo oscuro (`bg-[#010101]`)
  - La foto (`/images/Foto mía.png`) debe mantenerse igual

  **Must NOT do**:
  - NO cambiar el contenido textual (Sobre mi... párrafos)
  - NO cambiar la foto
  - NO cambiar `#sobre-mi` id (lo usan los smooth scroll links)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Glassmorphism requiere Tailwind v4 clases específicas y verificación visual
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (con Tasks 8, 10)
  - **Parallel Group**: Wave 2 (con Tasks 8, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 5, 6

  **References**:
  - `src/components/AboutSection.jsx:7` - Clase actual a reemplazar
  - Tailwind v4: `backdrop-blur-xl`, `bg-neutral-950/*`, `border-white/*`

  **Acceptance Criteria**:
  - [ ] AboutSection card usa `bg-neutral-950/40 backdrop-blur-xl border border-white/10 shadow-2xl`
  - [ ] Layout y contenido intactos
  - [ ] `npm run dev` sin errores

  **QA Scenarios**:
  ```
  Scenario: AboutSection con glassmorphism correcto
    Tool: Bash (grep)
    Preconditions: Código modificado
    Steps:
      1. grep AboutSection.jsx por 'neutral-950/40' — debe existir
      2. grep por 'backdrop-blur-xl' — debe existir
      3. grep por 'border-white/10' — debe existir
      4. grep por 'shadow-2xl' — debe existir
      5. grep por 'backdrop-blur-md' — NO debe existir
    Expected Result: Todas las clases nuevas están y la vieja no
    Evidence: .sisyphus/evidence/task-9-glassmorphism.txt

  Scenario: Build exitoso
    Tool: Bash
    Preconditions: Código modificado
    Steps:
      1. npm run dev — build sin errores
    Expected Result: Build pasa
    Evidence: .sisyphus/evidence/task-9-build.txt
  ```

  **Commit**: YES (agrupa con Tasks 8, 10)
  - Message: `style(about): apply Apple-style glassmorphism to AboutSection card`
  - Files: `src/components/AboutSection.jsx`

---

- [x] 10. **Clean App.css — Dead code removal**

  **What to do**:
  - Revisar `src/App.css`: no es importada por ningún componente
  - Migrar estilos útiles (scrollbar custom, `scroll-behavior: smooth`) a `src/index.css`
  - Eliminar `src/App.css`
  - Verificar que ningún archivo importa App.css

  **Must NOT do**:
  - NO modificar `src/index.css` sin verificar que los estilos de fuente y theme tokens no se rompen
  - NO eliminar estilos de scrollbar si son deseables

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Limpieza mecánica de archivos
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES (con Tasks 8, 9)
  - **Parallel Group**: Wave 2 (con Tasks 8, 9)
  - **Blocks**: Task 11
  - **Blocked By**: None

  **References**:
  - `src/App.css` - Archivo a limpiar/eliminar
  - `src/index.css` - Archivo destino para estilos útiles

  **Acceptance Criteria**:
  - [ ] App.css eliminado
  - [ ] Scrollbar custom preservado en index.css (si aplica)
  - [ ] No hay imports rotos a App.css
  - [ ] `npm run dev` sin errores

  **QA Scenarios**:
  ```
  Scenario: App.css limpiado y build intacto
    Tool: Bash
    Preconditions: Código modificado
    Steps:
      1. grep -r "App.css" src/ — 0 resultados (nadie lo importa)
      2. npm run dev — build exitoso
    Expected Result: Sin referencias a App.css, build pasa
    Evidence: .sisyphus/evidence/task-10-cleanup.txt
  ```

  **Commit**: YES (agrupa con Tasks 8, 9)
  - Message: `chore(cleanup): remove dead App.css, migrate useful styles to index.css`
  - Files: `src/App.css`, `src/index.css`

---

- [ ] 11. **Integration QA — Full flow verification**

  **What to do**:
  - Verificar que todos los componentes funcionan juntos:
    1. Estado inicial: solo PORTFOLIO + montañas + reloj. Sin "Sobre mí" ni card flotante visibles.
    2. Al scrollear: parallax layers se mueven a diferentes velocidades
    3. FloatingAboutCard aparece suavemente ~80% del scroll del pinned scene
    4. AboutSection aparece después del pinned scene con glassmorphism Apple
    5. WorksSection con grid 3×3 de proyectos
    6. Navbar: smooth scroll a cada sección funciona
    7. Botón "MI TRABAJO" → navega a /trabajos
    8. /trabajos: grid 18 proyectos, botón "Volver" funciona
  - Tomar screenshots de cada estado
  - Verificar que no hay errores en consola del navegador

  **Must NOT do**:
  - NO modificar código (solo verificar)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Verificación visual completa con Playwright
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depende de todas las tasks anteriores)
  - **Parallel Group**: Wave 3 (solo)
  - **Blocks**: Task 12
  - **Blocked By**: Tasks 7, 8, 9, 10

  **References**:
  - `src/pages/PortfolioPage.jsx` - Punto de entrada del portfolio
  - `src/App.jsx` - Router
  - `src/pages/TrabajosPage.jsx` - Página de trabajos

  **Acceptance Criteria**:
  - [ ] Todos los estados visuales verificados
  - [ ] Screenshots de cada estado guardados
  - [ ] No hay errores en consola del navegador

  **QA Scenarios**:
  ```
  Scenario: Full flow visual verification
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Screenshot estado inicial (sin scroll)
      2. Scroll 200px → screenshot
      3. Scroll 800px → FloatingAboutCard debe ser visible
      4. Click en "Sobre mi" nav → scroll suave a AboutSection
      5. Screenshot AboutSection con glassmorphism
      6. Click "MI TRABAJO" → navega a /trabajos → screenshot grid
      7. Click "Volver" → regresa a /
      8. Verificar console errors: 0
    Expected Result: Flujo completo funciona, todos los estados correctos
    Evidence: .sisyphus/evidence/task-11-full-integration/
  ```

  **Commit**: NO (tarea de verificación)

---

- [ ] 12. **Final Build + Evidence packaging**

  **What to do**:
  - `npm run build` → build de producción exitoso
  - Verificar que `dist/` se genera correctamente
  - Reunir toda la evidencia en `.sisyphus/evidence/`
  - Resumir estado final de cada componente

  **Must NOT do**:
  - NO modificar código

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Build + verificación final
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential after Task 11)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 11

  **Acceptance Criteria**:
  - [ ] `npm run build` exitoso
  - [ ] `dist/` generado
  - [ ] Evidencia completa

  **QA Scenarios**:
  ```
  Scenario: Build de producción
    Tool: Bash
    Preconditions: Todos los cambios aplicados
    Steps:
      1. npm run build
      2. ls dist/ — debe existir index.html y assets/
    Expected Result: Build exitoso
    Evidence: .sisyphus/evidence/task-12-build.txt
  ```

  **Commit**: YES
  - Message: `chore(build): final production build`
  - Files: (no commitear dist)

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. Verify each "Must Have" is implemented. Check "Must NOT Have" violations. Verify evidence files exist.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run dev` build. Review for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code. Check AI slop.
  Output: `Build [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright`)
  Execute EVERY QA scenario from EVERY task. Test cross-task integration. Test edge cases. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec built, nothing beyond spec. Check "Must NOT do" compliance.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | VERDICT`

---

## Commit Strategy

- **Tasks 4-7**: `fix(parallax): sync GSAP triggers to pinned container and fix cleanup` + `fix(layers): correct LayerBackground asset` + `fix(layers): restructure CharacterRocks as foreground rocks` + `feat(layers): add Bruno photo layer` + `feat(ui): add ClockIndicator component`
- **Tasks 8-10**: `feat(ui): hide FloatingAboutCard initially, reveal on parallax scroll` + `style(about): apply Apple-style glassmorphism` + `chore(cleanup): remove dead App.css`
- **Task 12**: `chore(build): final production build`

---

## Success Criteria

### Final Checklist
- [ ] Estado inicial: 100vh limpio con PORTFOLIO + montañas + reloj
- [ ] FloatingAboutCard oculta al inicio, aparece con scroll
- [ ] Todos los layers parallax se mueven a diferentes velocidades (yPercent: bg=5, mountain=15, photo=25, text=30, rocks=50)
- [ ] Orden de capas correcto: bg(z-0) → mountain(z-10) → photo(z-15) → text(z-20) → rocks(z-30) → nav+card(z-40)
- [ ] AboutSection con glassmorphism Apple
- [ ] Navbar smooth scroll funcional
- [ ] "/trabajos" route funciona con grid de 18 proyectos
- [ ] `npm run build` exitoso
- [ ] Cero errores de consola
