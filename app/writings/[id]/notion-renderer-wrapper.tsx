"use client";

import * as React from 'react';
import { NotionRenderer } from 'react-notion-x';
import { useTheme } from 'next-themes';

export function NotionRendererWrapper({ recordMap }: { recordMap: any }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  return (
    <div className={isDark ? 'notion-dark-theme' : ''}>
      <NotionRenderer 
        recordMap={recordMap} 
        fullPage={true} 
        darkMode={isDark} 
        disableHeader={true}
      />
    </div>
  );
}
