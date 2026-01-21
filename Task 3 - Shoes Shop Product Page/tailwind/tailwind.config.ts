import type { Config } from 'tailwindcss'
import { colors } from './tailwind.colors'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors,
    extend: {
      screens: {
        xl: '1440px'
      },
      spacing: {
        8: '8px',
        10: '10px',
        12: '12px',
        16: '16px',
        24: '24px',
        36: '36px',
        40: '40px',
        44: '44px',
        48: '48px',
        65: '65px',
        70: '70px',
        74: '74px',
        100: '100px',
        102: '102px'
      },
      fontSize: {
        md: ['16px', '24px'],
        'lg': ['22px', '28px'],
        'xl': ['24px', '32px'],
        '2xl': ['28px', '36px'],
        '3xl': ['32px', '40px']
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ]
} satisfies Config
