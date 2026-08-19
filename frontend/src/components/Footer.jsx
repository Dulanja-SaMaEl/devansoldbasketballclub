import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-devan-dark border-t border-devan-gold/20 pt-16 pb-12 relative overflow-hidden text-stone-300">
      {/* Subtle Archival Grain Background */}
      <div className="absolute inset-0 bg-paper-grain opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-stone-800">
          
          {/* Column 1: Heritage Branding */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-devan-maroon border border-devan-gold flex items-center justify-center">
                <Shield className="w-6 h-6 text-devan-gold" />
              </div>
              <div>
                <h3 className="font-display tracking-widest text-lg font-bold text-devan-paper">
                  DEVANS OLD BASKETBALL CLUB
                </h3>
                <p className="text-xs text-devan-gold font-serif uppercase tracking-widest">
                  Maliyadeva College • Kurunegala, Sri Lanka
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-400 font-serif leading-relaxed max-w-md">
              {settings?.footer_text || 'The Game Changes. The Legacy Remains.'}
            </p>
            <div className="pt-2">
              <div className="archive-stamp text-[10px] text-devan-gold/90">
                LIVING DIGITAL ARCHIVE • EST. 1975
              </div>
            </div>
          </div>

          {/* Column 2: Digital Archive Navigation */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-devan-gold font-bold mb-4">
              Digital Museum
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-medium">
              <li><Link to="/history" className="hover:text-devan-gold transition-colors">Historical Timeline</Link></li>
              <li><Link to="/achievements" className="hover:text-devan-gold transition-colors">Trophy Cabinet</Link></li>
              <li><Link to="/legends" className="hover:text-devan-gold transition-colors">Hall of Fame Legends</Link></li>
              <li><Link to="/generations" className="hover:text-devan-gold transition-colors">Generations Explorer</Link></li>
              <li><Link to="/gallery" className="hover:text-devan-gold transition-colors">Photo Archive</Link></li>
              <li><Link to="/stories" className="hover:text-devan-gold transition-colors">Alumni Memories</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Institution */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-devan-gold font-bold mb-4">
              Club Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-devan-gold shrink-0 mt-0.5" />
                <span>{settings?.address || 'Maliyadeva College, Kurunegala, Sri Lanka'}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-devan-gold shrink-0" />
                <span>{settings?.email || 'contact@devansbasketball.lk'}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-devan-gold shrink-0" />
                <span>{settings?.phone || '+94 37 222 2222'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-serif">
          <p>© {currentYear} Devans Old Basketball Club. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Honoring Maliyadeva College Basketball Heritage</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
