# Locofy Component Cleanup Plan

## Overview
Clean up Locofy-exported React + Tailwind components for Bruno's portfolio. Remove AI slop, massive hardcoded values, dead code while preserving all Tailwind classes (background effects, opacity, rounded borders).

## Tasks

- [x] **T1**: Clean up FrameComponent.jsx (Header/Nav)
- [x] **T2**: Clean up FrameComponent1.jsx (Sobre mí / About section)
- [x] **T3**: Clean up Desktop1.jsx (Main layout wrapper)
- [x] **T4**: Update App.jsx to use Desktop1 component
- [x] **T5**: Verify build passes

## Tailwind Classes to PRESERVE
- `bg-[rgba(217,217,217,0.2)]` - background opacity effects
- `rounded-[44px]`, `rounded-[66px]`, `rounded-[80px]` - rounded borders
- `backdrop-blur` or opacity-based backgrounds
- `z-[1]` through `z-[6]` - z-index layering
- Responsive breakpoints: `mq900:`, `mq450:`, `mq1275:`, `mq1650:`
- Gradient effects: `[background:linear-gradient(...)]`
