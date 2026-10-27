import type { SymbolId } from '@/components/ornament/sprite.generated';

export type FocusIcon = 'gameplay' | 'xr' | 'optimization' | 'multiplayer';

export type Tech = { name: string; icon: SymbolId | FocusIcon; detail?: string };

export const stack: Tech[] = [
  { name: 'Unity', icon: 'tech-unity' },
  { name: 'Unreal Engine', icon: 'tech-unrealengine' },
  { name: 'Blender', icon: 'tech-blender' },
  { name: 'C#', icon: 'tech-csharp' },
  { name: 'Meta XR', icon: 'tech-meta' },
  { name: 'ARKit', icon: 'tech-apple' },
  { name: 'Gameplay', icon: 'gameplay', detail: 'Mechanics, Input Systems, Game Loop.' },
  { name: 'VR / AR', icon: 'xr', detail: 'Meta SDK, AR Foundation, Unity XRI.' },
  { name: 'Optimization', icon: 'optimization', detail: 'Profiling, LODs, Compression.' },
  { name: 'Multiplayer', icon: 'multiplayer', detail: 'Replication, Latency handling, Netcode.' },
];
