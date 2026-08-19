import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Shield, Award, Users, History as HistoryIcon, Image as ImageIcon, ArrowRight, ChevronRight, Calendar, BookOpen, Quote, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import TrophyCabinet from '../components/TrophyCabinet';
import Lightbox from '../components/Lightbox';

export default function HomePage() {
  const { settings, openMemoryModal } = useOutletContext();
  const [achievements, setAchievements] = useState([]);
  const [legends, setLegends] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api.getList('achievements').then(res => res.data && setAchievements(res.data));
    api.getList('legends').then(res => res.data && setLegends(res.data));
    api.getList('generations').then(res => res.data && setGenerations(res.data));
    api.getList('timeline').then(res => res.data && setTimeline(res.data));
    api.getList('gallery').then(res => res.data && setGallery(res.data));
    api.getList('stories', { publicOnly: 'true' }).then(res => res.data && setStories(res.data));
  }, []);

  return (
    <div className="space-y-24 pb-20">
      
      {/* ---------------------------------------------------- */}
      {/* 1. CINEMATIC HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-devan-gold/20 pt-10">
        {/* Background Overlay & Historical Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.hero_image_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80"}
            alt="Devans Basketball Legacy"
            className="w-full h-full object-cover vintage-photo scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-devan-dark via-devan-dark/80 to-black/60" />
          <div className="absolute inset-0 bg-paper-grain opacity-20 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 py-20">
          
          <div className="inline-flex items-center space-x-3 bg-devan-maroon/60 border border-devan-gold/50 px-4 py-1.5 rounded-full text-devan-gold shadow-lg backdrop-blur-sm">
            <Shield className="w-4 h-4 text-devan-gold" />
            <span className="text-xs tracking-widest font-display font-semibold uppercase">
              Maliyadeva College • Kurunegala
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-devan-paper drop-shadow-2xl uppercase leading-tight">
            {settings?.hero_title || 'DEVANS OLD BASKETBALL CLUB'}
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-stone-300 max-w-3xl mx-auto italic font-normal leading-relaxed">
            "{settings?.hero_subtitle || 'The Living Digital Legacy of Basketball at Maliyadeva College'}"
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/history"
              className="w-full sm:w-auto px-8 py-4 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-widest rounded shadow-gold-glow hover:bg-devan-maroon-dark transition-all flex items-center justify-center space-x-2"
            >
              <HistoryIcon className="w-4 h-4" />
              <span>Explore The Archive</span>
            </Link>

            <Link
              to="/achievements"
              className="w-full sm:w-auto px-8 py-4 bg-devan-dark-card border border-stone-700 text-stone-200 font-bold text-xs uppercase tracking-widest rounded hover:border-devan-gold hover:text-devan-gold transition-all flex items-center justify-center space-x-2"
            >
              <Award className="w-4 h-4 text-devan-gold" />
              <span>Trophy Cabinet</span>
            </Link>
          </div>

          {/* Archival Details Badge */}
          <div className="pt-8 flex items-center justify-center space-x-8 text-xs text-stone-400 font-serif border-t border-stone-800/80 max-w-xl mx-auto">
            <div>
              <span className="block font-sans font-bold text-devan-gold text-sm">1975</span>
              <span>Founding Year</span>
            </div>
            <div className="w-px h-6 bg-stone-800" />
            <div>
              <span className="block font-sans font-bold text-devan-gold text-sm">5 Decades</span>
              <span>Of Brotherhood</span>
            </div>
            <div className="w-px h-6 bg-stone-800" />
            <div>
              <span className="block font-sans font-bold text-devan-gold text-sm">All-Island</span>
              <span>Championships</span>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. LEGACY INTRODUCTION */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-devan-dark-card border border-devan-gold/30 rounded-xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="archive-stamp text-[10px] text-devan-gold">THE MALIYADEVA HERITAGE</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-devan-paper">
                One Court. One Brotherhood. Generations of Pride.
              </h2>
              <p className="font-serif text-stone-300 text-base sm:text-lg leading-relaxed">
                {settings?.description || 'From the early concrete courts of Maliyadeva College to national inter-school championship arenas, Devans Basketball represents a culture of discipline, resilience, and unyielding brotherhood.'}
              </p>
              <div className="pt-2 flex items-center space-x-4 text-xs font-semibold uppercase tracking-wider text-devan-gold">
                <span>Pass the torch forward</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="lg:col-span-4 bg-devan-dark p-6 rounded-lg border border-stone-800 space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-devan-maroon border border-devan-gold flex items-center justify-center mx-auto text-devan-gold">
                <Quote className="w-7 h-7" />
              </div>
              <blockquote className="font-serif text-sm italic text-stone-300">
                "The game changes. Tactics evolve. But the bond formed on the Maliyadeva court remains unbroken for life."
              </blockquote>
              <p className="text-xs uppercase tracking-widest font-sans font-bold text-devan-gold">
                Devans Alumni Council
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. THE JOURNEY — TIMELINE PREVIEW */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">CHRONOLOGICAL HISTORY</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-devan-paper">
            The Historical Journey
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm">
            Explore key eras and milestones that defined basketball at Maliyadeva College.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timeline.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-devan-dark-card border border-stone-800 rounded-lg p-6 space-y-4 hover:border-devan-gold/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-display font-extrabold text-devan-gold">{item.year}</span>
                <span className="text-[10px] uppercase font-mono bg-devan-maroon px-2 py-0.5 rounded text-devan-gold">
                  {item.category || 'Milestone'}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-devan-paper">{item.title}</h3>
              <p className="font-serif text-xs text-stone-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/history"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-devan-gold hover:underline"
          >
            <span>View Full Interactive Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. CHAMPIONSHIP TROPHY CABINET */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">VICTORIES & TROPHIES</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-devan-paper">
            The Championship Trophy Room
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm">
            Honoring island-wide titles, provincial victories, and alumni tournament honors.
          </p>
        </div>

        <TrophyCabinet achievements={achievements} />
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. HALL OF FAME / LEGENDS */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">HALL OF FAME</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-devan-paper">
            Devans Legends & Pioneers
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm">
            Captains, coaches, point guards, and stalwarts who elevated Maliyadeva basketball.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legends.map((leg) => (
            <div key={leg.id} className="bg-devan-dark-card border border-devan-gold/30 rounded-lg p-6 flex flex-col sm:flex-row gap-6 items-center shadow-archival">
              <div className="w-32 h-40 shrink-0 rounded overflow-hidden border border-devan-gold/40 relative">
                <img
                  src={leg.profile_image_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"}
                  alt={leg.name}
                  className="w-full h-full object-cover vintage-photo"
                />
              </div>
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <span className="archive-stamp text-[9px] text-devan-gold">{leg.role} • {leg.years_active}</span>
                <h3 className="font-serif text-xl font-bold text-devan-paper">{leg.name}</h3>
                {leg.nickname && <p className="text-xs text-devan-gold font-serif italic">{leg.nickname}</p>}
                <p className="text-xs text-stone-300 font-serif leading-relaxed line-clamp-3">{leg.bio}</p>
                {leg.quote && (
                  <p className="text-[11px] text-stone-400 italic border-l-2 border-devan-gold pl-2">
                    "{leg.quote}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/legends"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-devan-gold hover:underline"
          >
            <span>Explore Full Hall of Fame Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. GENERATIONS EXPLORER */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">DECADE GENERATIONS</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-devan-paper">
            Generations of Devans Basketball
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {generations.map((gen) => (
            <Link
              key={gen.id}
              to="/generations"
              className="bg-devan-dark-card border border-stone-800 hover:border-devan-gold p-5 rounded text-center space-y-2 group transition-all"
            >
              <span className="block font-display text-xl font-extrabold text-devan-gold group-hover:scale-110 transition-transform">
                {gen.start_year}s
              </span>
              <span className="block text-xs font-serif text-stone-300 font-semibold">{gen.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. ARCHIVAL PHOTO MASONRY PREVIEW */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">PHOTO ARCHIVE</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-devan-paper">
            Historical Memory Wall
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.slice(0, 6).map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group cursor-pointer bg-devan-dark-card border border-stone-800 rounded overflow-hidden relative"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-56 object-cover vintage-photo group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 p-4 flex flex-col justify-end">
                <span className="text-[10px] font-mono text-devan-gold">{img.year || 'HISTORIC'}</span>
                <h4 className="font-serif text-sm font-bold text-devan-paper">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. CALL TO ACTION */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-devan-maroon-dark via-devan-maroon to-devan-maroon-dark border border-devan-gold/50 rounded-2xl p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-paper-grain opacity-20 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="archive-stamp text-[10px] text-devan-gold">KEEP THE LEGACY ALIVE</span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
              Were You Part of Devans Basketball?
            </h2>
            <p className="font-serif text-stone-300 max-w-2xl mx-auto text-base italic">
              Share your historical match photographs, newspaper cut-outs, or personal memories to enrich our living digital museum.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openMemoryModal}
                className="w-full sm:w-auto px-8 py-4 bg-devan-gold text-devan-dark font-extrabold text-xs uppercase tracking-widest rounded shadow-lg hover:bg-amber-300 transition-all"
              >
                Submit A Memory / Photo
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-black/50 border border-stone-600 text-stone-200 font-bold text-xs uppercase tracking-widest rounded hover:border-devan-gold hover:text-devan-gold transition-all"
              >
                Contact Alumni Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery Preview */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}
