import type { StaticImageData } from 'next/image';

export type ArchiveLinkKind = 'play' | 'code' | 'video' | 'page';

export type ArchiveLink = { kind: ArchiveLinkKind; label: string; url: string };

export type ArchiveImage = { src: StaticImageData; alt: string };

export type ArchiveEntry = {
  slug: string;
  title: string;
  subtitle: string;
  category?: string;
  summary: string;
  overview: string[];
  features: { title: string; description: string }[];
  techStack: string[];
  details: { label: string; value: string }[];
  images: ArchiveImage[];
  links: ArchiveLink[];
};

export type ArchiveLabels = {
  wheel: string;
  features: string;
  stack: string;
  details: string;
  links: string;
};
