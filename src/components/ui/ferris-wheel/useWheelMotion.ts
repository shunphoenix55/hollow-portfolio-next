'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { nearestAngle, springProgress, wrap } from './wheel-math';

const TURN_BASE_MS = 420;
const TURN_PER_SLOT_MS = 170;
const SWAY_MS = 340;
const SWING = [0, -2.6, 0, 1.7, 0, -0.9, 0, 0.35, 0];

type WheelMotion = { selected: number; total: number; sign: 1 | -1; reducedMotion: boolean };

export function useWheelMotion({ selected, total, sign, reducedMotion }: WheelMotion) {
  const wheel = useRef<HTMLDivElement>(null);
  const counters = useRef<(HTMLDivElement | null)[]>([]);
  const pendulums = useRef<(HTMLDivElement | null)[]>([]);
  const slot = total > 0 ? 360 / total : 0;
  const [shown, setShown] = useState(selected);
  const [initialAngle] = useState(() => selected * slot * sign);
  const selectedRef = useRef(selected);
  const command = useRef<((index: number) => void) | null>(null);

  useLayoutEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useLayoutEffect(() => {
    let angle = wrap(selectedRef.current, total) * slot * sign;
    let frame = 0;
    let sways: Animation[] = [];

    const paint = (value: number) => {
      angle = value;
      if (wheel.current) wheel.current.style.transform = `rotate(${value}deg)`;
      counters.current.forEach((node) => {
        if (node) node.style.transform = `rotate(${-value}deg)`;
      });
    };
    const stopSway = () => {
      sways.forEach((animation) => animation.cancel());
      sways = [];
    };
    const sway = (direction: number) => {
      sways = pendulums.current.flatMap((node) =>
        node
          ? [
              node.animate(
                SWING.map((value) => ({ transform: `rotate(${value * direction}deg)` })),
                { duration: SWAY_MS, easing: 'ease-in-out' },
              ),
            ]
          : [],
      );
    };
    const turnTo = (index: number) => {
      cancelAnimationFrame(frame);
      stopSway();
      const from = angle;
      const to = nearestAngle(from, index * slot * sign);
      if (to === from) return;
      const slots = Math.abs(to - from) / slot;
      const duration = TURN_BASE_MS + TURN_PER_SLOT_MS * slots;
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / duration);
        paint(from + (to - from) * springProgress(progress));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }
        frame = 0;
        paint(to);
        sway(Math.sign(to - from));
      };
      frame = requestAnimationFrame(tick);
    };

    paint(angle);
    command.current = (index) => {
      const target = wrap(index, total);
      setShown(target);
      if (!reducedMotion) {
        turnTo(target);
        return;
      }
      cancelAnimationFrame(frame);
      stopSway();
      paint(target * slot * sign);
    };
    return () => {
      cancelAnimationFrame(frame);
      stopSway();
      command.current = null;
    };
  }, [total, slot, sign, reducedMotion]);

  useLayoutEffect(() => {
    command.current?.(selected);
  }, [selected, total, sign, reducedMotion]);

  return { shown, initialAngle, slot, wheel, counters, pendulums };
}
