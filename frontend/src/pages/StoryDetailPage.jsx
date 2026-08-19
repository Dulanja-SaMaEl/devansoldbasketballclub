import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { slugify, getBreadcrumbSchema } from '../utils/seoUtils';
import SeoHead from '../components/SeoHead';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { BookOpen, ArrowLeft, User, Calendar, ChevronRight } from 'lucide-react';

export default function StoryDetailPage() {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('stories')
      .then(res => {
        if (res.data) {
          const match = res.data.find(item => 
            slugify(item.title) === slug || 
            item.id === slug
          );
          setStory(match || null);
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

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <SeoHead title="Story Not Found" noindex={true} />
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">Alumni Story Not Found</h1>
        <p className="font-serif text-stone-400">The requested memory or alumni story could not be located.</p>
        <Link to="/stories" className="inline-flex items-center space-x-2 text-devan-gold hover:underline text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Alumni Stories</span>
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Alumni Stories', path: '/stories' },
    { name: story.title, path: `/stories/${slugify(story.title)}` }
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <SeoHead
        title={`${story.title} | Devans Basketball Alumni Stories`}
        description={`"${story.title}" written by ${story.author} (${story.generation_name || 'Maliyadeva Alumnus'}). Read firsthand memories from Devans Old Basketball Club history.`}
        canonicalPath={`/stories/${slugify(story.title)}`}
        ogImage={story.image_url}
        jsonLd={getBreadcrumbSchema(breadcrumbs)}
      />

      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-stone-400">
        <Link to="/" className="hover:text-devan-gold">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link to="/stories" className="hover:text-devan-gold">Stories</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-devan-gold font-semibold">{story.title}</span>
      </nav>

      <div>
        <Link to="/stories" className="inline-flex items-center space-x-2 text-xs font-bold text-stone-400 hover:text-devan-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Alumni Stories</span>
        </Link>
      </div>

      <div className="bg-devan-dark-card border border-devan-gold/30 rounded-xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <div className="space-y-2 border-b border-stone-800 pb-6">
          <span className="archive-stamp text-[10px] text-devan-gold">ALUMNI MEMORY • {story.generation_name || 'Maliyadeva Legacy'}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-devan-paper">
            {story.title}
          </h1>
          <div className="text-xs font-mono text-stone-400 pt-2 flex items-center space-x-4">
            <span>By <strong className="text-devan-gold">{story.author}</strong></span>
            {story.date && <span>• {story.date}</span>}
          </div>
        </div>

        {story.image_url && (
          <div className="h-72 rounded-lg overflow-hidden border border-stone-800">
            <img src={story.image_url} alt={story.title} className="w-full h-full object-cover vintage-photo" />
          </div>
        )}

        <div className="font-serif text-stone-300 leading-relaxed text-base space-y-4">
          <p className="whitespace-pre-line">{story.story || story.content}</p>
        </div>
      </div>
    </article>
  );
}
