"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300 ${
      scrolled 
        ? "bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.06]" 
        : "bg-transparent"
    }`}>

      <Link href="/" className="font-mono text-[13px] text-white/50 tracking-[0.15em]">
        OsamaFed
      </Link>

      <div className="flex items-center gap-8">
        <Link href="/projects" className="font-mono text-[12px] text-white/45 tracking-[0.1em] transition-colors duration-200 hover:text-white/90">
          Projects
        </Link>
        <a href="#skills" className="font-mono text-[12px] text-white/45 tracking-[0.1em] transition-colors duration-200 hover:text-white/90">
          Skills
        </a>
        <a href="#contact" className="font-mono text-[12px] text-white/45 tracking-[0.1em] transition-colors duration-200 hover:text-white/90">
          Contact
        </a>
      </div>

    </nav>
  )
}
