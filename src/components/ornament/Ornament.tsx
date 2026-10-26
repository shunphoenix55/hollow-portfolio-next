import type { SVGProps } from 'react';
import { SPRITE_URL, SYMBOL_SIZES, type SymbolId } from './sprite.generated';
import styles from './ornament.module.css';

type OrnamentProps = Omit<SVGProps<SVGSVGElement>, 'viewBox'> & {
  name: SymbolId;
  flip?: boolean;
  glow?: boolean;
  label?: string;
};

export function Ornament({ name, flip, glow = true, label, className, ...rest }: OrnamentProps) {
  const [w, h] = SYMBOL_SIZES[name];
  const classes = [glow && styles.glow, flip && styles.flip, className].filter(Boolean).join(' ');
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={classes || undefined}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <use href={`${SPRITE_URL}#${name}`} />
    </svg>
  );
}
