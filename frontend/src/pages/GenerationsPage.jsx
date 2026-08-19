import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BookOpen, Calendar, Users, Shield } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function GenerationsPage() {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGen, setActiveGen] = useState(null);

  useEffect(() => {
    api.getList('generations')
      .then(res => {
        if (res.data) {
          setGenerations(res.data);
          setActiveGen(res.data[0] || null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">DECADE GENERATIONS</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Generations Explorer
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          Explore team rosters, memories, and photos organized by basketball decade eras.
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="space-y-10">
          
          {/* Era Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {generations.map((gen) => (
              <button
                key={gen.id}
                onClick={() => setActiveGen(gen)}
                className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded transition-all ${
                  activeGen?.id === gen.id
                    ? 'bg-devan-maroon border border-devan-gold text-devan-gold shadow-gold-glow'
                    : 'bg-devan-dark-card border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {gen.name} ({gen.start_year} - {gen.end_year})
              </button>
            ))}
          </div>

          {/* Active Generation Detail Showcase */}
          {activeGen && (
            <div className="bg-devan-dark-card border border-devan-gold/40 rounded-xl p-8 sm:p-10 space-y-8 shadow-archival">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="archive-stamp text-[10px] text-devan-gold">
                    ERA ERA RECORD • {activeGen.start_year} - {activeGen.end_year}
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-devan-paper">
                    {activeGen.name}
                  </h2>
                  <p className="font-serif text-stone-300 text-base leading-relaxed">
                    {activeGen.description}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-lg overflow-hidden border border-devan-gold/40 shadow-lg">
                    <img
                      src={activeGen.team_photo_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"}
                      alt={activeGen.name}
                      className="w-full h-64 object-cover vintage-photo"
                    />
                    <div className="bg-devan-dark p-3 text-center text-[10px] uppercase font-mono text-stone-400 border-t border-stone-800">
                      Historical Squad Photo ({activeGen.start_year} Era)
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
