/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030304',
          900: '#070709',
          850: '#0b0c0f',
          800: '#111217',
          750: '#161820',
          700: '#1d1f2a',
        },
        crimson: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        neon: {
          red: '#ff1e38',
          glow: '#ff3b53',
          darkRed: '#d90429',
          wine: '#590d22',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(255, 30, 56, 0.35)',
        'neon-md': '0 0 20px rgba(255, 30, 56, 0.5), 0 0 35px rgba(255, 30, 56, 0.25)',
        'neon-lg': '0 0 35px rgba(255, 30, 56, 0.65), 0 0 70px rgba(255, 30, 56, 0.35)',
        'neon-inner': 'inset 0 0 15px rgba(255, 30, 56, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 30, 56, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 30, 56, 0.05) 1px, transparent 1px)',
        'subtle-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'glow-scan': 'glowScan 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(14px)' },
        },
        glowScan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 200%' },
        }
      }
    },
  },
  plugins: [],
}

