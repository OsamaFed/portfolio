"use client"
import { useTheme } from "./ThemeProvider"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === "light"

  return (
    <button
      onClick={() => toggleTheme()}
      className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300"
      style={{ color: "var(--text-muted)" }}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <svg
        className={`w-[18px] h-[18px] absolute transition-all duration-500 ${isLight ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
      >
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-5.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
      </svg>
      <svg
        className={`w-[18px] h-[18px] absolute transition-all duration-500 ${isLight ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </button>
  )
}
