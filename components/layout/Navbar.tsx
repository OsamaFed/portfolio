"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    let attempts = 0
    const interval = setInterval(() => {
      const el = document.querySelector(hash)
      if (el) {
        clearInterval(interval)
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50)
        history.replaceState(null, "", pathname)
      }
      if (++attempts > 20) clearInterval(interval)
    }, 100)

    return () => clearInterval(interval)
  }, [pathname])

  const handleAvatarClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  const handleSectionClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${id}`)
    }
  }

  const linkStyle = { color: "var(--theme-secondary)" }

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out"
      style={{
        filter: isLoaded ? "none" : "blur(10px)",
        opacity: isLoaded ? 1 : 0,
      }}
    >
      <div
        className="flex items-center gap-7 px-6 py-3 rounded-xl"
        style={{
          width: "min(350px, 90vw)",
          background: "var(--theme-nav-bg)",
          backdropFilter: "blur(10px) saturate(150%)",
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
          onClick={handleAvatarClick}
        />
        <Link
          href="/projects"
          className="text-sm transition-colors"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--theme-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--theme-secondary)")}
        >
          projects
        </Link>
        <a
          href="#skills"
          className="text-sm transition-colors"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--theme-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--theme-secondary)")}
          onClick={handleSectionClick("skills")}
        >
          skills
        </a>
        <a
          href="#contact"
          className="text-sm transition-colors"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--theme-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--theme-secondary)")}
          onClick={handleSectionClick("contact")}
        >
          contact
        </a>
      </div>
    </nav>
  )
}
