"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-border transition-colors duration-200 border border-border"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MdDarkMode className="w-5 h-5 text-foreground" />
      ) : (
        <MdLightMode className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
}