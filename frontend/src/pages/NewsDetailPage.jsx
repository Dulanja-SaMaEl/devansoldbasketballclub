import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { slugify, getArticleSchema, getBreadcrumbSchema } from '../utils/seoUtils';
import SeoHead from '../components/SeoHead';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { BookOpen, ArrowLeft, Calendar, User, ChevronRight } from 'lucide-react';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('news')
      .then(res => {
        if (res.data) {
          const match = res.data.find(item => 
            item.slug === slug || 
            slugify(item.title) === slug || 
            item.id === slug
          );
          setArticle(match || null);
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

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <SeoHead title="Article Not Found" noindex={true} />
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">News Article Not Found</h1>
        <p className="font-serif text-stone-400">The requested article could not be found in our editorial archives.</p>
        <Link to="/news" className="inline-flex items-center space-x-2 text-devan-gold hover:underline text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to News & Articles</span>
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'News & Articles', path: '/news' },
    { name: article.title, path: `/news/${article.slug || slugify(article.title)}` }
  ];

  const articleSchema = getArticleSchema(article);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <SeoHead
        title={`${article.title} | Devans Basketball News`}
        description={article.excerpt || article.content?.slice(0, 160)}
        canonicalPath={`/news/${article.slug || slugify(article.title)}`}
        ogImage={article.cover_image_url}
        ogType="article"
        jsonLd={[articleSchema, breadcrumbSchema]}
      />

      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-stone-400">
        <Link to="/" className="hover:text-devan-gold">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link to="/news" className="hover:text-devan-gold">News</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-devan-gold font-semibold">{article.title}</span>
      </nav>

      <div>
        <Link to="/news" className="inline-flex items-center space-x-2 text-xs font-bold text-stone-400 hover:text-devan-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Editorial News</span>
        </Link>
      </div>

      <div className="bg-devan-dark-card border border-stone-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6 sm:p-10">
        {article.cover_image_url && (
          <div className="h-72 sm:h-96 rounded-lg overflow-hidden border border-stone-800 relative">
            <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover vintage-photo" />
          </div>
        )}

        <div className="space-y-3 border-b border-stone-800 pb-6">
          <span className="archive-stamp text-[10px] text-devan-gold">{article.published_date} • {article.author || 'Editorial Board'}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-devan-paper">{article.title}</h1>
        </div>

        {article.excerpt && (
          <p className="font-serif italic text-devan-gold border-l-2 border-devan-gold pl-4 text-base">
            {article.excerpt}
          </p>
        )}

        <div className="font-serif text-stone-300 leading-relaxed text-base space-y-4">
          <p className="whitespace-pre-line">{article.content}</p>
        </div>
      </div>
    </article>
  );
}
