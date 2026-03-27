import AnimatedSection from "@/components/ui/AnimatedSection"
import SkillBadges from "@/components/ui/SkillBadges"

export default function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 py-24">
      <div className="max-w-2xl">
        <AnimatedSection>
          <h2 className="font-mono text-[28px] font-semibold mb-8"
            style={{ color: "var(--text-primary)" }}>
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
