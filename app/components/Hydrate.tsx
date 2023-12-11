'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePreferencesStore } from '@/hooks/usePreferencesStore';

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const darkMode = usePreferencesStore(state => state.darkTheme);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (isHydrated) return <div className={`${darkMode ? 'dark' : ''}`}>{children}</div>;
}
