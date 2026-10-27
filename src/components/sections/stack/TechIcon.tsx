import { Cpu, Gamepad2, Glasses, type LucideIcon, Network } from 'lucide-react';
import { Ornament } from '@/components/ornament/Ornament';
import type { FocusIcon, Tech } from '@/content/stack';

const FOCUS_ICONS: Record<FocusIcon, LucideIcon> = {
  gameplay: Gamepad2,
  xr: Glasses,
  optimization: Cpu,
  multiplayer: Network,
};

export function TechIcon({ icon }: { icon: Tech['icon'] }) {
  if (icon in FOCUS_ICONS) {
    const Icon = FOCUS_ICONS[icon as FocusIcon];
    return <Icon strokeWidth={1.6} aria-hidden="true" />;
  }
  return <Ornament name={icon as Exclude<Tech['icon'], FocusIcon>} glow={false} />;
}
