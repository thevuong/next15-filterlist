'use client';

import React, { useEffect, useState } from 'react';

export default function LoadTimeTracker() {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const handleLoad = () => {
      if (performance.getEntriesByType) {
        const [navigationEntry] = performance.getEntriesByType('navigation');

        if (navigationEntry) {
          const loadDuration = performance.now() - navigationEntry.startTime;
          setLoadTime(loadDuration);
        }
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      LoadTimeTracker
      {loadTime !== null && <div>Page Load Time: {(loadTime / 1000).toFixed(3)} s</div>}
    </div>
  );
}
