import { describe, expect, it } from 'vitest';
import { nearestAngle, springProgress, wrap } from './wheel-math';

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

describe('nearestAngle', () => {
  it('picks the equivalent angle closest to where the wheel is', () => {
    expect(nearestAngle(0, 320)).toBe(-40);
    expect(nearestAngle(700, 40)).toBe(760);
    expect(nearestAngle(-30, 0)).toBe(0);
  });
});

describe('springProgress', () => {
  it('starts at rest and lands exactly on target', () => {
    expect(springProgress(0)).toBeCloseTo(0);
    expect(springProgress(1)).toBe(1);
  });
});
