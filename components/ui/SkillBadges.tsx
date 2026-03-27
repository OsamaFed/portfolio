"use client"
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiRedux, SiFramer, SiGreensock,
  SiPython, SiGit, SiGithub, SiHtml5, SiCss,
  SiEslint, SiShadcnui,
} from "react-icons/si"
import { TbApi } from "react-icons/tb"
import { MdAccessibility } from "react-icons/md"

const ZustandIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="7" cy="6" r="3" />
    <circle cx="17" cy="6" r="3" />
    <circle cx="12" cy="14" r="8" />
    <circle cx="9" cy="13" r="1.2" fill="white" />
    <circle cx="15" cy="13" r="1.2" fill="white" />
    <path d="M9 17q3 2 6 0" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

const skills = [
  { name: "React",          icon: SiReact },
  { name: "Next.js",        icon: SiNextdotjs },
  { name: "TypeScript",     icon: SiTypescript },
  { name: "JavaScript",     icon: SiJavascript },
  { name: "Tailwind CSS",   icon: SiTailwindcss },
  { name: "HTML",           icon: SiHtml5 },
  { name: "CSS",            icon: SiCss },
  { name: "Redux Toolkit",  icon: SiRedux },
  { name: "Zustand",        icon: ZustandIcon },
  { name: "shadcn/ui",      icon: SiShadcnui },
  { name: "REST APIs",      icon: TbApi },
  { name: "Framer Motion",  icon: SiFramer },
  { name: "GSAP",           icon: SiGreensock },
  { name: "Python",         icon: SiPython },
  { name: "Git",            icon: SiGit },
  { name: "GitHub",         icon: SiGithub },
  { name: "ESLint",         icon: SiEslint },
  { name: "WCAG",           icon: MdAccessibility },
]

export default function SkillBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const Icon = skill.icon
        return (
          <span
            key={skill.name}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all duration-200 cursor-default"
            style={{
              border: "1px solid var(--badge-border)",
              background: "var(--badge-bg)",
              color: "var(--badge-text)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"
              ;(e.currentTarget as HTMLElement).style.color = "var(--text-primary)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--badge-border)"
              ;(e.currentTarget as HTMLElement).style.color = "var(--badge-text)"
            }}
          >
            <Icon className="w-3 h-3" />
            {skill.name}
          </span>
        )
      })}
    </div>
  )
}
