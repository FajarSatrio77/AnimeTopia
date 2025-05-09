/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        neutral: "var(--neutral)",
      },
<<<<<<< HEAD
=======
      backgroundColor: {
        'base': '#1A1A1A',
        'card': '#242424',
      },
>>>>>>> be07b8cf48f62cfa635d431149ccc7ab95653c51
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
      },
<<<<<<< HEAD
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
=======
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: ["dark"],
  }
>>>>>>> be07b8cf48f62cfa635d431149ccc7ab95653c51
}; 