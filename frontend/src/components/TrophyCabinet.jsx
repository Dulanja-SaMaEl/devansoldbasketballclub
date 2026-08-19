import React, { useState } from 'react';
import { Award, Shield, Calendar, ChevronRight, User, Star } from 'lucide-react';

export default function TrophyCabinet({ achievements }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Island Wide', 'Provincial', 'Alumni'];

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-bold rounded transition-all ${
              selectedCategory === cat
                ? 'bg-devan-gold text-devan-dark shadow-gold-glow'
                : 'bg-devan-dark-card text-stone-400 border border-stone-800 hover:border-devan-gold/50 hover:text-stone-200'
            }`}
          >
            {cat} Achievements
          </button>
        ))}
      </div>

      {/* Trophy Cabinet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((item) => (
          <div
            key={item.id}
            className="group relative bg-devan-dark-card border border-devan-gold/30 rounded-lg overflow-hidden shadow-archival hover:border-devan-gold transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Metallic Banner */}
            <div className="bg-gradient-to-r from-devan-maroon via-devan-maroon-dark to-devan-maroon px-5 py-3 border-b border-devan-gold/40 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-devan-gold shrink-0 animate-pulse" />
                <span className="text-xs font-display font-bold tracking-widest text-devan-gold uppercase">
                  {item.position || 'CHAMPIONS'}
                </span>
              </div>
              <span className="text-xs font-serif font-bold text-stone-300 bg-black/40 px-2.5 py-0.5 rounded border border-devan-gold/20">
                {item.year}
              </span>
            </div>

            {/* Achievement Image & Details */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              {item.image_url && (
                <div className="h-44 overflow-hidden rounded border border-stone-800 relative group-hover:border-devan-gold/50 transition-colors">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover vintage-photo group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              )}

              <div>
                <span className="archive-stamp text-[9px] text-devan-gold mb-2 block w-max">
                  {item.tournament}
                </span>
                <h4 className="font-serif text-xl font-bold text-devan-paper group-hover:text-devan-gold transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-300 font-serif mt-2 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Team Credits */}
              <div className="pt-4 border-t border-stone-800/80 grid grid-cols-2 gap-2 text-[11px] text-stone-400 font-serif">
                {item.captain && (
                  <div>
                    <span className="text-stone-500 block uppercase text-[9px] tracking-wider font-sans">Captain</span>
                    <span className="text-stone-200">{item.captain}</span>
                  </div>
                )}
                {item.coach && (
                  <div>
                    <span className="text-stone-500 block uppercase text-[9px] tracking-wider font-sans">Coach</span>
                    <span className="text-stone-200">{item.coach}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12 border border-dashed border-stone-800 rounded-lg">
          <Award className="w-10 h-10 text-stone-600 mx-auto mb-3" />
          <p className="text-stone-400 font-serif text-sm">No trophy records found in this category.</p>
          <p className="text-xs text-stone-500 mt-1">Check back soon or explore other achievement categories.</p>
        </div>
      )}
    </div>
  );
}
