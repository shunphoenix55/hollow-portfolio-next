export function wrap(index: number, total: number) {
  if (total <= 0) return 0;
  const whole = Math.trunc(Number.isFinite(index) ? index : 0);
  return ((whole % total) + total) % total;
}

export function pointerAngle(x: number, y: number, centerX: number, centerY: number) {
  return (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI;
}

export function angleDelta(from: number, to: number) {
  return ((((to - from + 180) % 360) + 360) % 360) - 180;
}
