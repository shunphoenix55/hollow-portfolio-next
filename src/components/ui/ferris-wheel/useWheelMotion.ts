'use client';

import { useLayoutEffect, useRef, useState } from 'react';

const SPIN_DEG_PER_S = 6;

type WheelMotion = {
  selected: number;
  total: number;
  sign: 1 | -1;
  reducedMotion: boolean;
  spinning: boolean;
};

export function useWheelMotion({ selected, total, sign, reducedMotion, spinning }: WheelMotion) {
  const wheel = useRef<HTMLDivElement>(null);
  const counters = useRef<(HTMLDivElement | null)[]>([]);
  const slot = total > 0 ? 360 / total : 0;
  const [initialAngle] = useState(() => selected * slot * sign);
  const angle = useRef(initialAngle);
  const setSpin = useRef<((on: boolean) => void) | null>(null);
  const turnBy = useRef<(degrees: number) => void>(() => {});

  useLayoutEffect(() => {
    let frame = 0;
    let last = 0;
    let spin = false;

    const paint = (value: number) => {
      angle.current = value;
      if (wheel.current) wheel.current.style.transform = `rotate(${value}deg)`;
      counters.current.forEach((node) => {
        if (node) node.style.transform = `rotate(${-value}deg)`;
      });
    };
    const loop = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (!spin) {
        frame = 0;
        last = 0;
        return;
      }
      paint(angle.current + SPIN_DEG_PER_S * sign * dt);
      frame = requestAnimationFrame(loop);
    };

    paint(angle.current);
    turnBy.current = (degrees) => paint(angle.current + degrees);
    setSpin.current = (on) => {
      spin = on && !reducedMotion;
      if (spin && !frame) frame = requestAnimationFrame(loop);
    };
    return () => {
      cancelAnimationFrame(frame);
      setSpin.current = null;
      turnBy.current = () => {};
    };
  }, [sign, reducedMotion]);

  useLayoutEffect(() => {
    setSpin.current?.(spinning);
  }, [spinning, sign, reducedMotion]);

  return { initialAngle, slot, wheel, counters, turnBy };
}
