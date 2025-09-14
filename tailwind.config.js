/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8FAFC',
        'bg-card': '#FFFFFF',
        'bg-card-alt': '#F1F5F9',
        'primary': '#3B82F6',
        'primary-hover': '#2563EB',
        'primary-dark': '#1E40AF',
        'accent': '#F59E0B',
        'accent-hover': '#D97706',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
        'border': '#E5E7EB',
        'border-hover': '#D1D5DB',
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-400': '#9CA3AF',
        'gray-500': '#6B7280',
        'gray-600': '#4B5563',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
