"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

function getAge(birthDate: Date): string {
  const now = new Date()
  const diff = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  return diff.toFixed(8)
}

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
)

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const [age, setAge] = useState("")

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    const birth = new Date("2005-02-25")
    setAge(getAge(birth))
    const interval = setInterval(() => setAge(getAge(birth)), 100)
    return () => clearInterval(interval)
  }, [])

  const fade = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(10px)",
    transition: `all 0.6s ease ${delay}s`,
  })

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}/>

      <div className="relative z-10 max-w-2xl mx-auto w-full px-6">

        {/* صورة + اسم + عمر */}
        <div style={fade(0.1)} className="relative flex items-start gap-4 mb-8">
          <Image
            src="/avatar.jpeg"
            alt="Osama Mohammed"
            width={96}
            height={96}
            className="object-cover shrink-0 rounded-sm mt-1"
          />
          <div className="flex flex-col justify-start">
            <h1 className="text-2xl font-semibold tracking-wide mb-1"
              style={{ fontFamily: "var(--font-geist-mono, monospace)", color: "var(--text-primary)" }}>
              osama mohammed
            </h1>
            <p className="text-sm mb-2"
              style={{ fontFamily: "var(--font-geist-mono, monospace)", color: "var(--text-muted)" }}>
              frontend dev
            </p>
            <p className="text-sm"
              style={{ fontFamily: "var(--font-geist-mono, monospace)", color: "var(--text-faint)" }}>
              ~ <span style={{ color: "var(--text-muted)" }}>{age}</span> years
            </p>
          </div>
        </div>

        {/* Bio */}
          <div style={{ ...fade(0.2), fontFamily: "var(--font-geist-mono, monospace)", color: "var(--text-muted)" }}
            className="text-sm leading-relaxed mb-8">
          <p className="mb-3">
            i just like building things. a lot. obsessed with performance,
            accessibility, and clean systems that scale.
          </p>
          <p>
            in my free time, i'm doin astro over here{" "}
            <a
              href="https://instagram.com/astronomyquest"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 transition-colors duration-200"
              style={{ color: "var(--text-primary)" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              @astronomyquest
            </a>
            , playing chess, or dying in elden ring.
            oh — i build everything from my phone.
          </p>
        </div>

        {/* Social Icons */}
          <div style={{ ...fade(0.28), color: "var(--text-faint)" }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 mb-8">
          <a href="https://github.com/OsamaFed" target="_blank" rel="noreferrer"
            className="transition-colors duration-200"
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
            <GithubIcon />
          </a>
          <a href="https://x.com/" target="_blank" rel="noreferrer"
            className="transition-colors duration-200"
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
            <XIcon />
          </a>
          <a href="mailto:osama.mohammed.work1@gmail.com"
            className="transition-colors duration-200"
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
            <EmailIcon />
          </a>
        </div>

        {/* Buttons */}
        <div style={fade(0.36)} className="flex items-center gap-3">
          <a
            href="/cv.pdf"
            target="_blank"
            className="group text-sm px-4 py-2 rounded-lg border transition-all flex items-center gap-2"
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"
              ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"
              ;(e.currentTarget as HTMLElement).style.background = "var(--card)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"
              ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
              ;(e.currentTarget as HTMLElement).style.background = "transparent"
            }}
          >
            ↓ resume
          </a>
          <a
            href="mailto:osama.mohammed.work1@gmail.com"
            className="group text-sm px-4 py-2 rounded-lg border transition-all flex items-center gap-2"
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"
              ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"
              ;(e.currentTarget as HTMLElement).style.background = "var(--card)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"
              ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
              ;(e.currentTarget as HTMLElement).style.background = "transparent"
            }}
          >
            ✉ hire me
          </a>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div style={{ opacity: visible ? 0.3 : 0, transition: "opacity 1s ease 1s" }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2">
        <div style={{
          width: 1, height: 48,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
          animation: "scrollLine 2s ease-in-out infinite",
        }}/>
      </div>

    </section>
  )
}
