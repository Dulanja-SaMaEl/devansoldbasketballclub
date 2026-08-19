import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Shield, ChevronRight, PlusCircle, Maximize2, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import TrophyCabinet from '../components/TrophyCabinet';
import Lightbox from '../components/Lightbox';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Scroll-reveal hook (no pin, no body mutations) ─────────────────────────
function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { delay = 0, y = 30, duration = 0.8 } = options;
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
}

export default function HomePage() {
  const { settings, openMemoryModal } = useOutletContext();
  const [achievements, setAchievements] = useState([]);
  const [legends, setLegends] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Hero text cycling state (CSS-based, no GSAP pinning)
  const [heroStage, setHeroStage] = useState(0);
  const heroStages = [
    { title: 'THE GAME', sub: 'Scroll down to discover the legacy...' },
    { title: 'BECOMES A LEGACY', sub: '"Through five decades of championship honors."' },
    { title: settings?.hero_title || 'DEVANS OLD BASKETBALL CLUB', sub: `"${settings?.hero_subtitle || 'The Living Digital Legacy of Basketball at Maliyadeva College'}"` },
  ];

  // Refs for scroll-reveal sections
  const timelineRef = useRef(null);
  const legendsRef = useRef(null);
  const trophyRef = useRef(null);
  const newspaperRef = useRef(null);
  const generationsRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);
  const courtLineRef = useRef(null);
  const ballRef = useRef(null);

  useEffect(() => {
    api.getList('achievements').then(res => res.data && setAchievements(res.data));
    api.getList('legends').then(res => res.data && setLegends(res.data));
    api.getList('generations').then(res => res.data && setGenerations(res.data));
    api.getList('timeline').then(res => res.data && setTimeline(res.data));
    api.getList('gallery').then(res => res.data && setGallery(res.data));
  }, []);

  // Hero stage auto-cycle on scroll — NO pin, NO body mutations
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY < vh * 0.3) setHeroStage(0);
      else if (scrollY < vh * 0.7) setHeroStage(1);
      else setHeroStage(2);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Non-pinning GSAP scroll animations — safe to clean up
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // SVG court line draw on scroll
      if (courtLineRef.current) {
        gsap.fromTo(courtLineRef.current,
          { strokeDashoffset: 2200, opacity: 0.1 },
          {
            strokeDashoffset: 0,
            opacity: 0.8,
            duration: 2,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: courtLineRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Basketball bounce animation (just CSS-like GSAP, not pinned)
      if (ballRef.current) {
        gsap.to(ballRef.current, {
          y: 15,
          rotate: 20,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Stagger reveal for section content
      const sections = [timelineRef, legendsRef, trophyRef, newspaperRef, generationsRef, galleryRef, ctaRef];
      sections.forEach(ref => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pb-32 selection:bg-devan-gold selection:text-devan-dark">

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 1 — HERO: Full-viewport parallax (NO PIN)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center bg-devan-dark overflow-hidden border-b border-devan-gold/20">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.hero_image_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80'}
            alt="Devans Basketball Court"
            className="w-full h-full object-cover vintage-photo opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-devan-dark via-devan-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-paper-grain opacity-20 pointer-events-none" />
        </div>

        {/* SVG Court Lines */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <rect ref={courtLineRef} x="200" y="50" width="600" height="500" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2200" strokeDashoffset="2200" />
          <circle cx="500" cy="300" r="120" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" />
          <path d="M 200,180 A 160,160 0 0,1 200,420" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" />
          <path d="M 800,180 A 160,160 0 0,1 800,420" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" />
        </svg>

        {/* Floating basketball */}
        <div ref={ballRef} className="absolute top-16 right-14 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-2 border-devan-gold shadow-gold-glow pointer-events-none flex items-center justify-center">
          <div className="w-full h-px bg-black/60 absolute rotate-45" />
          <div className="w-full h-px bg-black/60 absolute -rotate-45" />
          <div className="w-9 h-9 border border-black/60 rounded-full absolute" />
        </div>

        {/* Hero text — CSS transition, no GSAP pin */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center space-y-6">
          <div className="inline-flex items-center space-x-3 bg-devan-maroon/70 border border-devan-gold/60 px-4 py-1.5 rounded-full text-devan-gold shadow-lg backdrop-blur-md">
            <Shield className="w-4 h-4 text-devan-gold" />
            <span className="text-xs tracking-widest font-display font-semibold uppercase">Maliyadeva College • Kurunegala</span>
          </div>

          <div className="min-h-[160px] flex flex-col items-center justify-center">
            {heroStages.map((stage, i) => (
              <div
                key={i}
                className="space-y-3 text-center transition-all duration-700"
                style={{
                  opacity: heroStage === i ? 1 : 0,
                  transform: heroStage === i ? 'translateY(0)' : 'translateY(20px)',
                  position: i === 0 ? 'relative' : 'absolute',
                  pointerEvents: heroStage === i ? 'auto' : 'none',
                }}
              >
                <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-devan-paper uppercase leading-none drop-shadow-2xl">
                  {stage.title}
                </h1>
                <p className="font-serif text-base sm:text-lg text-devan-gold italic">{stage.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to="/history" className="px-7 py-3 bg-devan-maroon border border-devan-gold text-devan-gold text-xs uppercase tracking-widest font-bold rounded hover:bg-devan-gold hover:text-devan-dark transition-all">
              Explore Historical Archive
            </Link>
            <Link to="/achievements" className="px-7 py-3 bg-transparent border border-stone-600 text-stone-300 text-xs uppercase tracking-widest font-bold rounded hover:border-devan-gold hover:text-devan-gold transition-all">
              Trophy Cabinet
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 text-devan-gold/70 animate-bounce">
          <span className="text-[10px] uppercase font-display tracking-widest">Scroll To Explore</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 2 — TIMELINE MILESTONES
         ═══════════════════════════════════════════════════════ */}
      <section ref={timelineRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-24 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 01 • MILESTONES</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">Key Archival Milestones</h2>
        </div>

        <div className="relative border-l-2 border-devan-gold/40 ml-4 sm:ml-36 space-y-12 pl-6 sm:pl-10">
          {timeline.slice(0, 4).map((item) => (
            <div key={item.id} className="relative group">
              <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-devan-maroon border-2 border-devan-gold flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform z-10">
                <div className="w-2 h-2 rounded-full bg-devan-gold" />
              </div>
              <div className="hidden sm:block absolute top-0 right-[calc(100%+20px)] font-display text-xl font-extrabold text-devan-gold text-right whitespace-nowrap">
                {item.year}
              </div>
              <div className="bg-devan-dark-card border border-devan-gold/30 rounded-lg p-6 space-y-3 shadow-archival hover:border-devan-gold transition-all">
                <div className="flex items-center justify-between">
                  <span className="sm:hidden font-display text-xl font-bold text-devan-gold">{item.year}</span>
                  <span className="archive-stamp text-[9px] text-devan-gold">{item.category || 'Milestone'}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-devan-paper">{item.title}</h3>
                <p className="font-serif text-sm text-stone-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/history" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-devan-gold hover:underline">
            <span>View Full Timeline Archive</span><ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 3 — WALL OF LEGENDS
         ═══════════════════════════════════════════════════════ */}
      <section ref={legendsRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 02 • HALL OF FAME</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">Wall of Legends</h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">Honoring captains, coaches, and pioneering players who shaped Maliyadeva basketball history.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {legends.slice(0, 4).map((leg) => (
            <div key={leg.id} className="group bg-devan-dark-card border border-devan-gold/30 rounded-xl p-6 space-y-5 shadow-archival hover:border-devan-gold hover:-translate-y-2 transition-all duration-500">
              <div className="aspect-[4/5] rounded-lg overflow-hidden border border-stone-800 relative">
                <img src={leg.photo_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80'} alt={leg.name} className="w-full h-full object-cover vintage-photo group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 archive-stamp text-[8px] text-devan-gold">{leg.era || 'LEGEND'}</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-devan-paper group-hover:text-devan-gold transition-colors">{leg.name}</h3>
                {leg.nickname && <p className="font-serif text-xs text-devan-gold italic">"{leg.nickname}"</p>}
                <p className="font-serif text-xs text-stone-400 line-clamp-2">{leg.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/legends" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-devan-gold hover:underline">
            <span>Explore All Legends</span><ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 4 — TROPHY CABINET
         ═══════════════════════════════════════════════════════ */}
      <section ref={trophyRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 03 • CHAMPIONSHIPS</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">Trophy Cabinet & Honors</h2>
        </div>
        <TrophyCabinet achievements={achievements.slice(0, 3)} />
        <div className="text-center">
          <Link to="/achievements" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-devan-gold hover:underline">
            <span>View Complete Trophy Exhibition</span><ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 5 — NEWSPAPER ARCHIVE
         ═══════════════════════════════════════════════════════ */}
      <section ref={newspaperRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="paper-card rounded-xl p-8 sm:p-14 space-y-8 relative overflow-hidden border-2 border-amber-900/30">
          <div className="archive-stamp text-[10px] text-amber-900 border-amber-900/40">NEWSPAPER ARCHIVE EDITION • HISTORICAL MATCH REPORT</div>
          <div className="border-b-2 border-stone-800 pb-4 text-center space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-stone-900 uppercase tracking-tight">DEVANS TRIUMPH IN ALL-ISLAND FINAL</h2>
            <p className="font-serif text-xs uppercase tracking-widest text-stone-700 font-bold">Special Sports Correspondent • Maliyadeva Basketball Archives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif text-stone-800 text-sm leading-relaxed newspaper-text">
            <p>In an electrifying display of tactical precision and unyielding grit, Maliyadeva College basketball squad claimed top honors at the All-Island Schools Basketball Championship. The Kurunegala team overcame a late fourth-quarter deficit through disciplined defense and clutch perimeter scoring.</p>
            <p>"The discipline instilled on the college courts was the decisive factor," stated the head coach following the trophy presentation. Generations of Devans supporters crowded the venue, celebrating a historic victory that adds another glorious chapter to Maliyadeva College sports heritage.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 6 — GENERATIONS (horizontal scroll, NO PIN)
         ═══════════════════════════════════════════════════════ */}
      <section ref={generationsRef} className="py-16 space-y-10 border-y border-devan-gold/20 bg-devan-dark overflow-hidden">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 04 • DECADE GENERATIONS</span>
          <h2 className="font-display text-3xl font-extrabold text-devan-paper uppercase tracking-wider">Generations Across Time</h2>
        </div>
        {/* Native overflow-x scroll — no GSAP pin needed */}
        <div className="flex gap-8 px-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-devan-gold/40 scrollbar-track-transparent">
          {generations.map((gen) => (
            <div key={gen.id} className="w-[85vw] sm:w-[420px] shrink-0 snap-center bg-devan-dark-card border border-devan-gold/40 rounded-2xl p-8 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-stone-800 pb-4">
                <span className="font-display text-4xl font-extrabold text-devan-gold">{gen.start_year}s</span>
                <span className="archive-stamp text-[9px] text-stone-400">{gen.start_year} – {gen.end_year}</span>
              </div>
              <div className="h-52 rounded-lg overflow-hidden border border-stone-800">
                <img src={gen.team_photo_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80'} alt={gen.name} className="w-full h-full object-cover vintage-photo" />
              </div>
              <h3 className="font-serif text-xl font-bold text-devan-paper">{gen.name}</h3>
              <p className="font-serif text-xs text-stone-300 leading-relaxed">{gen.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 7 — PHOTO WALL
         ═══════════════════════════════════════════════════════ */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 05 • MEMORIES</span>
          <h2 className="font-display text-4xl font-extrabold text-devan-paper uppercase tracking-wider">Historical Photo Wall</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gallery.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className={`group cursor-pointer bg-devan-dark-card border border-stone-800 rounded-xl overflow-hidden shadow-archival hover:border-devan-gold transition-all duration-500 ${
                index % 3 === 1 ? 'md:-translate-y-4' : index % 3 === 2 ? 'md:translate-y-4' : ''
              }`}
            >
              <div className="h-64 overflow-hidden relative">
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover vintage-photo group-hover:scale-110 transition-transform duration-700" />
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

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 8 — CTA / KEEP THE LEGACY ALIVE
         ═══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-devan-maroon-dark via-devan-maroon to-devan-maroon-dark border-2 border-devan-gold rounded-3xl p-12 sm:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-paper-grain opacity-20 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 06 • THE FUTURE</span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-devan-paper uppercase tracking-wider">KEEP THE LEGACY ALIVE</h2>
            <p className="font-serif text-stone-300 max-w-2xl mx-auto text-lg italic">
              "The legacy is not finished. It is being passed on to the next generation of Devans players."
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openMemoryModal} className="w-full sm:w-auto px-10 py-5 bg-devan-gold text-devan-dark font-extrabold text-xs uppercase tracking-widest rounded shadow-gold-glow hover:bg-amber-300 transition-all flex items-center justify-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Submit A Memory / Photo</span>
              </button>
              <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-black/60 border border-stone-600 text-stone-200 font-bold text-xs uppercase tracking-widest rounded hover:border-devan-gold hover:text-devan-gold transition-all">
                Contact Alumni Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
