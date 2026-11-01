import type { ArchiveEntry, ArchiveImage } from './archive';

export type ArchiveMedia =
  { kind: 'image'; id: string; image: ArchiveImage } | { kind: 'video'; id: string; label: string };

const VIDEO_ID = /^[\w-]{11}$/;
const PATH_ID_ROUTES = ['shorts', 'live', 'embed'];

export function youtubeId(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^(www|m)\./, '');
  const [first, second] = parsed.pathname.split('/').filter(Boolean);
  let id: string | null | undefined;
  if (host === 'youtu.be') id = first;
  else if (host === 'youtube.com' && first === 'watch') id = parsed.searchParams.get('v');
  else if (host === 'youtube.com' && PATH_ID_ROUTES.includes(first)) id = second;
  return id && VIDEO_ID.test(id) ? id : null;
}

export const youtubePoster = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const youtubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;

export function archiveMedia({ images, links }: Pick<ArchiveEntry, 'images' | 'links'>) {
  if (images.length === 0) return [];
  const media: ArchiveMedia[] = images.map((image) => ({
    kind: 'image',
    id: image.src.src,
    image,
  }));
  const seen = new Set<string>();
  for (const link of links) {
    const id = link.kind === 'video' ? youtubeId(link.url) : null;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    media.push({ kind: 'video', id, label: link.label });
  }
  return media;
}
