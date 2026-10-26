'use client';

import { useEffect, useRef } from 'react';
import styles from './TechStack.module.css';

const REACH = [0.12, 0.5, 0.88];
const KNIGHT_ANCHOR = { x: 0.512, y: 0.86 };

export function Swords() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const root = svg?.parentElement;
    const backdrop = root?.querySelector<HTMLElement>('[data-stack-backdrop]');
    if (!svg || !root || !backdrop) return;
    const chips = [...root.querySelectorAll<HTMLElement>('[data-stack-chip]')];
    const swords = [...svg.querySelectorAll<SVGGElement>('[data-sword]')];
    const orb = svg.querySelector<SVGCircleElement>('[data-orb]')!;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let visible = false;

    const draw = () => {
      const box = root.getBoundingClientRect();
      const b = backdrop.getBoundingClientRect();
      const hx = b.left - box.left + b.width * KNIGHT_ANCHOR.x;
      const hy = b.top - box.top + b.height * KNIGHT_ANCHOR.y;
      orb.setAttribute('cx', String(hx));
      orb.setAttribute('cy', String(hy));
      const anchors = chips.map((chip) => {
        const c = chip.getBoundingClientRect();
        return [c.left - box.left + c.width / 2, c.bottom - box.top - 6];
      });
      swords.forEach((sword, i) => {
        const pos = REACH[i] * (anchors.length - 1);
        const [ax, ay] = anchors[Math.floor(pos)];
        const [bx, by] = anchors[Math.ceil(pos)];
        const k = pos - Math.floor(pos);
        const dx = ax + (bx - ax) * k - hx;
        const dy = ay + (by - ay) * k - hy;
        const len = Math.max(40, Math.hypot(dx, dy) - 8);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        sword.setAttribute('transform', `translate(${hx} ${hy}) rotate(${angle})`);
        sword.children[3].setAttribute(
          'd',
          `M25 -2.6L${len - 16} -2L${len} 0L${len - 16} 2L25 2.6Z`,
        );
        sword.children[4].setAttribute('d', `M28 0L${len - 8} 0`);
      });
      if (visible && !still) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    const onResize = () => requestAnimationFrame(draw);
    io.observe(root);
    addEventListener('resize', onResize);
    draw();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <svg ref={ref} className={styles.threads} aria-hidden="true">
      {REACH.map((reach, i) => (
        <g key={reach} data-sword>
          <circle className={styles.pommel} cx="4" cy="0" r="3" />
          <rect className={styles.grip} x="6" y="-2" width="15" height="4" rx="1.5" />
          <rect className={styles.guard} x="21" y="-7" width="3" height="14" rx="1.5" />
          <path className={styles.blade} />
          <path className={styles.gleam} style={{ animationDelay: `${(-i * 1.1).toFixed(1)}s` }} />
        </g>
      ))}
      <circle className={styles.orb} r="4" data-orb />
    </svg>
  );
}
