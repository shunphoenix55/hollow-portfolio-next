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

const MIN_SPEED = 18;
const MAX_SPEED = 36;
const MAX_TURN = 0.8;
const EDGE = 8;
const TOP_SHARE = 0.06;
const BOTTOM_SHARE = 0.8;

export function startOrbDrift(section: HTMLElement, orbs: HTMLElement[]) {
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
      const x = previous?.x ?? 0;
      const y = previous?.y ?? 0;
      return {
        el,
        cx: rect.left + rect.width / 2 - box.left - x,
        cy: rect.top + rect.height / 2 - box.top - y,
        x,
        y,
        heading: previous?.heading ?? Math.random() * Math.PI * 2,
        turn: previous?.turn ?? 0,
        speed: previous?.speed ?? MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
        radius: rect.width / 2,
        below: el.getBoundingClientRect().bottom - rect.bottom,
      };
    });
  };

  const step = (m: Mover, dt: number) => {
    m.turn += (Math.random() - 0.5) * 2 * dt;
    m.turn = Math.max(-MAX_TURN, Math.min(MAX_TURN, m.turn));
    m.heading += m.turn * dt;
    let px = m.cx + m.x + Math.cos(m.heading) * m.speed * dt;
    let py = m.cy + m.y + Math.sin(m.heading) * m.speed * dt;
    const minX = m.radius + EDGE;
    const maxX = width - m.radius - EDGE;
    const minY = height * TOP_SHARE + m.radius;
    const maxY = height * BOTTOM_SHARE - m.radius - m.below;
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
    m.el.style.transform = `translate(${m.x.toFixed(1)}px, ${m.y.toFixed(1)}px)`;
  };

  const loop = (now: number) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    movers.forEach((m) => step(m, dt));
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
