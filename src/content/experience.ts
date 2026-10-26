export type PanelSide = 'left' | 'right';

export type Job = {
  company: string;
  role: string;
  dates: string;
  detail?: string;
  platform: { x: number; y: number };
  panel: PanelSide;
};

export const knightStart = { x: 91.5, y: 82.9 };

export const jobs: Job[] = [
  {
    company: 'Anomaly Labs',
    role: 'Game Developer',
    dates: 'Feb 2025 – Present',
    detail:
      'Gameplay programming for Doom Town, a VR multiplayer shooter, and Dungeons & Dragons VR, a choice-driven RPG with turn-based VR combat.',
    platform: { x: 26.6, y: 25.3 },
    panel: 'left',
  },
  {
    company: 'Dissent Studio',
    role: 'C++ Programmer',
    dates: 'Nov 2023 – Jun 2024',
    detail:
      'Built gameplay systems in C++ and Blueprints for White Rabbit, an Unreal Engine exploration game set in an abandoned theme park.',
    platform: { x: 39.7, y: 40.1 },
    panel: 'right',
  },
  {
    company: 'Alfaleus Technology',
    role: 'C# Programmer Intern',
    dates: 'Aug 2023 – Dec 2023',
    detail:
      'Developed iVA+, a VR eye-testing app for glaucoma detection, in Unity with the PICO SDK and XR Interaction Toolkit.',
    platform: { x: 54.2, y: 53.5 },
    panel: 'left',
  },
  {
    company: 'Halara',
    role: 'Unity Programmer Intern',
    dates: 'Jul 2022 – Nov 2022',
    platform: { x: 68.7, y: 70.9 },
    panel: 'right',
  },
];
