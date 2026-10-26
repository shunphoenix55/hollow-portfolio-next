import { describe, expect, it } from 'vitest';
import { corner, crest, flourish, hook, panelTop } from './ornaments.mjs';

const ornaments = { flourish, crest, hook, corner, panelTop };

describe('ornaments', () => {
  it.each(Object.entries(ornaments))('%s produces closed, finite path data', (_, make) => {
    const { viewBox, d } = make();
    expect(viewBox.split(' ').map(Number).every(Number.isFinite)).toBe(true);
    expect(d.startsWith('M')).toBe(true);
    expect(d).toContain('Z');
    expect(d).not.toMatch(/NaN|Infinity/);
  });

  it('gives the plain crest a pendant instead of the finial spike', () => {
    expect(crest({ finial: false }).d).not.toBe(crest({ finial: true }).d);
  });
});
