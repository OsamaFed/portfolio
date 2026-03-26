"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

function getAge(birthDate: Date): string {
  const now = new Date()
  const diff = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  return diff.toFixed(8)
}

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 relative overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}/>

      <div className="relative z-10 max-w-xl">

        <div style={fade(0.1)} className="flex items-start gap-5 mb-8">
          <Image
            src="/avatar.jpg"
            alt="Osama Mohammed"
            width={100}
            height={100}
            className="object-cover shrink-0"
          />
          <div className="pt-1">
            <h1 className="font-mono text-[22px] font-medium text-white leading-tight mb-1">
              osama mohammed
            </h1>
            <p className="font-mono text-[13px] text-white/40 mb-2">
              frontend dev
            </p>
            <p className="font-mono text-[13px] text-white/30">
              ~ <span className="text-white/60">{age}</span> years
            </p>
          </div>
        </div>

        <p style={fade(0.2)} className="font-mono text-[14px] text-white/55 leading-relaxed mb-4">
          i just like building things. a lot. obsessed with performance,
          accessibility, and clean systems that scale.
        </p>

        <p style={fade(0.28)} className="font-mono text-[14px] text-white/55 leading-relaxed mb-8">
          in my free time, i'm doin astro over here{" "}
          <a
            href="https://instagram.com/astronomyquest"
            target="_blank"
            rel="noreferrer"
            className="text-white/75 underline underline-offset-4 hover:text-white transition-colors duration-200"
          >
            @astronomyquest
          </a>
          , playing chess, or dying in elden ring.
          oh — i build everything from my phone.
        </p>

        <div style={fade(0.36)} className="flex items-center gap-5 mb-8">
          <a href="https://github.com/OsamaFed" target="_blank" rel="noreferrer"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <GithubIcon />
          </a>
          <a href="https://x.com/" target="_blank" rel="noreferrer"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <XIcon />
          </a>
          <a href="mailto:osama.mohammed.work1@gmail.com"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <EmailIcon />
          </a>
        </div>

        <div style={fade(0.44)} className="flex items-center gap-3">
          <a href="/cv.pdf" target="_blank"
            className="font-mono text-[12px] text-white/80 tracking-wide px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 hover:text-white transition-all duration-200">
            ↓ resume
          </a>
          <a href="mailto:osama.mohammed.work1@gmail.com"
            className="font-mono text-[12px] text-[#080808] tracking-wide px-6 py-2.5 rounded-full bg-white/90 hover:bg-white transition-all duration-200">
            ✉ hire me
          </a>
        </div>

      </div>

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
