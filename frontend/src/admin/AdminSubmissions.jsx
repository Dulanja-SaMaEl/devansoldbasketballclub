import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Check, X, Inbox, Clock, User } from 'lucide-react';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSubmissions = () => {
    setLoading(true);
    api.getSubmissions()
      .then(res => {
        if (res.data) setSubmissions(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleModerate = async (id, status) => {
    await api.moderateSubmission(id, status);
    loadSubmissions();
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-stone-800 pb-6">
        <span className="archive-stamp text-[10px] text-devan-gold">MODERATION CENTER</span>
        <h1 className="font-display text-3xl font-extrabold text-devan-paper">
          Alumni Memory Submissions
        </h1>
        <p className="text-xs text-stone-400 font-serif mt-1">
          Review and publish alumni contributions, photos, and historical records.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-stone-400 font-serif">Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-stone-800 rounded-lg">
          <Inbox className="w-10 h-10 text-stone-600 mx-auto mb-3" />
          <p className="text-stone-400 font-serif text-sm">No pending submissions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-devan-dark-card border border-stone-800 rounded-lg p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-devan-gold" />
                  <div>
                    <strong className="text-sm text-devan-paper block font-serif">{sub.submitter_name}</strong>
                    <span className="text-xs text-stone-400 font-mono">{sub.submitter_email} • Era: {sub.generation_year || 'Alumni'}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded border ${
                  sub.status === 'Approved' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' :
                  sub.status === 'Rejected' ? 'bg-red-950/60 border-red-800 text-red-300' :
                  'bg-amber-950/60 border-amber-800 text-amber-300'
                }`}>
                  {sub.status}
                </span>
              </div>

              <p className="font-serif text-sm text-stone-300 leading-relaxed bg-stone-900/50 p-4 rounded border border-stone-800">
                "{sub.content}"
              </p>

              {sub.image_url && (
                <div className="h-48 rounded overflow-hidden max-w-md border border-stone-800">
                  <img src={sub.image_url} alt="Submission" className="w-full h-full object-cover" />
                </div>
              )}

              {sub.status === 'Pending' && (
                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    onClick={() => handleModerate(sub.id, 'Rejected')}
                    className="px-4 py-1.5 bg-stone-900 border border-red-800 text-red-400 font-bold text-xs uppercase rounded hover:bg-red-950 flex items-center space-x-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleModerate(sub.id, 'Approved')}
                    className="px-4 py-1.5 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase rounded hover:bg-devan-maroon-dark flex items-center space-x-1 shadow-gold-glow"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Publish</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
