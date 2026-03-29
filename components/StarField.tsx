"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"


const constellations = [
  {
    name: "Orion",
    stars: [
      { x: -2.5, y: 1.2,   size: 0.03,  name: "Betelgeuse" },
      { x: -1.8, y: 1.5,   size: 0.018, name: "Bellatrix" },
      { x: -2.2, y: 0.6,   size: 0.015, name: "Mintaka" },
      { x: -2.0, y: 0.5,   size: 0.016, name: "Alnilam" },
      { x: -1.8, y: 0.4,   size: 0.015, name: "Alnitak" },
      { x: -2.4, y: -0.3,  size: 0.015, name: "Saiph" },
      { x: -1.6, y: -0.3,  size: 0.025, name: "Rigel" },
    ],
    lines: [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
      [2, 5], [4, 6], [5, 6],
    ],
  },
  {
    name: "Ursa Major",
    stars: [
      { x: -0.8, y: 1.5,  size: 0.018, name: "Dubhe" },
      { x: -0.3, y: 1.3,  size: 0.016, name: "Merak" },
      { x: -0.2, y: 1.8,  size: 0.015, name: "Phecda" },
      { x:  0.3, y: 1.7,  size: 0.015, name: "Megrez" },
      { x:  0.7, y: 2.0,  size: 0.018, name: "Alioth" },
      { x:  1.1, y: 1.9,  size: 0.016, name: "Mizar" },
      { x:  1.5, y: 2.2,  size: 0.015, name: "Alkaid" },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x:  0.5, y: -0.5, size: 0.016, name: "Caph" },
      { x:  1.0, y: -0.2, size: 0.018, name: "Schedar" },
      { x:  1.5, y: -0.6, size: 0.015, name: "Gamma Cas" },
      { x:  2.0, y: -0.3, size: 0.016, name: "Ruchbah" },
      { x:  2.5, y: -0.7, size: 0.015, name: "Segin" },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
    ],
  },
  {
    name: "Scorpius",
    stars: [
      { x: -0.5, y: -0.8, size: 0.028, name: "Antares" },
      { x: -1.0, y: -0.4, size: 0.015, name: "Graffias" },
      { x:  0.0, y: -0.5, size: 0.015, name: "Dschubba" },
      { x: -0.5, y: -1.3, size: 0.016, name: "Tau Sco" },
      { x: -0.8, y: -1.8, size: 0.015, name: "Epsilon" },
      { x: -0.3, y: -2.2, size: 0.015, name: "Mu Sco" },
      { x:  0.2, y: -2.5, size: 0.018, name: "Zeta Sco" },
      { x:  0.6, y: -2.2, size: 0.015, name: "Eta Sco" },
      { x:  1.0, y: -2.5, size: 0.016, name: "Theta Sco" },
    ],
    lines: [
      [0, 1], [0, 2], [0, 3], [3, 4],
      [4, 5], [5, 6], [6, 7], [7, 8],
    ],
  },
]


const BG_STARS = 200

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const animRef = useRef<number>(0)

  useEffect(() => {
    if (!mountRef.current) return


    const W = window.innerWidth
    const H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 8

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

      const progress = scrollRef.current
      const visibleStars = progress * totalElements

      // النجوم
      allStars.forEach((s, i) => {
        const targetOpacity = i < visibleStars ? 1 : 0
        s.mesh.material.opacity += (targetOpacity - s.mesh.material.opacity) * 0.05

        if (s.mesh.material.opacity > 0.5) {
          s.mesh.material.opacity = Math.max(0, Math.min(1,
            s.mesh.material.opacity + Math.sin(Date.now() * 0.002 + i) * 0.01
          ))
        }
      })

      // الخطوط — كل خط يظهر لما النجمة الثانية فيه تظهر
      allLines.forEach((l) => {
        const c = constellations[l.constIdx]
        const lineData = c.lines[l.lineIdx]

        // احسب index النجمة الثانية في القائمة الكاملة
        let starOffset = 0
        for (let ci = 0; ci < l.constIdx; ci++) {
          starOffset += constellations[ci].stars.length
        }
        const secondStarGlobalIdx = starOffset + lineData[1]

        // الخط يظهر لما النجمة الثانية تظهر
        const targetOpacity = secondStarGlobalIdx < visibleStars ? 0.25 : 0
        l.line.material.opacity += (targetOpacity - l.line.material.opacity) * 0.05
      })

      camera.position.y = -scrollRef.current * 1.2
      camera.position.x = Math.sin(scrollRef.current * Math.PI) * 0.15

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
