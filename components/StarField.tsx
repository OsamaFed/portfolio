"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const constellations = [
  {
    name: "Orion",
    stars: [
      {
        name: "Betelgeuse",
        x: -3.5,
        y: 2.0,
        size: 0.030
      },
      {
        name: "Bellatrix",
        x: -1.5,
        y: 2.3,
        size: 0.018
      },
      {
        name: "Mu Ori",
        x: -2.3,
        y: 3.2,
        size: 0.013
      },
      {
        name: "Mintaka",
        x: -3.0,
        y: 0.5,
        size: 0.040
      },
      {
        name: "Alnilam",
        x: -2.5,
        y: 0.7,
        size: 0.040
      },
      {
        name: "Alnitak",
        x: -2.0,
        y: 0.9,
        size: 0.040
      },
      {
        name: "Saiph",
        x: -3.3,
        y: -0.8,
        size: 0.015
      },
      {
        name: "Rigel",
        x: -1.4,
        y: -1.0,
        size: 0.025
      },
      {
        name: "Pi1 Ori",
        x: 0.2,
        y: 2.8,
        size: 0.011
      },
      {
        name: "Pi2 Ori",
        x: 0.5,
        y: 2.2,
        size: 0.011
      },
      {
        name: "Pi3 Ori",
        x: 0.8,
        y: 1.5,
        size: 0.012
      },
      {
        name: "Pi4 Ori",
        x: 1.0,
        y: 0.8,
        size: 0.011
      },
      {
        name: "Pi5 Ori",
        x: 1.1,
        y: 0.1,
        size: 0.011
      },
      {
        name: "Pi6 Ori",
        x: 0.9,
        y: -0.6,
        size: 0.011
      },
    ],
    lines: [
      [0, 2], [2, 1], [1, 5], [3, 4], [3, 6], [4, 5], [3, 0], [6, 7], [7, 5],
      [1, 10], [10, 11], [11, 12], [12, 13], [10, 9], [9, 8],
    ],
  },
  {
    name: "Pleiades",
    stars: [
      {
        name: "Alcyone",
        x: 3.5,
        y: 4.5,
        size: 0.013
      },
      {
        name: "Atlas",
        x: 3.8,
        y: 4.8,
        size: 0.010
      },
      {
        name: "Electra",
        x: 4.1,
        y: 4.4,
        size: 0.009
      },
      {
        name: "Maia",
        x: 3.6,
        y: 4.2,
        size: 0.009
      },
      {
        name: "Merope",
        x: 4.0,
        y: 4.1,
        size: 0.008
      },
      {
        name: "Taygeta",
        x: 4.3,
        y: 4.7,
        size: 0.008
      },
      {
        name: "Pleione",
        x: 4.4,
        y: 4.3,
        size: 0.008
      },
    ],
    lines: [],
  },
  {
    name: "Taurus",
    stars: [
      {
        name: "Aldebaran",//y tau
        x: 1.8,
        y: 1.2,
        size: 0.020
      },
      {
        name: "Theta Tau",//02 tau
        x: 1.8,
        y: 1.7,
        size: 0.020
      },
      {
        name: "Alpha Tau",// 02 twin
        x: 1.75,
        y: 1.7,
        size: 0.020
      },
      {
        name: "Gamma Tau",//3 tau
        x: 2.7,
        y: 2.1,
        size: 0.020
      },
      {
        name: "Delta Tau",//Aldebaran
        x: 2.0,
        y: 2.2,
        size: 0.045
      },
      {
        name: "Epsilon Tau", // A tau
        x: 2.4,
        y: 1.7,
        size: 0.020
      },
      {
        name: "O Tau",
        x: 2.3,
        y: 1.6,
        size: 0.020
      },
      {
        name: "Zeta Tau",
        x: 2.4,
        y: 3.0,
        size: 0.018
      },
      {
        name: "Beta Tau",//Elnath
        x: 3.2,
        y: 2.9,
        size: 0.025
      },
      {
        name: "T tau",
        x: 3.1,
        y: 2.4,
        size: 0.018
      },
      {
        name: "Lambda Tau",// a tau the lower one
        x: 1.5,
        y: 0.2,
        size: 0.013
      },
      {
        name: "Xi Tau",
        x: 1.3,
        y: -0.8,
        size: 0.015
      },
    ],
    lines: [],
  },
  // {
  //   name: "Ursa Minor",
  //   stars: [
  //     {
  //       name: "Polaris",
  //       x: 2.0,
  //       y: 1.0,
  //       size: 0.022
  //     },
  //     {
  //       name: "Yildun",
  //       x: 2.5,
  //       y: -0.2,
  //       size: 0.013
  //     },
  //     {
  //       name: "Epsilon UMi",
  //       x: 2.8,
  //       y: -1.2,
  //       size: 0.012
  //     },
  //     {
  //       name: "Delta UMi",
  //       x: 3.0,
  //       y: -2.2,
  //       size: 0.012
  //     },
  //     {
  //       name: "Zeta UMi",
  //       x: 2.2,
  //       y: -2.0,
  //       size: 0.015
  //     },
  //     {
  //       name: "Kochab",
  //       x: 2.1,
  //       y: -0.9,
  //       size: 0.015
  //     },
  //   ],
  //   lines: [
  //     [0, 1], [1, 2], [2, 3], [4, 3], [4, 5], [5, 2]
  //   ],
  // },
  {
    name: "Cassiopeia",
    stars: [
      {
        name: "Caph",
        x: -4.5,
        y: -2.0,
        size: 0.015
      },
      {
        name: "Schedar",
        x: -3.8,
        y: -1.5,
        size: 0.018
      },
      {
        name: "Gamma Cas",
        x: -3.0,
        y: -2.0,
        size: 0.015
      },
      {
        name: "Ruchbah",
        x: -2.2,
        y: -1.5,
        size: 0.015
      },
      {
        name: "Segin",
        x: -1.5,
        y: -2.1,
        size: 0.014
      },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
    ],
  },
  {
    name: "Scorpius",
    stars: [
      {
        name: "Antares",
        x: 1.5,
        y: -3.5,
        size: 0.028
      },
      {
        name: "Graffias",
        x: 0.8,
        y: -2.5,
        size: 0.015
      },
      {
        name: "Dschubba",
        x: 1.5,
        y: -2.3,
        size: 0.015
      },
      {
        name: "Pi Sco",
        x: 2.2,
        y: -2.5,
        size: 0.014
      },
      {
        name: "Tau Sco",
        x: 1.5,
        y: -4.5,
        size: 0.016
      },
      {
        name: "Epsilon Sco",
        x: 1.8,
        y: -5.3,
        size: 0.015
      },
      {
        name: "Mu Sco",
        x: 2.2,
        y: -6.0,
        size: 0.015
      },
      {
        name: "Zeta Sco",
        x: 2.8,
        y: -6.6,
        size: 0.016
      },
      {
        name: "Eta Sco",
        x: 3.3,
        y: -6.8,
        size: 0.015
      },
      {
        name: "Theta Sco",
        x: 3.7,
        y: -6.4,
        size: 0.015
      },
      {
        name: "Iota Sco",
        x: 3.8,
        y: -5.9,
        size: 0.016
      },
    ],
    lines: [
      [0, 1], [0, 2], [0, 3],
      [0, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
    ],
  },
  {
    name: "Gemini",
    stars: [
      {
        name: "Pollux",
        x: -0.5,
        y: 3.8,
        size: 0.020
      },
      {
        name: "Castor",
        x: -1.0,
        y: 4.0,
        size: 0.018
      },
      {
        name: "Pollux foot1",
        x: -0.8,
        y: 3.0,
        size: 0.012
      },
      {
        name: "Castor foot1",
        x: -1.5,
        y: 2.8,
        size: 0.012
      },
      {
        name: "Pollux foot2",
        x: -0.6,
        y: 2.2,
        size: 0.012
      },
      {
        name: "Castor foot2",
        x: -1.3,
        y: 2.0,
        size: 0.012
      },
      {
        name: "Alhena",
        x: -0.4,
        y: 1.5,
        size: 0.013
      },
      {
        name: "Mebsuda",
        x: -1.8,
        y: 3.5,
        size: 0.011
      },
      {
        name: "Wasat",
        x: -2.0,
        y: 2.8,
        size: 0.011
      },
    ],
    lines: [
      [0, 2], [2, 4], [4, 6],
      [1, 3], [3, 5],
      [1, 7], [7, 8], [8, 5],
      [0, 1],
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
    const camera = new THREE.PerspectiveCamera(120, W / H, 0.1, 100)
    camera.position.z = 8

    const bgGeo = new THREE.BufferGeometry()
    const bgPos = new Float32Array(BG_STARS * 3)
    for (let i = 0; i < BG_STARS; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 20
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
        const to = c.stars[l[1]]
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(from.x, from.y, 0),
          new THREE.Vector3(to.x, to.y, 0),
        ])
        const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
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
      bgMat.opacity = 0.15 + progress * 0.5

      allStars.forEach((s, i) => {
        const targetOpacity = 1
        s.mesh.material.opacity += (targetOpacity - s.mesh.material.opacity) * 0.05

        if (s.mesh.material.opacity > 0.5) {
          s.mesh.material.opacity = Math.max(0, Math.min(1,
            s.mesh.material.opacity + Math.sin(Date.now() * 0.002 + i) * 0.01
          ))
        }
      })

      allLines.forEach((l) => {
        const targetOpacity = 0.25
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
