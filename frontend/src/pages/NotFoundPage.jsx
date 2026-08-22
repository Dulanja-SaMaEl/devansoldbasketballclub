import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { Shield, Home, Search, BookOpen, Award, Users, Camera, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-10">
      <SeoHead 
        title="Page Not Found | Old Devans Basketball Club"
        description="The requested page could not be found on the Old Devans Basketball Club digital legacy website."
        noindex={true}
      />

      <div className="space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-devan-dark-card border-2 border-devan-gold/50 flex items-center justify-center text-devan-gold shadow-archival">
          <Shield className="w-10 h-10" />
        </div>
        <span className="archive-stamp text-[10px] text-devan-gold block">ERROR 404 • ARCHIVE RECORD MISSING</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Page Not Found
        </h1>
        <p className="font-serif text-stone-400 max-w-lg mx-auto text-sm sm:text-base italic">
          The archive route or historical record you are searching for may have been relocated or updated in our database.
        </p>
      </div>

      {/* Main Navigation Links */}
      <div className="bg-devan-dark-card border border-stone-800 rounded-xl p-8 max-w-2xl mx-auto space-y-6">
        <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-300">
          Explore Popular Legacy Archives:
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
          <Link to="/" className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 hover:text-devan-gold hover:border-devan-gold/50 transition-all flex items-center justify-center space-x-2">
            <Home className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </Link>
          <Link to="/history" className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 hover:text-devan-gold hover:border-devan-gold/50 transition-all flex items-center justify-center space-x-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>History</span>
          </Link>
          <Link to="/achievements" className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 hover:text-devan-gold hover:border-devan-gold/50 transition-all flex items-center justify-center space-x-2">
            <Award className="w-3.5 h-3.5" />
            <span>Trophies</span>
          </Link>
          <Link to="/legends" className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 hover:text-devan-gold hover:border-devan-gold/50 transition-all flex items-center justify-center space-x-2">
            <Users className="w-3.5 h-3.5" />
            <span>Legends</span>
          </Link>
          <Link to="/gallery" className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 hover:text-devan-gold hover:border-devan-gold/50 transition-all flex items-center justify-center space-x-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Gallery</span>
          </Link>
          <Link to="/contact" className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 hover:text-devan-gold hover:border-devan-gold/50 transition-all flex items-center justify-center space-x-2">
            <Search className="w-3.5 h-3.5" />
            <span>Contact</span>
          </Link>
        </div>
      </div>

      <div>
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold text-devan-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Old Devans Basketball Club Home</span>
        </Link>
      </div>
    </div>
  );
}
