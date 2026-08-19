import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Shield, ChevronRight, PlusCircle, Maximize2, ChevronDown, Award, Calendar, Users, Trophy } from 'lucide-react';
import { api } from '../services/api';
import TrophyCabinet from '../components/TrophyCabinet';
import Lightbox from '../components/Lightbox';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { settings, openMemoryModal } = useOutletContext() || {};
  const [achievements, setAchievements] = useState([]);
  const [legends, setLegends] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Mouse Parallax position state for Hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for animations
  const heroRef = useRef(null);
  const magicMomentRef = useRef(null);
  const timelineRef = useRef(null);
  const legendsRef = useRef(null);
  const trophyRef = useRef(null);
  const newspaperRef = useRef(null);
  const generationsRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);
  const courtLineRef = useRef(null);
  const ballRef = useRef(null);

  // Fetch real data from API/Supabase
  useEffect(() => {
    api.getList('achievements').then(res => res && res.data && setAchievements(res.data));
    api.getList('legends').then(res => res && res.data && setLegends(res.data));
    api.getList('generations').then(res => res && res.data && setGenerations(res.data));
    api.getList('timeline').then(res => res && res.data && setTimeline(res.data));
    api.getList('gallery').then(res => res && res.data && setGallery(res.data));
  }, []);

  // Track scroll progress & mouse position for subtle 3D parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Non-mutating GSAP Animations (Zero pin: true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Court SVG line drawing
      if (courtLineRef.current) {
        gsap.fromTo(courtLineRef.current,
          { strokeDashoffset: 2400, opacity: 0.1 },
          {
            strokeDashoffset: 0,
            opacity: 0.85,
            duration: 2.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Smooth section reveals
      const sections = [
        { ref: timelineRef, y: 50 },
        { ref: legendsRef, y: 50 },
        { ref: trophyRef, y: 50 },
        { ref: newspaperRef, y: 40 },
        { ref: generationsRef, y: 40 },
        { ref: galleryRef, y: 50 },
        { ref: ctaRef, y: 40 }
      ];

      sections.forEach(({ ref, y }) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Dynamic Typography Scroll Titles
  const getDynamicTitle = () => {
    if (scrollProgress < 0.08) return 'THE GAME';
    if (scrollProgress < 0.22) return 'THE LEGACY';
    if (scrollProgress < 0.40) return 'THE GENERATIONS';
    return 'DEVANS';
  };

  return (
    <div className="pb-32 relative bg-devan-dark selection:bg-devan-gold selection:text-devan-dark overflow-x-hidden">

      {/* 🏀 RECURRING BASKETBALL INTERACTION OBJECT */}
      <div
        ref={ballRef}
        className="fixed top-24 right-8 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 via-amber-700 to-amber-950 border-2 border-devan-gold shadow-gold-glow pointer-events-none transition-transform duration-300 hidden md:flex items-center justify-center"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${scrollProgress * 280}px, 0) rotate(${scrollProgress * 720}deg)`,
          opacity: scrollProgress > 0.95 ? 0.2 : 0.85
        }}
      >
        <div className="w-full h-px bg-black/70 absolute rotate-45" />
        <div className="w-full h-px bg-black/70 absolute -rotate-45" />
        <div className="w-8 h-8 border border-black/70 rounded-full absolute" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO MOTION SYSTEM (EDITORIAL PARALLAX)
         ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center bg-devan-dark overflow-hidden border-b border-devan-gold/20 pt-10 pb-16">
        
        {/* Background Image & Texture Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.hero_image_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80'}
            alt="Maliyadeva Basketball Court"
            className="w-full h-full object-cover vintage-photo opacity-25 scale-105"
            style={{ transform: `scale(1.05) translate3d(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px, 0)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-devan-dark via-devan-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-paper-grain opacity-25 pointer-events-none" />
        </div>

        {/* SVG Court Trajectory Lines */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <rect ref={courtLineRef} x="150" y="40" width="700" height="520" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2400" strokeDashoffset="2400" opacity="0.6" />
          <circle cx="500" cy="300" r="140" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
          <path d="M 150,160 A 180,180 0 0,1 150,440" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
          <path d="M 850,160 A 180,180 0 0,1 850,440" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* Floating Database Stat Badges */}
        <div className="absolute top-28 left-6 sm:left-12 z-20 hidden md:flex flex-col space-y-4">
          <div className="bg-black/60 border border-devan-gold/40 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-archival">
            <span className="text-[9px] font-mono text-stone-400 block uppercase tracking-widest">FOUNDED</span>
            <span className="font-display text-sm font-extrabold text-devan-gold">EST. 1978</span>
          </div>
          {generations.length > 0 && (
            <div className="bg-black/60 border border-devan-gold/40 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-archival">
              <span className="text-[9px] font-mono text-stone-400 block uppercase tracking-widest">ERAS ARCHIVED</span>
              <span className="font-display text-sm font-extrabold text-devan-gold">{generations.length} DECADES</span>
            </div>
          )}
        </div>

        <div className="absolute top-28 right-6 sm:right-12 z-20 hidden md:flex flex-col space-y-4 text-right">
          {achievements.length > 0 && (
            <div className="bg-black/60 border border-devan-gold/40 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-archival">
              <span className="text-[9px] font-mono text-stone-400 block uppercase tracking-widest">CHAMPIONSHIPS</span>
              <span className="font-display text-sm font-extrabold text-devan-gold">{achievements.length} TITLES</span>
            </div>
          )}
          {legends.length > 0 && (
            <div className="bg-black/60 border border-devan-gold/40 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-archival">
              <span className="text-[9px] font-mono text-stone-400 block uppercase tracking-widest">HALL OF FAME</span>
              <span className="font-display text-sm font-extrabold text-devan-gold">{legends.length} LEGENDS</span>
            </div>
          )}
        </div>

        {/* Main Editorial Hero Composition */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center flex flex-col items-center space-y-6">
          
          <div className="inline-flex items-center space-x-3 bg-devan-maroon/80 border border-devan-gold/70 px-5 py-2 rounded-full text-devan-gold shadow-gold-glow backdrop-blur-md">
            <Shield className="w-4 h-4 text-devan-gold animate-pulse" />
            <span className="text-xs tracking-widest font-display font-bold uppercase">Maliyadeva College • Kurunegala</span>
          </div>

          {/* Giant Typography Dynamic Heading Layer */}
          <div className="relative w-full flex flex-col items-center justify-center my-4">
            
            {/* Background Giant Text Stroke */}
            <span className="font-display font-black text-giant text-stroke-gold uppercase select-none opacity-20 pointer-events-none absolute -top-12">
              {getDynamicTitle()}
            </span>

            {/* Main Foreground Typography */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-devan-paper uppercase leading-none drop-shadow-2xl z-10 max-w-4xl">
              {settings?.hero_title || 'DEVANS OLD BASKETBALL CLUB'}
            </h1>

            <p className="font-serif text-base sm:text-xl text-devan-gold italic max-w-2xl mt-4 z-10">
              "{settings?.hero_subtitle || 'The Living Digital Legacy of Basketball at Maliyadeva College'}"
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 z-20">
            <Link
              to="/history"
              className="px-8 py-4 bg-devan-maroon border border-devan-gold text-devan-gold font-extrabold text-xs uppercase tracking-widest rounded shadow-gold-glow hover:bg-devan-gold hover:text-devan-dark transition-all transform hover:-translate-y-1"
            >
              Explore Historical Archive
            </Link>
            <Link
              to="/achievements"
              className="px-8 py-4 bg-black/60 border border-stone-600 text-stone-200 font-extrabold text-xs uppercase tracking-widest rounded hover:border-devan-gold hover:text-devan-gold transition-all transform hover:-translate-y-1"
            >
              Trophy Cabinet
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 text-devan-gold/80 animate-bounce">
          <span className="text-[10px] uppercase font-display tracking-widest font-bold">Scroll To Explore</span>
          <ChevronDown className="w-5 h-5 text-devan-gold" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — COURT → TIMELINE TRANSFORMATION
         ═══════════════════════════════════════════════════════ */}
      <section ref={timelineRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-24 space-y-16">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 01 • HISTORICAL COURT TRAJECTORY</span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
            Court Markings Become History
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Tracing five decades of Maliyadeva basketball court milestones from inauguration to national championships.
          </p>
        </div>

        {/* Timeline Court Track */}
        <div className="relative border-l-2 border-devan-gold/50 ml-4 sm:ml-36 space-y-12 pl-6 sm:pl-12">
          {timeline.slice(0, 5).map((item, index) => (
            <div key={item.id || index} className="relative group">
              {/* Timeline Court Node */}
              <div className="absolute -left-[14px] top-1.5 w-7 h-7 rounded-full bg-devan-maroon border-2 border-devan-gold flex items-center justify-center shadow-gold-glow group-hover:scale-125 transition-transform z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-devan-gold" />
              </div>
              
              {/* Year Stamp */}
              <div className="hidden sm:block absolute top-1 right-[calc(100%+24px)] font-display text-2xl font-black text-devan-gold text-right whitespace-nowrap">
                {item.year}
              </div>

              {/* Content Card */}
              <div className="bg-devan-dark-card border border-devan-gold/30 rounded-xl p-7 space-y-4 shadow-archival hover:border-devan-gold transition-all duration-300 group-hover:translate-x-1">
                <div className="flex items-center justify-between">
                  <span className="sm:hidden font-display text-2xl font-black text-devan-gold">{item.year}</span>
                  <span className="archive-stamp text-[9px] text-devan-gold">{item.category || `ARCHIVE / 00${index + 1}`}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-devan-paper group-hover:text-devan-gold transition-colors">{item.title}</h3>
                <p className="font-serif text-sm text-stone-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link to="/history" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-extrabold text-devan-gold hover:underline">
            <span>Explore Complete Timeline Archive</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — "MAGIC MOMENT" DEVANS BREAK-APART & LEGENDS
         ═══════════════════════════════════════════════════════ */}
      <section ref={magicMomentRef} className="py-16 bg-gradient-to-b from-devan-dark via-devan-maroon/20 to-devan-dark border-y border-devan-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 02 • THE LEGENDS BREAKTHROUGH</span>
          
          {/* Giant Break-Apart Spelled Out Word */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-6 select-none my-6">
            {['D', 'E', 'V', 'A', 'N', 'S'].map((char, i) => (
              <span
                key={i}
                className="font-display text-5xl sm:text-8xl font-black text-devan-gold hover:text-devan-paper transition-all transform hover:scale-110 hover:-rotate-3 inline-block drop-shadow-2xl"
              >
                {char}
              </span>
            ))}
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
            Wall of Legends
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Honoring captains, coaches, and pioneering players who built the legacy of Maliyadeva basketball.
          </p>

          {/* Legends Showcase Grid */}
          <div ref={legendsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 text-left">
            {legends.slice(0, 4).map((leg, index) => (
              <div
                key={leg.id || index}
                className="group bg-devan-dark-card border border-devan-gold/30 rounded-2xl p-6 space-y-5 shadow-archival hover:border-devan-gold hover:-translate-y-3 transition-all duration-500 relative overflow-hidden"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden border border-stone-800 relative">
                  <img
                    src={leg.photo_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80'}
                    alt={leg.name}
                    className="w-full h-full object-cover vintage-photo group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 archive-stamp text-[8px] text-devan-gold bg-black/60">
                    {leg.era || `LEGEND / 00${index + 1}`}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-devan-paper group-hover:text-devan-gold transition-colors">{leg.name}</h3>
                  {leg.nickname && <p className="font-serif text-xs text-devan-gold italic">"{leg.nickname}"</p>}
                  <p className="font-serif text-xs text-stone-300 line-clamp-2 leading-relaxed">{leg.bio}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-devan-gold uppercase font-bold group-hover:translate-x-1 transition-transform">
                  <span>Meet Legend</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link to="/legends" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-extrabold text-devan-gold hover:underline">
              <span>Explore Full Hall of Fame</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — TROPHY CABINET & HONORS
         ═══════════════════════════════════════════════════════ */}
      <section ref={trophyRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 03 • CHAMPIONSHIPS</span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
            Trophy Cabinet & Honors
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Celebrating Island-Wide, Provincial, and Invitational basketball titles.
          </p>
        </div>

        <TrophyCabinet achievements={achievements.slice(0, 4)} />

        <div className="text-center pt-4">
          <Link to="/achievements" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-extrabold text-devan-gold hover:underline">
            <span>View Complete Trophy Exhibition</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — NEWSPAPER ARCHIVE EDITION
         ═══════════════════════════════════════════════════════ */}
      <section ref={newspaperRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="paper-card rounded-2xl p-8 sm:p-16 space-y-8 relative overflow-hidden border-2 border-amber-900/30 shadow-2xl">
          <div className="archive-stamp text-[10px] text-amber-950 border-amber-900/40">
            ARCHIVAL NEWSPAPER EDITION • SPECIAL CHAMPIONSHIP COVERAGE
          </div>
          <div className="border-b-2 border-stone-800 pb-6 text-center space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-stone-900 uppercase tracking-tight">
              DEVANS TRIUMPH IN ALL-ISLAND FINAL
            </h2>
            <p className="font-serif text-xs uppercase tracking-widest text-stone-700 font-bold">
              Special Sports Correspondent • Maliyadeva Basketball Archives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif text-stone-900 text-base leading-relaxed newspaper-text">
            <p>
              In an electrifying display of tactical precision and unyielding grit, the Maliyadeva College basketball squad claimed top honors at the All-Island Schools Basketball Championship. The Kurunegala team overcame a late fourth-quarter deficit through disciplined defense and clutch perimeter scoring.
            </p>
            <p>
              "The court discipline instilled on the college courts was the decisive factor," stated the head coach following the trophy presentation. Generations of Devans supporters crowded the venue, celebrating a historic victory that adds another glorious chapter to Maliyadeva College sports heritage.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — DECADE GENERATIONS (CAROUSEL)
         ═══════════════════════════════════════════════════════ */}
      <section ref={generationsRef} className="py-20 space-y-12 border-y border-devan-gold/20 bg-devan-dark overflow-hidden">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 04 • DECADE GENERATIONS</span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
            Generations Across Time
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Passing the basketball mantle from pioneering alumni to modern court squads.
          </p>
        </div>

        <div className="flex gap-8 px-6 sm:px-12 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-devan-gold/40 scrollbar-track-transparent">
          {generations.map((gen, index) => (
            <div
              key={gen.id || index}
              className="w-[85vw] sm:w-[440px] shrink-0 snap-center bg-devan-dark-card border border-devan-gold/40 rounded-2xl p-8 space-y-6 shadow-2xl hover:border-devan-gold transition-all"
            >
              <div className="flex justify-between items-center border-b border-stone-800 pb-4">
                <span className="font-display text-4xl font-extrabold text-devan-gold">{gen.start_year}s</span>
                <span className="archive-stamp text-[9px] text-stone-400">{gen.start_year} – {gen.end_year}</span>
              </div>
              <div className="h-56 rounded-xl overflow-hidden border border-stone-800 relative">
                <img
                  src={gen.team_photo_url || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80'}
                  alt={gen.name}
                  className="w-full h-full object-cover vintage-photo"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-devan-paper">{gen.name}</h3>
              <p className="font-serif text-sm text-stone-300 leading-relaxed">{gen.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — EDITORIAL DYNAMIC GALLERY WALL
         ═══════════════════════════════════════════════════════ */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
        <div className="text-center space-y-4">
          <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 05 • HISTORICAL MEMORIES</span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
            Archival Photo Wall
          </h2>
          <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
            Click any photograph to view high-resolution archival details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gallery.map((img, index) => (
            <div
              key={img.id || index}
              onClick={() => setSelectedImage(img)}
              className={`group cursor-pointer bg-devan-dark-card border border-stone-800 rounded-2xl overflow-hidden shadow-archival hover:border-devan-gold transition-all duration-500 ${
                index % 3 === 1 ? 'md:-translate-y-4' : index % 3 === 2 ? 'md:translate-y-4' : ''
              }`}
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover vintage-photo group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 p-2.5 bg-black/70 rounded-full text-devan-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-mono text-devan-gold font-bold uppercase">{img.year || 'HISTORIC PHOTO'}</span>
                <h4 className="font-serif text-lg font-bold text-devan-paper group-hover:text-devan-gold transition-colors">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 — FUTURE & ALUMNI CONTRIBUTION CTA
         ═══════════════════════════════════════════════════════ */}
      <section ref={ctaRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-gradient-to-r from-devan-maroon-dark via-devan-maroon to-devan-maroon-dark border-2 border-devan-gold rounded-3xl p-10 sm:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-paper-grain opacity-25 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="archive-stamp text-[10px] text-devan-gold">CHAPTER 06 • THE FUTURE</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-devan-paper uppercase tracking-wider">
              KEEP THE LEGACY ALIVE
            </h2>
            <p className="font-serif text-stone-200 max-w-2xl mx-auto text-lg sm:text-xl italic">
              "The legacy is not finished. It is being passed on to the next generation of Devans players."
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
              <button
                onClick={openMemoryModal}
                className="w-full sm:w-auto px-10 py-5 bg-devan-gold text-devan-dark font-black text-xs uppercase tracking-widest rounded shadow-gold-glow hover:bg-amber-300 transition-all flex items-center justify-center space-x-3 transform hover:-translate-y-1"
              >
                <PlusCircle className="w-5 h-5 text-devan-dark" />
                <span>Submit A Memory / Photo</span>
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-black/60 border border-stone-600 text-stone-200 font-bold text-xs uppercase tracking-widest rounded hover:border-devan-gold hover:text-devan-gold transition-all transform hover:-translate-y-1"
              >
                Contact Alumni Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Lightbox Modal */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
