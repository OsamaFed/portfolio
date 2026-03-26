import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-12 py-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        <span className="font-mono text-[11px] text-white/20 tracking-[0.15em]">
          © 2026 OsamaFed
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/OsamaFed"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-white/20 tracking-[0.1em] transition-colors duration-200 hover:text-white/60"
          >
            GitHub
          </a>
          <a
            href="mailto:osama.mohammed.work1@gmail.com"
            className="font-mono text-[11px] text-white/20 tracking-[0.1em] transition-colors duration-200 hover:text-white/60"
          >
            Email
          </a>
        </div>

      </div>
    </footer>
  )
}
