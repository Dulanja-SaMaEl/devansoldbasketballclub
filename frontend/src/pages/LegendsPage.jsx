import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Award, Quote, Calendar, User, Search } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function LegendsPage() {
  const [legends, setLegends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getList('legends')
      .then(res => {
        if (res.data) setLegends(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredLegends = legends.filter(leg =>
    leg.name.toLowerCase().includes(search.toLowerCase()) ||
    (leg.nickname && leg.nickname.toLowerCase().includes(search.toLowerCase())) ||
    leg.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">HALL OF FAME</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Legends & Stalwarts
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          Celebrating legendary captains, coaches, players, and pioneers who shaped basketball culture at Maliyadeva College.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search legends by name, nickname, or position..."
          className="w-full bg-devan-dark-card border border-stone-800 rounded pl-10 pr-4 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
        />
      </div>

      {loading ? (
        <LoadingSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLegends.map((leg) => (
            <div
              key={leg.id}
              className="bg-devan-dark-card border border-devan-gold/30 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-archival hover:border-devan-gold transition-all"
            >
              {/* Yearbook Profile Frame */}
              <div className="w-36 h-48 shrink-0 rounded overflow-hidden border-2 border-devan-gold/40 relative shadow-md mx-auto sm:mx-0">
                <img
                  src={leg.profile_image_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"}
                  alt={leg.name}
                  className="w-full h-full object-cover vintage-photo"
                />
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <span className="archive-stamp text-[9px] text-devan-gold block w-max">
                    {leg.role} • {leg.years_active}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-devan-paper mt-2">
                    {leg.name}
                  </h3>
                  {leg.nickname && (
                    <span className="text-xs text-devan-gold font-serif italic block">
                      Known as {leg.nickname}
                    </span>
                  )}
                </div>

                <p className="font-serif text-xs text-stone-300 leading-relaxed">
                  {leg.bio}
                </p>

                {leg.quote && (
                  <blockquote className="font-serif text-xs text-stone-400 italic border-l-2 border-devan-maroon pl-3 py-1 bg-stone-900/40 rounded-r">
                    "{leg.quote}"
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
