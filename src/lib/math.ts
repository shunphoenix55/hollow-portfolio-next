export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const smoothstep = (t: number) => t * t * (3 - 2 * t);
