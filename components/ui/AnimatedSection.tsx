"use client"
import { useInView } from "framer-motion"
import { useRef } from "react"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
