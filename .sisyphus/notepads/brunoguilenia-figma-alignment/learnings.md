# W1-T2: HeroParallax — Fix Completado

## Cambios realizados

### 1. Eliminación de refs muertas (líneas 37-39)
- Eliminados: `cardInnerTextRef`, `cardInnerPhotoRef`, `cardInnerSignatureRef`
- Estos refs nunca se attachaban a ningún elemento DOM

### 2. Eliminación de animaciones GSAP muertas (líneas 91-107)
- Eliminados 3 bloques `masterTl.fromTo()` que animaban los refs muertos
- La animación de la tarjeta principal (`cardRef`) se mantiene

### 3. Estructura de tarjeta corregida (líneas 129-137)
- ANTES: 2 `<div ref={cardRef}>` anidados + 2 `<FloatingAboutCard>` instances
- DESPUÉS: 1 `<div ref={cardRef}>` + 1 `<FloatingAboutCard />`

## Verificación
- `cardRef` ahora está asignado a un solo div
- Solo una instancia de FloatingAboutCard
- Props muertos (innerTextRef, innerPhotoRef, innerSignatureRef) eliminados
- Otras capas (z-0, z-10, z-20, z-40, z-50) sin cambios

# W2-T5: HeroParallax — Calibración de parámetros de animación

## Cambios realizados

| Constante | Antes | Después | Efecto |
|---|---|---|---|
| `TEXT_Y_SPEED` | -40 | -45 | Texto sube más agresivamente, se despega antes de la montaña |
| `TEXT_FADE_END` | 0.4 | 0.35 | Texto se desvanece más rápido (35% del scroll vs 40%) |
| `MOUNTAIN_X_SPEED` | 40 | 45 | Paneo de montaña más cinematográfico hacia la derecha |
| `MOUNTAIN_FADE_END` | 0.6 | 0.55 | Montaña se desvanece un poco antes (55% vs 60%) |

## Constantes sin cambios

- `PARALLAX_SCRUB`: 1.5 ✓
- `SCROLL_DISTANCE`: "+=2000" ✓
- `TEXT_X_SPEED`: -15 ✓
- `MOUNTAIN_Y_SPEED`: -10 ✓
- `Y_ROCKS_FOREGROUND`: -2 ✓
- `CARD_PEEK_HEIGHT`: "calc(100vh - 120px)" ✓
- `CARD_FINAL_Y`: "0vh" ✓

## Racional

- **TEXT_Y_SPEED -45**: Mayor separación vertical entre texto y montaña. El texto "despega" antes, reforzando la desarticulación escenográfica.
- **TEXT_FADE_END 0.35**: El texto desaparece en el primer tercio del scroll, dejando espacio visual para que la tarjeta tome protagonismo.
- **MOUNTAIN_X_SPEED 45**: Paneo más marcado para un feel más cinematográfico y dramático.
- **MOUNTAIN_FADE_END 0.55**: La montaña persiste más que el texto (0.35 vs 0.55) pero se desvanece antes que antes, manteniendo la progresión escalonada.

## Fases de coreografía resultantes

- **Fase 1 (0-35%)**: Texto PORTFOLIO se desvanece + montaña panea a la derecha
- **Fase 2 (35-55%)**: Montaña sigue paneando + se desvanece gradualmente
- **Fase 3 (55-100%)**: Montaña desvanecida, tarjeta completamente visible, rocas enmarcan

# W2-T4: FloatingAboutCard — Layout fix

## Problema raíz
El `<h1>` title "Sobre mi ..." tenía `h-[54px]` pero `text-[80.5px]` con `leading-[155%]`.
La altura real del título es ~125px (80.5 × 1.55), pero el contenedor estaba limitado a 54px fijos.
Esto causaba que el texto se desbordara visualmente del contenedor glassmorphism, solapándose
con elementos siguientes.

## Fix aplicado
- **Línea 15**: Eliminado `h-[54px]` del className del `<h1>`
- El título ahora ocupa su altura natural (~125px) según font-size y line-height
- El `gap-[108px]` entre título y bio ahora se aplica correctamente (antes se aplicaba
  desde el borde del box de 54px, creando espaciado incorrecto)

## Verificación de layout (1920x1080)
- Title: ~125px (80.5px × 155%)
- gap-[108px]
- Bio: ~219px (6 líneas × ~36.5px cada una)
- mt-4 + Path.svg: ~51px
- Total contenido texto: ~503px + 61px padding-top = ~564px
- Padding vertical card: 55px top + 55px bottom = 110px
- Total lado texto: ~674px
- Photo w-[526px]: altura estimada ~700-790px (determina altura del contenedor)
- Todo cabe sin overflow en viewport 1080px

## Elementos preservados
- onClick scroll handler en título ✓
- Path.svg signature con w-[120px] mt-4 opacity-80 ✓
- CTA button con negative margin overlay ✓
- Glassmorphism (backdrop-blur, border, shadow) intacto ✓
- Foto sin cambios ✓