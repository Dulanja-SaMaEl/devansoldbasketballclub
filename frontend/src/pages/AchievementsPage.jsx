import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TrophyCabinet from '../components/TrophyCabinet';
import LoadingSkeleton from '../components/LoadingSkeleton';

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
