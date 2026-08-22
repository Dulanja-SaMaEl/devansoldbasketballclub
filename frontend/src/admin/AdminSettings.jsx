import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Save, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    club_name: 'Old Devans Basketball Club',
    short_name: 'Devans Basketball',
    hero_title: 'OLD DEVANS BASKETBALL CLUB',
    hero_subtitle: 'The Living Digital Legacy of Basketball at Maliyadeva College',
    description: '',
    email: '',
    phone: '',
    address: '',
    footer_text: ''
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings()
      .then(res => {
        if (res.data) setSettings(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-stone-800 pb-6">
        <span className="archive-stamp text-[10px] text-devan-gold">SYSTEM CONFIGURATION</span>
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">
          Site Settings
        </h1>
        <p className="text-xs text-stone-400 font-serif mt-1">
          Update club contact info, homepage hero titles, and footer text across the platform.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-sm rounded flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>Site settings updated successfully.</span>
        </div>
      )}

      {loading ? (
        <div className="text-stone-400 font-serif">Loading settings...</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-devan-dark-card border border-stone-800 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Club Full Name</label>
              <input
                type="text"
                value={settings.club_name}
                onChange={(e) => setSettings({ ...settings, club_name: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Short Name</label>
              <input
                type="text"
                value={settings.short_name}
                onChange={(e) => setSettings({ ...settings, short_name: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Hero Title</label>
            <input
              type="text"
              value={settings.hero_title}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none font-display uppercase"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Hero Subtitle</label>
            <input
              type="text"
              value={settings.hero_subtitle}
              onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none font-serif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Footer Tagline</label>
            <input
              type="text"
              value={settings.footer_text}
              onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none font-serif"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded hover:bg-devan-maroon-dark flex items-center space-x-2 shadow-gold-glow"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </form>
      )}
    </div>
  );
}
