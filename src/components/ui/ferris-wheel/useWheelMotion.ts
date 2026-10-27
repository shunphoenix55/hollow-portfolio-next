'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { shortestStep, springProgress, wrap } from './wheel-math';

const TURN_MS = 650;
const SWAY_MS = 340;
const SWING = [0, -2.6, 0, 1.7, 0, -0.9, 0, 0.35, 0];

type WheelMotion = {
  selected: number;
  total: number;
  sign: 1 | -1;
  reducedMotion: boolean;
};

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
    let current = wrap(selectedRef.current, total);
    let target = current;
    let angle = current * slot * sign;
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
    const sway = (turn: number) => {
      sways = pendulums.current.flatMap((node) =>
        node
          ? [
              node.animate(
                SWING.map((value) => ({ transform: `rotate(${value * turn}deg)` })),
                { duration: SWAY_MS, easing: 'ease-in-out' },
              ),
            ]
          : [],
      );
    };
    const turn = () => {
      const step = shortestStep(current, target, total);
      if (step === 0) return;
      stopSway();
      const next = wrap(current + step, total);
      const from = angle;
      const to = from + step * slot * sign;
      const started = performance.now();
      setShown(next);
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / TURN_MS);
        paint(from + (to - from) * springProgress(progress));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }
        frame = 0;
        current = next;
        if (current !== target) turn();
        else sway(step * sign);
      };
      frame = requestAnimationFrame(tick);
    };

    paint(angle);
    setShown(current);
    command.current = (index) => {
      target = wrap(index, total);
      if (reducedMotion) {
        cancelAnimationFrame(frame);
        frame = 0;
        stopSway();
        current = target;
        paint(current * slot * sign);
        setShown(current);
      } else if (!frame) turn();
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
