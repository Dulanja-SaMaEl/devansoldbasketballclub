import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { slugify, getBreadcrumbSchema } from '../utils/seoUtils';
import SeoHead from '../components/SeoHead';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Award, ArrowLeft, Calendar, Shield, ChevronRight } from 'lucide-react';

export default function AchievementDetailPage() {
  const { slug } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('achievements')
      .then(res => {
        if (res.data) {
          const match = res.data.find(item => 
            slugify(item.title) === slug || 
            item.id === slug ||
            slugify(`${item.year}-${item.title}`) === slug
          );
          setAchievement(match || null);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <SeoHead title="Achievement Not Found" noindex={true} />
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">Achievement Record Not Found</h1>
        <p className="font-serif text-stone-400">The requested championship trophy or record could not be found in our database.</p>
        <Link to="/achievements" className="inline-flex items-center space-x-2 text-devan-gold hover:underline text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Trophy Room & Achievements</span>
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Achievements & Trophies', path: '/achievements' },
    { name: achievement.title, path: `/achievements/${slugify(achievement.title)}` }
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <SeoHead
        title={`${achievement.title} (${achievement.year}) | Devans Basketball Achievements`}
        description={`${achievement.title} won by Maliyadeva College Basketball in ${achievement.year}. Category: ${achievement.category || 'Championship'}. ${achievement.description}`}
        canonicalPath={`/achievements/${slugify(achievement.title)}`}
        ogImage={achievement.image_url}
        jsonLd={getBreadcrumbSchema(breadcrumbs)}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-stone-400">
        <Link to="/" className="hover:text-devan-gold">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link to="/achievements" className="hover:text-devan-gold">Achievements</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-devan-gold font-semibold">{achievement.title}</span>
      </nav>

      <div>
        <Link to="/achievements" className="inline-flex items-center space-x-2 text-xs font-bold text-stone-400 hover:text-devan-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Championship Trophies</span>
        </Link>
      </div>

      <div className="bg-devan-dark-card border border-devan-gold/40 rounded-xl overflow-hidden shadow-2xl">
        {achievement.image_url && (
          <div className="h-72 sm:h-96 overflow-hidden border-b border-stone-800 relative">
            <img
              src={achievement.image_url}
              alt={`${achievement.title} - Maliyadeva College Basketball Victory ${achievement.year}`}
              className="w-full h-full object-cover vintage-photo"
              loading="eager"
            />
            <div className="absolute top-4 right-4 bg-devan-dark/90 border border-devan-gold px-3 py-1 rounded text-xs font-mono text-devan-gold">
              Year {achievement.year}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-6">
          <div>
            <span className="archive-stamp text-[10px] text-devan-gold">{achievement.category || 'CHAMPIONSHIP VICTORY'}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-devan-paper mt-1">
              {achievement.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-900/60 p-4 rounded-lg border border-stone-800 text-xs font-mono">
            <div><span className="text-stone-500">Year:</span> <strong className="text-devan-paper">{achievement.year}</strong></div>
            <div><span className="text-stone-500">Category:</span> <strong className="text-devan-paper">{achievement.category || 'National'}</strong></div>
            <div><span className="text-stone-500">Team:</span> <strong className="text-devan-paper">{achievement.team_name || 'Devans First V'}</strong></div>
            <div><span className="text-stone-500">Captain / Coach:</span> <strong className="text-devan-paper">{achievement.captain || 'Devans Leadership'}</strong></div>
          </div>

          <div className="font-serif text-stone-300 leading-relaxed text-base space-y-4">
            <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-400">Match & Championship Details</h2>
            <p>{achievement.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
