'use client';

import dynamic from 'next/dynamic';

const AbyssCanvas = dynamic(() => import('./AbyssCanvas'), { ssr: false });

export function Abyss() {
  return <AbyssCanvas />;
}
