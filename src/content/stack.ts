import type { SymbolId } from '@/components/ornament/sprite.generated';

export type Tech = { name: string; icon: SymbolId };

export const stack: Tech[] = [
  { name: 'Unity', icon: 'tech-unity' },
  { name: 'Unreal Engine', icon: 'tech-unrealengine' },
  { name: 'Blender', icon: 'tech-blender' },
  { name: 'C#', icon: 'tech-csharp' },
  { name: 'Meta XR', icon: 'tech-meta' },
  { name: 'ARKit', icon: 'tech-apple' },
];
