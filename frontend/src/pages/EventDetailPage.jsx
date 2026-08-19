import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { slugify, getEventSchema, getBreadcrumbSchema } from '../utils/seoUtils';
import SeoHead from '../components/SeoHead';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Calendar, MapPin, Clock, ArrowLeft, ChevronRight } from 'lucide-react';

export default function EventDetailPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('events')
      .then(res => {
        if (res.data) {
          const match = res.data.find(item => 
            slugify(item.title) === slug || 
            item.id === slug
          );
          setEvent(match || null);
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

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <SeoHead title="Event Not Found" noindex={true} />
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">Club Event Not Found</h1>
        <p className="font-serif text-stone-400">The requested event or tournament notice could not be found.</p>
        <Link to="/events" className="inline-flex items-center space-x-2 text-devan-gold hover:underline text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Club Events & Reunions</span>
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Events & Reunions', path: '/events' },
    { name: event.title, path: `/events/${slugify(event.title)}` }
  ];

  const eventSchema = getEventSchema(event);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <SeoHead
        title={`${event.title} | Devans Basketball Events`}
        description={`${event.title} at ${event.location || 'Maliyadeva College Court'}. Date: ${event.date}. ${event.description}`}
        canonicalPath={`/events/${slugify(event.title)}`}
        ogImage={event.cover_image_url}
        jsonLd={[eventSchema, breadcrumbSchema]}
      />

      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-stone-400">
        <Link to="/" className="hover:text-devan-gold">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link to="/events" className="hover:text-devan-gold">Events</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-devan-gold font-semibold">{event.title}</span>
      </nav>

      <div>
        <Link to="/events" className="inline-flex items-center space-x-2 text-xs font-bold text-stone-400 hover:text-devan-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>
      </div>

      <div className="bg-devan-dark-card border border-devan-gold/40 rounded-xl p-6 sm:p-10 space-y-6 shadow-2xl">
        {event.cover_image_url && (
          <div className="h-64 sm:h-80 rounded-lg overflow-hidden border border-stone-800">
            <img src={event.cover_image_url} alt={event.title} className="w-full h-full object-cover vintage-photo" />
          </div>
        )}

        <div className="space-y-2 border-b border-stone-800 pb-6">
          <span className="archive-stamp text-[10px] text-devan-gold">CLUB REUNION & EVENT</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-devan-paper">{event.title}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-900/60 p-4 rounded-lg border border-stone-800 text-xs font-mono">
          <div className="flex items-center space-x-2 text-stone-300">
            <Calendar className="w-4 h-4 text-devan-gold" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-stone-300">
            <Clock className="w-4 h-4 text-devan-gold" />
            <span>{event.time || '03:00 PM'}</span>
          </div>
          <div className="flex items-center space-x-2 text-stone-300">
            <MapPin className="w-4 h-4 text-devan-gold" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="font-serif text-stone-300 leading-relaxed text-base space-y-4">
          <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-400">Event Overview & Schedule</h2>
          <p>{event.description}</p>
        </div>
      </div>
    </article>
  );
}
