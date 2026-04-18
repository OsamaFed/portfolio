"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const orionOffset      = { x: 0, y: 0 }
const taurusOffset     = { x: 0, y: 0 }
const pleiadesOffset   = { x: 0, y: 0 }
const ursaOffset       = { x: 0, y: -3 }
const cassiopeiaOffset = { x: 2.5, y: 0 }
const scorpiusOffset   = { x: -0.5, y: -3 }
const cancerOffset = { x: -3, y: -4.9 }
const beehiveOffset = { x: -0.79, y: -4.0 }
const lynxOffset = { x: -2.5, y: -14 }
const constellations = [
  {
    name: "Orion",
    stars: [
      { name: "Betelgeuse",  x: orionOffset.x + -3.5, y: orionOffset.y + 2.0,  size: 0.03  },
      { name: "Bellatrix",   x: orionOffset.x + -1.5, y: orionOffset.y + 2.3,  size: 0.018 },
      { name: "Mu Ori",      x: orionOffset.x + -2.3, y: orionOffset.y + 3.2,  size: 0.013 },
      { name: "Mintaka",     x: orionOffset.x + -3.0, y: orionOffset.y + 0.5,  size: 0.023 },
      { name: "Alnilam",     x: orionOffset.x + -2.5, y: orionOffset.y + 0.7,  size: 0.023  },
      { name: "Alnitak",     x: orionOffset.x + -2.0, y: orionOffset.y + 0.9,  size: 0.023  },
      { name: "Saiph",       x: orionOffset.x + -3.3, y: orionOffset.y + -0.8, size: 0.015 },
      { name: "Rigel",       x: orionOffset.x + -1.4, y: orionOffset.y + -1.0, size: 0.025 },
      { name: "Pi1 Ori",     x: orionOffset.x +  0.2, y: orionOffset.y + 2.8,  size: 0.011 },
      { name: "Pi2 Ori",     x: orionOffset.x +  0.5, y: orionOffset.y + 2.2,  size: 0.011 },
      { name: "Pi3 Ori",     x: orionOffset.x +  0.8, y: orionOffset.y + 1.5,  size: 0.012 },
      { name: "Pi4 Ori",     x: orionOffset.x +  1.0, y: orionOffset.y + 0.8,  size: 0.011 },
      { name: "Pi5 Ori",     x: orionOffset.x +  1.1, y: orionOffset.y + 0.1,  size: 0.011 },
      { name: "Pi6 Ori",     x: orionOffset.x +  0.9, y: orionOffset.y + -0.6, size: 0.011 },
    ],
    delay: 0,
    lines: [[0,2],[2,1],[1,5],[3,4],[3,6],[4,5],[3,0],[6,7],[7,5],[1,10],[10,11],[11,12],[12,13],[10,9],[9,8]],
  },
  {
    name: "Taurus",
    stars: [
      { name: "Aldebaran",   x: taurusOffset.x + 1.8,  y: taurusOffset.y + 1.2,  size: 0.025  },
      { name: "Theta Tau",   x: taurusOffset.x + 1.8,  y: taurusOffset.y + 1.7,  size: 0.013  },
      { name: "Alpha Tau",   x: taurusOffset.x + 1.75, y: taurusOffset.y + 1.7,  size: 0.012  },
      { name: "Gamma Tau",   x: taurusOffset.x + 2.7,  y: taurusOffset.y + 2.1,  size: 0.015},
      { name: "Delta Tau",   x: taurusOffset.x + 2.0,  y: taurusOffset.y + 2.2,  size: 0.012 },
      { name: "Epsilon Tau", x: taurusOffset.x + 2.4,  y: taurusOffset.y + 1.7,  size: 0.019  },
      { name: "O Tau",       x: taurusOffset.x + 2.3,  y: taurusOffset.y + 1.6,  size: 0.015  },
      { name: "Zeta Tau",    x: taurusOffset.x + 2.4,  y: taurusOffset.y + 3.0,  size: 0.018 },
      { name: "Beta Tau",    x: taurusOffset.x + 3.2,  y: taurusOffset.y + 2.9,  size: 0.023 },
      { name: "T tau",       x: taurusOffset.x + 3.1,  y: taurusOffset.y + 2.4,  size: 0.018 },
      { name: "Lambda Tau",  x: taurusOffset.x + 1.5,  y: taurusOffset.y + 0.2,  size: 0.013 },
      { name: "Xi Tau",      x: taurusOffset.x + 1.3,  y: taurusOffset.y + -0.8, size: 0.015 },
      { name: "Atlas ref",   x: taurusOffset.x + 3.3,  y: taurusOffset.y + -0.2, size: 0     },
    ],
    delay: 0.1,
    lines: [[4,7],[4,3],[4,2],[2,0],[0,10],[0,6],[10,11],[5,3],[3,9],[9,8],[6,5],[6,12]],
  },
  {
    name: "Pleiades",
    stars: [
      { name: "Atlas",   x: pleiadesOffset.x + 3.3,  y: pleiadesOffset.y + -0.2, size: 0.022 },
      { name: "Pleione", x: pleiadesOffset.x + 3.4,  y: pleiadesOffset.y + -0.2, size: 0.022 },
      { name: "Alcyone", x: pleiadesOffset.x + 3.4,  y: pleiadesOffset.y + -0.5, size: 0.022 },
      { name: "Merope",  x: pleiadesOffset.x + 3.29, y: pleiadesOffset.y + -0.8, size: 0.022 },
      { name: "Electra", x: pleiadesOffset.x + 3.6,  y: pleiadesOffset.y + -1.0, size: 0.022 },
      { name: "celaeno", x: pleiadesOffset.x + 3.7,  y: pleiadesOffset.y + -1.0, size: 0.022 },
      { name: "Taygeta", x: pleiadesOffset.x + 3.82, y: pleiadesOffset.y + -0.8, size: 0.022 },
      { name: "Maia",    x: pleiadesOffset.x + 3.7,  y: pleiadesOffset.y + -0.7, size: 0.022 },
      { name: "s1",  x: pleiadesOffset.x + 3.2, y: pleiadesOffset.y + -0.6, size: 0.015 },
      { name: "s2",  x: pleiadesOffset.x + 3.4, y: pleiadesOffset.y + -0.4, size: 0.015 },
      { name: "s3",  x: pleiadesOffset.x + 3.1, y: pleiadesOffset.y + -0.3, size: 0.015 },
      { name: "s4",  x: pleiadesOffset.x + 3.6, y: pleiadesOffset.y + -0.8, size: 0.015 },
      { name: "s5",  x: pleiadesOffset.x + 3.2, y: pleiadesOffset.y + -0.9, size: 0.015 },
      { name: "s6",  x: pleiadesOffset.x + 3.5, y: pleiadesOffset.y + -0.5, size: 0.015 },
      { name: "s7",  x: pleiadesOffset.x + 3.3, y: pleiadesOffset.y + -0.7, size: 0.015 },
      { name: "s8",  x: pleiadesOffset.x + 3.7, y: pleiadesOffset.y + -0.6, size: 0.015 },
      { name: "s9",  x: pleiadesOffset.x + 3.0, y: pleiadesOffset.y + -0.7, size: 0.015 },
      { name: "s10", x: pleiadesOffset.x + 3.4, y: pleiadesOffset.y + -1.0, size: 0.015 },
      { name: "s11", x: pleiadesOffset.x + 3.1, y: pleiadesOffset.y + -0.5, size: 0.015 },
      { name: "s12", x: pleiadesOffset.x + 3.6, y: pleiadesOffset.y + -0.3, size: 0.015 },
    ],
    delay: 0.15,
    lines: [],
  },
  {
    name: "Ursa Minor",
    stars: [
      { name: "Polaris",     x: ursaOffset.x + 2.0, y: ursaOffset.y + 1.0,  size: 0.022 },
      { name: "Yildun",      x: ursaOffset.x + 2.5, y: ursaOffset.y + -0.2, size: 0.013 },
      { name: "Epsilon UMi", x: ursaOffset.x + 2.8, y: ursaOffset.y + -1.2, size: 0.012 },
      { name: "Delta UMi",   x: ursaOffset.x + 3.0, y: ursaOffset.y + -2.2, size: 0.012 },
      { name: "Zeta UMi",    x: ursaOffset.x + 2.2, y: ursaOffset.y + -2.0, size: 0.015 },
      { name: "Kochab",      x: ursaOffset.x + 2.1, y: ursaOffset.y + -0.9, size: 0.015 },
    ],
    delay: 0.1,
    lines: [[0,1],[1,2],[2,3],[4,3],[4,5],[5,2]],
  },
  {
    name: "Cassiopeia",
    stars: [
      { name: "Caph",      x: cassiopeiaOffset.x + -4.5, y: cassiopeiaOffset.y + -2.0, size: 0.015 },
      { name: "Schedar",   x: cassiopeiaOffset.x + -3.8, y: cassiopeiaOffset.y + -1.5, size: 0.018 },
      { name: "Gamma Cas", x: cassiopeiaOffset.x + -3.0, y: cassiopeiaOffset.y + -2.0, size: 0.015 },
      { name: "Ruchbah",   x: cassiopeiaOffset.x + -2.2, y: cassiopeiaOffset.y + -1.5, size: 0.015 },
      { name: "Segin",     x: cassiopeiaOffset.x + -1.5, y: cassiopeiaOffset.y + -2.1, size: 0.014 },
    ],
    delay: 0.2,
    lines: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    name:"cancer",
    stars:[
      {
        name:"beta Cancri",
        x:cancerOffset.x + 0.6,
        y:cancerOffset.y + 0.3,
        size:0.025
      },
      {
        name:"Acubens",
        x:cancerOffset.x + 0.7,
        y:cancerOffset.y + 1.8,
        size:0.025,
      },
      {
        name:"Asellus Australis",
        x:cancerOffset.x + 2.1,
        y:cancerOffset.y + 1.2,
        size:0.025  
      },
      //cluster
      // Beehive Cluster (Sizes: 0.008 - 0.013)
      { name: "sc1",  x: beehiveOffset.x + 0.05, y: beehiveOffset.y + 0.02, size: 0.0085 },
      { name: "sc2",  x: beehiveOffset.x + 0.22, y: beehiveOffset.y - 0.05, size: 0.0110 },
      { name: "sc3",  x: beehiveOffset.x + 0.08, y: beehiveOffset.y + 0.08, size: 0.0092 },
      { name: "sc4",  x: beehiveOffset.x + 0.31, y: beehiveOffset.y - 0.08, size: 0.0130 },
      { name: "sc5",  x: beehiveOffset.x + 0.14, y: beehiveOffset.y + 0.05, size: 0.0105 },
      { name: "sc6",  x: beehiveOffset.x - 0.01, y: beehiveOffset.y - 0.02, size: 0.0080 },
      { name: "sc7",  x: beehiveOffset.x + 0.27, y: beehiveOffset.y + 0.10, size: 0.0125 },
      { name: "sc8",  x: beehiveOffset.x + 0.02, y: beehiveOffset.y - 0.09, size: 0.0115 },
      { name: "sc9",  x: beehiveOffset.x + 0.19, y: beehiveOffset.y + 0.03, size: 0.0098 },
      { name: "sc10", x: beehiveOffset.x + 0.35, y: beehiveOffset.y - 0.04, size: 0.0130 },
      { name: "sc11", x: beehiveOffset.x - 0.09, y: beehiveOffset.y + 0.07, size: 0.0120 },
      { name: "sc12", x: beehiveOffset.x + 0.10, y: beehiveOffset.y - 0.06, size: 0.0082 },
      { name: "sc13", x: beehiveOffset.x - 0.07, y: beehiveOffset.y + 0.09, size: 0.0128 },
      { name: "sc14", x: beehiveOffset.x + 0.25, y: beehiveOffset.y - 0.07, size: 0.0100 },
      { name: "sc15", x: beehiveOffset.x + 0.05, y: beehiveOffset.y + 0.01, size: 0.0095 },
      { name: "sc16", x: beehiveOffset.x + 0.32, y: beehiveOffset.y + 0.06, size: 0.0130 },
      { name: "sc17", x: beehiveOffset.x + 0.17, y: beehiveOffset.y - 0.03, size: 0.0088 },
      { name: "sc18", x: beehiveOffset.x - 0.02, y: beehiveOffset.y - 0.01, size: 0.0130 },
      { name: "sc19", x: beehiveOffset.x + 0.21, y: beehiveOffset.y + 0.04, size: 0.0102 },
      { name: "sc20", x: beehiveOffset.x + 0.09, y: beehiveOffset.y - 0.09, size: 0.0118 },
      //end of cluster
      {
        name:"Asellus Borealis",
        x:cancerOffset.x + 2.7,
        y:cancerOffset.y + 1.2,
        size:0.025
      },
      {
        name:"Iota Cancri",
        x:cancerOffset.x + 4.0,
        y:cancerOffset.y + 1.99,
        size:0.025
      },
      {
        name:"chi Cancri",//25
        x:cancerOffset.x + 4.0,
        y:cancerOffset.y + 0.5,
        size:0.025
      }
    ],
    delay:0.3,
    lines:[[0,2],[1,2],[2,23],[23,24],[23,25]]
  },
  {
    name: "Lynx",
    stars: [
      { name: "Alpha Lyncis", x: lynxOffset.x + 0.0,  y: lynxOffset.y + 0.0,  size: 0.022 },
      { name: "31 Lyncis",    x: lynxOffset.x + 0.3,  y: lynxOffset.y + 1.4,  size: 0.018 },
      { name: "Psi UMa",      x: lynxOffset.x - 0.2,  y: lynxOffset.y + 2.8,  size: 0.014 },
      { name: "38 Lyncis",    x: lynxOffset.x + 0.4,  y: lynxOffset.y + 4.1,  size: 0.016 },
      { name: "21 Lyncis",    x: lynxOffset.x + 0.1,  y: lynxOffset.y + 5.4,  size: 0.014 },
      { name: "15 Lyncis",    x: lynxOffset.x + 0.7,  y: lynxOffset.y + 6.6,  size: 0.013 },
      { name: "10 Ursae Maj", x: lynxOffset.x + 0.9,  y: lynxOffset.y + 7.6,  size: 0.014 },
      { name: "6 Lyncis",     x: lynxOffset.x + 1.4,  y: lynxOffset.y + 8.4,  size: 0.013 },
      { name: "2 Lyncis",     x: lynxOffset.x + 1.7,  y: lynxOffset.y + 9.4,  size: 0.018 },
    ],
    delay: 0.5,
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]],
  },
  {
    name: "Scorpius",
    stars: [
      { name: "Antares",
        x: scorpiusOffset.x + 1.5,
        y: scorpiusOffset.y + -3.5,
        size: 0.030
      },//قلب العقرب 
      { name: "acrab",
        x: scorpiusOffset.x + 1.5,
        y: scorpiusOffset.y + -2.0,
        size: 0.025 
      },//
      { name: "Dschubba",
        x: scorpiusOffset.x + 2.1,
        y: scorpiusOffset.y + -2.2,
        size: 0.025 },
      { name: "Pi Sco",
        x: scorpiusOffset.x + 2.6,
        y: scorpiusOffset.y + -2.6,
        size: 0.025 
      },
      { name: "Tau Sco",     x: scorpiusOffset.x + 1.5, y: scorpiusOffset.y + -4.5, size: 0.020 },
      { name: "Epsilon Sco", x: scorpiusOffset.x + 1.9, y: scorpiusOffset.y + -5.9, size: 0.025 },
      { name: "Mu1 Sco",
        x: scorpiusOffset.x + 2.4,
        y: scorpiusOffset.y + -7.1,
        size: 0.018 
      },
      { name: "Mu2 Sco",     x: scorpiusOffset.x + 2.49, y: scorpiusOffset.y + -7.1, size: 0.018 },
      { name: "Zeta1 Sco",
        x: scorpiusOffset.x + 2.6,
        y: scorpiusOffset.y + -9.5,
        size: 0.020
      },
      { name: "Zeta2 Sco",
        x: scorpiusOffset.x + 2.7,
        y: scorpiusOffset.y + -9.4,
        size: 0.020
      },
      //Random stars
      { name: "sc1",  x: scorpiusOffset.x + 2.7, y: scorpiusOffset.y + -9.5, size: 0.008 },
      { name: "sc2",  x: scorpiusOffset.x + 2.7, y: scorpiusOffset.y + -9.3, size: 0.008 },
      { name: "sc3",  x: scorpiusOffset.x + 2.4, y: scorpiusOffset.y + -9.5, size: 0.008 },
      { name: "sc4",  x: scorpiusOffset.x + 2.8, y: scorpiusOffset.y + -9.8, size: 0.008 },
      { name: "sc5",  x: scorpiusOffset.x + 2.6, y: scorpiusOffset.y + -9.2, size: 0.008 },
      { name: "sc6",  x: scorpiusOffset.x + 2.9, y: scorpiusOffset.y + -9.6, size: 0.008 },
      { name: "sc7",  x: scorpiusOffset.x + 2.5, y: scorpiusOffset.y + -9.4, size: 0.008 },
      { name: "sc8",  x: scorpiusOffset.x + 2.7, y: scorpiusOffset.y + -9.9, size: 0.008 },
      { name: "sc9",  x: scorpiusOffset.x + 2.6, y: scorpiusOffset.y + -9.1, size: 0.008 },
      { name: "sc10", x: scorpiusOffset.x + 2.8, y: scorpiusOffset.y + -9.3, size: 0.008 },
      { name: "sc11", x: scorpiusOffset.x + 2.4, y: scorpiusOffset.y + -9.7, size: 0.008 },
      { name: "sc12", x: scorpiusOffset.x + 2.9, y: scorpiusOffset.y + -9.4, size: 0.008 },
      //end of it
      { name: "Eta Sco",
        x: scorpiusOffset.x + 1.8,
        y: scorpiusOffset.y + -10.4,
        size: 0.020 },
      { name: "Theta Sco",   x: scorpiusOffset.x + 1.2, y: scorpiusOffset.y + -11.0, size: 0.027 },
      { name: "Iota Sco",    x: scorpiusOffset.x + 0.1, y: scorpiusOffset.y + -10.9, size: 0.020 },
      { name: "Kappa Sco",   x: scorpiusOffset.x + 0.1, y: scorpiusOffset.y + -10.1, size: 0.025 },
      { name: "Shaula",
        x: scorpiusOffset.x + 0.1,
        y: scorpiusOffset.y + -9.4,
        size: 0.027 },
      { name: "Lesath",
        x: scorpiusOffset.x + 0.28,
        y: scorpiusOffset.y + -9.4,
        size: 0.027 },
      
    ],
    delay: 0.6,
    lines: [[1,0],[2,0],[3,0],[0,4],[4,5],[5,7],[7,9],[9,22],[22,23],[23,24],[24,25],[25,26]]
  }
]

const BG_STARS = 300;

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(85, W / H, 0.1, 100);
    camera.position.z = 8;

    const bgGeo = new THREE.BufferGeometry();
    const bgPos = new Float32Array(BG_STARS * 3);
    for (let i = 0; i < BG_STARS; i++) {
      bgPos[i * 3]     = (Math.random() - 0.5) * 20;
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
    }
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.15 });
    scene.add(new THREE.Points(bgGeo, bgMat));

    type StarMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
    type LineMesh = THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;

    const cObjects: { stars: StarMesh[]; lines: LineMesh[] }[] = [];
    const allStars: { mesh: StarMesh; constIdx: number; starIdx: number }[] = [];
    const allLines: { line: LineMesh; constIdx: number; lineIdx: number }[] = [];

    constellations.forEach((c, ci) => {
      const stars: StarMesh[] = [];
      const lines: LineMesh[] = [];

      c.stars.forEach((s) => {
        const geo = new THREE.SphereGeometry(s.size, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(s.x, s.y, 0);
        scene.add(mesh);
        stars.push(mesh);
        allStars.push({ mesh, constIdx: ci, starIdx: stars.length - 1 });
      });

      c.lines.forEach((l, li) => {
        const from = c.stars[l[0]];
        const to = c.stars[l[1]];
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(from.x, from.y, 0),
          new THREE.Vector3(to.x, to.y, 0),
        ]);
        const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
        const line = new THREE.Line(geo, mat);
        scene.add(line);
        lines.push(line);
        allLines.push({ line, constIdx: ci, lineIdx: li });
      });

      cObjects.push({ stars, lines });
    });

    const totalStars = allStars.length;
    const totalLines = allLines.length;
    const totalElements = totalStars + totalLines;

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);

      const progress = scrollRef.current;

      bgMat.opacity = 0.15 + progress * 0.5;

      allStars.forEach((s, i) => {
        const delay = constellations[s.constIdx].delay ?? 0;
        const adjustedProgress = Math.max(0, progress - delay) / (1 - delay);
        const visibleStars = adjustedProgress * totalElements;
        const targetOpacity = i < visibleStars ? 1 : 0;
        s.mesh.material.opacity += (targetOpacity - s.mesh.material.opacity) * 0.05;
        if (s.mesh.material.opacity > 0.5) {
          s.mesh.material.opacity = Math.max(0, Math.min(1,
            s.mesh.material.opacity + Math.sin(Date.now() * 0.002 + i) * 0.01
          ));
        }
      });

      allLines.forEach((l) => {
        const delay = constellations[l.constIdx].delay ?? 0;
        const adjustedProgress = Math.max(0, progress - delay) / (1 - delay);
        const visibleStars = adjustedProgress * totalElements;
        const c = constellations[l.constIdx];
        const lineData = c.lines[l.lineIdx];
        let starOffset = 0;
        for (let ci = 0; ci < l.constIdx; ci++) {
          starOffset += constellations[ci].stars.length;
        }
        const secondStarGlobalIdx = starOffset + lineData[1];
        const targetOpacity = secondStarGlobalIdx < visibleStars ? 0.25 : 0;
        l.line.material.opacity += (targetOpacity - l.line.material.opacity) * 0.05;
      });

      camera.position.y = -scrollRef.current * 8;
      camera.position.x = Math.sin(scrollRef.current * Math.PI) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

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
