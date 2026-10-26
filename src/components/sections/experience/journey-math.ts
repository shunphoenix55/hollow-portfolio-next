import { clamp, smoothstep } from '@/lib/math';

export type Point = { x: number; y: number };

export const HOLD = 0.6;
const MAX_SPEED = 1.1;
const EASE = 0.14;
const HOP_START = 0.3;
const HOP_LENGTH = 0.45;
const HOP_HEIGHT = 12;

export function journeyTarget(progress: number, hops: number) {
  return Math.min(hops, clamp(progress) * (hops + HOLD));
}

export function chase(shown: number, target: number, dt: number) {
  const step = (target - shown) * EASE;
  const next = shown + Math.sign(step) * Math.min(Math.abs(step), MAX_SPEED * dt);
  return Math.abs(target - next) < 0.002 ? target : next;
}

export function knightPose(shown: number, stops: Point[]) {
  const hops = stops.length - 1;
  const i = Math.min(hops - 1, Math.floor(shown));
  const t = shown >= hops ? 1 : clamp((shown - i - HOP_START) / HOP_LENGTH);
  const a = stops[i];
  const b = stops[i + 1];
  const ease = smoothstep(t);
  const jumping = t > 0 && t < 1;
  return {
    x: a.x + (b.x - a.x) * ease,
    y: a.y + (b.y - a.y) * ease - HOP_HEIGHT * 4 * t * (1 - t),
    jumping,
    landedOn: jumping ? null : t >= 1 ? i + 1 : i,
  };
}
