import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Shield, Award, Users, BookOpen, Heart, Target, Eye } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { getBreadcrumbSchema } from '../utils/seoUtils';

export default function AboutPage() {
  const { settings } = useOutletContext() || {};

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <SeoHead
        title="Maliyadeva Basketball Legacy & Culture | Devans Old Basketball Club"
        description="Learn about the origin, mission, values, and unbroken community bond of Devans Old Basketball Club at Maliyadeva College in Kurunegala, Sri Lanka."
        canonicalPath="/about"
        jsonLd={getBreadcrumbSchema([{ name: 'About', path: '/about' }])}
      />
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-10">
        <span className="archive-stamp text-[10px] text-devan-gold">ABOUT THE CLUB</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Maliyadeva Basketball Legacy
        </h1>
        <p className="font-serif text-stone-400 max-w-2xl mx-auto text-base italic">
          "A brotherhood forged on the basketball court, carrying honor across generations."
        </p>
      </div>

      {/* Editorial Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 font-serif text-stone-300 leading-relaxed text-base">
          <h2 className="font-display text-2xl font-bold text-devan-paper font-sans">
            Our Connection with Maliyadeva College
          </h2>
          <p>
            Maliyadeva College, located in Kurunegala, Sri Lanka, has long stood as a beacon of academic and sporting excellence. Basketball has held a distinguished place in the college culture since its founding eras.
          </p>
          <p>
            The Devans Old Basketball Club was established to preserve this rich heritage, maintain tight-knit alumni connections, and support the upcoming generation of student-athletes carrying the college crest.
          </p>
        </div>

        <div className="bg-devan-dark-card border border-devan-gold/30 rounded-lg p-8 relative overflow-hidden shadow-archival">
          <div className="space-y-6">
            <div className="archive-stamp text-[10px] text-devan-gold">CULTURE & VALUES</div>
            <ul className="space-y-4 text-sm font-serif text-stone-300">
              <li className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-devan-gold shrink-0 mt-0.5" />
                <span><strong className="text-devan-paper font-sans uppercase text-xs block">Brotherhood:</strong> Shared commitment that extends far beyond graduation.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-devan-gold shrink-0 mt-0.5" />
                <span><strong className="text-devan-paper font-sans uppercase text-xs block">Competitive Excellence:</strong> Striving for island-wide and provincial titles with honor.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-devan-gold shrink-0 mt-0.5" />
                <span><strong className="text-devan-paper font-sans uppercase text-xs block">Generational Support:</strong> Mentoring young court leaders and funding court infrastructure.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-devan-dark-card border border-stone-800 p-8 rounded-lg space-y-4">
          <div className="flex items-center space-x-3 text-devan-gold">
            <Target className="w-6 h-6" />
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-devan-paper">Mission</h3>
          </div>
          <p className="font-serif text-sm text-stone-300 leading-relaxed">
            To build and maintain a living digital legacy of Devans basketball, fostering lifelong engagement among alumni while providing equipment, coaching, and mentorship for Maliyadeva College teams.
          </p>
        </div>

        <div className="bg-devan-dark-card border border-stone-800 p-8 rounded-lg space-y-4">
          <div className="flex items-center space-x-3 text-devan-gold">
            <Eye className="w-6 h-6" />
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-devan-paper">Vision</h3>
          </div>
          <p className="font-serif text-sm text-stone-300 leading-relaxed">
            To make Devans Basketball a premier inter-school basketball program in Sri Lanka, recognized for its historic record, outstanding sportsmanship, and unbroken community support.
          </p>
        </div>
      </div>

    </div>
  );
}
