export type ProjectArt = 'sea' | 'ash' | 'night' | 'frost';

export type Project = {
  title: string;
  art: ProjectArt;
  points: string[];
};

export const projectsHeading = {
  title: 'Projects, Hackathons and Game Jams',
  count: 12,
  masks: 5,
  viewAllHref: '/projects',
};

export const projects: Project[] = [
  {
    title: 'Lanternfall',
    art: 'sea',
    points: [
      'A hand-drawn 2D action platformer with a tight movement and combat controller built from scratch.',
      'Interconnected zones, bench saves and a persistent world state that remembers every broken wall.',
    ],
  },
  {
    title: 'Moth & Mire',
    art: 'ash',
    points: [
      'A short atmospheric puzzle platformer about light, made in 48 hours for a game jam.',
      'Every room is solved by bending a single lantern beam, with no text and no tutorials.',
    ],
  },
  {
    title: 'Pale Archive',
    art: 'night',
    points: [
      'A procedural dungeon crawler where each run rewrites the map from a seeded lore graph.',
      'Custom editor tooling lets designers author rooms and encounter tables without code.',
    ],
  },
  {
    title: 'Hollow Bell',
    art: 'frost',
    points: [
      'A rhythm combat prototype where enemy attacks follow the beat of the score.',
      'Audio-driven timing system with frame-accurate input windows on desktop and mobile.',
    ],
  },
];
