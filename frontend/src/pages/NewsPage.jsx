import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { BookOpen, Calendar, ArrowRight, X } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SeoHead from '../components/SeoHead';
import { slugify, getBreadcrumbSchema } from '../utils/seoUtils';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    api.getList('news', { publicOnly: 'true' })
      .then(res => {
        if (res.data) setNews(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SeoHead
        title="Devans Basketball News & Articles | Maliyadeva Editorial Bulletin"
        description="Official news, tournament results, club announcements, and editorial articles from Devans Old Basketball Club at Maliyadeva College."
        canonicalPath="/news"
        jsonLd={getBreadcrumbSchema([{ name: 'News & Articles', path: '/news' }])}
      />
      
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
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="text-xs font-bold text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    Quick View
                  </button>
                  <Link
                    to={`/news/${art.slug || slugify(art.title)}`}
                    className="text-xs font-bold text-devan-gold flex items-center space-x-1 hover:text-amber-300 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="max-w-2xl w-full max-h-[85vh] bg-devan-dark-card border border-devan-gold/40 rounded-xl p-6 sm:p-8 relative overflow-y-auto shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-devan-gold focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedArticle.cover_image_url && (
              <div className="h-56 rounded-lg overflow-hidden border border-stone-800">
                <img src={selectedArticle.cover_image_url} alt={selectedArticle.title} className="w-full h-full object-cover vintage-photo" />
              </div>
            )}

            <div>
              <span className="archive-stamp text-[10px] text-devan-gold">{selectedArticle.published_date} • {selectedArticle.author || 'Editorial'}</span>
              <h2 className="font-serif text-2xl font-bold text-devan-paper mt-2">{selectedArticle.title}</h2>
            </div>

            <div className="font-serif text-sm text-stone-300 leading-relaxed space-y-4">
              <p className="italic text-devan-gold border-l-2 border-devan-gold pl-3">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

