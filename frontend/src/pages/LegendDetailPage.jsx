import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { slugify, getPersonSchema, getBreadcrumbSchema } from '../utils/seoUtils';
import SeoHead from '../components/SeoHead';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Award, ArrowLeft, Quote, Shield, Calendar, ChevronRight } from 'lucide-react';

export default function LegendDetailPage() {
  const { slug } = useParams();
  const [legend, setLegend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('legends')
      .then(res => {
        if (res.data) {
          const match = res.data.find(item => 
            slugify(item.name) === slug || 
            item.id === slug || 
            slugify(item.nickname || '') === slug
          );
          setLegend(match || null);
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

  if (!legend) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <SeoHead title="Legend Profile Not Found" noindex={true} />
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">Player Profile Not Found</h1>
        <p className="font-serif text-stone-400">The requested legend profile could not be located in our archives.</p>
        <Link to="/legends" className="inline-flex items-center space-x-2 text-devan-gold hover:underline text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Hall of Fame Legends</span>
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Legends & Hall of Fame', path: '/legends' },
    { name: legend.name, path: `/legends/${slugify(legend.name)}` }
  ];

  const personSchema = getPersonSchema(legend);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <SeoHead
        title={`${legend.name} (${legend.role}) | Devans Basketball Legends`}
        description={`${legend.name} ${legend.nickname ? `"${legend.nickname}"` : ''} — ${legend.role} for Maliyadeva College Basketball (${legend.years_active}). Read achievements, player history, and quotes.`}
        canonicalPath={`/legends/${slugify(legend.name)}`}
        ogImage={legend.profile_image_url}
        jsonLd={[personSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-stone-400">
        <Link to="/" className="hover:text-devan-gold">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link to="/legends" className="hover:text-devan-gold">Legends</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-devan-gold font-semibold">{legend.name}</span>
      </nav>

      {/* Back Button */}
      <div>
        <Link to="/legends" className="inline-flex items-center space-x-2 text-xs font-bold text-stone-400 hover:text-devan-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Legends</span>
        </Link>
      </div>

      {/* Detail Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Yearbook Photo Frame */}
        <div className="bg-devan-dark-card border-2 border-devan-gold/40 rounded-xl p-4 shadow-archival space-y-4">
          <div className="h-80 rounded overflow-hidden relative shadow-md">
            <img
              src={legend.profile_image_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"}
              alt={`${legend.name} - ${legend.role} of Maliyadeva Basketball`}
              className="w-full h-full object-cover vintage-photo"
              loading="eager"
            />
          </div>
          <div className="text-center space-y-1 border-t border-stone-800 pt-3">
            <span className="archive-stamp text-[9px] text-devan-gold block">{legend.role}</span>
            <span className="text-xs text-stone-400 font-mono block">{legend.years_active}</span>
          </div>
        </div>

        {/* Legend Bio & Details */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <span className="archive-stamp text-[10px] text-devan-gold">DEVANS HALL OF FAME LEGEND</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-devan-paper mt-1">
              {legend.name}
            </h1>
            {legend.nickname && (
              <p className="text-sm font-serif italic text-devan-gold mt-1">
                Known as "{legend.nickname}"
              </p>
            )}
          </div>

          <div className="space-y-4 font-serif text-stone-300 leading-relaxed text-sm">
            <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-400">Biography & Heritage</h2>
            <p className="text-base leading-relaxed">{legend.bio}</p>
          </div>

          {legend.quote && (
            <blockquote className="bg-devan-dark-card border-l-4 border-devan-gold p-6 rounded-r-lg shadow-inner space-y-2">
              <Quote className="w-6 h-6 text-devan-gold/60" />
              <p className="font-serif italic text-stone-200 text-sm">"{legend.quote}"</p>
              <cite className="block text-xs font-sans font-bold text-devan-gold text-right">— {legend.name}</cite>
            </blockquote>
          )}

          {/* Related Links */}
          <div className="pt-6 border-t border-stone-800 flex flex-wrap gap-4">
            <Link to="/achievements" className="text-xs font-bold text-devan-gold hover:underline flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>Explore Maliyadeva Championships</span>
            </Link>
            <Link to="/generations" className="text-xs font-bold text-devan-gold hover:underline flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>View Eras & Generations</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
