export function wrap(index: number, total: number) {
  if (total <= 0) return 0;
  const whole = Math.trunc(Number.isFinite(index) ? index : 0);
  return ((whole % total) + total) % total;
}

export function nearestAngle(from: number, base: number) {
  return base + 360 * Math.round((from - base) / 360);
}

export function springProgress(progress: number) {
  const tail = progress - 1;
  return 1 + 2.2 * tail ** 3 + 1.2 * tail ** 2;
}
