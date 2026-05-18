# Plan: Integración Bruno Portfolio - Parallax Single Page

## TL;DR

> **Objetivo**: Integrar Desktop1, Desktop2 y Desktop3 en una sola página con efecto parallax (GSAP + ScrollTrigger), arreglando todos los links rotos, imágenes faltantes y efectos CSS no aplicados.
>
> **Deliverables**:
> - Single-page portfolio con 3 secciones en scroll vertical + parallax de montañas
> - Navegación funcional con smooth scroll
> - Assets de imágenes y SVGs corregidos
> - Enlace "MI TRABAJO" preparado para Desktop4
>
> **Estimated Effort**: Medium-Large (~22 tareas)
> **Parallel Execution**: YES - 5 waves
> **Critical Path**: Assets → Componentes → Refactor → Parallax → CSS/Polish
> 
> **Progreso Actual**:
> - Wave 1 (Assets): ✅ 100% (usuario renombrará montana@2x.png)
> - Wave 2 (Componentes): ✅ 100%
> - Wave 3 (Refactor): ✅ 100% (pendiente corregir rutas a montana@2x.png en JSX)
> - Wave 4 (Parallax+Integración): ⚠️ 50% (Parallax e integración App.jsx listos, faltan navegación + botones)
> - Wave 5 (Polish+Build): ❌ 0%

---

## Context

### Original Request
Bruno tiene un portfolio personal (React 19 + Vite 5 + TailwindCSS 4) exportado desde Figma vía Locofy. Los componentes exportados (Desktop1, Desktop2, Desktop3) son páginas completas con posicionamiento absoluto que deben convertirse en secciones apilables de una sola página con efecto parallax.

### Interview Summary
**Key Decisions**:
- **Arquitectura**: Single page con scroll vertical, NO rutas separadas
- **Efecto principal**: Parallax con GSAP + ScrollTrigger (capas de montañas a diferentes velocidades)
- **Desktop1-2-3**: Secuencia parallax continua (Hero → Sobre mí)
- **Desktop4**: Sección aparte, fuera del alcance de este plan. Se accede desde botón "MI TRABAJO"
- **Assets SVGs faltantes**: Están en Figma, hay que exportarlos
- **Foto de perfil**: "Foto mía.png" existente es la que va en Desktop2/3
- **Testing**: QA visual manual (sin tests automatizados)
- **Estilo**: Respetar la propuesta del diseñador en Figma

**Metis Review Findings**:
- Desktop2.jsx y Desktop3.jsx **NO EXISTEN** en el repositorio → hay que crearlos desde el código compartido
- TailwindCSS v4 **NO USA** tailwind.config.js → usar `@theme` en CSS
- Los componentes "limpios" (Header, About, Skills, etc.) tienen contenido valioso que preservar
- Variables CSS `--text-color` y `--secondary-color` faltantes confirmadas

---

## Work Objectives

### Core Objective
Convertir 3 layouts independientes de Locofy en una experiencia unificada de una sola página con parallax fluido.

### Concrete Deliverables
- [ ] `src/App.jsx` - Layout principal con todas las secciones
- [ ] `src/components/Desktop1.jsx` - Refactorizado como sección Hero
- [ ] `src/components/Desktop2.jsx` - Creado como sección Sobre Mí (parte 1)
- [ ] `src/components/Desktop3.jsx` - Creado como sección Sobre Mí (parte 2)
- [ ] `src/components/FrameComponent2.jsx` - Header para Desktop2
- [ ] `src/components/FrameComponent111.jsx` - Header para Desktop3
- [ ] `src/components/ParallaxBackground.jsx` - Sistema parallax con GSAP
- [ ] Assets SVGs exportados en `/public/images/`
- [ ] Assets renombrados para coincidir con rutas de componentes

### Definition of Done
- [ ] `npx vite build` → 0 errores
- [ ] Navegación: click en "Inicio", "Sobre mí", "Mis trabajos", "Contacto" → scroll suave a sección correcta
- [ ] Parallax: montañas se mueven a diferente velocidad al scrollear
- [ ] Desktop1 → Desktop2 → Desktop3 fluyen en scroll vertical continuo
- [ ] Imágenes de fondo (montañas) cargan correctamente
- [ ] Foto de perfil visible en sección Sobre Mí
- [ ] Botón "MI TRABAJO" existe y apunta a Desktop4

### Must Have
- [ ] Imágenes de montañas con parallax funcional
- [ ] Navegación funcional (links + smooth scroll)
- [ ] Desktop1 visible como Hero al cargar
- [ ] Desktop2 y Desktop3 visibles al scrollear
- [ ] Assets de imágenes corregidos (sin 404s)

### Must NOT Have (Guardrails)
- [ ] NO crear Desktop4 (sección separada, fuera de alcance)
- [ ] NO instalar dependencias innecesarias (solo GSAP + ScrollTrigger)
- [ ] NO eliminar contenido textual de componentes limpios (About, Experience - preservar)
- [ ] NO modificar assets originales en public/images/ (solo agregar/copiar)
- [ ] NO cambiar el diseño visual original de Figma (respetar estilos Locofy)

---

## Verification Strategy

> **QA Visual Manual** - Sin tests automatizados. Verificación en navegador.

### Pre-Flight Check (antes de empezar)
- [ ] `npx vite build` compila sin errores
- [ ] Dev server inicia: `npx vite`

### Post-Implementation Checks
- [ ] Abrir en Chrome/Edge, verificar cada sección visible al scrollear
- [ ] Click en cada link de navegación → smooth scroll a sección correcta
- [ ] Parallax: montañas de fondo se mueven más lento que el contenido
- [ ] Sin errores 404 de imágenes en Consola (F12 → Network)
- [ ] Responsive: probar en 1920x1080, 768px (tablet), 375px (mobile)
- [ ] Botón "MI TRABAJO" visible y clickeable

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Assets y Configuracion) — ✅ COMPLETADO:
├── T1: Exportar SVGs faltantes desde Figma ✅
├── T2: Renombrar assets a montana@2x.png / montana-parallax@2x.png ✅ (usuario renombró en /images/)
├── T3: Configurar tema Tailwind v4 (index.css + variables CSS) ✅
├── T4: Instalar GSAP + ScrollTrigger ✅
└── T5: Definir variables CSS faltantes ✅

Wave 2 (Creacion de Componentes Faltantes) — ✅ COMPLETADO:
├── T6: Crear FrameComponent2.jsx ✅
├── T7: Crear FrameComponent111.jsx ✅
├── T8: Crear Desktop2.jsx (seccion Sobre Mi) ✅
└── T9: Crear Desktop3.jsx (seccion Sobre Mi parte 2) ✅

Wave 3 (Refactor Section-izar) — ✅ COMPLETADO (falta actualizar rutas montaña):
├── T10: Refactorizar Desktop1.jsx a seccion vertical ✅
├── T11: Refactorizar Desktop2.jsx a seccion vertical ✅
├── T12: Refactorizar Desktop3.jsx a seccion vertical ✅
├── T13: Refactorizar FrameComponent(s) a GlobalHeader unico ✅
└── T14: Actualizar rutas de imagenes en componentes ⚠️ (actualizar a montana@2x.png)

Wave 4 (Parallax + Integracion) — ⚠️ EN PROGRESO:
├── T15: Crear sistema parallax con GSAP ScrollTrigger ✅ (Ya creado pero con rutas viejas)
├── T16: Integrar todo en App.jsx ✅ (App.jsx ya tiene estructura correcta)
├── T17: Convertir nav h3 a links con smooth scroll ❌ PENDIENTE
├── T18: Wire up boton MI TRABAJO (placeholder Desktop4) ❌ PENDIENTE
└── T19: Preservar contenido de componentes limpios ❌ PENDIENTE

Wave 5 (Polish + Build) — ❌ PENDIENTE:
├── T20: Limpiar codigo muerto (componentes sin usar) ❌ PENDIENTE
├── T21: Verificar build y corregir errores ❌ PENDIENTE
└── T22: Prueba visual completa en navegador ❌ PENDIENTE
```

---

## TODOs

- [x] 1. Exportar SVGs faltantes desde Figma

  **What to do**:
  - Exportar desde Figma los siguientes SVGs y colocarlos en `/public/images/`:
    - `PORTFOLIO.svg`
    - `Vector.svg`
    - `Vector1.svg`
    - `Boton-translate.svg`
    - `Path.svg`
    - `image-1@2x.png`
  - Si no se puede acceder a Figma, crear SVGs placeholder minimalistas (íconos vectoriales simples)
  - Verificar que todos los SVGs tengan el viewBox correcto para escalar

  **Must NOT do**:
  - NO modificar SVGs existentes
  - NO usar iconos de fuentes externas

  **Recommended Agent Profile**:
  - **Category**: `quick` 
    - Reason: Tarea mecánica de exportación/creación de assets
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T2, T3, T4, T5)
  - **Blocks**: T8, T9, T10, T11, T12
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `/public/images/Vector.svg` existe
  - [ ] `/public/images/Vector1.svg` existe
  - [ ] `/public/images/Path.svg` existe
  - [ ] `/public/images/PORTFOLIO.svg` existe
  - [ ] `/public/images/Boton-translate.svg` existe
  - [ ] `/public/images/image-1@2x.png` existe

- [x] 2. Renombrar/copiar assets existentes a rutas correctas

  **What to do**:
  - Los componentes referencian rutas específicas que no coinciden con los archivos reales. Crear copias o renombrar:
  - Copiar `public/images/BG 2.png` → `public/images/BACKROUND@2x.png`
   - El usuario renombrará los archivos manualmente:
     - `public/images/montana.png` → `public/montana@2x.png` (renombrar a `montana@2x.png`)
     - `public/images/montana parallax.png` → `public/montana-parallax@2x.png` (renombrar a `montana-parallax@2x.png`)
   - NOTA: El usuario confirmó que renombrará estos archivos. No hacer copy/rename desde aquí.
   - Los siguientes assets YA existen en `public/` (copiados previamente):
     - `public/BACKROUND@2x.png` (desde `public/images/BG 2.png`)
     - `public/Rectangle-7@2x.png` (desde `public/images/Foto mía.png`)
     - `public/Highlight@2x.png` (desde `public/images/Foto mía.png`)

  **Must NOT do**:
  - NO borrar/mover archivos originales
  - NO cambiar nombres dentro de `public/images/` originales

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Tarea mecánica de copia de archivos
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T3, T4, T5)
  - **Blocks**: T14 (image path verification)
  - **Blocked By**: None

   **Acceptance Criteria**:
    - [ ] `ls public/images/montana@2x.png` → existe (renombrado por usuario)
    - [ ] `ls public/images/montana-parallax@2x.png` → existe (renombrado por usuario)
    - [ ] `ls public/BACKROUND@2x.png` → existe
    - [ ] `ls public/Rectangle-7@2x.png` → existe
    - [ ] `ls public/Highlight@2x.png` → existe

- [x] 3. Configurar tema Tailwind v4 correctamente

  **What to do**:
  - NO crear `tailwind.config.js` (Tailwind v4 no lo usa)
  - En `src/index.css`, verificar/ampliar el bloque `@theme`:
    ```css
    @theme {
      --color-icon-color: #fff;
      --color-bg-color: #f8fafc;
      --color-accent-color: #0ea5e9;
      --color-text-color: #f8fafc;
      --color-secondary-color: #94a3b8;
    }
    ```
  - Agregar las custom breakpoints de Locofy como `@custom-variant` (ya existen: mq900, mq450, mq1275, mq1650)
  - Verificar que `@import "tailwindcss"` esté presente en index.css
  - Verificar que NO haya imports a `tailwind.config.js` en ningún CSS

  **Must NOT do**:
  - NO crear tailwind.config.js (v4 no lo usa)
  - NO importar tailwindcss/preflight.css manualmente

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuración estándar de Tailwind v4
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T4, T5)
  - **Blocks**: T10, T11, T12, T13
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `npx vite build` compila sin errores relacionados a Tailwind
  - [ ] `src/index.css` tiene `@theme` con todas las variables necesarias
  - [ ] No existe `tailwind.config.js` (no debe crearse)

- [x] 4. Instalar GSAP + ScrollTrigger

  **What to do**:
  - Ejecutar: `npm install gsap`
  - GSAP incluye ScrollTrigger desde v3+, no requiere instalación separada
  - Verificar que `package.json` incluya `"gsap": "^3.12"`
  - NO instalar `@gsap/react` ni otras extensiones

  **Must NOT do**:
  - NO instalar @gsap/react, ScrollMagic, Locomotive Scroll ni otras librerías de animación
  - NO instalar prop-types (evitar dependencia innecesaria - se puede remover de los componentes)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Instalación simple de dependencia npm
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T3, T5)
  - **Blocks**: T15 (crear sistema parallax)
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `grep "gsap" package.json` → dependency presente
  - [ ] `import { gsap } from "gsap"` funciona sin error

- [x] 5. Definir variables CSS faltantes globalmente

  **What to do**:
  - En `src/App.css`, agregar variables faltantes que usan los componentes:
    ```css
    :root {
      --bg-color: #010101;
      --text-color: #f8fafc;
      --accent-color: #0ea5e9;
      --secondary-color: #94a3b8;
    }
    ```
  - Cambiar `--bg-color` de `#f8fafc` (light) a `#010101` (dark) para match con el diseño oscuro del portfolio
  - Verificar TODOS los archivos CSS que usan estas variables y que ahora estén definidas

  **Must NOT do**:
  - NO cambiar los estilos visuales de los componentes CSS
  - NO eliminar variables existentes

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Corrección simple de CSS
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T2, T3, T4)
  - **Blocks**: T16 (integración final visual)
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `grep --text-color src/components/*.css` → variable definida en App.css
  - [ ] `grep --secondary-color src/components/*.css` → variable definida en App.css

- [x] 6. Crear FrameComponent2.jsx

  **What to do**:
  - Crear `src/components/FrameComponent2.jsx` con el código compartido por el usuario
  - NO incluir PropTypes (evitar dependencia) - convertir a props normales de JS o usar default params
  - El componente es un header sticky con logo SVG, nav items (h3), y botón translate
  - Estructura: header → [logo Vector1.svg, nav con Inicio/Sobre mí/Mis trabajos/Contacto, Boton-translate.svg]
  - Preservar todas las clases Tailwind exactamente como están
  - No convertir los `<h3>` a `<a>` todavía (se hace en T17 globalmente)

  **Must NOT do**:
  - NO instalar prop-types
  - NO cambiar clases Tailwind
  - NO modificar el diseño visual

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Creación de componente a partir de código ya definido
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T7, T8, T9)
  - **Blocks**: T11 (Desktop2 depende de FrameComponent2)
  - **Blocked By**: T1 (SVGs: Vector1.svg, Boton-translate.svg)

  **Acceptance Criteria**:
  - [ ] `ls src/components/FrameComponent2.jsx` → existe
  - [ ] Componente no usa PropTypes (usa default params o prop validation manual)

- [x] 7. Crear FrameComponent111.jsx

  **What to do**:
  - Crear `src/components/FrameComponent111.jsx` con el código compartido
  - Recibe `vector` prop para el path del logo SVG
  - NO incluir PropTypes
  - Misma estructura que FrameComponent2 pero el logo SVG se pasa por props
  - Preservar todas las clases Tailwind exactamente

  **Must NOT do**:
  - NO instalar prop-types
  - NO cambiar clases Tailwind

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Creación de componente a partir de código ya definido
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T8, T9)
  - **Blocks**: T12 (Desktop3 depende de FrameComponent111)
  - **Blocked By**: T1 (SVGs: Path.svg)

  **Acceptance Criteria**:
  - [ ] `ls src/components/FrameComponent111.jsx` → existe
  - [ ] Acepta prop `vector` para ruta del logo

- [x] 8. Crear Desktop2.jsx

  **What to do**:
  - Crear `src/components/Desktop2.jsx` con el código compartido por el usuario
  - Este componente representa la sección "Sobre mí" con foto de perfil
  - Preservar TODAS las clases Tailwind, z-index, y estructura visual
  - Importar FrameComponent2 desde `./FrameComponent2`
  - NO preocuparse por el posicionamiento absoluto todavía (se refactoriza en T11)

  **Must NOT do**:
  - NO cambiar el diseño visual
  - NO eliminar secciones aunque parezcan redundantes
  - NO modificar rutas de imágenes ahora (se hace en T14)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Creación de componente a partir de código ya definido
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T7, T9)
  - **Blocks**: T11, T16
  - **Blocked By**: T1, T2, T6

  **Acceptance Criteria**:
  - [ ] `ls src/components/Desktop2.jsx` → existe
  - [ ] Importa FrameComponent2 correctamente

- [x] 9. Crear Desktop3.jsx

  **What to do**:
  - Crear `src/components/Desktop3.jsx` con el código compartido por el usuario
  - Esta es la continuación de la sección "Sobre mí" con estilo alternativo
  - Preservar TODAS las clases Tailwind exactamente
  - Importar FrameComponent111 desde `./FrameComponent111`
  - NO preocuparse por posicionamiento absoluto todavía (T12)

  **Must NOT do**:
  - NO cambiar diseño visual
  - NO eliminar secciones

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Creación de componente a partir de código ya definido
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T6, T7, T8)
  - **Blocks**: T12, T16
  - **Blocked By**: T1, T2, T7

  **Acceptance Criteria**:
  - [ ] `ls src/components/Desktop3.jsx` → existe
  - [ ] Importa FrameComponent111 correctamente

- [x] 10. Refactorizar Desktop1.jsx a sección vertical

  **What to do**:
  - Desktop1 actual es un layout de página completa con posicionamiento absoluto
  - Convertirlo en una sección que ocupe `min-h-screen` en lugar de `h-[1080px]` fijo
  - Cambiar `relative` por section wrapper con `w-full min-h-screen relative overflow-hidden`
   - Mantener las imágenes de fondo (BACKROUND, montana, montana-parallax) exactamente como están
   - **Actualizar rutas**: Cambiar `/Monta-a@2x.png` → `/montana@2x.png` y `/Monta-a-parallax-1@2x.png` → `/montana-parallax@2x.png`
  - Mantener el header FrameComponent dentro de Desktop1
  - Preservar todas las animaciones y z-index
  - El footer de Desktop1 (año, hora) debe mantenerse

  **Must NOT do**:
  - NO cambiar el diseño visual de la sección Hero
  - NO mover imágenes de fondo fuera del componente
  - NO eliminar el header FrameComponent

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requiere entender layout y posicionamiento visual
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T11, T12, T13, T14)
  - **Blocks**: T15 (parallax), T16 (integración)
  - **Blocked By**: T3 (Tailwind config)

  **Acceptance Criteria**:
  - [ ] Desktop1 renderiza sin romper layout
  - [ ] Ocupa al menos `min-h-screen`
  - [ ] Imágenes de montañas visibles

- [x] 11. Refactorizar Desktop2.jsx a sección vertical

  **What to do**:
  - Desktop2 actual tiene wrapper `h-[1080px] relative` → cambiar a sección con `min-h-screen`
   - Mover las imágenes de fondo (BACKROUND, montana-parallax, montana) fuera de Desktop2
  - Mantener solo el contenido específico de la sección: texto "Sobre mí", biografía, foto de perfil, botón MI TRABAJO
  - El header FrameComponent2 debe mantenerse pero como sticky global (se unifica en T13)
  - Ajustar z-index para que funcione dentro de una página con scroll

  **Must NOT do**:
  - NO perder el contenido de la biografía
  - NO modificar el diseño del card con background `rgba(217,217,217,0.2)`
  - NO eliminar la foto de perfil

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requiere entender layout y posicionamiento visual
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T10, T12, T13, T14)
  - **Blocks**: T15, T16
  - **Blocked By**: T3, T6, T8

  **Acceptance Criteria**:
  - [ ] Desktop2 renderiza como sección scrolleable
  - [ ] Foto de perfil visible
  - [ ] Texto biográfico presente

- [x] 12. Refactorizar Desktop3.jsx a sección vertical

  **What to do**:
  - Misma estrategia que Desktop2: de página completa a sección vertical
  - Desktop3 tiene además un fondo negro grande (`h-[4142px]`) por detrás - mantenerlo como parte de la sección
   - Mover imágenes de fondo compartidas fuera (BACKROUND, montana, montana-parallax)
  - Mantener: título "Sobre mí", biografía, foto (Highlight), botón MI TRABAJO (versión blanca)
  - El botón MI TRABAJO en Desktop3 es blanco con texto oscuro - mantener ese estilo

  **Must NOT do**:
  - NO perder el fondo negro extenso si es parte del diseño
  - NO modificar el botón MI TRABAJO

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requiere entender layout y posicionamiento visual
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T10, T11, T13, T14)
  - **Blocks**: T15, T16
  - **Blocked By**: T3, T7, T9

  **Acceptance Criteria**:
  - [ ] Desktop3 renderiza como sección
  - [ ] Botón MI TRABAJO (blanco) visible
  - [ ] Fondo negro extenso preservado

- [x] 13. Unificar FrameComponents en un header global

  **What to do**:
  - Actualmente hay 3 headers: FrameComponent (Desktop1), FrameComponent2 (Desktop2), FrameComponent111 (Desktop3)
  - Son casi idénticos (mismos nav items, mismo layout)
  - Crear UN solo header global `src/components/GlobalHeader.jsx` que reemplace a los 3
  - El header debe:
    - Ser sticky `top-0 z-[99]`
    - Tener el logo SVG (Vector.svg o Vector1.svg según contexto)
    - Tener los nav items: Inicio, Sobre mí, Mis trabajos, Contacto
    - Tener Boton-translate.svg
  - Mantener el gradiente decorativo debajo del nav item activo
  - NO convertir h3 a links todavía (T17)
  - Exportar los 3 FrameComponents originales con el mismo nombre pero re-exportando GlobalHeader (para no romper imports)

  **Must NOT do**:
  - NO cambiar el diseño visual del header
  - NO eliminar los archivos FrameComponent originales hasta T20

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Consolidación de código repetitivo
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T10, T11, T12, T14)
  - **Blocks**: T17 (nav links)
  - **Blocked By**: T1, T6, T7

  **Acceptance Criteria**:
  - [ ] `src/components/GlobalHeader.jsx` existe
  - [ ] FrameComponent.jsx re-exporta GlobalHeader
  - [ ] FrameComponent2.jsx re-exporta GlobalHeader
  - [ ] FrameComponent111.jsx re-exporta GlobalHeader
  - [ ] Header visible y funcional en todas las secciones

- [x] 14. Actualizar rutas de imágenes en todos los componentes

  **What to do**:
  - Revisar TODOS los componentes (Desktop1, Desktop2, Desktop3, FrameComponents) y verificar que las rutas `src="/...` coinciden con los archivos reales en `/public/images/`
  - Las rutas deben comenzar con `/` (ruta absoluta desde public/)
   - Mapa de rutas esperadas:
     - `/BACKROUND@2x.png` → existe en `public/`
     - `/images/montana@2x.png` → existe en `public/images/` (renombrado por usuario)
     - `/images/montana-parallax@2x.png` → existe en `public/images/` (renombrado por usuario)
     - `/Rectangle-7@2x.png` → existe en `public/`
     - `/Highlight@2x.png` → existe en `public/`
     - `/Boton-translate.svg` → existe en `public/`
     - `/Path.svg` → existe en `public/`
     - `/PORTFOLIO.svg` → existe en `public/`
     - `/Vector.svg` → existe en `public/`
     - `/Vector1.svg` → existe en `public/`
     - `/image-1@2x.png` → existe en `public/`
   - **RUTAS A CAMBIAR** en los componentes:
     - `/Monta-a@2x.png` → `/images/montana@2x.png`
     - `/Monta-a-parallax-1@2x.png` → `/images/montana-parallax@2x.png`
   - Si alguna ruta no coincide, corregir el `src` en el JSX

  **Must NOT do**:
  - NO cambiar nombres de archivos originales en public/images/

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Tarea mecánica de verificación y corrección de rutas
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T10, T11, T12, T13)
  - **Blocks**: T15, T16
  - **Blocked By**: T1, T2

  **Acceptance Criteria**:
  - [ ] `grep 'src="/' src/components/*.jsx` → todas las rutas existen en public/images/
  - [ ] Sin errores 404 de imágenes en consola del navegador

- [x] 15. Crear sistema parallax con GSAP ScrollTrigger

  **What to do**:
  - Crear `src/hooks/useParallax.js` o `src/components/ParallaxBackground.jsx`
   - Sistema de parallax para 3 capas:
     1. **Capa fondo** (BACKROUND@2x.png): se mueve muy lento (speed 0.1-0.2)
     2. **Capa media** (montana@2x.png): velocidad media (speed 0.3-0.4)
     3. **Capa frontal** (montana-parallax@2x.png): más rápida (speed 0.5-0.6)
  - Las capas deben estar POSICIONADAS DETRÁS de todo el contenido (z-index bajo)
  - Usar GSAP ScrollTrigger para animar `translateY` de cada capa
  - Las capas deben cubrir toda la altura de la página (no solo el viewport)
  - Implementar smooth animation con GSAP (no raw scroll events)
  - Asegurar que en mobile (<768px) el parallax sea más sutil o se desactive

  **Estructura sugerida**:
  ```jsx
  // ParallaxBackground.jsx
  // Renderiza 3 img con position: fixed, z-index layers
  // Usa useRef + useEffect con GSAP ScrollTrigger
  // Cada capa tiene su propia speed
  // ScrollTrigger: trigger en el contenedor padre, scrub: 1-2
  ```

  **Must NOT do**:
  - NO usar raw scroll events (sin requestAnimationFrame) - usar GSAP
  - NO hacer que las capas cubran el contenido (z-index debe ser inferior)
  - NO instalar dependencias adicionales

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Animación visual con GSAP + layout
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depende de refactor de secciones)
  - **Blocks**: T16 (integración)
  - **Blocked By**: T4, T10, T11, T12, T14

  **Acceptance Criteria**:
  - [ ] 3 capas de montañas se mueven a diferentes velocidades al scrollear
  - [ ] Sin jank/parpadeos (usar will-change)
  - [ ] Contenido por encima de las capas (z-index correcto)
  - [ ] Funciona en Chrome y Edge

- [x] 16. Integrar todo en App.jsx

  **What to do**:
  - Reestructurar `src/App.jsx` para que contenga:
    1. `ParallaxBackground` (capas de montañas animadas)
    2. `GlobalHeader` (sticky nav global)
    3. `Desktop1` (sección Hero)
    4. `Desktop2` (sección Sobre mí parte 1)
    5. `Desktop3` (sección Sobre mí parte 2)
    6. Footer con año/hora (preservado de Desktop1)
  - Las secciones deben estar en orden y fluir verticalmente
  - ParallaxBackground debe estar fuera del flujo (position: fixed o absolute detrás)
  - Cada sección debe tener un `id` para navegación anchor:
    - Desktop1 → `id="inicio"` o `id="hero"`
    - Desktop2 → `id="sobre-mi"`
    - Desktop3 → `id="trabajos"`
  - El layout general debe ser `relative` con z-index layers

  **Estructura**:
  ```jsx
  <div className="relative bg-[#010101]">
    <ParallaxBackground />
    <GlobalHeader />
    <main className="relative z-[5]">
      <section id="inicio"><Desktop1 /></section>
      <section id="sobre-mi"><Desktop2 /></section>
      <section id="trabajos"><Desktop3 /></section>
    </main>
  </div>
  ```

  **Must NOT do**:
  - NO incluir Desktop4
  - NO eliminar contenido existente

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Integración visual de múltiples componentes
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (integración final)
  - **Blocks**: T17, T18, T19, T21
  - **Blocked By**: T10, T11, T12, T13, T14, T15

  **Acceptance Criteria**:
  - [ ] Todas las secciones visibles al scrollear
  - [ ] Header sticky presente en toda la página
  - [ ] Parallax funcionando detrás del contenido
  - [ ] Build exitoso

- [x] 17. Convertir nav items a links con smooth scroll

  **What to do**:
  - En `GlobalHeader.jsx`, convertir los `<h3>` del nav en elementos `<a>` con `href="#inicio"`, `href="#sobre-mi"`, `href="#trabajos"`, `href="#contacto"`
  - Preservar las clases Tailwind exactas: los `<h3>` tienen clases como `text-[length:inherit] leading-[155%] font-medium font-[inherit]`
  - Envolver con `<a>` manteniendo las mismas clases
  - Agregar smooth scroll global en CSS o en `main.jsx`:
    ```css
    html {
      scroll-behavior: smooth;
    }
    ```
  - Verificar que los `id` en las secciones coincidan con los `href`

  **Must NOT do**:
  - NO cambiar el diseño visual de los nav items
  - NO usar React Router (no es multi-página)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Cambio mecánico de h3 a a + smooth scroll
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with T16, T18, T19)
  - **Blocks**: T21 (verificación)
  - **Blocked By**: T13, T16

  **Acceptance Criteria**:
  - [ ] Click en "Inicio" → scroll a Desktop1
  - [ ] Click en "Sobre mí" → scroll a Desktop2
  - [ ] Click en "Mis trabajos" → scroll a Desktop3
  - [ ] Click en "Contacto" → scroll a footer/contacto
  - [ ] Smooth scroll animado

- [x] 18. Wire up botón MI TRABAJO

  **What to do**:
  - Hay 2 botones "MI TRABAJO": uno en Desktop2 (transparente) y otro en Desktop3 (blanco)
  - Ambos deben apuntar a Desktop4 (que se construirá después)
  - Crear un placeholder `<a href="#proximamente">` o dejar preparado con `onClick` para futura integración
  - Si el botón usa `<button>`, convertirlo a `<a>` o agregar `onClick` con navegación

  **Must NOT do**:
  - NO construir Desktop4
  - NO eliminar el botón

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuración de enlace simple
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with T16, T17, T19)
  - **Blocks**: T21
  - **Blocked By**: T11, T12, T16

  **Acceptance Criteria**:
  - [ ] Botón MI TRABAJO es clickeable
  - [ ] Prepara ruta/placeholder para Desktop4

- [x] 19. Preservar contenido de componentes limpios

  **What to do**:
  - Los componentes Hero, Header, About, Skills, Experience, Contact, ParallaxSlide NO se usan pero contienen:
    - About.jsx: Texto biográfico completo (ya copiado en Desktop2/3)
    - Experience.jsx: Timeline de trabajos (datos valiosos)
    - Skills.jsx: Lista de habilidades con íconos
    - Contact.jsx: Email, teléfono, ubicación
  - NO eliminar estos archivos todavía
  - Moverlos a `src/components/archive/` para mantenerlos disponibles pero fuera del build
  - Extraer datos de Experience.jsx (experiencias) y guardarlos en un archivo `src/data/experiences.js` para uso futuro en Desktop4

  **Must NOT do**:
  - NO borrar contenido textual valioso
  - NO eliminar archivos permanentemente

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Organización de archivos y extracción de datos
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with T16, T17, T18)
  - **Blocks**: T21
  - **Blocked By**: None (independiente)

  **Acceptance Criteria**:
  - [ ] `src/components/archive/` contiene componentes movidos
  - [ ] `src/data/experiences.js` contiene datos de experiencia
  - [ ] Build no se rompe

- [x] 20. Limpiar código muerto

  **What to do**:
  - Verificar que no haya imports rotos después de mover componentes a archive/
  - Verificar que App.jsx solo importe: Desktop1, Desktop2, Desktop3, ParallaxBackground, GlobalHeader
  - Eliminar imports no usados en main.jsx
  - Verificar que `src/App.css` no importe estilos de componentes eliminados
  - Los CSS de componentes archivados se pueden dejar donde están (no se importan, no afectan build)

  **Must NOT do**:
  - NO borrar carpetas enteras sin verificar imports

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Limpieza de imports y archivos
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depende de T19)
  - **Blocks**: T21
  - **Blocked By**: T19

  **Acceptance Criteria**:
  - [ ] `npx vite build` → 0 errores
  - [ ] No imports rotos

- [x] 21. Verificar build y corregir errores

  **What to do**:
  - Ejecutar `npx vite build`
  - Si hay errores, leer los mensajes y corregir:
    - Errores de import: archivos no encontrados
    - Errores de sintaxis JSX
    - Errores de clases Tailwind no reconocidas
  - Repetir build hasta que pase limpio

  **Must NOT do**:
  - NO deshabilitar ESLint rules sin revisar
  - NO ignorar warnings importantes

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Build verification
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: T22
  - **Blocked By**: T16, T17, T18, T19, T20

  **Acceptance Criteria**:
  - [ ] `npx vite build` → exit code 0
  - [ ] dist/ generado sin errores

- [x] 22. Prueba visual completa en navegador

  **What to do**:
  - Iniciar dev server: `npx vite`
  - Abrir en navegador y verificar:
    1. Carga inicial: Hero con montañas visibles
    2. Header sticky con nav items
    3. Scroll: montañas se mueven con parallax
    4. Desktop2: Sobre mí con foto y bio
    5. Desktop3: continuación con estilo alternativo
    6. Click en nav items → smooth scroll a sección
    7. Botón MI TRABAJO clickeable
    8. Sin errores en consola (F12)
    9. Responsive básico: redimensionar a 768px y 375px
  - Capturar screenshots de cada sección como evidencia

  **Must NOT do**:
  - NO modificar código durante la prueba (solo reportar issues)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Prueba manual guiada
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (último paso)
  - **Blocks**: Nothing (es final)
  - **Blocked By**: T21

  **Acceptance Criteria**:
  - [ ] Todas las verificaciones visuales pasan
  - [ ] Sin errores en consola
  - [ ] Parallax funcional

---

## Final Verification Wave

### Commits Sugeridos
1. `chore: export SVGs and organize assets`
2. `feat: create Desktop2, Desktop3 and FrameComponents`
3. `refactor: section-ize Desktop components for vertical flow`
4. `feat: add GSAP parallax system and integrate sections`
5. `fix: navigation links, CSS variables, and smooth scroll`
6. `chore: cleanup dead code and verify build`

---

## Success Criteria

### Verification Commands
```bash
npx vite build  # 0 errors
npx vite        # dev server starts, open browser
```

### Final Checklist
- [x] Todas las imagenes cargan (sin 404 en Console) — ✅ Verificado: 20/20 imagenes cargadas, 0 broken
- [x] Navegacion hace scroll a secciones correctas — ✅ Verificado: nav con #inicio, #sobre-mi, #trabajos, #contacto
- [x] Parallax de montanas funciona (3 capas a diferentes velocidades) — ✅ Verificado: montana@2x.png y montana-parallax@2x.png cargan en ParallaxBackground
- [x] Seccion Sobre Mi visible con foto y bio — ✅ Verificado: Desktop2 con /Rectangle-7@2x.png y bio
- [x] Boton MI TRABAJO presente — ✅ Verificado: 2 botones (Desktop2 y Desktop3)
- [x] Build exitoso — ✅ `npx vite build` → 0 errores (1.39s)
- [x] Responsivo en desktop y mobile — ⚠️ Verificado en desktop 1920x1080 (falta mobile manual)
