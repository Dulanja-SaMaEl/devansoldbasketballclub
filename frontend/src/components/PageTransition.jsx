import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Scroll to top instantly
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTransitioning(true);

    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative min-h-[85vh]">
      {/* Heritage Curtain Transition Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#0d0c0a] flex flex-col items-center justify-center transition-all duration-300 pointer-events-none ${
          transitioning ? 'opacity-100 backdrop-blur-md' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-4 transform transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-devan-maroon border-2 border-devan-gold flex items-center justify-center shadow-gold-glow animate-pulse">
            <Shield className="w-7 h-7 text-devan-gold" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="archive-stamp text-[10px] text-devan-gold tracking-widest uppercase font-mono">
              DEVANS DIGITAL LEGACY
            </span>
          </div>
          <div className="w-28 h-0.5 bg-stone-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-devan-gold animate-pulse" />
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
}
