'use client';

import { type RefObject, useEffect } from 'react';
import { clamp } from '@/lib/math';
import { rafScheduler } from '@/lib/raf';
import { chase, HOLD, journeyTarget, knightPose, type Point } from './journey-math';

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
      const target = journeyTarget(progress(), hops);
      shown = chase(shown, target, dt);
      const { x, y, jumping, landedOn } = knightPose(shown, stops);

      if (x > lastX + 0.01) knight.classList.add(classes.facingRight);
      if (x < lastX - 0.01) knight.classList.remove(classes.facingRight);
      lastX = x;
      knight.style.setProperty('--kx', `${x}%`);
      knight.style.setProperty('--ky', `${y}%`);
      knight.classList.toggle(classes.jumping, jumping);
      if (wasJumping && !jumping) land();
      wasJumping = jumping;

      if (landedOn !== null && landedOn !== current) {
        current = landedOn;
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
