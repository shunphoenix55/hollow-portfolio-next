'use client';

import { type RefObject, useEffect } from 'react';
import { clamp, smoothstep } from '@/lib/math';
import { rafScheduler } from '@/lib/raf';

type Point = { x: number; y: number };

type JourneyRefs = {
  track: RefObject<HTMLElement | null>;
  knight: RefObject<HTMLElement | null>;
  list: RefObject<HTMLElement | null>;
};

type JourneyOptions = {
  enabled: boolean;
  stops: Point[];
  classes: { jumping: string; facingRight: string; landing: string };
  onRest: (stop: number) => void;
};

const HOLD = 0.6;
const MAX_SPEED = 1.1;
const EASE = 0.14;
const HOP_START = 0.3;
const HOP_LENGTH = 0.45;
const HOP_HEIGHT = 12;

export function journeyScrollTarget(track: HTMLElement, stop: number, hops: number) {
  const r = track.getBoundingClientRect();
  return scrollY + r.top + ((stop + 0.1) / (hops + HOLD)) * (r.height - innerHeight);
}

export function useKnightJourney(
  refs: JourneyRefs,
  { enabled, stops, classes, onRest }: JourneyOptions,
) {
  useEffect(() => {
    const track = refs.track.current;
    const knight = refs.knight.current;
    const list = refs.list.current;
    if (!enabled || !track || !knight || !list) return;
    const entries = [...list.querySelectorAll<HTMLElement>('[data-xp]')].reverse();
    const hops = stops.length - 1;
    let shown = 0;
    let lastTime = 0;
    let lastX = stops[0].x;
    let wasJumping = false;
    let current = 0;

    const progress = () => {
      const r = track.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - innerHeight));
    };
    const land = () => {
      knight.classList.remove(classes.landing);
      void knight.offsetWidth;
      knight.classList.add(classes.landing);
    };

    const { request, cancel } = rafScheduler((now) => {
      const dt = Math.min(0.05, lastTime ? (now - lastTime) / 1000 : 0.016);
      lastTime = now;
      const target = Math.min(hops, progress() * (hops + HOLD));
      const step = (target - shown) * EASE;
      shown += Math.sign(step) * Math.min(Math.abs(step), MAX_SPEED * dt);
      if (Math.abs(target - shown) < 0.002) shown = target;

      const i = Math.min(hops - 1, Math.floor(shown));
      const t = shown >= hops ? 1 : clamp((shown - i - HOP_START) / HOP_LENGTH);
      const a = stops[i];
      const b = stops[i + 1];
      const ease = smoothstep(t);
      const x = a.x + (b.x - a.x) * ease;
      const y = a.y + (b.y - a.y) * ease - HOP_HEIGHT * 4 * t * (1 - t);
      const jumping = t > 0 && t < 1;

      if (x > lastX + 0.01) knight.classList.add(classes.facingRight);
      if (x < lastX - 0.01) knight.classList.remove(classes.facingRight);
      lastX = x;
      knight.style.setProperty('--kx', `${x}%`);
      knight.style.setProperty('--ky', `${y}%`);
      knight.classList.toggle(classes.jumping, jumping);
      if (wasJumping && !jumping) land();
      wasJumping = jumping;

      const rest = jumping ? current : t >= 1 ? i + 1 : i;
      if (rest !== current) {
        current = rest;
        onRest(current);
      }
      entries.forEach((el, k) => {
        el.dataset.state = k + 1 === current ? 'current' : k + 1 < current ? 'visited' : '';
      });

      if (shown !== target) return true;
      lastTime = 0;
    });

    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    request();
    return () => {
      cancel();
      removeEventListener('scroll', request);
      removeEventListener('resize', request);
      entries.forEach((el) => delete el.dataset.state);
      knight.style.removeProperty('--kx');
      knight.style.removeProperty('--ky');
    };
  }, [enabled, stops, classes, onRest, refs.track, refs.knight, refs.list]);
}
