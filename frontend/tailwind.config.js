/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        devan: {
          maroon: '#4A0E17',
          'maroon-dark': '#34080F',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          amber: '#C58B2B',
          paper: '#FAF7F2',
          'paper-dark': '#F0EAE1',
          'paper-border': '#E4DCD0',
          dark: '#12100E',
          'dark-card': '#1C1917',
          'dark-border': '#2D2824',
          charcoal: '#262320'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'archival': '0 20px 40px -15px rgba(18, 16, 14, 0.4)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'inner-paper': 'inner 0 2px 8px rgba(0,0,0,0.06)'
      },
      backgroundImage: {
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")"
      }
    },
  },
  plugins: [],
}
