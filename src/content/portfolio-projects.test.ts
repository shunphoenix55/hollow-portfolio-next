import { describe, expect, it } from 'vitest';
import { portfolioProjects } from './portfolio-projects';

describe('portfolioProjects', () => {
  it('has unique, hash-safe slugs', () => {
    const slugs = portfolioProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  it('gives every project a cover image and real links', () => {
    for (const project of portfolioProjects) {
      expect(project.images.length).toBeGreaterThan(0);
      project.images.forEach((img) =>
        expect(img.src).toMatch(/^https:\/\/shunphoenix55\.github\.io\//),
      );
      project.links.forEach((link) => expect(link.url).toMatch(/^https:\/\//));
    }
  });
});
