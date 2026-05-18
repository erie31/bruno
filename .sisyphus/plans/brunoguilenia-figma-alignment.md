# brunoguilenia.com — Figma Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax — mark each complete as you go. Do NOT skip tasks.

> **Quick Summary**: Refinar brunoguilenia.com (React + Vite + GSAP + Tailwind) para que coincida exactamente con el prototipo de Figma. El proyecto ya está cerca (~80%), necesita ajustes en la tarjeta "Sobre mi", calibración de parallax, y fixes de assets.
> 
> **Deliverables**:
> - FloatingAboutCard.jsx: Layout correcto + firma vectorial + sin overflow
> - HeroParallax.jsx: Sin duplicación de tarjeta, animaciones calibradas
> - FloatingNav.jsx: Logo path corregido
> 
> **Estimated Effort**: Short (5-6 tareas)
> **Parallel Execution**: YES — Wave 1 (3 tareas paralelas), Wave 2 (2-3 tareas)
> **Critical Path**: Fix card duplicación → Add signature → Calibrar parallax

---

## Context

### Original Request
Hacer que brunoguilenia.com coincida **exactamente** con el prototipo de Figma. El diseño usa un concepto de "Oclusión Escenográfica" con capas z-index que se mueven independientemente en un viewport fijo de 100vh (pin:true de GSAP).

### Interview Summary
**Key Decisions**:
- **Enfoque**: Híbrido — refactorizar tarjeta "Sobre mi" + calibrar parallax + fixes (Opción A)
- **Tests**: Pospuestos hasta nuevo aviso
- **Responsive**: Desktop-only por ahora (mobile tendrá su propio Figma)
- **TrabajosPage**: No tocar
- **Transición entre páginas**: Simple (React Router, sin animación)

**Metis Findings** (auto-resueltos):
- **CRÍTICO**: Duplicación de `<FloatingAboutCard>` en HeroParallax.jsx (líneas 152-174). Dos instancias de la tarjeta renderizadas, una sobre la otra. La primera usa props que el componente no acepta (`innerTextRef`, `innerPhotoRef`, `innerSignatureRef`). Esto explica el overflow visual.
- **MINOR**: `cardRef` asignado a dos divs anidados (ref duplicada). La segunda asignación sobrescribe la primera.
- **MINOR**: GSAP anima refs (`cardInnerTextRef`, `cardInnerPhotoRef`, `cardInnerSignatureRef`) que NO están conectados a ningún elemento DOM real porque FloatingAboutCard no los exporta.
- **AMBIGUOUS**: Assets SVG del Figma (BACKROUND.svg, Montaña.svg, PORTFOLIO.svg) no se usan en código — se usan PNGs equivalentes. **Default aplicado**: Mantener PNGs ya que el usuario confirmó que el sitio está "cerca" del Figma.

---

## Work Objectives

### Core Objective
Alinear el portfolio de Bruno Guilenia con el diseño de Figma, arreglando la duplicación de la tarjeta "Sobre mi", agregando la firma vectorial, calibrando animaciones, y corrigiendo rutas de assets.

### Concrete Deliverables
- `src/components/FloatingAboutCard.jsx` — refactorizado: sin overflow, con firma Path.svg, refs expuestas para animación GSAP
- `src/components/HeroParallax.jsx` — limpio: sin duplicación de tarjeta, parámetros calibrados, animaciones funcionales
- `src/components/FloatingNav.jsx` — ruta del logo corregida

### Definition of Done
- [ ] Al hacer scroll en la página principal, la montaña panea a la derecha, el texto PORTFOLIO se desvanece, y la tarjeta emerge suavemente
- [ ] La tarjeta "Sobre mi" muestra el contenido sin overflow, con la firma Path.svg visible
- [ ] El navbar muestra el logo correctamente
- [ ] Las animaciones internas de la tarjeta (texto, foto, firma) se ejecutan con el staggered parallax

### Must Have
- Una sola instancia de FloatingAboutCard en la escena, no dos
- La firma Path.svg debe aparecer en la tarjeta
- El contenido de la tarjeta no debe desbordarse del contenedor glassmorphism
- El logo del navbar debe cargar desde la ruta correcta

### Must NOT Have
- No modificar TrabajosPage
- No agregar tests/QA
- No cambiar la paleta de colores ni tipografías existentes
- No modificar el concepto de oclusión escenográfica (no cambiar la estructura de capas)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — fixes independientes):
├── Task 1: FloatingNav — corregir ruta del logo [quick]
├── Task 2: HeroParallax — eliminar tarjeta duplicada y limpiar refs [quick]
└── Task 3: FloatingAboutCard — agregar firma Path.svg [quick]

Wave 2 (Después de Wave 1 — refactor + calibración):
├── Task 4: FloatingAboutCard — arreglar layout, overflow, espaciado [unspecified-high]
├── Task 5: HeroParallax — calibrar parámetros de animación [unspecified-high]
└── Task 6: Verificación final — build y validación manual [quick]
```

### Dependency Matrix
- **Task 1**: None → None
- **Task 2**: None → Task 4, Task 5
- **Task 3**: None → Task 4
- **Task 4**: Task 2, 3 → Task 6
- **Task 5**: Task 2 → Task 6
- **Task 6**: Task 4, 5 → Done

---

## TODOs

> **NOTA**: Sin tests automatizados (pospuestos por el usuario). Cada tarea debe ser verificada manualmente ejecutando `npm run dev` y revisando en navegador.
> 
> **A task WITHOUT verification steps is INCOMPLETE. No exceptions.**

- [x] 1. FloatingNav — corregir ruta del logo

  **What to do**:
  - En `src/components/FloatingNav.jsx`, línea 16, cambiar `src="public/images/logo BG.png"` a `src="/images/logo BG.png"`
  - El path `public/` es la raíz del servidor, no debe incluirse en la URL

  **Must NOT do**:
  - No cambiar nada más del componente
  - No cambiar estilo o posición del navbar

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Cambio trivial de una línea, sin impacto arquitectónico
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (con Tasks 2, 3)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/components/FloatingNav.jsx:14-18` — Línea del src del logo a corregir

  **Acceptance Criteria**:
  - [ ] El logo se muestra correctamente en el navbar al cargar la página
  - [ ] No hay errores 404 en consola para el logo

  **Verification**:
  ```bash
  npm run dev  # Iniciar servidor
  ```
  1. Abrir http://localhost:5173/
  2. Inspeccionar el navbar: el logo debe cargarse sin broken image
  3. Abrir DevTools → Network: verificar que `/images/logo BG.png` responda 200

  **Commit**: YES
  - Message: `fix(nav): correct logo path in FloatingNav`
  - Files: `src/components/FloatingNav.jsx`

---

- [x] 2. HeroParallax — eliminar tarjeta duplicada y limpiar refs

  **What to do**:
  En `src/components/HeroParallax.jsx`, líneas 152-174:
  1. Eliminar la duplicación: actualmente hay DOS `<div ref={cardRef}>` anidados y DOS `<FloatingAboutCard>`. Debe quedar UN solo wrapper con `cardRef` y UNA sola instancia de `<FloatingAboutCard>`.
  2. Eliminar los refs que apuntan a nada: `cardInnerTextRef`, `cardInnerPhotoRef`, `cardInnerSignatureRef` (declarados en líneas 37-39 y usados en líneas 91-107 y 163-167)
  3. Eliminar la sección de animaciones GSAP que usa esos refs (líneas 91-107 aproximadamente)
  4. Simplificar: la tarjeta ahora estará contenida dentro del wrapper `cardRef` y el GSAP anima el wrapper completo

  **Estructura final esperada** (z-30):
  ```jsx
  {/* z-30 (Capa Media Animada): La Tarjeta viaja libre en la raíz */}
  <div
    ref={cardRef}
    className="absolute inset-0 w-full h-full z-30 pointer-events-none flex items-end justify-center pb-12"
  >
    <div className="pointer-events-auto w-full max-w-5xl px-4">
      <FloatingAboutCard />
    </div>
  </div>
  ```

  **Must NOT do**:
  - No cambiar la estructura de otras capas (z-0, z-10, z-20, z-40, z-50)
  - No modificar FloatingAboutCard.jsx (eso es tarea separada)
  - No cambiar los nombres de los parámetros de calibración

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Eliminación de código duplicado, cambios localizados
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (con Tasks 1, 3)
  - **Blocks**: Task 4, Task 5
  - **Blocked By**: None

  **References**:
  - `src/components/HeroParallax.jsx:31-39` — Declaración de refs
  - `src/components/HeroParallax.jsx:83-107` — Animaciones GSAP que usan refs internos
  - `src/components/HeroParallax.jsx:152-174` — Bloque duplicado de la tarjeta

  **Acceptance Criteria**:
  - [ ] Solo hay UNA instancia de `<FloatingAboutCard>` en el JSX
  - [ ] `cardRef` está asignado a un solo div
  - [ ] No hay referencias a `cardInnerTextRef`, `cardInnerPhotoRef`, `cardInnerSignatureRef`
  - [ ] La app compila sin errores: `npm run build`

  **Verification**:
  ```bash
  npm run build  # Verificar que compila
  ```
  1. Iniciar servidor: `npm run dev`
  2. Abrir en navegador, verificar que la escena carga sin errores de consola
  3. Hacer scroll: la tarjeta debe aparecer (aunque sin animaciones internas todavía)

  **Commit**: YES
  - Message: `fix(hero): remove duplicate FloatingAboutCard and dead refs`
  - Files: `src/components/HeroParallax.jsx`

---

- [x] 3. FloatingAboutCard — agregar firma vectorial Path.svg

  **What to do**:
  En `src/components/FloatingAboutCard.jsx`:
  1. Después del bloque de biografía (después de la línea 30), agregar la firma vectorial:
  ```jsx
  {/* Firma vectorial */}
  <img
    src="/Path.svg"
    alt="Firma Bruno Guilenia"
    className="w-[120px] h-auto mt-6 opacity-80"
  />
  ```
  2. Ajustar el `gap` del contenedor de texto si es necesario para que la firma tenga espacio

  **Must NOT do**:
  - No cambiar el contenido del texto
  - No cambiar la foto ni su tamaño
  - No cambiar el glassmorphism

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Agregar un elemento visual simple, cambio localizado
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (con Tasks 1, 2)
  - **Blocks**: Task 4
  - **Blocked By**: None

  **References**:
  - `public/Path.svg` — Archivo de la firma vectorial
  - `src/components/FloatingAboutCard.jsx:20-30` — Bloque de biografía, después del cual va la firma

  **Acceptance Criteria**:
  - [ ] Path.svg se renderiza debajo de la biografía en la tarjeta
  - [ ] La firma es visible y tiene el tamaño/opacidad adecuados
  - [ ] No hay errores de carga del SVG

  **Verification**:
  1. Iniciar servidor: `npm run dev`
  2. Hacer scroll hasta que la tarjeta sea visible
  3. Verificar que Path.svg aparezca debajo del texto de biografía
  4. Verificar que el SVG cargue correctamente (DevTools → Network)

  **Commit**: YES
  - Message: `feat(card): add vector signature Path.svg to About card`
  - Files: `src/components/FloatingAboutCard.jsx`

---

- [x] 4. FloatingAboutCard — arreglar layout, overflow y espaciado

  **What to do**:
  En `src/components/FloatingAboutCard.jsx`, ajustar los estilos para que el contenido no se desborde:
  
  1. **Verificar el contenedor glassmorphism** (línea 9):
     - Asegurar que `py-[55px] pl-[94px] pr-[71px]` sea suficiente padding
     - Si hay overflow horizontal, agregar `overflow-hidden` o ajustar padding
     - Verificar que `gap-[129px]` entre texto y foto sea el correcto
  
  2. **Ajustar el section de texto** (línea 11):
     - `min-w-[647px]` puede ser muy ancho para algunos viewports — considerar cambiar a valores relativos
     - Si el contenido desborda verticalmente, reducir tamaños de fuente o padding
  
  3. **Ajustar tamaños de texto** (líneas 15-29):
     - Título "Sobre mi ...": `text-[80.5px]` → verificar que coincida con Figma
     - Biografía: `text-[28.5px]` → verificar que coincida con Figma
     - Ajustar `leading` si es necesario
  
  4. **Ajustar la foto** (línea 35-39):
     - `w-[526px]` — verificar que sea el tamaño correcto del Figma
     - `rounded-[74.9px]` — proviene del Figma, verificar que se vea bien
  
  5. **Ajustar CTA "MI TRABAJO"** (líneas 43-54):
     - Verificar posición relativa a la card
     - Ajustar `mt-[-40px] md:mt-[-80px] lg:mt-[-128px]` si el posicionamiento no es correcto

  6. **IMPORTANTE**: Si el componente ahora necesita exponer refs para animación GSAP (porque en Task 2 eliminamos las animaciones de refs internos), considerar si es necesario o si la animación del wrapper completo es suficiente.

  **Must NOT do**:
  - No cambiar el contenido del texto
  - No eliminar la funcionalidad de glassmorphism
  - No cambiar la foto

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Ajustes visuales que requieren precisión para coincidir con Figma
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depende de Tasks 2 y 3)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 6
  - **Blocked By**: Task 2, Task 3

  **References**:
  - `src/components/FloatingAboutCard.jsx:1-60` — Todo el componente
  - `src/components/FloatingAboutCard.jsx:9` — Contenedor glassmorphism con estilos
  - `public/Rectangle-7@2x.png` — Foto de perfil
  - `public/Path.svg` — Firma vectorial (agregada en Task 3)

  **Acceptance Criteria**:
  - [ ] El contenido textual no se desborda del contenedor glassmorphism
  - [ ] La firma Path.svg es visible debajo de la biografía
  - [ ] La foto se ve correctamente con border-radius ~75px
  - [ ] El CTA "MI TRABAJO" está posicionado correctamente debajo de la card
  - [ ] En viewport 1920x1080, la card se ve idéntica al Figma

  **Verification**:
  1. Iniciar servidor: `npm run dev`
  2. Abrir en navegador (1920x1080)
  3. Hacer scroll hasta que la tarjeta emerja completamente
  4. Verificar visualmente que:
     - La tarjeta no tiene scroll interno (todo el contenido es visible)
     - La firma Path.svg está visible
     - Los textos tienen el tamaño y espaciado correctos
     - La foto tiene bordes redondeados
     - El botón "MI TRABAJO" está bien posicionado

  **Commit**: YES
  - Message: `fix(card): adjust layout, spacing, and prevent overflow`
  - Files: `src/components/FloatingAboutCard.jsx`

---

- [x] 5. HeroParallax — calibrar parámetros de animación

  **What to do**:
  En `src/components/HeroParallax.jsx`, ajustar las constantes de animación (líneas 13-29):

  1. **PARALLAX_SCRUB**: Actual 1.5 — ajustar si la animación se siente muy lenta/rápida (rango típico: 1-2)
  2. **SCROLL_DISTANCE**: Actual "+=2000" — ajustar si el scroll es muy largo/corto
  3. **TEXT_Y_SPEED**: Actual -40 — el texto debe despegarse limpiamente de la montaña
  4. **TEXT_X_SPEED**: Actual -15 — movimiento sutil a la izquierda
  5. **TEXT_FADE_END**: Actual 0.4 — el texto debe desaparecer en la primera mitad del scroll
  6. **MOUNTAIN_Y_SPEED**: Actual -10 — movimiento lento hacia arriba
  7. **MOUNTAIN_X_SPEED**: Actual 40 — paneo a la derecha
  8. **MOUNTAIN_FADE_END**: Actual 0.6 — se desvanece después del texto
  9. **Y_ROCKS_FOREGROUND**: Actual -2 — casi fijas
  10. **CARD_PEEK_HEIGHT**: Actual "calc(100vh - 120px)" — altura del peek inicial (120px visible)
  11. **CARD_FINAL_Y**: Actual "0vh" — posición final de la tarjeta

  **Regla general**: La coreografía debe sentirse natural:
  - El texto PORTFOLIO se desvanece primero
  - La montaña panea a la derecha mientras se desvanece
  - La tarjeta emerge suavemente desde abajo
  - Las rocas del frente se mantienen casi estáticas (marco de oclusión)

  **Must NOT do**:
  - No cambiar la estructura de capas ni el pin:true
  - No modificar FloatingAboutCard

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requiere ajuste fino de animaciones y prueba visual iterativa
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depende de Task 2)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 6
  - **Blocked By**: Task 2

  **References**:
  - `src/components/HeroParallax.jsx:10-29` — Constantes de calibración
  - `src/components/HeroParallax.jsx:64-114` — Animaciones GSAP que usan las constantes

  **Acceptance Criteria**:
  - [ ] Al scrollear, el texto PORTFOLIO se desvanece primero (antes que la montaña)
  - [ ] La montaña panea hacia la derecha mientras se desvanece
  - [ ] La tarjeta emerge suavemente desde la parte inferior
  - [ ] Las rocas del frente permanecen como marco de oclusión
  - [ ] La animación se siente fluida (sin saltos ni cortes)

  **Verification**:
  1. Iniciar servidor: `npm run dev`
  2. Abrir en navegador en 1920x1080
  3. Hacer scroll lentamente y verificar la coreografía:
     - Fase 1 (scroll 0-30%): texto PORTFOLIO se desvanece, montaña panea
     - Fase 2 (scroll 30-60%): montaña sigue paneando, tarjeta emerge
     - Fase 3 (scroll 60-100%): tarjeta completamente visible, rocas enmarcan
  4. Ajustar constantes si es necesario hasta que la animación se vea correcta

  **Commit**: YES
  - Message: `chore(hero): calibrate parallax animation parameters`
  - Files: `src/components/HeroParallax.jsx`

---

- [x] 6. Verificación final: build y validación

  **What to do**:
  1. Ejecutar `npm run build` y verificar que compile sin errores
  2. Iniciar servidor de preview: `npm run preview`
  3. Verificar en navegador que todos los cambios funcionen correctamente:
     - La tarjeta se muestra una sola vez, sin overflow
     - La firma Path.svg está visible
     - El logo del navbar carga correctamente
     - Las animaciones de parallax funcionan suavemente
  4. Verificar que no haya errores en la consola del navegador

  **Must NOT do**:
  - No hacer cambios de código en esta tarea

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Tarea de verificación, sin cambios de código
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Final
  - **Blocks**: Done
  - **Blocked By**: Task 4, Task 5

  **Acceptance Criteria**:
  - [ ] `npm run build` compila sin errores
  - [ ] No hay errores 404 en consola para assets
  - [ ] La escena completa funciona correctamente

  **Verification**:
  ```bash
  npm run build
  npm run preview
  ```
  1. Abrir http://localhost:4173/
  2. Hacer scroll completo por la página
  3. Navegar a /trabajos y volver
  4. Verificar que no haya errores en consola

  **Commit**: NO (se agrupa con commits anteriores)

---

## Final Verification

- [x] `npm run build` → exit 0
- [x] La tarjeta "Sobre mi" se ve correctamente (1 instancia, sin overflow, con firma)
- [x] Navbar logo cargado correctamente
- [x] Animaciones de parallax fluidas
- [x] Sin errores en consola del navegador

## Post-Plan Calibration (May 17): Proporciones Card.svg

### Cambios aplicados

| Archivo | Cambio |
|---------|--------|
| `src/components/HeroParallax.jsx` | Rocks z-40: `absolute bottom-0 left-0 w-full h-[60%]` → `absolute inset-0 w-full h-full` |
| `src/components/HeroParallax.jsx` | Rocks img: `object-cover object-top brightness-50` → `object-cover object-bottom` |
| `src/components/HeroParallax.jsx` | Card z-30: `pb-12` → `pb-24`, `max-w-5xl` → `max-w-[1300px]` |
| `src/components/HeroParallax.jsx` | Nuevos refs `cardInnerPhotoRef`, `cardInnerSignatureRef` |
| `src/components/HeroParallax.jsx` | GSAP: photo arranca yPercent:10, firma scale 0→1 con back.out(1.5) |
| `src/components/FloatingAboutCard.jsx` | Props `photoRef`, `signatureRef` agregados y asignados a elementos |

## Commit Strategy

- **Task 1**: `fix(nav): correct logo path in FloatingNav`
- **Task 2**: `fix(hero): remove duplicate FloatingAboutCard and dead refs`
- **Task 3**: `feat(card): add vector signature Path.svg to About card`
- **Task 4**: `fix(card): adjust layout, spacing, and prevent overflow`
- **Task 5**: `chore(hero): calibrate parallax animation parameters`

## Success Criteria

- El sitio se ve **exactamente** como el prototipo de Figma
- La tarjeta "Sobre mi" muestra el contenido correctamente sin desbordamiento
- La firma vectorial Path.svg está presente
- La secuencia de animación parallax es fluida y cinematográfica
- El logo del navbar carga sin errores
