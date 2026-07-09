"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-14 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center w-14 h-7 rounded-full transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        focus:ring-offset-white dark:focus:ring-offset-zinc-900
        ${isDark ? "bg-blue-600" : "bg-zinc-300"}`}
    >
      <span
        className={`absolute flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md
          transition-transform duration-300 ${isDark ? "translate-x-8" : "translate-x-1"}`}
      >
        {isDark
          ? <Moon className="w-3 h-3 text-blue-600" />
          : <Sun  className="w-3 h-3 text-amber-500" />}
      </span>
    </button>
  );
}
