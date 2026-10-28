import { describe, expect, it } from 'vitest';
import { angleDelta, pointerAngle, wrap } from './wheel-math';

describe('wrap', () => {
  it('keeps indices inside the ring in both directions', () => {
    expect(wrap(9, 9)).toBe(0);
    expect(wrap(-1, 9)).toBe(8);
    expect(wrap(20, 9)).toBe(2);
  });

  it('is safe for empty rings and bad input', () => {
    expect(wrap(3, 0)).toBe(0);
    expect(wrap(Number.NaN, 5)).toBe(0);
  });
});

describe('pointerAngle', () => {
  it('measures the pointer direction from the wheel centre in degrees', () => {
    expect(pointerAngle(10, 0, 0, 0)).toBe(0);
    expect(pointerAngle(0, 10, 0, 0)).toBe(90);
    expect(pointerAngle(-10, 0, 0, 0)).toBe(180);
  });
});

describe('angleDelta', () => {
  it('takes the short way round the circle', () => {
    expect(angleDelta(170, -170)).toBe(20);
    expect(angleDelta(-170, 170)).toBe(-20);
    expect(angleDelta(10, 40)).toBe(30);
  });
});
