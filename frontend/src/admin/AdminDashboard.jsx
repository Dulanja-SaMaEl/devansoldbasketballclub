import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Award, Users, Image as ImageIcon, BookOpen, Calendar, Inbox, PlusCircle, CheckCircle, Clock } from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats()
      .then(res => {
        if (res.stats) setStats(res.stats);
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Achievements', count: stats?.totalAchievements || 0, icon: Award, path: '/admin/content/achievements' },
    { label: 'Hall of Fame Legends', count: stats?.totalLegends || 0, icon: Users, path: '/admin/content/legends' },
    { label: 'Generations', count: stats?.totalGenerations || 0, icon: BookOpen, path: '/admin/content/generations' },
    { label: 'Gallery Images', count: stats?.totalGalleryImages || 0, icon: ImageIcon, path: '/admin/content/gallery' },
    { label: 'Alumni Stories', count: stats?.totalStories || 0, icon: Clock, path: '/admin/content/stories' },
    { label: 'News Articles', count: stats?.publishedArticles || 0, icon: BookOpen, path: '/admin/content/news' },
    { label: 'Upcoming Events', count: stats?.upcomingEvents || 0, icon: Calendar, path: '/admin/content/events' },
    { label: 'Pending Submissions', count: stats?.pendingSubmissions || 0, icon: Inbox, path: '/admin/submissions', highlight: true }
  ];

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-800 pb-6 gap-4">
        <div>
          <span className="archive-stamp text-[10px] text-devan-gold">MANAGEMENT DASHBOARD</span>
          <h1 className="font-display text-3xl font-extrabold text-devan-paper">
            Digital Archive Control Center
          </h1>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.path}
              className={`bg-devan-dark-card border rounded-lg p-6 space-y-4 hover:border-devan-gold transition-all ${
                card.highlight ? 'border-devan-gold bg-devan-maroon/20' : 'border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-display font-extrabold text-devan-gold">{card.count}</span>
                <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-devan-gold">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-300">{card.label}</h3>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Operations Panel */}
      <div className="bg-devan-dark-card border border-devan-gold/30 rounded-xl p-8 space-y-6">
        <h2 className="font-serif text-xl font-bold text-devan-paper flex items-center space-x-2">
          <PlusCircle className="w-5 h-5 text-devan-gold" />
          <span>Quick Content Creation</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <Link to="/admin/content/achievements" className="p-4 bg-stone-900 border border-stone-800 hover:border-devan-gold text-center rounded space-y-2 group">
            <Award className="w-6 h-6 text-devan-gold mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">+ Achievement</span>
          </Link>

          <Link to="/admin/content/legends" className="p-4 bg-stone-900 border border-stone-800 hover:border-devan-gold text-center rounded space-y-2 group">
            <Users className="w-6 h-6 text-devan-gold mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">+ Legend</span>
          </Link>

          <Link to="/admin/content/gallery" className="p-4 bg-stone-900 border border-stone-800 hover:border-devan-gold text-center rounded space-y-2 group">
            <ImageIcon className="w-6 h-6 text-devan-gold mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">+ Gallery Photo</span>
          </Link>

          <Link to="/admin/content/stories" className="p-4 bg-stone-900 border border-stone-800 hover:border-devan-gold text-center rounded space-y-2 group">
            <Clock className="w-6 h-6 text-devan-gold mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">+ Story</span>
          </Link>

          <Link to="/admin/content/news" className="p-4 bg-stone-900 border border-stone-800 hover:border-devan-gold text-center rounded space-y-2 group">
            <BookOpen className="w-6 h-6 text-devan-gold mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">+ News</span>
          </Link>

          <Link to="/admin/content/events" className="p-4 bg-stone-900 border border-stone-800 hover:border-devan-gold text-center rounded space-y-2 group">
            <Calendar className="w-6 h-6 text-devan-gold mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">+ Event</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
