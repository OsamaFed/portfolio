import { projects } from "@/lib/projects"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const WebIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.desc,
    openGraph: {
      title: project.name,
      description: project.desc,
      ...(project.image && { images: [{ url: project.image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.desc,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) notFound()

  return (
    <main className="px-6 py-28 min-h-screen">
      <div className="max-w-2xl mx-auto">

        <Link
          href="/projects"
          className="font-mono text-[12px] mb-10 block transition-colors duration-200"
          style={{ color: "var(--text-primary)" }}
        >
          ← back
        </Link>

        {project.image && (
          <div className="relative w-full rounded-xl overflow-hidden mb-8" style={{ height: "220px" }}>
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-1">
          <h1 className="font-mono text-[22px] font-semibold" style={{ color: "var(--text-primary)" }}>
            {project.name}
          </h1>
          {project.status === "live" && (
            <span className="font-mono text-[12px] flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.7)" }} />
              Live
            </span>
          )}
        </div>

        <p className="font-mono text-[12px] mb-6" style={{ color: "var(--text-faint)" }}>
          {project.tagline} — {project.date}
        </p>

        <div className="w-full mb-6" style={{ height: "1px", background: "var(--border)" }} />

        <div className="flex items-center gap-8 mb-6">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 font-mono text-[13px] transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}>
              <GithubIcon /> Github
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 font-mono text-[13px] transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}>
              <WebIcon /> Website
            </a>
          )}
          {project.xPost && (
            <a href={project.xPost} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 font-mono text-[13px] transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}>
              <XIcon /> Post
            </a>
          )}
        </div>

        <div className="w-full mb-6" style={{ height: "1px", background: "var(--border)" }} />

        <p className="font-sans text-[14px] leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          {project.desc}
        </p>

        <p className="font-mono text-[11px] mb-3 tracking-widest uppercase" style={{ color: "var(--text-faint)" }}>
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(tech => (
            <span key={tech} className="text-xs px-3 py-1 rounded font-mono"
              style={{ background: "var(--badge-bg)", color: "var(--badge-text)", border: "1px solid var(--badge-border)" }}>
              {tech}
            </span>
          ))}
        </div>

      </div>
    </main>
  )
}
