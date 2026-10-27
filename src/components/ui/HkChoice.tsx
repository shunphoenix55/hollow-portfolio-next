import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Ornament } from '@/components/ornament/Ornament';
import styles from './HkChoice.module.css';

type ChoiceContent = { children: ReactNode; selected?: boolean; className?: string };

type HkChoiceProps =
  | (ChoiceContent & { href: string } & Omit<ComponentProps<'a'>, 'children' | 'className'>)
  | (ChoiceContent & { href?: undefined } & Omit<
        ComponentProps<'button'>,
        'children' | 'className'
      >);

export function HkChoice({ children, selected, className, ...rest }: HkChoiceProps) {
  const classes = [styles.choice, selected && styles.selected, className].filter(Boolean).join(' ');
  const content = (
    <>
      <Ornament name="slot-mark" className={`${styles.mark} ${styles.left}`} />
      <span>{children}</span>
      <Ornament name="slot-mark" className={styles.mark} />
    </>
  );
  if (rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as ComponentProps<'a'> & { href: string })}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as ComponentProps<'button'>)}>
      {content}
    </button>
  );
}
