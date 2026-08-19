import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CHAPTERS = [
  { num: '01', name: 'ORIGIN' },
  { num: '02', name: 'RISE' },
  { num: '03', name: 'CHAMPIONS' },
  { num: '04', name: 'LEGENDS' },
  { num: '05', name: 'GENERATIONS' },
  { num: '06', name: 'MEMORIES' },
  { num: '07', name: 'PRESENT' },
  { num: '08', name: 'FUTURE' }
];

export default function ScrollProgressTrack() {
  const location = useLocation();
  const [activeChapter, setActiveChapter] = useState(0);

  // MUST be called before any conditional return to follow React Rules of Hooks
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = scrollPos / totalHeight;
      const index = Math.min(
        Math.floor(progress * CHAPTERS.length),
        CHAPTERS.length - 1
      );
      setActiveChapter(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Render chapters progress bar exclusively on the homepage
  if (location.pathname !== '/') return null;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-4 pointer-events-none">
      <div className="w-px h-12 bg-gradient-to-b from-transparent to-devan-gold/40 mx-auto" />

      {CHAPTERS.map((ch, idx) => {
        const isActive = activeChapter === idx;
        return (
          <div
            key={ch.num}
            className={`flex items-center space-x-3 transition-all duration-300 ${
              isActive ? 'opacity-100 translate-x-1' : 'opacity-30'
            }`}
          >
            <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-devan-gold' : 'text-stone-500'}`}>
              {ch.num}
            </span>
            <div className={`h-px transition-all duration-300 ${isActive ? 'w-6 bg-devan-gold' : 'w-2 bg-stone-700'}`} />
            {isActive && (
              <span className="text-[9px] font-display font-bold tracking-widest text-devan-gold uppercase animate-fadeIn">
                {ch.name}
              </span>
            )}
          </div>
        );
      })}

      <div className="w-px h-12 bg-gradient-to-t from-transparent to-devan-gold/40 mx-auto" />
    </div>
  );
}
