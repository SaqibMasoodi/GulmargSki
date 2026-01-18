import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./stays.html",
    "./packages.html",
    "./gallery.html",
    "./booking.html",
    "./policies.html",
    "./assets/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      colors: {
        primary: "#0f172a",
        accent: "#0ea5e9",
        "background-light": "#f8fafc",
        "background-dark": "#020617",
        "surface-light": "#ffffff",
        "surface-dark": "#1e293b",
        alpine: {
          white: '#ffffff',
          off: '#f8fafc',
          ice: '#e0f2fe',
          blue: '#0ea5e9',
          deep: '#0f172a',
          text: '#334155',
          muted: '#94a3b8',
          gold: '#f59e0b',
          goldlight: '#fef3c7'
        },
        bg: '#020617',
        panel: '#0f172a',
        surface: '#1e293b',
        border: '#334155',
        subtle: '#475569',
        muted: '#94a3b8',
      },
      boxShadow: {
        'ice': '0 4px 14px 0 rgba(14, 165, 233, 0.15)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(14, 165, 233, 0.3)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'floating': '0 10px 40px -10px rgba(0,0,0,0.1)',
        'gold-glow': '0 0 20px rgba(245, 158, 11, 0.15)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-in forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    }
  },
  plugins: [
    forms,
    containerQueries,
  ],
}
