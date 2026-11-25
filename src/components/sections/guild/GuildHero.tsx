import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import { SceneImage } from '@/components/ui/SceneImage';
import styles from './GuildHero.module.css';

type GuildHeroProps = {
  backdrop: { src: StaticImageData; phone: StaticImageData };
  children: ReactNode;
};

export function GuildHero({ backdrop, children }: GuildHeroProps) {
  return (
    <div className={styles.hero}>
      <SceneImage
        src={backdrop.src}
        phone={backdrop.phone}
        sizes="100vw"
        phoneSizes="100vw"
        priority
        className={styles.art}
      />
      {children}
    </div>
  );
}
