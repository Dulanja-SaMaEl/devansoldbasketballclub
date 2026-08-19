import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Award, Users, Image as ImageIcon, BookOpen, Calendar, Settings, Inbox, LogOut, Shield, ChevronRight, FileText } from 'lucide-react';
import { api } from '../services/api';
import SeoHead from '../components/SeoHead';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('devans_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    api.verifyToken()
      .then((res) => {
        if (res.success) {
          setAdminUser(res.user);
        } else {
          localStorage.removeItem('devans_admin_token');
          navigate('/admin/login');
        }
      })
      .catch(() => {
        // Fallback for dev mode
        setAdminUser({ email: 'admin@devansbasketball.lk', role: 'admin' });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('devans_admin_token');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-devan-dark flex items-center justify-center text-devan-gold font-serif">
        <div className="text-center space-y-3">
          <Shield className="w-10 h-10 animate-bounce mx-auto text-devan-gold" />
          <p className="text-sm tracking-widest uppercase">Authenticating Devans Admin...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Timeline Entries', path: '/admin/content/timeline', icon: Calendar },
    { label: 'Achievements / Trophies', path: '/admin/content/achievements', icon: Award },
    { label: 'Hall of Fame Legends', path: '/admin/content/legends', icon: Users },
    { label: 'Generations', path: '/admin/content/generations', icon: BookOpen },
    { label: 'Gallery Archives', path: '/admin/content/gallery', icon: ImageIcon },
    { label: 'Alumni Stories', path: '/admin/content/stories', icon: FileText },
    { label: 'News Articles', path: '/admin/content/news', icon: BookOpen },
    { label: 'Events & Reunions', path: '/admin/content/events', icon: Calendar },
    { label: 'Alumni Submissions', path: '/admin/submissions', icon: Inbox },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col md:flex-row">
      <SeoHead title="Admin Management Portal | Devans Old Basketball Club" noindex={true} />
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-devan-dark-card border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-stone-800 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-devan-maroon border border-devan-gold flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-devan-gold" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm tracking-wider text-devan-paper">DEVANS ADMIN</h2>
              <p className="text-[10px] text-devan-gold uppercase font-serif tracking-widest">Digital Legacy Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-devan-maroon border border-devan-gold/50 text-devan-gold'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Action */}
        <div className="p-4 border-t border-stone-800">
          <div className="text-[11px] text-stone-400 font-serif mb-3 px-2">
            Logged in: <strong className="text-stone-200 block truncate">{adminUser?.email}</strong>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-stone-900 border border-stone-700 text-stone-300 hover:text-red-400 hover:border-red-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-devan-dark border-b border-stone-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="archive-stamp text-[10px] text-devan-gold">ADMINISTRATION PANEL</span>
            <Link to="/" target="_blank" className="text-xs text-stone-400 hover:text-devan-gold flex items-center space-x-1 font-serif">
              <span>View Public Website ↗</span>
            </Link>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-y-auto bg-stone-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
