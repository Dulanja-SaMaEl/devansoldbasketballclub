import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SeoHead from '../components/SeoHead';
import { slugify, getBreadcrumbSchema } from '../utils/seoUtils';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getList('events')
      .then(res => {
        if (res.data) setEvents(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SeoHead
        title="Old Devans Basketball Club Events & Reunions | Maliyadeva College"
        description="Upcoming and past alumni reunions, tournaments, coaching clinics, and celebrations organized by Old Devans Basketball Club in Kurunegala."
        canonicalPath="/events"
        jsonLd={getBreadcrumbSchema([{ name: 'Events & Reunions', path: '/events' }])}
      />
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">REUNIONS & MATCHES</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Events & Gatherings
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          Alumni tournaments, annual dinners, court inauguration matches, and college gatherings.
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton count={2} />
      ) : (
        <div className="space-y-6">
          {events.map((evt) => (
            <div key={evt.id} className="bg-devan-dark-card border border-devan-gold/30 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-archival">
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="archive-stamp text-[9px] text-devan-gold">{evt.status || 'Upcoming'}</span>
                  <span className="text-xs text-stone-400 flex items-center space-x-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-devan-gold" />
                    <span>{evt.date}</span>
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-devan-paper">{evt.title}</h3>
                <p className="font-serif text-xs text-stone-300 leading-relaxed">{evt.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 pt-2 border-t border-stone-800">
                  <div className="flex items-center space-x-4">
                    {evt.time && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-devan-gold" />
                        <span>{evt.time}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-devan-gold" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                  <Link
                    to={`/events/${slugify(evt.title)}`}
                    className="text-xs font-bold text-devan-gold hover:text-amber-300 flex items-center space-x-1 transition-colors"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {evt.registration_url && (
                <a
                  href={evt.registration_url}
                  className="px-6 py-3 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded hover:bg-devan-maroon-dark whitespace-nowrap shadow-gold-glow"
                >
                  Register For Event
                </a>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
