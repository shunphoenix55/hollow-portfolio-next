export function wrap(index: number, total: number) {
  if (total <= 0) return 0;
  const whole = Math.trunc(Number.isFinite(index) ? index : 0);
  return ((whole % total) + total) % total;
}

export function shortestStep(from: number, to: number, total: number) {
  let distance = wrap(to - from, total);
  if (distance > total / 2) distance -= total;
  return Math.sign(distance);
}

export function springProgress(progress: number) {
  const tail = progress - 1;
  return 1 + 2.2 * tail ** 3 + 1.2 * tail ** 2;
}
