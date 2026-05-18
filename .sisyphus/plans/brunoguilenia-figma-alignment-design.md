# Design Doc: brunoguilenia.com — Figma Alignment

**Date**: 2026-05-17
**Author**: Prometheus (Plan Consultant)
**Status**: Draft for review

---

## TL;DR

Refinar el portfolio de Bruno Guilenia (React + Vite + GSAP + Tailwind) para que coincida **exactamente** con el prototipo de Figma. El concepto es "Oclusión Escenográfica": una sola página con scroll teatral donde las capas visuales se mueven independientemente con pin:true de GSAP. Los cambios son ajustes menores — la estructura ya está implementada.

---

## Context

### El Concepto: Oclusión Escenográfica
El diseño funciona como un **escenario de teatro**. El viewport está fijo en 100vh (pin:true). El scroll no mueve la página hacia abajo — mueve las capas internas:

- **z-0**: Fondo estático (cielo/telón)
- **z-10**: Montaña lejana — paneo lateral derecho
- **z-20**: Texto "PORTFOLIO" — sube y se desvanece
- **z-30**: Tarjeta "Sobre mí" glassmorphism — emerge desde abajo
- **z-40**: Rocas/foreground — marco de oclusión
- **z-50**: UI fija (navbar, clock, año)

### Stack
- React 19 + Vite 5 + Tailwind CSS 4
- GSAP 3 (ScrollTrigger) para animaciones
- React Router 7 (rutas: `/` y `/trabajos`)
- Firebase Hosting

### Estado Actual
La mayoría de la funcionalidad ya existe en `HeroParallax.jsx`, `FloatingAboutCard.jsx`, `FloatingNav.jsx`, `ClockIndicator.jsx`, y `TrabajosPage.jsx`. El proyecto está cerca del Figma pero necesita refinamiento.

---

## Scope

### IN Scope
1. **FloatingAboutCard**: Reestructurar layout para eliminar overflow, agregar firma vectorial (Path.svg), ajustar espaciado
2. **HeroParallax**: Calibrar parámetros de animación (velocidades, distancias, opacidad)
3. **FloatingNav**: Corregir ruta del logo
4. **Background**: Verificar que BACKROUND.svg se use correctamente como fondo
5. **QA**: Sin tests por ahora (pospuesto)

### OUT Scope
- TrabajosPage (ya coincide con Figma)
- Mobile responsive (tendrá su propio prototipo Figma más adelante)
- SEO / meta tags
- Rendimiento / optimización de assets
- Unit tests (pospuestos)

---

## Design Changes

### 1. FloatingAboutCard.jsx

**Problemas**:
- El contenido textual se desborda del contenedor glassmorphism
- Falta la firma vectorial (Path.svg) en la esquina inferior del bloque de texto
- Los tamaños de texto/espaciado pueden no coincidir con Figma

**Solución**:
- Ajustar padding del contenedor principal para que el contenido quepa sin overflow
- Agregar `<img src="/Path.svg" alt="Firma" />` al final del bloque de biografía
- Mantener glassmorphism: `bg-[rgba(255,255,255,0.05)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.15)]`
- Revisar que la foto (Rectangle-7@2x.png) tenga el border-radius correcto (~75px)
- Ajustar tamaños de fuente y line-height para que el contenido no desborde

### 2. HeroParallax.jsx — Calibración

**Parámetros a calibrar** (constantes al inicio del archivo):

| Constante | Descripción | Valor Actual | Nota |
|-----------|-------------|-------------|------|
| PARALLAX_SCRUB | Suavidad del scrub | 1.5 | Ajustar si es necesario |
| SCROLL_DISTANCE | Distancia total de scroll | "+=2000" | Ajustar si es necesario |
| TEXT_Y_SPEED | Velocidad vertical del texto | -40 | El texto debe despegarse de la montaña |
| TEXT_X_SPEED | Desplazamiento horizontal del texto | -15 | Sutil movimiento a izquierda |
| TEXT_FADE_END | Progreso donde el texto se desvanece | 0.4 | Debe desaparecer en la primera mitad |
| MOUNTAIN_Y_SPEED | Velocidad vertical de la montaña | -10 | Movimiento lento para profundidad |
| MOUNTAIN_X_SPEED | Paneo horizontal de la montaña | 40 | Hacia la derecha, cinematográfico |
| MOUNTAIN_FADE_END | Progreso donde la montaña se desvanece | 0.6 | Se desvanece después del texto |
| Y_ROCKS_FOREGROUND | Posición de rocas | -2 | Casi fijas, marco de oclusión |
| CARD_PEEK_HEIGHT | Altura inicial del peek de la card | "calc(100vh - 120px)" | 120px visibles al inicio |
| CARD_FINAL_Y | Posición final de la card | "0vh" | Emerge completamente |

### 3. FloatingNav.jsx

- **Bug**: `src="public/images/logo BG.png"` → no carga correctamente
- **Fix**: Cambiar a `src="/images/logo BG.png"`

### 4. Background (BACKROUND.svg)

- Verificar que BACKROUND.svg se esté renderizando como capa de fondo (z-0)
- Si no está implementado, agregarlo como imagen de fondo estática en HeroParallax

---

## Assets References

| Asset | Ruta | Propósito |
|-------|------|-----------|
| BACKROUND.svg | `/BACKROUND.svg` | Fondo cielo estático (z-0) |
| Montaña.svg | `/Montaña.svg` | Montaña lejana con parallax (z-10) |
| PORTFOLIO.svg | `/PORTFOLIO.svg` | Texto gigante PORTFOLIO (z-20) |
| Card.svg | `/Card.svg` | Referencia de diseño de la tarjeta |
| Card2.svg | `/Card2.svg` | Referencia alternativa de tarjeta |
| Rectangle-7@2x.png | `/Rectangle-7@2x.png` | Foto de Bruno en la tarjeta |
| Path.svg | `/Path.svg` | Firma vectorial de Bruno |
| logo BG.png | `/images/logo BG.png` | Logo del navbar |
| Boton-translate.svg | `/Boton-translate.svg` | Botón de idioma EN |
| Vector1.svg | `/Vector1.svg` | Logo triangular para páginas secundarias |
| FG.svg | `/images/FG.svg` | Foreground/rocas de oclusión (z-40) |
| montana@2x.png | `/images/montana@2x.png` | Textura de montaña para parallax |

---

## Implementation Plan (Next Step)

1. FloatingAboutCard: arreglar layout + agregar Path.svg
2. HeroParallax: calibrar parámetros de animación
3. Background: verificar/agregar BACKROUND.svg como fondo
4. FloatingNav: corregir ruta del logo
5. QA visual con browser: verificar que todo coincida

---

## Self-Review Checklist

- [ ] ¿Cada cambio está claramente definido?
- [ ] ¿Las rutas de assets son correctas?
- [ ] ¿No hay ambigüedad sobre qué archivos modificar?
- [ ] ¿El scope está claramente delimitado?
- [ ] ¿Se especifica qué NO hacer?
- [ ] ¿Los parámetros de calibración son ajustables?
