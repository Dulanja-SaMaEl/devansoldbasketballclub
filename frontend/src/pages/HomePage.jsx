import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Shield, Award, History as HistoryIcon, ArrowRight, ChevronRight, Quote, PlusCircle, Maximize2, Sparkles, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import TrophyCabinet from '../components/TrophyCabinet';
import Lightbox from '../components/Lightbox';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { settings, openMemoryModal } = useOutletContext();
  const [achievements, setAchievements] = useState([]);
  const [legends, setLegends] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Refs for GSAP animation targets
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const courtLineRef = useRef(null);
  const ballGuideRef = useRef(null);
  const horizontalGenRef = useRef(null);
  const horizontalGenContainerRef = useRef(null);
  const newspaperRef = useRef(null);

  useEffect(() => {
    // Fetch live backend/Supabase data
    api.getList('achievements').then(res => res.data && setAchievements(res.data));
    api.getList('legends').then(res => res.data && setLegends(res.data));
    api.getList('generations').then(res => res.data && setGenerations(res.data));
    api.getList('timeline').then(res => res.data && setTimeline(res.data));
    api.getList('gallery').then(res => res.data && setGallery(res.data));
    api.getList('stories', { publicOnly: 'true' }).then(res => res.data && setStories(res.data));
  }, []);

  useEffect(() => {
    // Check reduced motion setting
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx = gsap.context(() => {
      // 1. HERO PINNED PARALLAX & COURT MATERIALIZATION
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
        }
      });

      // Basketball Guide movement
      if (ballGuideRef.current) {
        heroTl.to(ballGuideRef.current, {
          y: 200,
          scale: 1.2,
          rotate: 360,
          ease: 'none'
        }, 0);
      }

      // SVG Court Lines Draw
      if (courtLineRef.current) {
        heroTl.to(courtLineRef.current, {
          strokeDashoffset: 0,
          opacity: 0.8,
          ease: 'none'
        }, 0);
      }

      // 2. HORIZONTAL GENERATIONS SCROLL (PINNED)
      if (horizontalGenContainerRef.current && horizontalGenRef.current) {
        const totalWidth = horizontalGenRef.current.scrollWidth - window.innerWidth;
        gsap.to(horizontalGenRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalGenContainerRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${totalWidth}`
          }
        });
      }

      // 3. NEWSPAPER ARCHIVE TRANSITION
      if (newspaperRef.current) {
        gsap.fromTo(newspaperRef.current, 
          { scale: 0.92, filter: 'sepia(0)' },
          {
            scale: 1,
            filter: 'sepia(0.35)',
            scrollTrigger: {
              trigger: newspaperRef.current,
              start: 'top 75%',
              end: 'center center',
              scrub: 1
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [generations]);

  return (
    <div className="space-y-32 pb-32 overflow-hidden selection:bg-devan-gold selection:text-devan-dark">
      
      {/* ---------------------------------------------------- */}
      {/* CHAPTER 1: HERO — "THE GAME BEGINS" (PINNED SCROLL) */}
      {/* ---------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center bg-devan-dark overflow-hidden border-b border-devan-gold/20 py-20"
      >
        {/* Archival Court Texture Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.hero_image_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80"}
            alt="Devans Basketball Court"
            className="w-full h-full object-cover vintage-photo opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-devan-dark via-devan-dark/90 to-transparent" />
          <div className="absolute inset-0 bg-paper-grain opacity-20 pointer-events-none" />
        </div>

        {/* SVG Basketball Court Lines */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-40"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <rect
            ref={courtLineRef}
            x="200"
            y="50"
            width="600"
            height="500"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeDasharray="2200"
            strokeDashoffset="2200"
          />
          <circle cx="500" cy="300" r="120" fill="none" stroke="#D4AF37" strokeWidth="2" />
          <path d="M 200,180 A 160,160 0 0,1 200,420" fill="none" stroke="#D4AF37" strokeWidth="2" />
          <path d="M 800,180 A 160,160 0 0,1 800,420" fill="none" stroke="#D4AF37" strokeWidth="2" />
        </svg>

        {/* Basketball Visual Guide Icon */}
        <div
          ref={ballGuideRef}
          className="absolute top-12 right-12 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-2 border-devan-gold shadow-gold-glow flex items-center justify-center opacity-80 pointer-events-none"
        >
          <div className="w-full h-px bg-black/70 absolute rotate-45" />
          <div className="w-full h-px bg-black/70 absolute -rotate-45" />
          <div className="w-9 h-9 border border-black/70 rounded-full absolute" />
        </div>

        {/* Hero Header Composition (Non-Collapsing Flow Layout) */}
        <div ref={heroTextRef} className="relative z-20 max-w-5xl mx-auto px-4 text-center space-y-8 flex flex-col items-center">
          
          <div className="inline-flex items-center space-x-3 bg-devan-maroon/80 border border-devan-gold/60 px-5 py-2 rounded-full text-devan-gold shadow-gold-glow backdrop-blur-md">
            <Shield className="w-4 h-4 text-devan-gold" />
            <span className="text-xs tracking-widest font-display font-semibold uppercase">
              Maliyadeva College • Kurunegala
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-devan-paper uppercase tracking-wider leading-tight drop-shadow-2xl">
              {settings?.hero_title || 'DEVANS OLD BASKETBALL CLUB'}
            </h1>
            <p className="font-serif text-devan-gold text-base sm:text-xl italic max-w-3xl mx-auto leading-relaxed">
              "{settings?.hero_subtitle || 'The Living Digital Legacy of Basketball at Maliyadeva College'}"
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/history"
              className="px-6 py-3 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-widest rounded-full shadow-gold-glow hover:bg-devan-maroon-dark hover:scale-105 transition-all flex items-center space-x-2"
            >
              <HistoryIcon className="w-4 h-4" />
              <span>Explore Historical Archive</span>
            </Link>

            <Link
              to="/achievements"
              className="px-6 py-3 bg-stone-900/90 border border-stone-700 text-stone-200 font-bold text-xs uppercase tracking-widest rounded-full hover:border-devan-gold hover:text-devan-gold transition-all flex items-center space-x-2"
            >
              <Award className="w-4 h-4 text-devan-gold" />
              <span>Trophy Cabinet</span>
            </Link>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1 text-devan-gold/80 animate-bounce">
          <span className="text-[10px] uppercase font-display tracking-widest">Scroll To Explore</span>
          <ChevronDown className="w-4 h-4 text-devan-gold" />
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CHAPTER 2: THE COURT MARKINGS TIMELINE */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 01 • ORIGIN & RISE</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">
            Walk Through Time
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Travelling across court markings through five decades of Maliyadeva basketball history.
          </p>
        </div>

        {/* Court Axis Timeline */}
        <div className="relative border-l-2 border-devan-gold/50 ml-4 sm:ml-36 space-y-16 pl-6 sm:pl-12">
          {timeline.map((item, index) => (
            <div
              key={item.id}
              data-cursor="VIEW MOMENT"
              className="relative group transition-all duration-500"
            >
              {/* Basketball Pin Marker */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-devan-maroon border-2 border-devan-gold flex items-center justify-center shadow-gold-glow group-hover:scale-125 transition-transform z-10">
                <span className="text-[10px] font-mono text-devan-gold font-bold">{index + 1}</span>
              </div>

              {/* Year Label */}
              <div className="hidden sm:block absolute top-0 right-[calc(100%+24px)] font-display text-2xl font-extrabold text-devan-gold text-right whitespace-nowrap">
                {item.year}
              </div>

              {/* Content Card with Archival Depth */}
              <div className="bg-devan-dark-card border border-devan-gold/30 rounded-xl p-8 space-y-4 shadow-archival hover:border-devan-gold transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="sm:hidden font-display text-2xl font-bold text-devan-gold">{item.year}</span>
                  <span className="archive-stamp text-[9px] text-devan-gold">{item.category || 'Milestone'}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-devan-paper">
                  {item.title}
                </h3>

                <p className="font-serif text-sm text-stone-300 leading-relaxed">
                  {item.description}
                </p>

                {item.key_figures && (
                  <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 font-serif">
                    Key Stalwarts: <strong className="text-devan-gold">{item.key_figures}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CHAPTER 3: THE SPOTLIGHT TROPHY ROOM */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 py-12 bg-devan-dark-card/50 border-y border-devan-gold/20 relative">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 02 • CHAMPIONS</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">
            The Trophy Cabinet Spotlight
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Championship shields and island-wide titles emerging from darkness under cabinet spotlights.
          </p>
        </div>

        <TrophyCabinet achievements={achievements} />
      </section>

      {/* ---------------------------------------------------- */}
      {/* CHAPTER 4: WALL OF LEGENDS (3D DEPTH ROSTER) */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 03 • LEGENDS</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">
            Wall of Legends
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Meeting the captains, coaches, and point guards who defined Devans basketball excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {legends.map((leg, idx) => (
            <div
              key={leg.id}
              data-cursor="MEET LEGEND"
              className={`bg-devan-dark-card border border-devan-gold/40 rounded-xl p-8 flex flex-col sm:flex-row gap-8 items-start shadow-archival hover:border-devan-gold transition-all duration-500 transform ${
                idx % 2 === 1 ? 'sm:translate-y-6' : ''
              }`}
            >
              {/* Yearbook Profile Frame */}
              <div className="w-36 h-48 shrink-0 rounded overflow-hidden border-2 border-devan-gold/60 relative shadow-2xl mx-auto sm:mx-0">
                <img
                  src={leg.profile_image_url || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"}
                  alt={leg.name}
                  className="w-full h-full object-cover vintage-photo"
                />
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <span className="archive-stamp text-[9px] text-devan-gold block w-max">
                    {leg.role} • {leg.years_active}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-devan-paper mt-2">
                    {leg.name}
                  </h3>
                  {leg.nickname && (
                    <span className="text-xs text-devan-gold font-serif italic block">
                      Known as {leg.nickname}
                    </span>
                  )}
                </div>

                <p className="font-serif text-xs text-stone-300 leading-relaxed">
                  {leg.bio}
                </p>

                {leg.quote && (
                  <blockquote className="font-serif text-xs text-stone-400 italic border-l-2 border-devan-maroon pl-3 py-1 bg-stone-900/50 rounded-r">
                    "{leg.quote}"
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CHAPTER 5: NEWSPAPER ARCHIVE TRANSITION ("WOW MOMENT") */}
      {/* ---------------------------------------------------- */}
      <section
        ref={newspaperRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 my-20 transition-all duration-700"
      >
        <div className="paper-card rounded-xl p-8 sm:p-14 space-y-8 relative overflow-hidden border-2 border-amber-900/30">
          <div className="archive-stamp text-[10px] text-amber-900 border-amber-900/40">
            NEWSPAPER ARCHIVE EDITION • HISTORICAL MATCH REPORT
          </div>

          <div className="border-b-2 border-stone-800 pb-4 text-center space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-stone-900 uppercase tracking-tight">
              DEVANS TRIUMPH IN ALL-ISLAND FINAL
            </h2>
            <p className="font-serif text-xs uppercase tracking-widest text-stone-700 font-bold">
              Special Sports Correspondent • Maliyadeva Basketball Archives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif text-stone-800 text-sm leading-relaxed newspaper-text">
            <p>
              In a electrifying display of tactical precision and unyielding grit, Maliyadeva College basketball squad claimed top honors at the All-Island Schools Basketball Championship. The Kurunegala team overcame a late fourth-quarter deficit through disciplined defense and clutch perimeter scoring.
            </p>
            <p>
              "The discipline instilled on the college courts was the decisive factor," stated the head coach following the trophy presentation. Generations of Devans supporters crowded the venue, celebrating a historic victory that adds another glorious chapter to Maliyadeva College sports heritage.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CHAPTER 6: GENERATIONS HORIZONTAL PINNED SCROLL */}
      {/* ---------------------------------------------------- */}
      <section ref={horizontalGenContainerRef} className="h-screen relative overflow-hidden border-y border-devan-gold/20 bg-devan-dark">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center space-y-2">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 04 • DECADE GENERATIONS</span>
          <h2 className="font-display text-3xl font-extrabold text-devan-paper uppercase tracking-wider">
            Generations Across Time
          </h2>
        </div>

        <div ref={horizontalGenRef} className="h-full flex items-center space-x-12 px-12 pt-20">
          {generations.map((gen) => (
            <div
              key={gen.id}
              data-cursor="EXPLORE ERA"
              className="w-[85vw] sm:w-[500px] bg-devan-dark-card border border-devan-gold/40 rounded-2xl p-8 shrink-0 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-stone-800 pb-4">
                <span className="font-display text-4xl font-extrabold text-devan-gold">{gen.start_year}s</span>
                <span className="archive-stamp text-[9px] text-stone-400">{gen.start_year} - {gen.end_year}</span>
              </div>

              <div className="h-56 rounded-lg overflow-hidden border border-stone-800 relative">
                <img
                  src={gen.team_photo_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"}
                  alt={gen.name}
                  className="w-full h-full object-cover vintage-photo"
                />
              </div>

              <h3 className="font-serif text-2xl font-bold text-devan-paper">{gen.name}</h3>
              <p className="font-serif text-xs text-stone-300 leading-relaxed">{gen.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CHAPTER 7: PHOTO COLLAGE EXPLOSION & MEMORY WALL */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 05 • MEMORIES</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">
            Historical Photo Wall
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gallery.map((img, index) => (
            <div
              key={img.id}
              data-cursor="VIEW MEMORY"
              onClick={() => setSelectedImage(img)}
              className={`group cursor-pointer bg-devan-dark-card border border-stone-800 rounded-xl overflow-hidden relative shadow-archival hover:border-devan-gold transition-all duration-500 transform ${
                index % 3 === 1 ? 'md:-translate-y-4' : index % 3 === 2 ? 'md:translate-y-4' : ''
              }`}
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover vintage-photo group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-devan-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
              <div className="p-5 space-y-1">
                <span className="text-[10px] font-mono text-devan-gold">{img.year || 'HISTORIC'}</span>
                <h4 className="font-serif text-base font-bold text-devan-paper">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CHAPTER 8: THE NEXT CHAPTER (FUTURE & CTA) */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-devan-maroon-dark via-devan-maroon to-devan-maroon-dark border-2 border-devan-gold rounded-3xl p-12 sm:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-paper-grain opacity-20 pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 06 • THE FUTURE</span>
            
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-devan-paper uppercase tracking-wider">
              KEEP THE LEGACY ALIVE
            </h2>

            <p className="font-serif text-stone-300 max-w-2xl mx-auto text-lg italic">
              "The legacy is not finished. It is being passed on to the next generation of Devans players."
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openMemoryModal}
                className="w-full sm:w-auto px-10 py-5 bg-devan-gold text-devan-dark font-extrabold text-xs uppercase tracking-widest rounded shadow-gold-glow hover:bg-amber-300 transition-all flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit A Memory / Photo</span>
              </button>
              
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-black/60 border border-stone-600 text-stone-200 font-bold text-xs uppercase tracking-widest rounded hover:border-devan-gold hover:text-devan-gold transition-all"
              >
                Contact Alumni Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Lightbox */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />

    </div>
  );
}
