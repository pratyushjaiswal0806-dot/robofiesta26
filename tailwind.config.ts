import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2A0B4F',
        purple: '#6C2BD9',
        cream: '#FFF9E6',
        ivory: '#FFFDF4',
        yellow: '#F4C63F',
        orange: '#FF8B78',
        cyan: '#9BE7FF',
        pink: '#F4DFFF',
      },
      spacing: { 'pixel-1': '4px', 'pixel-2': '8px', 'pixel-3': '12px', 'pixel-4': '16px', 'pixel-5': '24px', 'pixel-6': '32px', 'pixel-7': '48px' },
      boxShadow: { pixel: '6px 6px 0 #2A0B4F', 'pixel-lg': '10px 10px 0 #2A0B4F' },
      fontFamily: { pixel: ['"Press Start 2P"', 'monospace'], body: ['"DM Sans"', 'sans-serif'] },
    },
  },
  plugins: [],
}

export default config
