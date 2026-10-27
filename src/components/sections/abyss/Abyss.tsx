'use client';

import dynamic from 'next/dynamic';

const AbyssCanvas = dynamic(() => import('./AbyssCanvas'), { ssr: false });

export function Abyss({ revealOnHero = false }: { revealOnHero?: boolean }) {
  return <AbyssCanvas revealOnHero={revealOnHero} />;
}
