'use client';

import { useRef, useState } from 'react';
import { JourneyNav } from '@/components/sections/journey/JourneyNav';
import type { JourneyLink } from '@/content/journey';
import styles from './SiteMenu.module.css';

const MENU_ID = 'site-menu';

export function SiteMenu({ links }: { links: JourneyLink[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={show}
      >
        <span />
        <span />
        <span />
      </button>
      <dialog
        ref={dialog}
        id={MENU_ID}
        className={styles.panel}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.inner}>
          <button type="button" className={styles.close} aria-label="Close menu" onClick={close}>
            <span />
            <span />
          </button>
          <JourneyNav links={links} headingId="menu-journey-title" compact onNavigate={close} />
        </div>
      </dialog>
    </>
  );
}
