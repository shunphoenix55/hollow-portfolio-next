'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { FrameCorners } from '@/components/ui/FrameCorners';
import { type ArchiveMedia, youtubeEmbed, youtubePoster } from '@/content/archive-media';
import styles from './ArchiveGallery.module.css';

type ArchiveGalleryProps = { media: ArchiveMedia[]; title: string; className?: string };

const FRAME_SIZES = '(max-width: 900px) 92vw, 52vw';

export function ArchiveGallery({ media, title, className }: ArchiveGalleryProps) {
  const [shot, setShot] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = media[shot];

  const select = (index: number) => {
    if (index === shot) return;
    setShot(index);
    setPlaying(false);
  };

  return (
    <figure className={className}>
      <div className={styles.frame} data-playing={playing || undefined}>
        {current.kind === 'image' && (
          <Image
            key={current.id}
            src={current.image.src}
            placeholder="blur"
            alt={current.image.alt}
            fill
            sizes={FRAME_SIZES}
            className={styles.photo}
          />
        )}
        {current.kind === 'video' && !playing && (
          <button
            key={current.id}
            type="button"
            className={styles.poster}
            aria-label={`Play ${title}: ${current.label}`}
            onClick={() => setPlaying(true)}
          >
            <Image
              src={youtubePoster(current.id)}
              alt=""
              fill
              sizes={FRAME_SIZES}
              className={styles.photo}
            />
            <span className={styles.play}>
              <Play aria-hidden="true" />
            </span>
          </button>
        )}
        {current.kind === 'video' && playing && (
          <iframe
            key={current.id}
            className={styles.player}
            src={youtubeEmbed(current.id)}
            title={`${title}: ${current.label}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <FrameCorners />
      </div>
      {media.length > 1 && (
        <div className={styles.thumbs} role="group" aria-label={`${title} gallery`}>
          {media.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={styles.thumb}
              aria-label={
                item.kind === 'image' ? `Show ${item.image.alt}` : `Show video: ${item.label}`
              }
              aria-pressed={index === shot}
              onClick={() => select(index)}
            >
              {item.kind === 'image' ? (
                <Image src={item.image.src} alt="" fill sizes="96px" placeholder="blur" />
              ) : (
                <>
                  <Image src={youtubePoster(item.id)} alt="" fill sizes="96px" />
                  <Play className={styles.thumbPlay} aria-hidden="true" />
                </>
              )}
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
