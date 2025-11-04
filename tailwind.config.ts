import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        border: "var(--border)",
        card: "var(--card)",
        surface: "var(--surface)",
        subtle: "var(--subtle)",
        chip: "var(--chip)",
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
        'custom-gradient': '5px 5px rgba(57, 142, 235, 0.5), 10px 10px rgba(57, 142, 235, 0.3), 15px 15px rgba(57, 142, 235, 0.2), 20px 20px rgba(57, 142, 235, 0.1), 25px 25px rgba(57, 142, 235, 0.05)',
        'glow': '0 0 20px rgba(57, 142, 235, 0.4), 0 0 40px rgba(57, 142, 235, 0.3), 0 4px 60px rgba(57, 142, 235, 0.2)',
        'glow-lg': '0 0 30px rgba(57, 142, 235, 0.6), 0 0 60px rgba(57, 142, 235, 0.4), 0 8px 80px rgba(57, 142, 235, 0.3)',
        'glow-neon': '0 0 5px rgba(57, 142, 235, 0.5), 0 0 20px rgba(57, 142, 235, 0.5), 0 0 40px rgba(57, 142, 235, 0.4), 0 0 80px rgba(57, 142, 235, 0.3)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, var(--accent) 0%, rgba(57, 142, 235, 0.6) 100%)',
        'gradient-purple': 'linear-gradient(135deg, #951DC6 0%, rgba(149, 29, 198, 0.6) 100%)',
        'gradient-rainbow': 'linear-gradient(90deg, #F03E41 0%, #951DC6 33%, #398EEB 66%, #60a5fa 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
