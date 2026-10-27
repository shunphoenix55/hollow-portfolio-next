export type IntroActors = {
  section: HTMLElement;
  backdrop: HTMLElement;
  knight: HTMLElement;
  body: HTMLElement;
  rock: HTMLElement;
  shards: HTMLElement[];
  slash: SVGPathElement;
  flash: HTMLElement;
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

const ORB_STAGGER_MS = 90;
const OUT = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const SPRING = 'cubic-bezier(0.2, 1.2, 0.35, 1)';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pose = (knight: HTMLElement, name: 'stand' | 'jump' | 'slash') => {
  knight.dataset.pose = name;
};

const puff = (dust: HTMLElement) =>
  dust.animate(
    [
      { opacity: 0.9, transform: 'scale(0.4, 0.6)' },
      { opacity: 0, transform: 'scale(1.4, 1)' },
    ],
    { duration: 520, easing: 'ease-out' },
  );

function breakRock({ rock, shards, slash, flash, rockDust, backdrop }: IntroActors) {
  slash.animate(
    [
      { strokeDashoffset: 1, opacity: 1 },
      { strokeDashoffset: 0, opacity: 1, offset: 0.55 },
      { strokeDashoffset: 0, opacity: 0 },
    ],
    { duration: 380, easing: 'ease-out' },
  );
  flash.animate([{ opacity: 0 }, { opacity: 0.9, offset: 0.2 }, { opacity: 0 }], {
    duration: 420,
    easing: 'ease-out',
  });
  backdrop.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: 'translate(-6px, 3px)' },
      { transform: 'translate(5px, -4px)' },
      { transform: 'translate(-3px, 2px)' },
      { transform: 'translate(0, 0)' },
    ],
    { duration: 260, easing: 'ease-out' },
  );
  rock.dataset.broken = '';
  puff(rockDust);
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
      { duration: 900, easing: 'cubic-bezier(0.25, 0.6, 0.5, 1)', fill: 'forwards' },
    );
  });
}

function releaseOrbs({ rock, orbs }: IntroActors) {
  const origin = rock.getBoundingClientRect();
  const ox = origin.left + origin.width / 2;
  const oy = origin.top + origin.height * 0.6;
  return orbs.map((orb, i) => {
    const box = orb.getBoundingClientRect();
    const dx = ox - (box.left + box.width / 2);
    const dy = oy - (box.top + box.height / 2);
    orb.dataset.shown = '';
    return orb.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(0.15)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ],
      { duration: 820, delay: i * ORB_STAGGER_MS, easing: SPRING, fill: 'backwards' },
    ).finished;
  });
}

export async function playStackIntro(actors: IntroActors) {
  const { section, knight, body, knightDust } = actors;
  section.dataset.intro = 'playing';
  pose(knight, 'stand');

  await body.animate([{ transform: 'none' }, { transform: 'scale(1.06, 0.9)' }], {
    duration: 170,
    easing: 'ease-in',
  }).finished;

  pose(knight, 'jump');
  await body.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: 'translate(36%, -62%)', offset: 0.55 },
      { transform: 'translate(62%, -24%)' },
    ],
    { duration: 380, easing: OUT, fill: 'forwards' },
  ).finished;

  pose(knight, 'slash');
  breakRock(actors);
  const orbs = wait(140).then(() => Promise.all(releaseOrbs(actors)));
  await body.animate(
    [{ transform: 'translate(62%, -24%)' }, { transform: 'translate(70%, -22%)' }],
    { duration: 200, easing: OUT, fill: 'forwards' },
  ).finished;

  pose(knight, 'jump');
  await body.animate(
    [
      { transform: 'translate(70%, -22%)' },
      { transform: 'translate(34%, -58%)', offset: 0.45 },
      { transform: 'translate(0, 0)' },
    ],
    { duration: 440, easing: 'ease-in-out', fill: 'forwards' },
  ).finished;

  pose(knight, 'stand');
  body.getAnimations().forEach((animation) => animation.cancel());
  puff(knightDust);
  await body.animate(
    [{ transform: 'scale(1.1, 0.86)' }, { transform: 'scale(0.97, 1.04)' }, { transform: 'none' }],
    { duration: 300, easing: OUT },
  ).finished;

  await orbs;
  section.dataset.intro = 'final';
}
