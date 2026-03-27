"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-300 ${
      scrolled ? "backdrop-blur-md border-b" : ""
    }`} style={{
      background: scrolled ? "rgba(var(--bg-rgb, 8,8,8), 0.85)" : "transparent",
      borderColor: "var(--border)",
    }}>
      <Link href="/" className="font-mono text-[13px] tracking-[0.15em]"
        style={{ color: "var(--text-faint)" }}>
        OsamaFed
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/projects" className="font-mono text-[12px] tracking-[0.1em] transition-colors duration-200"
          style={{ color: "var(--text-faint)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
          Projects
        </Link>
        <a href="#skills" className="font-mono text-[12px] tracking-[0.1em] transition-colors duration-200"
          style={{ color: "var(--text-faint)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
          Skills
        </a>
        <a href="#contact" className="font-mono text-[12px] tracking-[0.1em] transition-colors duration-200"
          style={{ color: "var(--text-faint)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
          Contact
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
