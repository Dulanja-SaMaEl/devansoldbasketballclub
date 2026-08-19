import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('news', { publicOnly: 'true' })
      .then(res => {
        if (res.data) setNews(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">EDITORIAL BULLETIN</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Latest News & Articles
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          Announcements, tournament updates, and articles from the Devans Basketball editorial board.
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((art) => (
            <article key={art.id} className="bg-devan-dark-card border border-stone-800 rounded-lg overflow-hidden flex flex-col justify-between hover:border-devan-gold/50 transition-all">
              {art.cover_image_url && (
                <div className="h-52 overflow-hidden border-b border-stone-800">
                  <img src={art.cover_image_url} alt={art.title} className="w-full h-full object-cover vintage-photo" />
                </div>
              )}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-devan-gold">{art.published_date} • {art.author || 'Editorial'}</span>
                  <h3 className="font-serif text-xl font-bold text-devan-paper">{art.title}</h3>
                  <p className="font-serif text-xs text-stone-300 leading-relaxed">{art.excerpt}</p>
                </div>
                <div className="pt-4 border-t border-stone-800 text-xs font-bold text-devan-gold flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
