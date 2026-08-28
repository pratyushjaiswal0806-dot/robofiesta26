import type { Config } from 'tailwindcss'
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], theme: { extend: { fontFamily: { pixel: ['"Press Start 2P"', 'monospace'] } } }, plugins: [] }
export default config
