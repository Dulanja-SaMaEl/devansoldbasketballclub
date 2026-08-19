import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TrophyCabinet from '../components/TrophyCabinet';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SeoHead from '../components/SeoHead';
import { getBreadcrumbSchema } from '../utils/seoUtils';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('achievements')
      .then(res => {
        if (res.data) setAchievements(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SeoHead
        title="Devans Basketball Achievements & Trophy Room | Maliyadeva College"
        description="Exhibition of all-island championship titles, provincial cups, and tournament trophies won by Maliyadeva College Basketball."
        canonicalPath="/achievements"
        jsonLd={getBreadcrumbSchema([{ name: 'Achievements', path: '/achievements' }])}
      />
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">TROPHY ROOM</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Championship Archive & Trophies
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          A complete exhibition of shields, cups, provincial tournaments, and all-island championship titles won by Devans Basketball.
        </p>
      </div>

      {loading ? <LoadingSkeleton count={6} /> : <TrophyCabinet achievements={achievements} />}

    </div>
  );
}
