"use client"
import { useRef } from "react"
import { usePathname } from "next/navigation"
import { useStarField } from "@/hooks/useStarField"

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const frozen = pathname.startsWith("/projects/")

  useStarField(mountRef, frozen)

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  )
}
