import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Quote, PlusCircle, Calendar, User, ArrowRight } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SeoHead from '../components/SeoHead';
import { slugify, getBreadcrumbSchema } from '../utils/seoUtils';

export default function StoriesPage() {
  const { openMemoryModal } = useOutletContext() || {};
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('stories', { publicOnly: 'true' })
      .then(res => {
        if (res.data) setStories(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SeoHead
        title="Devans Basketball Stories & Memories | Maliyadeva Alumni Voices"
        description="Firstperson stories, court anecdotes, brotherhood memories, and alumni perspectives from past Devans Basketball players."
        canonicalPath="/stories"
        jsonLd={getBreadcrumbSchema([{ name: 'Alumni Stories', path: '/stories' }])}
      />
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">ALUMNI MEMORIES</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Stories & Memories
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          "One game. One team. One generation." Unforgettable court memories written by Devans alumni.
        </p>
        <button
          onClick={openMemoryModal}
          className="mt-4 px-6 py-2.5 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded hover:bg-devan-maroon-dark inline-flex items-center space-x-2 shadow-gold-glow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Share Your Memory</span>
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="space-y-8">
          {stories.map((sto) => (
            <div key={sto.id} className="bg-devan-dark-card border border-devan-gold/30 rounded-lg p-6 sm:p-8 space-y-4 shadow-archival">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-devan-maroon border border-devan-gold flex items-center justify-center text-devan-gold shrink-0">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-devan-paper">{sto.title}</h3>
                    <p className="text-xs text-devan-gold font-serif">By {sto.author} ({sto.generation_name || 'Alumni'})</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-stone-400">{sto.date}</span>
              </div>

              <p className="font-serif text-sm text-stone-300 leading-relaxed italic border-l-2 border-devan-gold pl-4 py-1">
                "{sto.story}"
              </p>

              {sto.image_url && (
                <div className="mt-4 rounded overflow-hidden border border-stone-800 h-64 max-w-xl">
                  <img src={sto.image_url} alt={sto.title} className="w-full h-full object-cover vintage-photo" />
                </div>
              )}

              <div className="pt-3 border-t border-stone-800 flex justify-end">
                <Link
                  to={`/stories/${slugify(sto.title)}`}
                  className="text-xs font-bold text-devan-gold hover:text-amber-300 flex items-center space-x-1 transition-colors"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
