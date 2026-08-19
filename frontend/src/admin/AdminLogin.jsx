import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@devansbasketball.lk');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.login(email, password);
      if (res.success && res.token) {
        localStorage.setItem('devans_admin_token', res.token);
        navigate('/admin');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error during login attempt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-devan-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper-grain opacity-10 pointer-events-none" />

      <div className="max-w-md w-full bg-devan-dark-card border border-devan-gold/40 rounded-xl p-8 space-y-8 shadow-2xl relative z-10">
        
        {/* Branding */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-devan-maroon border-2 border-devan-gold flex items-center justify-center mx-auto shadow-gold-glow">
            <Shield className="w-7 h-7 text-devan-gold" />
          </div>
          <span className="archive-stamp text-[10px] text-devan-gold">ADMINISTRATION PORTAL</span>
          <h1 className="font-display text-2xl font-bold text-devan-paper">
            Devans Basketball Admin
          </h1>
          <p className="text-xs text-stone-400 font-serif">
            Sign in to manage the digital museum archive & alumni records.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded pl-10 pr-4 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded pl-10 pr-4 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-widest rounded hover:bg-devan-maroon-dark transition-all flex items-center justify-center space-x-2 shadow-gold-glow"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign Into Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-800 text-center">
          <p className="text-[11px] text-stone-500 font-mono">
            Default credentials: <strong className="text-stone-300">admin@devansbasketball.lk / admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
