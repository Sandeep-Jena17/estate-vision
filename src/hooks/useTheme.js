// src/hooks/useTheme.js
// ─────────────────────────────────────────────
// Dark / Light theme toggle hook
// Persists preference to localStorage
// Usage:
//   const { theme, toggleTheme, isDark } = useTheme();
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem('ev-theme');
    if (saved) return saved;
    // 2. Check OS preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    // Apply to <html> element so ALL CSS [data-theme="dark"] selectors work
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ev-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}
