import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { History as HistoryIcon, Calendar, User, Tag, ArrowUpRight } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function HistoryPage() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    api.getList('timeline')
      .then(res => {
        if (res.data) setTimeline(res.data.sort((a, b) => a.year - b.year));
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Founding', 'Championship', 'Title', 'Expansion', 'Legacy'];

  const filteredTimeline = selectedCategory === 'All'
    ? timeline
    : timeline.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">HISTORICAL ARCHIVE</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Chronological History
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          Journeying through five decades of Maliyadeva basketball milestones, victories, and court developments.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded transition-all ${
              selectedCategory === cat
                ? 'bg-devan-gold text-devan-dark font-bold shadow-gold-glow'
                : 'bg-devan-dark-card text-stone-400 border border-stone-800 hover:border-devan-gold/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSkeleton count={4} />
      ) : (
        /* Vertical Historical Timeline Stream */
        <div className="relative border-l-2 border-devan-gold/40 ml-4 sm:ml-36 space-y-12 pl-6 sm:pl-10">
          {filteredTimeline.map((item, index) => (
            <div key={item.id} className="relative group">
              {/* Year Marker Pin */}
              <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-devan-maroon border-2 border-devan-gold flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform z-10">
                <div className="w-2 h-2 rounded-full bg-devan-gold" />
              </div>

              {/* Year Badge Positioned for Desktop */}
              <div className="hidden sm:block absolute top-0 right-[calc(100%+20px)] font-display text-xl font-extrabold text-devan-gold text-right whitespace-nowrap">
                {item.year}
              </div>

              {/* Content Card */}
              <div className="bg-devan-dark-card border border-devan-gold/30 rounded-lg p-6 space-y-4 shadow-archival hover:border-devan-gold transition-all">
                <div className="flex items-center justify-between">
                  <span className="sm:hidden font-display text-xl font-bold text-devan-gold">{item.year}</span>
                  <span className="archive-stamp text-[9px] text-devan-gold">
                    {item.category || 'Milestone'}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-devan-paper">
                  {item.title}
                </h3>

                <p className="font-serif text-sm text-stone-300 leading-relaxed">
                  {item.description}
                </p>

                {item.key_figures && (
                  <div className="pt-3 border-t border-stone-800/80 flex items-center space-x-2 text-xs text-stone-400">
                    <User className="w-3.5 h-3.5 text-devan-gold shrink-0" />
                    <span>Key Figures: <strong className="text-stone-200">{item.key_figures}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
