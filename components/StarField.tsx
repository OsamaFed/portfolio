"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const constellations = [
  {
    name: "Orion",
    stars: [
      { x: -3.5, y:  2.0, size: 0.030, name: "Betelgeuse" },
      { x: -1.5, y:  2.3, size: 0.018, name: "Bellatrix" },
      { x: -2.3, y:  3.2, size: 0.013, name: "Mu Ori" },
      { x: -3.0, y:  0.5, size: 0.040, name: "Mintaka" },
      { x: -2.5, y:  0.7, size: 0.040, name: "Alnilam" },
      { x: -2.0, y:  0.9, size: 0.040, name: "Alnitak" },
      { x: -3.3, y: -0.8, size: 0.015, name: "Saiph" },
      { x: -1.4, y: -1.0, size: 0.025, name: "Rigel" },
      { x: 0.2, y:  2.8, size: 0.011, name: "Pi1 Ori" },
      { x: 0.5, y:  2.2, size: 0.011, name: "Pi2 Ori" },
      { x: 0.8, y:  1.5, size: 0.012, name: "Pi3 Ori" },
      { x: 1.0, y:  0.8, size: 0.011, name: "Pi4 Ori" },
      { x: 1.1, y:  0.1, size: 0.011, name: "Pi5 Ori" },
      { x: 0.9, y: -0.6, size: 0.011, name: "Pi6 Ori" },
    ],
    lines: [
      [0, 2], [2, 1], [1, 5], [3, 4], [3, 6], [4, 5], [3, 0], [6, 7], [7, 5],
      [1, 10], [10, 11], [11, 12], [12, 13], [10, 9], [9, 8],
    ],
  },


  {
    name: "Pleiades",
    stars: [
      { x:  3.5, y:  4.5, size: 0.013, name: "Alcyone" },
      { x:  3.8, y:  4.8, size: 0.010, name: "Atlas" },
      { x:  4.1, y:  4.4, size: 0.009, name: "Electra" },
      { x:  3.6, y:  4.2, size: 0.009, name: "Maia" },
      { x:  4.0, y:  4.1, size: 0.008, name: "Merope" },
      { x:  4.3, y:  4.7, size: 0.008, name: "Taygeta" },
      { x:  4.4, y:  4.3, size: 0.008, name: "Pleione" },
    ],
    lines: [],
  },
  {
    name: "Ursa Minor",
    stars: [
      { x:  2.0, y:  1.0, size: 0.022, name: "Polaris" },
      { x:  2.5, y: -0.2, size: 0.013, name: "Yildun" },
      { x:  2.8, y: -1.2, size: 0.012, name: "Epsilon UMi" },
      { x:  3.0, y: -2.2, size: 0.012, name: "Delta UMi" },
     { x:  2.2, y: -2.0, size: 0.015, name: "Zeta UMi" },
      { x:  2.1, y: -0.9, size: 0.015, name: "Kochab" },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [4, 3], [4, 5],[5,2]
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: -4.5, y: -2.0, size: 0.015, name: "Caph" },
      { x: -3.8, y: -1.5, size: 0.018, name: "Schedar" },
      { x: -3.0, y: -2.0, size: 0.015, name: "Gamma Cas" },
      { x: -2.2, y: -1.5, size: 0.015, name: "Ruchbah" },
      { x: -1.5, y: -2.1, size: 0.014, name: "Segin" },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
    ],
  },
  {
    name: "Scorpius",
    stars: [
      { x:  1.5, y: -3.5, size: 0.028, name: "Antares" },
      { x:  0.8, y: -2.5, size: 0.015, name: "Graffias" },
      { x:  1.5, y: -2.3, size: 0.015, name: "Dschubba" },
      { x:  2.2, y: -2.5, size: 0.014, name: "Pi Sco" },
      { x:  1.5, y: -4.5, size: 0.016, name: "Tau Sco" },
      { x:  1.8, y: -5.3, size: 0.015, name: "Epsilon Sco" },
      { x:  2.2, y: -6.0, size: 0.015, name: "Mu Sco" },
      { x:  2.8, y: -6.6, size: 0.016, name: "Zeta Sco" },
      { x:  3.3, y: -6.8, size: 0.015, name: "Eta Sco" },
      { x:  3.7, y: -6.4, size: 0.015, name: "Theta Sco" },
      { x:  3.8, y: -5.9, size: 0.016, name: "Iota Sco" },
    ],
    lines: [
      [0, 1], [0, 2], [0, 3],
      [0, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
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

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    if (!renderer.getContext()) return
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(85, W / H, 0.1, 100)
    camera.position.z = 8

    const bgGeo = new THREE.BufferGeometry()
    const bgPos = new Float32Array(BG_STARS * 3)
    for (let i = 0; i < BG_STARS; i++) {
      bgPos[i * 3]     = (Math.random() - 0.5) * 20
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 40
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
    }
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3))
    const bgMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.15 })
    scene.add(new THREE.Points(bgGeo, bgMat))

    type StarMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
    type LineMesh = THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>

    const cObjects: { stars: StarMesh[]; lines: LineMesh[] }[] = []
    const allStars: { mesh: StarMesh; constIdx: number; starIdx: number }[] = []
    const allLines: { line: LineMesh; constIdx: number; lineIdx: number }[] = []

    constellations.forEach((c, ci) => {
      const stars: StarMesh[] = []
      const lines: LineMesh[] = []

      c.stars.forEach((s) => {
        const geo = new THREE.SphereGeometry(s.size, 8, 8)
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(s.x, s.y, 0)
        scene.add(mesh)
        stars.push(mesh)
        allStars.push({ mesh, constIdx: ci, starIdx: stars.length - 1 })
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

    const totalStars = allStars.length
    const totalLines = allLines.length
    const totalElements = totalStars + totalLines

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const animate = () => {
      animRef.current = requestAnimationFrame(animate)

      const progress = scrollRef.current
      const visibleStars = progress * totalElements

      bgMat.opacity = 0.15 + progress * 0.5

      allStars.forEach((s, i) => {
        const targetOpacity = i < visibleStars ? 1 : 0
        s.mesh.material.opacity += (targetOpacity - s.mesh.material.opacity) * 0.05

        if (s.mesh.material.opacity > 0.5) {
          s.mesh.material.opacity = Math.max(0, Math.min(1,
            s.mesh.material.opacity + Math.sin(Date.now() * 0.002 + i) * 0.01
          ))
        }
      })

      allLines.forEach((l) => {
        const c = constellations[l.constIdx]
        const lineData = c.lines[l.lineIdx]

        let starOffset = 0
        for (let ci = 0; ci < l.constIdx; ci++) {
          starOffset += constellations[ci].stars.length
        }
        const secondStarGlobalIdx = starOffset + lineData[1]

        const targetOpacity = secondStarGlobalIdx < visibleStars ? 0.25 : 0
        l.line.material.opacity += (targetOpacity - l.line.material.opacity) * 0.05
      })

      camera.position.y = -scrollRef.current * 8
      camera.position.x = Math.sin(scrollRef.current * Math.PI) * 0.15

      renderer.render(scene, camera)
    }

    animate()

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
