"use client"
import Link from "next/link"
import AnimatedSection from "@/components/ui/AnimatedSection"
import ProjectCard from "@/components/projects/ProjectCard"
import { projects } from "@/lib/projects"

export default function ProjectsPreview() {
  const featured = projects.filter(p => p.featured)

  return (
    <section id="projects" className="px-8 md:px-16 py-24">
      <div className="max-w-2xl">

        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-[28px] font-semibold"
              style={{ color: "var(--text-primary)" }}>
              Projects
            </h2>
            <Link href="/projects"
              className="font-mono text-[12px] tracking-wide transition-colors duration-200"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
              view all →
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((project, i) => (
            <AnimatedSection key={project.name} delay={i * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
