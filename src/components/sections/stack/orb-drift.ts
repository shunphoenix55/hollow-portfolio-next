type Mover = {
  el: HTMLElement;
  cx: number;
  cy: number;
  x: number;
  y: number;
  heading: number;
  turn: number;
  speed: number;
  radius: number;
  below: number;
};

export type DriftStart = { x: number; y: number; heading: number };

const MIN_SPEED = 140;
const MAX_SPEED = 240;
const MAX_TURN = 1.4;
const GAP = 22;
const PUSH = 260;
const REGION = { left: 0.04, right: 0.96, top: 0.08, bottom: 0.8 };

export function startOrbDrift(
  section: HTMLElement,
  orbs: HTMLElement[],
  starts: DriftStart[] = [],
) {
  let movers: Mover[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let last = 0;
  let visible = true;

  const measure = () => {
    const box = section.getBoundingClientRect();
    width = box.width;
    height = box.height;
    movers = orbs.map((el, i) => {
      const previous = movers[i];
      const ball = (el.firstElementChild as HTMLElement | null) ?? el;
      const rect = ball.getBoundingClientRect();
      const x = previous?.x ?? starts[i]?.x ?? 0;
      const y = previous?.y ?? starts[i]?.y ?? 0;
      return {
        el,
        cx: rect.left + rect.width / 2 - box.left - x,
        cy: rect.top + rect.height / 2 - box.top - y,
        x,
        y,
        heading: previous?.heading ?? starts[i]?.heading ?? Math.random() * Math.PI * 2,
        turn: previous?.turn ?? 0,
        speed: previous?.speed ?? MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
        radius: rect.width / 2,
        below: el.getBoundingClientRect().bottom - rect.bottom,
      };
    });
  };

  const separate = (dt: number) => {
    for (let i = 0; i < movers.length; i++) {
      for (let j = i + 1; j < movers.length; j++) {
        const a = movers[i];
        const b = movers[j];
        const dx = b.cx + b.x - (a.cx + a.x);
        const dy = b.cy + b.y - (a.cy + a.y);
        const distance = Math.hypot(dx, dy) || 1;
        const overlap = a.radius + b.radius + GAP - distance;
        if (overlap <= 0) continue;
        const shift = Math.min(overlap, PUSH * dt) / 2;
        a.x -= (dx / distance) * shift;
        a.y -= (dy / distance) * shift;
        b.x += (dx / distance) * shift;
        b.y += (dy / distance) * shift;
      }
    }
  };

  const move = (m: Mover, dt: number) => {
    m.turn += (Math.random() - 0.5) * 4 * dt;
    m.turn = Math.max(-MAX_TURN, Math.min(MAX_TURN, m.turn));
    m.heading += m.turn * dt;
    let px = m.cx + m.x + Math.cos(m.heading) * m.speed * dt;
    let py = m.cy + m.y + Math.sin(m.heading) * m.speed * dt;
    const minX = width * REGION.left + m.radius;
    const maxX = width * REGION.right - m.radius;
    const minY = height * REGION.top + m.radius;
    const maxY = height * REGION.bottom - m.radius - m.below;
    if (px < minX || px > maxX) {
      m.heading = Math.PI - m.heading;
      px = Math.min(maxX, Math.max(minX, px));
    }
    if (py < minY || py > maxY) {
      m.heading = -m.heading;
      py = Math.min(maxY, Math.max(minY, py));
    }
    m.x = px - m.cx;
    m.y = py - m.cy;
  };

  const loop = (now: number) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    movers.forEach((m) => move(m, dt));
    separate(dt);
    movers.forEach((m) => {
      m.el.style.transform = `translate(${m.x.toFixed(1)}px, ${m.y.toFixed(1)}px)`;
    });
    frame = requestAnimationFrame(loop);
  };
  const update = () => {
    const run = visible && !document.hidden;
    if (run && !frame) {
      last = 0;
      frame = requestAnimationFrame(loop);
    }
    if (!run && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });

  measure();
  io.observe(section);
  addEventListener('resize', measure);
  document.addEventListener('visibilitychange', update);
  update();

  return () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    removeEventListener('resize', measure);
    document.removeEventListener('visibilitychange', update);
  };
}
