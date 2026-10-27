'use client';

import { useEffect, useState } from 'react';

export function useHashSelection(entries: { slug: string }[]) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fromHash = () => {
      const index = entries.findIndex((entry) => entry.slug === location.hash.slice(1));
      if (index >= 0) setActive(index);
    };
    fromHash();
    addEventListener('hashchange', fromHash);
    return () => removeEventListener('hashchange', fromHash);
  }, [entries]);

  const select = (index: number) => {
    setActive(index);
    history.replaceState(null, '', `#${entries[index].slug}`);
  };

  return [active, select] as const;
}
