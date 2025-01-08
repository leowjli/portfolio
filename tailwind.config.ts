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
      boxShadow: {
        'custom-gradient': '5px 5px rgba(240, 46, 170, 0.5), 10px 10px rgba(240, 46, 170, 0.3), 15px 15px rgba(240, 46, 170, 0.2), 20px 20px rgba(240, 46, 170, 0.1), 25px 25px rgba(240, 46, 170, 0.05)',
      }
    },
  },
  plugins: [],
} satisfies Config;
