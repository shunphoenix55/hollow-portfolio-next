export type SocialKind = 'github' | 'linkedin';

export type Social = { kind: SocialKind; label: string; href: string };

export const site = {
  name: 'Wahhaj Mustafa',
  role: 'Game Developer',
  title: 'Wahhaj Mustafa — Game Developer',
  description:
    'Portfolio of Wahhaj Mustafa, a game developer building VR, XR and gameplay systems in Unity and Unreal Engine.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  dialogue:
    "Ho there, traveller. I'm Wahhaj, a game developer who builds worlds worth getting lost in. Rest by the lamp a while, then choose your path below.",
  shortRole: 'Game / XR Dev',
  copyright: '© 2026 Wahhaj Mustafa',
  email: 'wahhaj.musthafa@gmail.com',
} as const;

export const socials: Social[] = [
  { kind: 'github', label: 'GitHub', href: 'https://github.com/shunphoenix55' },
  { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/wahhaj-mustafa' },
];
