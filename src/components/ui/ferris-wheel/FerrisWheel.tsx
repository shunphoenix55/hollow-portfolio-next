'use client';

import Image from 'next/image';
import { type KeyboardEvent, type PointerEvent, useId, useRef } from 'react';
import knightJump from '@/assets/exp-knight-jump.webp';
import knightStand from '@/assets/exp-knight-stand.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { useInView } from '@/hooks/useInView';
import { REDUCED_MOTION, useMediaQuery } from '@/hooks/useMediaQuery';
import { useWheelMotion } from './useWheelMotion';
import { wrap } from './wheel-math';
import styles from './FerrisWheel.module.css';

export type FerrisWheelItem = { id: string; title: string; src: string; alt: string };

type FerrisWheelProps = {
  items: FerrisWheelItem[];
  active: number;
  onActiveChange: (index: number) => void;
  onPick?: (index: number) => void;
  label: string;
  controlsId?: string;
  direction?: 'cw' | 'ccw';
};

const percent = (value: number) => `${value.toFixed(3)}%`;

const RIM_LIGHTS = Array.from({ length: 24 }, (_, i) => ({
  left: percent(50 + Math.sin((i * Math.PI) / 12) * 50),
  top: percent(50 - Math.cos((i * Math.PI) / 12) * 50),
  delay: `${(i % 6) * -0.6}s`,
}));
const DRAG_START = 8;
const DRAG_TURN = 30;

export function FerrisWheel({
  items,
  active,
  onActiveChange,
  onPick,
  label,
  controlsId,
  direction = 'cw',
}: FerrisWheelProps) {
  const total = items.length;
  const selected = wrap(active, total);
  const sign = direction === 'cw' ? 1 : -1;
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const drag = useRef<{ id: number; x: number; y: number; captured: boolean } | null>(null);
  const suppressClickUntil = useRef(0);
  const [root, inView] = useInView<HTMLDivElement>();
  const helpId = useId();
  const { shown, initialAngle, slot, wheel, counters, pendulums } = useWheelMotion({
    selected,
    total,
    sign,
    reducedMotion,
    spinning: inView,
  });

  const request = (index: number) => {
    const next = wrap(index, total);
    if (next !== selected) onActiveChange(next);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    request(selected + (event.key === 'ArrowRight' ? 1 : -1));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, captured: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId || start.captured) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) <= DRAG_START) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    start.captured = true;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    if (!start || start.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    const delta = Math.abs(x) >= Math.abs(y) ? x : y;
    if (start.captured) suppressClickUntil.current = performance.now() + 300;
    if (Math.abs(delta) >= DRAG_TURN) request(selected - Math.sign(delta));
  };

  if (total === 0) return null;

  return (
    <div
      ref={root}
      className={styles.root}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <div className={styles.row}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Previous project"
          aria-controls={controlsId}
          onClick={() => request(selected - 1)}
        >
          <Ornament name="slot-mark" className={styles.arrowMark} />
        </button>
        <div
          className={styles.stage}
          tabIndex={0}
          aria-label="Turn the wheel"
          aria-describedby={helpId}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
          onLostPointerCapture={() => (drag.current = null)}
        >
          <svg className={styles.support} viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <path d="M200 184 146 362M200 184 254 362M124 362H276" />
          </svg>
          <div
            ref={wheel}
            className={styles.wheel}
            style={{ transform: `rotate(${initialAngle}deg)` }}
          >
            <span className={styles.innerRing} aria-hidden="true" />
            {RIM_LIGHTS.map((light) => (
              <span
                key={`${light.left}-${light.top}`}
                className={styles.light}
                style={{ left: light.left, top: light.top, animationDelay: light.delay }}
                aria-hidden="true"
              />
            ))}
            {items.map((item, index) => {
              const turn = sign * index * slot;
              const radians = (-turn * Math.PI) / 180;
              const isActive = index === shown;
              return (
                <div key={item.id} className={styles.seat}>
                  <span
                    className={styles.spoke}
                    style={{ transform: `rotate(${-90 - turn}deg)` }}
                    aria-hidden="true"
                  />
                  <div
                    className={styles.anchor}
                    data-active={isActive || undefined}
                    style={{
                      left: `${50 + Math.sin(radians) * 50}%`,
                      top: `${50 - Math.cos(radians) * 50}%`,
                    }}
                  >
                    <div
                      ref={(node) => {
                        counters.current[index] = node;
                      }}
                      className={styles.counter}
                      style={{ transform: `rotate(${-initialAngle}deg)` }}
                    >
                      <div className={styles.hang}>
                        <div
                          ref={(node) => {
                            pendulums.current[index] = node;
                          }}
                          className={styles.pendulum}
                        >
                          <span className={styles.hanger} aria-hidden="true" />
                          <button
                            type="button"
                            className={styles.gondola}
                            aria-label={`View ${item.title}`}
                            aria-current={isActive || undefined}
                            aria-controls={controlsId}
                            onClick={() => {
                              if (performance.now() < suppressClickUntil.current) return;
                              request(index);
                              onPick?.(index);
                            }}
                          >
                            <span className={styles.window}>
                              <Image
                                src={item.src}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 96px, 160px"
                                draggable={false}
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.hub} aria-hidden="true">
            <span className={styles.runner}>
              <Image src={knightStand} alt="" sizes="96px" className={styles.runStand} />
              <Image src={knightJump} alt="" sizes="96px" className={styles.runStride} />
              <i className={styles.dust} />
            </span>
          </div>
        </div>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Next project"
          aria-controls={controlsId}
          onClick={() => request(selected + 1)}
        >
          <Ornament name="slot-mark" className={`${styles.arrowMark} ${styles.arrowMarkRight}`} />
        </button>
      </div>
      <p id={helpId} className={styles.help}>
        Drag the wheel, pick a carriage or use <kbd>←</kbd> <kbd>→</kbd>
      </p>
      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {shown === selected ? items[selected].title : ''}
      </span>
    </div>
  );
}
