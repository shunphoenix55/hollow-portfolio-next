import { describe, expect, it } from 'vitest';
import { chase, HOLD, journeyTarget, knightPose } from './journey-math';

const stops = [
  { x: 90, y: 80 },
  { x: 70, y: 70 },
  { x: 50, y: 50 },
];

describe('journeyTarget', () => {
  it('maps scroll progress onto hops and holds at the last stop', () => {
    expect(journeyTarget(0, 2)).toBe(0);
    expect(journeyTarget(0.5, 2)).toBeCloseTo((2 + HOLD) / 2);
    expect(journeyTarget(1, 2)).toBe(2);
    expect(journeyTarget(2, 2)).toBe(2);
  });
});

describe('chase', () => {
  it('never moves faster than the speed cap', () => {
    expect(chase(0, 3, 0.1)).toBeCloseTo(0.11);
    expect(chase(3, 0, 0.1)).toBeCloseTo(2.89);
  });

  it('snaps onto the target once close enough', () => {
    expect(chase(0.999, 1, 0.016)).toBe(1);
  });
});

describe('knightPose', () => {
  it('stands on the start before the hop window', () => {
    expect(knightPose(0.2, stops)).toEqual({ x: 90, y: 80, jumping: false, landedOn: 0 });
  });

  it('is airborne and above the straight line mid-hop', () => {
    const pose = knightPose(0.525, stops);
    expect(pose.jumping).toBe(true);
    expect(pose.landedOn).toBeNull();
    expect(pose.x).toBeCloseTo(80);
    expect(pose.y).toBeLessThan(75);
  });

  it('lands on the next platform after the hop window', () => {
    expect(knightPose(0.9, stops)).toEqual({ x: 70, y: 70, jumping: false, landedOn: 1 });
  });

  it('rests on the final platform at the end', () => {
    expect(knightPose(2, stops)).toEqual({ x: 50, y: 50, jumping: false, landedOn: 2 });
  });
});
