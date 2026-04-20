"use client";

import { useRef } from "react";
import { useStarField } from "@/hooks/useStarField"

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null);
  useStarField(mountRef);

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
  );
}
