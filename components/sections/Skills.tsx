import AnimatedSection from "@/components/ui/AnimatedSection"
import SkillBadges from "@/components/ui/SkillBadges"

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-wider mb-6"
            style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--theme-primary)" }}>
            Skills
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <SkillBadges />
        </AnimatedSection>
      </div>
    </section>
  )
}
