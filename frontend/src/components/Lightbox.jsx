import React, { useEffect } from 'react';
import { X, Calendar, Tag, User } from 'lucide-react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-stone-300 hover:text-devan-gold bg-stone-900/80 rounded-full border border-stone-700 transition-colors z-50"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-devan-dark-card border border-devan-gold/30 rounded-lg overflow-hidden shadow-2xl">
        {/* Photo Container */}
        <div className="flex-1 bg-black flex items-center justify-center p-4 relative min-h-[300px]">
          <img
            src={image.image_url || image.url}
            alt={image.title || 'Archival Photograph'}
            className="max-h-[75vh] w-auto object-contain rounded border border-stone-800"
          />
        </div>

        {/* Archival Details Panel */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-devan-dark border-t md:border-t-0 md:border-l border-stone-800">
          <div className="space-y-4">
            <div className="archive-stamp text-[10px] text-devan-gold">
              ARCHIVAL PHOTOGRAPH • {image.year || 'HISTORIC'}
            </div>
            
            <h3 className="font-serif text-xl font-bold text-devan-paper">
              {image.title}
            </h3>

            {image.caption && (
              <p className="text-sm text-stone-300 font-serif italic leading-relaxed border-l-2 border-devan-maroon pl-3 py-1">
                "{image.caption}"
              </p>
            )}

            <div className="space-y-2 pt-4 border-t border-stone-800 text-xs text-stone-400">
              {image.category && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-3.5 h-3.5 text-devan-gold" />
                  <span>Category: <strong className="text-stone-200">{image.category}</strong></span>
                </div>
              )}
              {image.year && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-devan-gold" />
                  <span>Year: <strong className="text-stone-200">{image.year}</strong></span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 text-[10px] text-stone-500 uppercase tracking-widest font-serif">
            Devans Old Basketball Club Archives
          </div>
        </div>
      </div>
    </div>
  );
}
