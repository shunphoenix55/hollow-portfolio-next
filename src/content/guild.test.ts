import { describe, expect, it } from 'vitest';
import { guildGroups } from './guild';

const entries = guildGroups.flatMap((group) => group.entries);

describe('guildGroups', () => {
  it('has unique, hash-safe slugs', () => {
    const slugs = entries.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  it('gives every entry highlights and a real link', () => {
    for (const entry of entries) {
      expect(entry.features.length).toBeGreaterThan(0);
      expect(entry.links.length).toBeGreaterThan(0);
      entry.links.forEach((link) => expect(link.url).toMatch(/^https:\/\//));
    }
  });
});
