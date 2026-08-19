import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MemoryModal from '../components/MemoryModal';
import CustomCursor from '../components/CustomCursor';
import ScrollProgressTrack from '../components/ScrollProgressTrack';
import { api } from '../services/api';
import { PlusCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PublicLayout() {
  const location = useLocation();
  const [settings, setSettings] = useState(null);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);

  // Automatically scroll to top and reset GSAP state on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.refresh();
  }, [location.pathname]);

  useEffect(() => {
    api.getSettings().then((res) => {
      if (res && res.data) setSettings(res.data);
    }).catch(err => console.warn('Could not fetch settings:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-devan-dark text-stone-200 relative selection:bg-devan-gold selection:text-devan-dark">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Storytelling Progress Track Indicator */}
      <ScrollProgressTrack />

      {/* Navigation Bar */}
      <Navbar settings={settings} />

      {/* Main Content View */}
      <main className="flex-grow pt-20">
        <Outlet context={{ settings, openMemoryModal: () => setMemoryModalOpen(true) }} />
      </main>

      {/* Memory Submission Quick Action Floating Button */}
      <button
        onClick={() => setMemoryModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded-full shadow-2xl hover:bg-devan-maroon-dark hover:scale-105 flex items-center space-x-2 transition-all duration-300 group"
        title="Share a Memory or Photograph"
      >
        <PlusCircle className="w-5 h-5 text-devan-gold group-hover:rotate-90 transition-transform" />
        <span className="hidden sm:inline">Share A Memory</span>
      </button>

      {/* Shared Alumni Contribution Modal */}
      <MemoryModal isOpen={memoryModalOpen} onClose={() => setMemoryModalOpen(false)} />

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
}
