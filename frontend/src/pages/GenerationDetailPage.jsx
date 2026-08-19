import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { slugify, getBreadcrumbSchema } from '../utils/seoUtils';
import SeoHead from '../components/SeoHead';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Shield, ArrowLeft, Calendar, Users, ChevronRight } from 'lucide-react';

export default function GenerationDetailPage() {
  const { slug } = useParams();
  const [generation, setGeneration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('generations')
      .then(res => {
        if (res.data) {
          const match = res.data.find(item => 
            slugify(item.name) === slug || 
            item.id === slug ||
            slugify(`${item.start_year}s`) === slug
          );
          setGeneration(match || null);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (!generation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <SeoHead title="Generation Era Not Found" noindex={true} />
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">Generation Record Not Found</h1>
        <p className="font-serif text-stone-400">The requested era or generation profile could not be found.</p>
        <Link to="/generations" className="inline-flex items-center space-x-2 text-devan-gold hover:underline text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Generations</span>
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Generations & Eras', path: '/generations' },
    { name: generation.name, path: `/generations/${slugify(generation.name)}` }
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <SeoHead
        title={`${generation.name} (${generation.start_year} - ${generation.end_year}) | Devans Basketball`}
        description={`${generation.name} era of Maliyadeva College Basketball (${generation.start_year} - ${generation.end_year}). ${generation.description}`}
        canonicalPath={`/generations/${slugify(generation.name)}`}
        ogImage={generation.team_photo_url}
        jsonLd={getBreadcrumbSchema(breadcrumbs)}
      />

      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-stone-400">
        <Link to="/" className="hover:text-devan-gold">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link to="/generations" className="hover:text-devan-gold">Generations</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-devan-gold font-semibold">{generation.name}</span>
      </nav>

      <div>
        <Link to="/generations" className="inline-flex items-center space-x-2 text-xs font-bold text-stone-400 hover:text-devan-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Generations</span>
        </Link>
      </div>

      <div className="bg-devan-dark-card border border-devan-gold/40 rounded-xl p-6 sm:p-10 space-y-6 shadow-2xl">
        {generation.team_photo_url && (
          <div className="h-72 sm:h-96 rounded-lg overflow-hidden border border-stone-800">
            <img src={generation.team_photo_url} alt={`${generation.name} Team Photo - Maliyadeva Basketball`} className="w-full h-full object-cover vintage-photo" />
          </div>
        )}

        <div className="space-y-2 border-b border-stone-800 pb-6">
          <span className="archive-stamp text-[10px] text-devan-gold">HISTORICAL ERA • {generation.start_year} - {generation.end_year}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-devan-paper">{generation.name}</h1>
        </div>

        <div className="font-serif text-stone-300 leading-relaxed text-base space-y-4">
          <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-400">Era History & Cultural Impact</h2>
          <p>{generation.description}</p>
        </div>
      </div>
    </article>
  );
}
