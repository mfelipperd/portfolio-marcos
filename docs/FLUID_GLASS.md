# Fluid Glass - Apple Style Effect

Este componente implementa o efeito "Fluid Glass" inspirado nos designs da Apple, usando React Three Fiber.

## Tecnologias Utilizadas

- **Three.js**: Biblioteca JavaScript 3D
- **React Three Fiber**: Wrapper React para Three.js
- **React Three Drei**: Helpers para React Three Fiber
- **MeshTransmissionMaterial**: Material com refração realista

## Características

- ✨ Vidro fluido com reflexões e refrações realistas
- 🎨 Aberração cromática sutil
- 🌊 Animação flutuante suave
- 🎭 Distorção e transmissão configuráveis
- ⚡ Otimizado para performance

## Propriedades do Material

- `transmission`: 1 (100% transparência)
- `roughness`: 0.15 (superfície lisa)
- `thickness`: 0.5 (espessura do vidro)
- `ior`: 1.5 (índice de refração)
- `chromaticAberration`: 0.06 (efeito de prisma)
- `distortion`: 0.3 (distorção de luz)

## Como Usar

```tsx
import FluidGlass from "@/components/FluidGlass";

<div className="w-[600px] h-[600px]">
  <FluidGlass />
</div>
```

## Performance

O componente é otimizado com:
- Dynamic rendering
- Antialias adaptativo
- Power preference configurável
- Transparent background
