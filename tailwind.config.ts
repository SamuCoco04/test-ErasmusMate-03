import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        canvas: '#f8fafc',
        accent: '#1d4ed8',
        muted: '#64748b'
      },
      boxShadow: {
        card: '0 10px 30px -15px rgba(15, 23, 42, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
