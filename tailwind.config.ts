import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: "#191A20",
        deepBlue: "#282A35",
        blue: "#43486B",
        white: "#F8F8F2",
        orange: "#FFB86C",
        skyblue: "#8BE9FD",
        green: "#50FA7B",
        pink: "#FF79C6",
        red: "#FF4E59",
        yellow: "#F0DB6D",
        deepYellow: "#444444"
      },
      tonFamily:{
        koreanFont:"Pretendard-Regular",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

    },
  },
  plugins: [],
}
export default config