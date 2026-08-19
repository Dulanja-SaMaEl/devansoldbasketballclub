import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Award, History, Users, Image as ImageIcon, BookOpen, Calendar, Mail, Lock } from 'lucide-react';

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'History', path: '/history' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Hall of Fame', path: '/legends' },
    { name: 'Generations', path: '/generations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Stories', path: '/stories' },
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-devan-dark/95 backdrop-blur-md py-3 border-b border-devan-gold/20 shadow-xl' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-devan-maroon border border-devan-gold/60 flex items-center justify-center shadow-lg group-hover:border-devan-gold transition-colors">
            <Shield className="w-5 h-5 text-devan-gold" />
          </div>
          <div>
            <span className="font-display tracking-wider text-sm sm:text-base font-bold text-devan-paper block leading-none group-hover:text-devan-gold transition-colors">
              DEVANS BASKETBALL
            </span>
            <span className="text-[10px] tracking-widest text-devan-gold/80 font-serif uppercase block mt-1">
              Maliyadeva College • Kurunegala
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium rounded transition-all duration-200 ${
                  isActive
                    ? 'text-devan-gold font-bold bg-devan-maroon/40 border border-devan-gold/30'
                    : 'text-stone-300 hover:text-devan-gold hover:bg-stone-800/40'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Admin Link */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            to="/admin/login"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs tracking-wider font-semibold uppercase text-stone-300 border border-stone-700 rounded hover:border-devan-gold hover:text-devan-gold transition-all"
            title="Admin Portal Login"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-stone-300 hover:text-devan-gold focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-devan-dark-card border-b border-devan-gold/20 px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs tracking-wider uppercase font-medium rounded block ${
                  location.pathname === link.path
                    ? 'text-devan-gold font-bold bg-devan-maroon/50 border border-devan-gold/30'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-stone-800">
            <Link
              to="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2 text-xs font-semibold uppercase tracking-wider text-devan-gold border border-devan-gold/40 rounded bg-devan-maroon/30"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
