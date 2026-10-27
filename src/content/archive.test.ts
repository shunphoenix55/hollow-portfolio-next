import { describe, expect, it } from 'vitest';
import type { ArchiveEntry } from './archive';
import { portfolioProjects } from './portfolio-projects';
import { workExperience } from './work-experience';

const archives: [string, ArchiveEntry[]][] = [
  ['portfolioProjects', portfolioProjects],
  ['workExperience', workExperience],
];

describe.each(archives)('%s', (_, entries) => {
  it('has unique, hash-safe slugs', () => {
    const slugs = entries.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  it('gives every entry a cover image and real links', () => {
    for (const entry of entries) {
      expect(entry.images.length).toBeGreaterThan(0);
      entry.images.forEach((img) => expect(img.src).toMatch(/^https:\/\//));
      entry.links.forEach((link) => expect(link.url).toMatch(/^https:\/\//));
    }
  });
});
