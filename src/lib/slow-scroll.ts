import { clamp } from './math';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

export function slowScrollTo(element: HTMLElement, duration = 1600) {
  const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const start = scrollY;
  const target = () => scrollY + element.getBoundingClientRect().top - margin;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scrollTo({ top: target(), behavior: 'instant' });
    return;
  }
  let frame = 0;
  const began = performance.now();
  const cancel = () => {
    cancelAnimationFrame(frame);
    removeEventListener('wheel', cancel);
    removeEventListener('touchstart', cancel);
    removeEventListener('keydown', cancel);
  };
  const step = (now: number) => {
    const progress = clamp((now - began) / duration);
    scrollTo({ top: start + (target() - start) * easeInOutCubic(progress), behavior: 'instant' });
    if (progress < 1) frame = requestAnimationFrame(step);
    else cancel();
  };
  addEventListener('wheel', cancel, { passive: true });
  addEventListener('touchstart', cancel, { passive: true });
  addEventListener('keydown', cancel);
  frame = requestAnimationFrame(step);
}
