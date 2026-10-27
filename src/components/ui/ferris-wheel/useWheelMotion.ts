'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { nearestAngle, springProgress, wrap } from './wheel-math';

const SPIN_DEG_PER_S = 6;
const TURN_BASE_MS = 420;
const TURN_PER_SLOT_MS = 170;
const SWAY_MS = 340;
const SWING = [0, -2.6, 0, 1.7, 0, -0.9, 0, 0.35, 0];

type WheelMotion = {
  selected: number;
  total: number;
  sign: 1 | -1;
  reducedMotion: boolean;
  spinning: boolean;
};

type Turn = { from: number; to: number; start: number; duration: number };

export function useWheelMotion({ selected, total, sign, reducedMotion, spinning }: WheelMotion) {
  const wheel = useRef<HTMLDivElement>(null);
  const counters = useRef<(HTMLDivElement | null)[]>([]);
  const pendulums = useRef<(HTMLDivElement | null)[]>([]);
  const slot = total > 0 ? 360 / total : 0;
  const [shown, setShown] = useState(selected);
  const [initialAngle] = useState(() => selected * slot * sign);
  const selectedRef = useRef(selected);
  const command = useRef<((index: number) => void) | null>(null);
  const setSpin = useRef<((on: boolean) => void) | null>(null);

  useLayoutEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useLayoutEffect(() => {
    let angle = wrap(selectedRef.current, total) * slot * sign;
    let frame = 0;
    let last = 0;
    let spin = false;
    let turn: Turn | null = null;
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
    const loop = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (turn) {
        const progress = Math.min(1, (now - turn.start) / turn.duration);
        paint(turn.from + (turn.to - turn.from) * springProgress(progress));
        if (progress >= 1) {
          sway(Math.sign(turn.to - turn.from));
          turn = null;
        }
      } else if (spin) {
        paint(angle + SPIN_DEG_PER_S * sign * dt);
      }
      if (turn || spin) {
        frame = requestAnimationFrame(loop);
        return;
      }
      frame = 0;
      last = 0;
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    paint(angle);
    command.current = (index) => {
      const target = wrap(index, total);
      setShown(target);
      const to = nearestAngle(angle, target * slot * sign);
      if (reducedMotion) {
        paint(to);
        return;
      }
      if (Math.abs(to - angle) < 0.01) return;
      stopSway();
      const slots = Math.abs(to - angle) / slot;
      turn = {
        from: angle,
        to,
        start: performance.now(),
        duration: TURN_BASE_MS + TURN_PER_SLOT_MS * slots,
      };
      run();
    };
    setSpin.current = (on) => {
      spin = on && !reducedMotion;
      if (spin) run();
    };
    return () => {
      cancelAnimationFrame(frame);
      stopSway();
      command.current = null;
      setSpin.current = null;
    };
  }, [total, slot, sign, reducedMotion]);

  useLayoutEffect(() => {
    command.current?.(selected);
  }, [selected, total, sign, reducedMotion]);

  useLayoutEffect(() => {
    setSpin.current?.(spinning);
  }, [spinning, total, sign, reducedMotion]);

  return { shown, initialAngle, slot, wheel, counters, pendulums };
}
