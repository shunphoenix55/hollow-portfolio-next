import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import styles from './GuildHero.module.css';

type GuildHeroProps = { backdrop: StaticImageData; children: ReactNode };

export function GuildHero({ backdrop, children }: GuildHeroProps) {
  return (
    <div className={styles.hero}>
      <Image
        src={backdrop}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className={styles.art}
      />
      {children}
    </div>
  );
}
