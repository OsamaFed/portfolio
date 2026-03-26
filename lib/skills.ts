export type SkillGroup = {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    category: "Core Web",
    items: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion", "GSAP"],
  },
  {
    category: "State Management",
    items: ["Redux Toolkit", "Zustand", "Context API"],
  },
  {
    category: "API & Data Fetching",
    items: ["REST APIs", "Next.js API Routes", "ISR", "Caching Strategies"],
  },
  {
    category: "Performance & Accessibility",
    items: ["Core Web Vitals", "Lazy Loading", "Code Splitting", "WCAG", "ARIA"],
  },
  {
    category: "Developer Tooling",
    items: ["Git", "GitHub", "ESLint", "CSS Modules", "Python (Basics)"],
  },
]
