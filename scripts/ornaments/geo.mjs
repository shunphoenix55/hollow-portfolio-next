const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1 / (len(a) || 1));

export class Stroke {
  constructor(start) {
    this.pts = [start];
    this.ball = 0;
    this.startBall = 0;
  }
  last() {
    return this.pts[this.pts.length - 1];
  }
  tangent() {
    const n = this.pts.length;
    return unit(sub(this.pts[n - 1], this.pts[n - 2]));
  }
  c(c1, c2, to, n = 18) {
    const p0 = this.last();
    for (let i = 1; i <= n; i++) {
      const t = i / n, m = 1 - t;
      const a = m * m * m, b = 3 * m * m * t, c = 3 * m * t * t, d = t * t * t;
      this.pts.push([
        a * p0[0] + b * c1[0] + c * c2[0] + d * to[0],
        a * p0[1] + b * c1[1] + c * c2[1] + d * to[1],
      ]);
    }
    return this;
  }
  q(c1, to, n = 16) {
    const p0 = this.last();
    return this.c(add(p0, mul(sub(c1, p0), 2 / 3)), add(to, mul(sub(c1, to), 2 / 3)), to, n);
  }
  l(to, n = 12) {
    const p0 = this.last();
    for (let i = 1; i <= n; i++) this.pts.push(add(p0, mul(sub(to, p0), i / n)));
    return this;
  }
  curl({ r, turns = 1.2, shrink = 0.35, side = 1, n = 44 }) {
    const p = this.last();
    const t = this.tangent();
    const left = [t[1], -t[0]];
    const ctr = add(p, mul(left, side * r));
    const a0 = Math.atan2(p[1] - ctr[1], p[0] - ctr[0]);
    const sweep = -side * turns * Math.PI * 2;
    for (let i = 1; i <= n; i++) {
      const f = i / n;
      const th = a0 + sweep * f;
      const rr = r * Math.pow(shrink, f);
      this.pts.push([ctr[0] + rr * Math.cos(th), ctr[1] + rr * Math.sin(th)]);
    }
    return this;
  }
  end(ball) {
    this.ball = ball;
    return this;
  }
  begin(ball) {
    this.startBall = ball;
    return this;
  }
}

function widthAt(keys, f) {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [f1, w1] = keys[i];
    const [f0, w0] = keys[i - 1];
    if (f <= f1) {
      const t = (f - f0) / (f1 - f0 || 1);
      const s = (1 - Math.cos(Math.PI * t)) / 2;
      return w0 + (w1 - w0) * s;
    }
  }
  return keys[keys.length - 1][1];
}

const fmt = (v) => (Math.round(v * 10) / 10).toString();
const pt = (p) => `${fmt(p[0])} ${fmt(p[1])}`;

export function outline(stroke, keys, mirror = false) {
  let pts = stroke.pts.filter((p, i, a) => i === 0 || len(sub(p, a[i - 1])) > 0.01);
  if (mirror) pts = pts.map(([x, y]) => [-x, y]);
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + len(sub(pts[i], pts[i - 1])));
  const total = cum[cum.length - 1];
  const L = [], R = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const d = unit(sub(b, a));
    const nrm = [-d[1], d[0]];
    const w = widthAt(keys, cum[i] / total) / 2;
    L.push(add(pts[i], mul(nrm, w)));
    R.push(sub(pts[i], mul(nrm, w)));
  }
  let d = `M${pt(L[0])}`;
  for (let i = 1; i < L.length; i++) d += `L${pt(L[i])}`;
  for (let i = R.length - 1; i >= 0; i--) d += `L${pt(R[i])}`;
  d += 'Z';
  const circle = (c, r) =>
    `M${pt([c[0] - r, c[1]])}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(2 * r)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-2 * r)} 0Z`;
  if (stroke.ball) d += circle(pts[pts.length - 1], stroke.ball);
  if (stroke.startBall) d += circle(pts[0], stroke.startBall);
  return d;
}

export function ellipseRing(cx, cy, rx, ry, w) {
  const o = (a, b) => `M${fmt(cx - a)} ${fmt(cy)}a${fmt(a)} ${fmt(b)} 0 1 0 ${fmt(2 * a)} 0a${fmt(a)} ${fmt(b)} 0 1 0 ${fmt(-2 * a)} 0Z`;
  return o(rx + w / 2, ry + w / 2) + o(rx - w / 2, ry - w / 2).replace(/0 1 0/g, '0 1 1');
}

export function eggBands(cx, cy, rx, ry, ys, w) {
  return ys
    .map((y) => {
      const half = rx * Math.sqrt(Math.max(0, 1 - (y / ry) ** 2));
      return `M${fmt(cx - half)} ${fmt(cy + y - w / 2)}H${fmt(cx + half)}V${fmt(cy + y + w / 2)}H${fmt(cx - half)}Z`;
    })
    .join('');
}

export function symmetric(parts) {
  return parts.map(([s, k, mirrorToo = true]) => outline(s, k) + (mirrorToo ? outline(s, k, true) : '')).join('');
}
