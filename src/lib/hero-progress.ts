type Listener = (progress: number) => void;

const listeners = new Set<Listener>();
let latest = 0;

export function publishHeroProgress(progress: number) {
  latest = progress;
  listeners.forEach((listener) => listener(progress));
}

export function subscribeHeroProgress(listener: Listener) {
  listeners.add(listener);
  listener(latest);
  return () => {
    listeners.delete(listener);
  };
}
