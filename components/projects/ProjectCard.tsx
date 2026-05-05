"use client"
import { Project } from "@/lib/projects"
import Image from "next/image"
import Link from "next/link"

interface Props {
  project: Project
}

const statusStyles = {
  live:       { label: "Live",        dot: true,  color: "transparent", textColor: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.3)" },
  inprogress: { label: "In Progress", dot: false, color: "transparent", textColor: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.3)" },
  opensource: { label: "Open Source", dot: false, color: "transparent", textColor: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.3)" },
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"
        ;(e.currentTarget as HTMLElement).style.background = "var(--card-hover)"
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
        ;(e.currentTarget as HTMLElement).style.background = "var(--card)"
      }}
    >
      <div className="relative overflow-hidden" style={{ height: "160px" }}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "var(--card)" }}>
            <span className="font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>preview</span>
          </div>
        )}
        {project.status && (
          <span
            className="absolute top-3 right-3 text-xs px-2 py-1 rounded font-mono flex items-center gap-1.5"
            style={{
              background: statusStyles[project.status]?.color,
              color: statusStyles[project.status]?.textColor,
              border: statusStyles[project.status]?.border,
              backdropFilter: "blur(8px)",
            }}
          >
            {statusStyles[project.status]?.dot && (
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.9)" }} />
            )}
            {statusStyles[project.status]?.label}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-mono text-[14px] mb-1" style={{ color: "var(--text-primary)" }}>{project.name}</p>
        <p className="font-mono text-[11px] mb-3" style={{ color: "var(--text-faint)" }}>{project.tagline}</p>
        <p className="font-sans text-[13px] leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(tech => (
            <span key={tech} className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ background: "var(--badge-bg)", color: "var(--badge-text)", border: "1px solid var(--badge-border)" }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
