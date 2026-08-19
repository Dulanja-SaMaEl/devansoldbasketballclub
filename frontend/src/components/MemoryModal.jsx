import React, { useState, useEffect } from 'react';
import { X, Send, Image as ImageIcon, Heart, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

export default function MemoryModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [formData, setFormData] = useState({
    submitter_name: '',
    submitter_email: '',
    generation_year: '1990',
    type: 'Memory',
    content: '',
    image_url: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.submitMemory(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Network error submitting memory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
      <div className="max-w-xl w-full bg-devan-dark-card border border-devan-gold/40 rounded-lg p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-devan-gold focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="archive-stamp text-[10px] text-devan-gold mb-2">ALUMNI CONTRIBUTION</div>
            <h3 className="font-serif text-2xl font-bold text-devan-paper mb-2">
              Share a Memory or Photograph
            </h3>
            <p className="text-xs text-stone-400 mb-6 leading-relaxed">
              Help preserve the legacy of Maliyadeva basketball. Submitted memories and photographs are reviewed by club archivists before being published to the public digital archive.
            </p>

            {error && (
              <div className="p-3 mb-4 text-xs bg-red-950/60 border border-red-800 text-red-300 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.submitter_name}
                    onChange={(e) => setFormData({ ...formData, submitter_name: e.target.value })}
                    placeholder="e.g. Ruwan Wickramasinghe"
                    className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.submitter_email}
                    onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
                    placeholder="alumni@devans.lk"
                    className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Generation / Era</label>
                  <select
                    value={formData.generation_year}
                    onChange={(e) => setFormData({ ...formData, generation_year: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
                  >
                    <option value="1980">1980s Era</option>
                    <option value="1990">1990s Era</option>
                    <option value="2000">2000s Era</option>
                    <option value="2010">2010s Era</option>
                    <option value="2020">2020s Era</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Contribution Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
                  >
                    <option value="Memory">Personal Memory / Story</option>
                    <option value="Photo">Historical Photograph</option>
                    <option value="Artifact">Document / Shield Record</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/... or direct image URL"
                  className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Your Story / Details *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share details about the match, team members, year, or personal memory..."
                  className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none font-serif"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded hover:bg-devan-maroon/80 flex items-center space-x-2 transition-all"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Contribution</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-devan-maroon border border-devan-gold flex items-center justify-center mx-auto text-devan-gold">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-devan-paper">
              Memory Submitted Successfully
            </h3>
            <p className="text-sm text-stone-300 font-serif max-w-md mx-auto">
              Thank you for contributing to the Devans Basketball digital archive. Our admin team will review and publish your submission shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-devan-gold text-devan-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-400"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
