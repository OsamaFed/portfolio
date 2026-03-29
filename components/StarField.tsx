"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

// بيانات الكوكبات — إحداثيات حقيقية تقريبية
const constellations = [
  {
    name: "Orion",
    stars: [
      { x: 0,    y: 2.5,  size: 0.045, name: "Betelgeuse" },  // منكب الجوزاء
      { x: 1.2,  y: 3.2,  size: 0.025, name: "Bellatrix" },
      { x: -0.5, y: 1.2,  size: 0.02,  name: "Mintaka" },
      { x: 0,    y: 1.0,  size: 0.022, name: "Alnilam" },
      { x: 0.5,  y: 0.8,  size: 0.02,  name: "Alnitak" },
      { x: -1.0, y: -0.5, size: 0.02,  name: "Saiph" },
      { x: 1.0,  y: -0.5, size: 0.035, name: "Rigel" },
    ],
    lines: [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
      [2, 5], [4, 6], [5, 6],
    ],
  },
  {
    name: "Scorpius",
    stars: [
      { x: 4.5,  y: 1.5,  size: 0.04,  name: "Antares" },
      { x: 4.0,  y: 2.2,  size: 0.02,  name: "Graffias" },
      { x: 5.0,  y: 2.0,  size: 0.02,  name: "Dschubba" },
      { x: 4.5,  y: 0.5,  size: 0.022, name: "Tau Sco" },
      { x: 4.0,  y: -0.3, size: 0.02,  name: "Epsilon" },
      { x: 4.8,  y: -1.0, size: 0.02,  name: "Mu Sco" },
      { x: 5.5,  y: -1.5, size: 0.025, name: "Zeta Sco" },
      { x: 6.0,  y: -0.8, size: 0.02,  name: "Eta Sco" },
      { x: 6.5,  y: -1.2, size: 0.022, name: "Theta Sco" },
    ],
    lines: [
      [0, 1], [0, 2], [0, 3], [3, 4],
      [4, 5], [5, 6], [6, 7], [7, 8],
    ],
  },
  {
    name: "Ursa Major",
    stars: [
      { x: -4.0, y: 2.0,  size: 0.025, name: "Dubhe" },
      { x: -3.2, y: 1.8,  size: 0.022, name: "Merak" },
      { x: -3.0, y: 2.8,  size: 0.02,  name: "Phecda" },
      { x: -2.2, y: 2.6,  size: 0.02,  name: "Megrez" },
      { x: -1.5, y: 3.2,  size: 0.025, name: "Alioth" },
      { x: -0.8, y: 3.0,  size: 0.022, name: "Mizar" },
      { x: -0.2, y: 3.6,  size: 0.02,  name: "Alkaid" },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: -5.0, y: -1.0, size: 0.022, name: "Caph" },
      { x: -4.2, y: -0.5, size: 0.025, name: "Schedar" },
      { x: -3.5, y: -1.0, size: 0.02,  name: "Gamma Cas" },
      { x: -2.8, y: -0.5, size: 0.022, name: "Ruchbah" },
      { x: -2.0, y: -1.0, size: 0.02,  name: "Segin" },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
    ],
  },
]

// نجوم خلفية عشوائية
const BG_STARS = 200

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const animRef = useRef<number>(0)

  useEffect(() => {
    if (!mountRef.current) return

    // ── Setup ──────────────────────────────────────────────
    const W = window.innerWidth
    const H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 6

    // ── Background stars ───────────────────────────────────
    const bgGeo = new THREE.BufferGeometry()
    const bgPos = new Float32Array(BG_STARS * 3)
    for (let i = 0; i < BG_STARS; i++) {
      bgPos[i * 3]     = (Math.random() - 0.5) * 20
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 12
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
    }
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3))
    const bgMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.3 })
    scene.add(new THREE.Points(bgGeo, bgMat))

    // ── Constellation objects ──────────────────────────────
    type StarMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
    type LineMesh = THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>

    const cObjects: { stars: StarMesh[]; lines: LineMesh[] }[] = []

    // كل النجوم والخطوط مرتبة بشكل مسطح
    const allStars: { mesh: StarMesh; constIdx: number; starIdx: number }[] = []
    const allLines: { line: LineMesh; constIdx: number; lineIdx: number }[] = []

    constellations.forEach((c, ci) => {
      const stars: StarMesh[] = []
      const lines: LineMesh[] = []

      c.stars.forEach((s, si) => {
        const geo = new THREE.SphereGeometry(s.size, 8, 8)
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(s.x, s.y, 0)
        scene.add(mesh)
        stars.push(mesh)
        allStars.push({ mesh, constIdx: ci, starIdx: si })
      })

      c.lines.forEach((l, li) => {
        const from = c.stars[l[0]]
        const to   = c.stars[l[1]]
        const geo  = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(from.x, from.y, 0),
          new THREE.Vector3(to.x,   to.y,   0),
        ])
        const mat  = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
        const line = new THREE.Line(geo, mat)
        scene.add(line)
        lines.push(line)
        allLines.push({ line, constIdx: ci, lineIdx: li })
      })

      cObjects.push({ stars, lines })
    })

    // إجمالي العناصر
    const totalStars = allStars.length
    const totalLines = allLines.length
    const totalElements = totalStars + totalLines

    // ── Scroll ─────────────────────────────────────────────
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // ── Animate ────────────────────────────────────────────
    const animate = () => {
      animRef.current = requestAnimationFrame(animate)

      const progress = scrollRef.current // 0 → 1
      const visibleElements = progress * totalElements

      // النجوم
      allStars.forEach((s, i) => {
        const targetOpacity = i < visibleElements ? 1 : 0
        s.mesh.material.opacity += (targetOpacity - s.mesh.material.opacity) * 0.05

        // تأثير twinkle خفيف
        if (s.mesh.material.opacity > 0.5) {
          s.mesh.material.opacity = Math.max(0, Math.min(1,
            s.mesh.material.opacity + Math.sin(Date.now() * 0.002 + i) * 0.01
          ))
        }
      })

      // الخطوط — تظهر بعد النجوم
      allLines.forEach((l, i) => {
        const threshold = totalStars + i
        const targetOpacity = threshold < visibleElements ? 0.25 : 0
        l.line.material.opacity += (targetOpacity - l.line.material.opacity) * 0.05
      })

      // حركة الكاميرا مع الـ scroll
      camera.position.y = -scrollRef.current * 2
      camera.position.x = Math.sin(scrollRef.current * Math.PI) * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ─────────────────────────────────────────────
    const onResize = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  )
}
