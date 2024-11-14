import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        mouse: 'mouse 2s infinite',
      },
      keyframes: {
        mouse: {
          '0%': {
            opacity: '1',
            top: '10px',
          },
          '100%': {
            opacity: '0',
            top: '40px',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
