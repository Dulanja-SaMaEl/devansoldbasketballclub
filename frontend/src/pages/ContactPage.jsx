import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { api } from '../services/api';
import SeoHead from '../components/SeoHead';
import { getBreadcrumbSchema } from '../utils/seoUtils';

export default function ContactPage() {
  const { settings } = useOutletContext() || {};
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.sendContactMessage(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(res.message || 'Failed to send message.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SeoHead
        title="Contact Devans Old Basketball Club | Maliyadeva College, Kurunegala"
        description="Get in touch with Devans Old Basketball Club committee, alumni relations, and basketball program coordinators at Maliyadeva College in Kurunegala, Sri Lanka."
        canonicalPath="/contact"
        jsonLd={getBreadcrumbSchema([{ name: 'Contact Us', path: '/contact' }])}
      />
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-stone-800 pb-8">
        <span className="archive-stamp text-[10px] text-devan-gold">GET IN TOUCH</span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-devan-paper uppercase tracking-wider">
          Contact The Club
        </h1>
        <p className="font-serif text-stone-400 max-w-xl mx-auto text-sm italic">
          For alumni inquiries, archive contributions, sponsorship, or general information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Contact Details Panel */}
        <div className="md:col-span-5 bg-devan-dark-card border border-devan-gold/30 rounded-lg p-8 space-y-8">
          <div>
            <span className="archive-stamp text-[9px] text-devan-gold mb-2 block">HEADQUARTERS</span>
            <h3 className="font-serif text-2xl font-bold text-devan-paper">Devans Basketball Council</h3>
          </div>

          <div className="space-y-6 text-sm font-serif text-stone-300">
            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-devan-gold shrink-0 mt-1" />
              <div>
                <strong className="block font-sans text-xs uppercase text-stone-400 font-semibold">Address</strong>
                <span>{settings?.address || 'Maliyadeva College, Kurunegala, Sri Lanka'}</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-devan-gold shrink-0 mt-1" />
              <div>
                <strong className="block font-sans text-xs uppercase text-stone-400 font-semibold">Email Inquiry</strong>
                <span>{settings?.email || 'contact@devansbasketball.lk'}</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 text-devan-gold shrink-0 mt-1" />
              <div>
                <strong className="block font-sans text-xs uppercase text-stone-400 font-semibold">Telephone</strong>
                <span>{settings?.phone || '+94 37 222 2222'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="md:col-span-7 bg-devan-dark-card border border-stone-800 rounded-lg p-8 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-devan-paper">Send Us A Message</h3>

          {success && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded flex items-center space-x-3 text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you! Your message has been sent to the Devans Basketball Council.</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Message *</label>
              <textarea
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded px-3.5 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none font-serif"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded hover:bg-devan-maroon-dark flex items-center space-x-2 transition-all shadow-gold-glow"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
