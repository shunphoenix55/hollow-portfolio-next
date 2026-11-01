import { describe, expect, it } from 'vitest';
import type { ArchiveImage, ArchiveLink } from './archive';
import { archiveMedia, youtubeId } from './archive-media';
import { portfolioProjects } from './portfolio-projects';
import { workExperience } from './work-experience';

const image = (src: string): ArchiveImage => ({
  src: { src, width: 1, height: 1 },
  alt: src,
});
const video = (url: string, label = 'Watch'): ArchiveLink => ({ kind: 'video', label, url });

describe('youtubeId', () => {
  it.each([
    ['https://youtu.be/PxBUL5u0uGA'],
    ['https://www.youtube.com/watch?v=PxBUL5u0uGA'],
    ['https://m.youtube.com/watch?v=PxBUL5u0uGA&t=4s'],
    ['https://youtube.com/shorts/PxBUL5u0uGA'],
    ['https://www.youtube.com/live/PxBUL5u0uGA?si=abc'],
    ['https://www.youtube.com/embed/PxBUL5u0uGA'],
  ])('reads the id from %s', (url) => {
    expect(youtubeId(url)).toBe('PxBUL5u0uGA');
  });

  it.each([
    ['not a url'],
    ['https://vimeo.com/PxBUL5u0uGA'],
    ['https://youtube.com/watch'],
    ['https://youtube.com/channel/PxBUL5u0uGA'],
    ['https://youtu.be/short'],
  ])('rejects %s', (url) => {
    expect(youtubeId(url)).toBeNull();
  });
});

describe('archiveMedia', () => {
  it('puts images first and keeps link order for videos', () => {
    const media = archiveMedia({
      images: [image('/a.webp')],
      links: [
        video('https://youtu.be/PxBUL5u0uGA', 'One'),
        video('https://youtu.be/4Fn5gI0Zmj4', 'Two'),
      ],
    });
    expect(media.map((item) => item.kind)).toEqual(['image', 'video', 'video']);
    expect(media[1]).toMatchObject({ id: 'PxBUL5u0uGA', label: 'One' });
    expect(media[2]).toMatchObject({ id: '4Fn5gI0Zmj4', label: 'Two' });
  });

  it('skips repeats, other link kinds and non-YouTube videos', () => {
    const media = archiveMedia({
      images: [image('/a.webp')],
      links: [
        video('https://youtu.be/PxBUL5u0uGA'),
        video('https://youtube.com/shorts/PxBUL5u0uGA'),
        video('https://vimeo.com/123'),
        { kind: 'code', label: 'Code', url: 'https://youtu.be/4Fn5gI0Zmj4' },
      ],
    });
    expect(media).toHaveLength(2);
  });

  it('leaves entries without images text only', () => {
    expect(archiveMedia({ images: [], links: [video('https://youtu.be/PxBUL5u0uGA')] })).toEqual(
      [],
    );
  });

  it('can embed every video link in the projects and experience content', () => {
    const links = [...portfolioProjects, ...workExperience].flatMap((entry) => entry.links);
    const videos = links.filter((link) => link.kind === 'video');
    expect(videos.length).toBeGreaterThan(0);
    videos.forEach((link) => expect(youtubeId(link.url)).not.toBeNull());
  });
});
