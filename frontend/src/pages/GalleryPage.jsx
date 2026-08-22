import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Lightbox from '../components/Lightbox';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { getBreadcrumbSchema } from '../utils/seoUtils';

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api.getList('gallery')
      .then(res => {
        if (res.data) setGallery(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Teams', 'Matches', 'Trophies', 'Reunions', 'Vintage'];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(img => img.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SeoHead
        title="Devans Basketball Photo Archives & Gallery | Maliyadeva College"
        description="Historical photographic archive of Old Devans Basketball Club featuring championship teams, matches, trophy celebrations, and reunions at Maliyadeva College."
        canonicalPath="/gallery"
        jsonLd={getBreadcrumbSchema([{ name: 'Gallery Archive', path: '/gallery' }])}
      />
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">PHOTOGRAPHIC ARCHIVE</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Historical Photo Wall
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          Scanned team photographs, match action, championship celebrations, and alumni gatherings.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded transition-all ${
              selectedCategory === cat
                ? 'bg-devan-gold text-devan-dark font-bold shadow-gold-glow'
                : 'bg-devan-dark-card text-stone-400 border border-stone-800 hover:border-devan-gold/40'
            }`}
          >
            {cat} Photos
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group cursor-pointer bg-devan-dark-card border border-stone-800 rounded-lg overflow-hidden relative shadow-archival hover:border-devan-gold transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover vintage-photo group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-devan-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 space-y-1 bg-devan-dark-card">
                <div className="flex items-center justify-between text-[10px] font-mono text-devan-gold">
                  <span>{img.year || 'HISTORIC'}</span>
                  <span>{img.category}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-devan-paper truncate">
                  {img.title}
                </h3>
                {img.caption && (
                  <p className="text-xs text-stone-400 font-serif line-clamp-2">
                    {img.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}
