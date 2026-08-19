import React from 'react';
import { Shield, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Digital Legacy ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-devan-maroon/80 border border-devan-gold flex items-center justify-center text-devan-gold shadow-gold-glow">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg">
            <span className="archive-stamp text-[10px] text-devan-gold">SYSTEM NOTICE</span>
            <h2 className="font-display text-3xl font-extrabold text-devan-paper uppercase tracking-wider">
              Archival View Temporarily Paused
            </h2>
            <p className="font-serif text-stone-300 text-sm italic">
              We encountered a temporary rendering issue while displaying this historical archive section.
            </p>
          </div>

          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-3 bg-devan-gold text-devan-dark font-extrabold text-xs uppercase tracking-widest rounded shadow-gold-glow hover:bg-amber-300 transition-all flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Archival Page</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
