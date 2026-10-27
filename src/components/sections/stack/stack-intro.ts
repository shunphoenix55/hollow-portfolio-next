export type IntroActors = {
  section: HTMLElement;
  backdrop: HTMLElement;
  knight: HTMLElement;
  body: HTMLElement;
  rock: HTMLElement;
  shards: HTMLElement[];
  slash: SVGPathElement;
  flash: HTMLElement;
  dim: HTMLElement;
  rockDust: HTMLElement;
  knightDust: HTMLElement;
  orbs: HTMLElement[];
};

const SHARD_FLIGHT = [
  [-60, -90, -50],
  [40, -110, 40],
  [95, -40, 70],
  [55, 35, 25],
  [-45, 30, -30],
  [-95, -30, -65],
];

const ORB_STAGGER_MS = 170;
const CLUSTER_CENTER_Y = 0.4;
const CLUSTER_SPACING = 58;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const CLUSTER_HOLD_MS = 700;
const OUT = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const SLOW_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';
const SPRING = 'cubic-bezier(0.2, 1.15, 0.35, 1)';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pose = (knight: HTMLElement, name: 'stand' | 'jump' | 'slash') => {
  knight.dataset.pose = name;
};

const puff = (dust: HTMLElement, duration = 700) =>
  dust.animate(
    [
      { opacity: 0.9, transform: 'scale(0.4, 0.6)' },
      { opacity: 0, transform: 'scale(1.5, 1)' },
    ],
    { duration, easing: 'ease-out' },
  );

const dimScene = (dim: HTMLElement, to: number, duration: number) =>
  dim.animate([{ opacity: Number(getComputedStyle(dim).opacity) }, { opacity: to }], {
    duration,
    easing: 'ease-in-out',
    fill: 'forwards',
  });

function breakRock({ rock, shards, slash, flash, rockDust, backdrop }: IntroActors) {
  slash.animate(
    [
      { strokeDashoffset: 1, opacity: 1 },
      { strokeDashoffset: 0, opacity: 1, offset: 0.5 },
      { strokeDashoffset: 0, opacity: 0 },
    ],
    { duration: 950, easing: 'ease-out' },
  );
  flash.animate([{ opacity: 0 }, { opacity: 0.95, offset: 0.18 }, { opacity: 0 }], {
    duration: 1200,
    easing: 'ease-out',
  });
  backdrop.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: 'translate(-5px, 3px)' },
      { transform: 'translate(4px, -3px)' },
      { transform: 'translate(-2px, 1px)' },
      { transform: 'translate(0, 0)' },
    ],
    { duration: 420, easing: 'ease-out' },
  );
  rock.dataset.broken = '';
  puff(rockDust, 1100);
  shards.forEach((shard, i) => {
    const [x, y, turn] = SHARD_FLIGHT[i % SHARD_FLIGHT.length];
    shard.animate(
      [
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        {
          transform: `translate(${x * 0.6}%, ${y}%) rotate(${turn * 0.6}deg)`,
          opacity: 1,
          offset: 0.45,
        },
        { transform: `translate(${x}%, ${y + 140}%) rotate(${turn}deg)`, opacity: 0 },
      ],
      { duration: 1800, easing: 'cubic-bezier(0.25, 0.6, 0.5, 1)', fill: 'forwards' },
    );
  });
}

export type OrbStart = { x: number; y: number; heading: number };

function releaseOrbs({ section, rock, orbs }: IntroActors) {
  const stage = section.getBoundingClientRect();
  const origin = rock.getBoundingClientRect();
  const ox = origin.left + origin.width / 2;
  const oy = origin.top + origin.height * 0.6;
  const cx = stage.left + stage.width / 2;
  const cy = stage.top + stage.height * CLUSTER_CENTER_Y;
  const spacing = Math.min(CLUSTER_SPACING, stage.width / 9);
  return orbs.map((orb, i) => {
    const box = orb.getBoundingClientRect();
    const bx = box.left + box.width / 2;
    const by = box.top + box.height / 2;
    const heading = i * GOLDEN_ANGLE;
    const distance = spacing * Math.sqrt(i + 0.5);
    const start: OrbStart = {
      x: cx + Math.cos(heading) * distance * 1.6 - bx,
      y: cy + Math.sin(heading) * distance * 0.9 - by,
      heading,
    };
    orb.dataset.shown = '';
    const flight = orb.animate(
      [
        { transform: `translate(${ox - bx}px, ${oy - by}px) scale(0.15)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: `translate(${start.x}px, ${start.y}px) scale(1)`, opacity: 1 },
      ],
      { duration: 1500, delay: i * ORB_STAGGER_MS, easing: SPRING, fill: 'both' },
    );
    return flight.finished.then(() => {
      orb.style.transform = `translate(${start.x}px, ${start.y}px)`;
      flight.cancel();
      return start;
    });
  });
}

export async function playStackIntro(actors: IntroActors) {
  const { section, knight, body, knightDust, dim } = actors;
  section.dataset.intro = 'playing';
  pose(knight, 'stand');

  dimScene(dim, 0.45, 900);
  await body.animate(
    [
      { transform: 'none' },
      { transform: 'scale(1.08, 0.86)', offset: 0.6 },
      { transform: 'scale(1.08, 0.86)' },
    ],
    { duration: 520, easing: 'ease-in' },
  ).finished;

  pose(knight, 'jump');
  await body.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: 'translate(34%, -66%)', offset: 0.6 },
      { transform: 'translate(58%, -30%)' },
    ],
    { duration: 900, easing: OUT, fill: 'forwards' },
  ).finished;

  pose(knight, 'slash');
  breakRock(actors);
  const orbs = wait(520).then(() => {
    dimScene(dim, 0, 1400);
    return Promise.all(releaseOrbs(actors));
  });
  await body.animate(
    [{ transform: 'translate(58%, -30%)' }, { transform: 'translate(68%, -26%)' }],
    { duration: 950, easing: SLOW_IN_OUT, fill: 'forwards' },
  ).finished;

  pose(knight, 'jump');
  await body.animate(
    [
      { transform: 'translate(68%, -26%)' },
      { transform: 'translate(32%, -60%)', offset: 0.45 },
      { transform: 'translate(0, 0)' },
    ],
    { duration: 1000, easing: SLOW_IN_OUT, fill: 'forwards' },
  ).finished;

  pose(knight, 'stand');
  body.getAnimations().forEach((animation) => animation.cancel());
  puff(knightDust);
  await body.animate(
    [{ transform: 'scale(1.1, 0.86)' }, { transform: 'scale(0.97, 1.04)' }, { transform: 'none' }],
    { duration: 500, easing: OUT },
  ).finished;

  const starts = await orbs;
  section.dataset.intro = 'final';
  await wait(CLUSTER_HOLD_MS);
  return starts;
}
