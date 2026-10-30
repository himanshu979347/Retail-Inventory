/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1E293B',
        muted: '#64748B',
        bg: '#F3F4F6',
        panel: '#FFFFFF',
        border: '#E5E7EB',
        navy: '#15304D',
        navyhover: '#1E3F63',
        primary: '#2563EB',
        primarysoft: '#DBEAFE',
        success: '#16A34A',
        successsoft: '#DCFCE7',
        warning: '#CA8A04',
        warningsoft: '#FEF9C3',
        danger: '#DC2626',
        dangersoft: '#FEE2E2',
        purple: '#7C3AED',
        purplesoft: '#EDE9FE',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
