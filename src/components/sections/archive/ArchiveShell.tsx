import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import { Abyss } from '@/components/sections/abyss/Abyss';
import { HkChoice } from '@/components/ui/HkChoice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import styles from './ArchiveShell.module.css';

type ArchiveShellProps = { backdrop?: StaticImageData; children: ReactNode };

export function ArchiveShell({ backdrop, children }: ArchiveShellProps) {
  return (
    <>
      <Abyss />
      <main className={styles.page}>
        {backdrop && (
          <div className={styles.backdrop} aria-hidden="true">
            <Image src={backdrop} alt="" preload sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" />
          </div>
        )}
        <nav className={styles.nav} aria-label="Back">
          <HkChoice href="/">Return</HkChoice>
        </nav>
        {children}
      </main>
    </>
  );
}

type ArchiveHeaderProps = { id: string; title: string; intro: string };

export function ArchiveHeader({ id, title, intro }: ArchiveHeaderProps) {
  return (
    <header className={styles.header}>
      <SectionHeading as="h1" font="dialogue" id={`${id}-page-title`} title={title} />
      <p className={styles.intro}>{intro}</p>
    </header>
  );
}
