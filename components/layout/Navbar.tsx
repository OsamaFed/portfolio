"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out"
      style={{
        filter: isLoaded ? "none" : "blur(20px)",
        opacity: isLoaded ? 1 : 0,
      }}
    >
        <div
          className="flex items-center gap-6 px-6 py-3 rounded-xl"
          style={{
            width: "min(350px, 90vw)",
            background: "var(--theme-nav-bg)",
            backdropFilter: "blur(32px) saturate(150%)",
            WebkitBackdropFilter: "blur(32px) saturate(150%)",
            border: "1px solid var(--theme-nav-border)",
            boxShadow: "var(--theme-nav-shadow)",
          }}
        >
        <Image
          src="/avatar.jpeg"
          alt="OsamaFed"
          width={32}
          height={32}
          className="rounded-sm object-cover shrink-0 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <Link href="/projects"
          className="text-sm transition-colors"
          style={{ color: "var(--theme-secondary)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--theme-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--theme-secondary)")}>
          projects
        </Link>
        <a href="#skills"
          className="text-sm transition-colors"
          style={{ color: "var(--theme-secondary)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--theme-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--theme-secondary)")}>
          skills
        </a>
        <a href="#contact"
          className="text-sm transition-colors"
          style={{ color: "var(--theme-secondary)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--theme-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--theme-secondary)")}>
          contact
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
