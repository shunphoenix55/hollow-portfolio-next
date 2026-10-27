export type CreditBlock = { lead: string; name: string; note?: string };

export const creditRoll: CreditBlock[] = [
  { lead: 'a portfolio by', name: 'Wahhaj Mustafa', note: 'game and XR developer' },
  {
    lead: 'currently at',
    name: 'Anomaly Labs',
    note: 'Gameplay Programmer · Feb 2025 – Present',
  },
  {
    lead: 'previously',
    name: 'Dissent Studio',
    note: 'Alfaleus Technology · Halara',
  },
  {
    lead: 'builds with',
    name: 'Unity and Unreal Engine',
    note: 'C# · C++ · Blueprints · Meta XR',
  },
  {
    lead: 'shipped in VR',
    name: 'Doom Town and Dungeons and Dragons VR',
    note: 'Meta Quest 2 and 3',
  },
  {
    lead: 'built in Unreal Engine',
    name: 'White Rabbit',
    note: 'FPS combat · sanity · inventory · quest systems',
  },
  {
    lead: 'award-winning builds',
    name: 'BhashaXR',
    note: 'Best UI/UX and Best in Education · Yantra ’24',
  },
  {
    lead: 'jam games',
    name: 'Bubbleoidvania and Clink!',
    note: 'Global Game Jam 2025 · WTFxIGDC Game Jam',
  },
  {
    lead: 'recognised at',
    name: 'Yantra ’24 and SFMOMA ArtCade',
    note: 'Global Game Jam 2025 · WomenTechies ’23',
  },
  {
    lead: 'led and taught at',
    name: 'CodeChef VIT and TAG Club VIT',
    note: 'DEVSOC ’23 · XR, Blender and Unity workshops',
  },
];

export const guildScene = {
  title: 'Organizations and Workshops',
  lines: [
    'XR Lead at CodeChef VIT and Projects Lead at TAG Club VIT, 2022 – 2024.',
    'Coordinated DEVSOC ’23 for 1300+ participants, and taught XR, Blender and Unity workshops.',
  ],
  cta: {
    label: 'See organizations and workshops',
    href: '/organizations',
  },
};

export const farewellLine =
  'Leaving already, traveller? Wahhaj will stay here by the lamp, building the next world. Got a game, a VR idea or a jam that needs a developer? Come find him. Safe travels.';
