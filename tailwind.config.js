/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fff9c2',
          200: '#fff085',
          300: '#ffe247',
          400: '#ffd01f',
          500: '#f5b700', // Primary Gold
          600: '#d49400',
          700: '#a36c00',
          800: '#825408',
          900: '#6c430d',
        },
        warm: {
          50: '#fff8f5',
          100: '#ffeedb',
          200: '#ffd6b3',
          300: '#ffb780',
          400: '#ff8a3d', // Warm Orange
          500: '#f96815',
          600: '#ea4d0a',
          700: '#c2380a',
          800: '#9a2f10',
          900: '#7c2a12',
        },
        honey: {
          DEFAULT: '#FFC857',
          light: '#FFE4B5',
          dark: '#E0A025',
        },
        cream: {
          DEFAULT: '#FFF6E5',
          light: '#FFF9EF',
          dark: '#FFEACC',
        },
        darkbrown: {
          DEFAULT: '#3B2418',
          light: '#5A3927',
          deep: '#24140C',
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        serif: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(245, 183, 0, 0.4)',
        'glow-warm': '0 0 30px rgba(255, 138, 61, 0.4)',
        '3d-book': '12px 16px 28px -4px rgba(59, 36, 24, 0.35), 0 0 15px rgba(245, 183, 0, 0.2)',
        '3d-hover': '18px 24px 36px -6px rgba(59, 36, 24, 0.45), 0 0 30px rgba(255, 138, 61, 0.35)',
        'glass': '0 8px 32px 0 rgba(163, 108, 0, 0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
