import { describe, expect, it } from 'vitest';
import { shortestStep, springProgress, wrap } from './wheel-math';

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

describe('shortestStep', () => {
  it('turns the short way round', () => {
    expect(shortestStep(0, 2, 9)).toBe(1);
    expect(shortestStep(0, 7, 9)).toBe(-1);
    expect(shortestStep(8, 0, 9)).toBe(1);
    expect(shortestStep(4, 4, 9)).toBe(0);
  });
});

describe('springProgress', () => {
  it('starts at rest and lands exactly on target', () => {
    expect(springProgress(0)).toBeCloseTo(0);
    expect(springProgress(1)).toBe(1);
  });
});
