import AnimatedSection from "@/components/ui/AnimatedSection"
import ProjectCard from "@/components/projects/ProjectCard"
import { projects } from "@/lib/projects"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <main className="px-8 md:px-16 py-32">
      <div className="max-w-2xl">

        <AnimatedSection>
          <Link href="/"
            className="font-mono text-[12px] mb-12 block transition-colors duration-200"
            style={{ color: "var(--text-faint)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
            ← back
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h1 className="font-mono text-[28px] font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}>
            Projects
          </h1>
          <p className="font-mono text-[13px] mb-12"
            style={{ color: "var(--text-muted)" }}>
            {projects.length} projects — all of them shipped.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <AnimatedSection key={project.name} delay={i * 0.05}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

      </div>
    </main>
  )
}
