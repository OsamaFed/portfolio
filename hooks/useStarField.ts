"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { constellations } from "./constellations.data";

const BG_STARS = 300;
const LERP_SPEED = 0.05;
const TWINKLE_SPEED = 0.002;
const TWINKLE_AMPLITUDE = 0.01;
const CAMERA_Z = 8;
const CAMERA_Y_RANGE = 8;
const CAMERA_X_SWING = 0.15;
const BG_OPACITY_BASE = 0.15;
const BG_OPACITY_RANGE = 0.5;
const LINE_TARGET_OPACITY = 0.25;
const RESIZE_DEBOUNCE_MS = 100;

type StarMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
type LineMesh = THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;

interface SceneStar {
  mesh: StarMesh;
  constIdx: number;
}

interface SceneLine {
  line: LineMesh;
  constIdx: number;
  lineIdx: number;
}

function getAdjustedProgress(progress: number, delay: number): number {
  if (delay >= 1) return 0;
  return Math.max(0, progress - delay) / (1 - delay);
}

function buildStarOffsets(): number[] {
  return constellations.map((_, ci) =>
    constellations.slice(0, ci).reduce((sum, c) => sum + c.stars.length, 0)
  );
}

function createBackgroundStars(scene: THREE.Scene): {
  geo: THREE.BufferGeometry;
  mat: THREE.PointsMaterial;
} {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(BG_STARS * 3);

  for (let i = 0; i < BG_STARS; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.015,
    transparent: true,
    opacity: BG_OPACITY_BASE,
  });

  scene.add(new THREE.Points(geo, mat));
  return { geo, mat };
}

function buildConstellationObjects(scene: THREE.Scene): {
  allStars: SceneStar[];
  allLines: SceneLine[];
} {
  const allStars: SceneStar[] = [];
  const allLines: SceneLine[] = [];

  constellations.forEach((c, ci) => {
    c.stars.forEach((s) => {
      const effectiveSize = s.size > 0 ? s.size : 0.0001;
      const geo = new THREE.SphereGeometry(effectiveSize, 4, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      });

      const mesh = new THREE.Mesh(geo, mat) as StarMesh;
      mesh.position.set(s.x, s.y, 0);

      if (s.size === 0) {
        mesh.visible = false;
      }

      scene.add(mesh);
      allStars.push({ mesh, constIdx: ci });
    });

    c.lines.forEach((l, li) => {
      const from = c.stars[l[0]];
      const to   = c.stars[l[1]];

      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(from.x, from.y, 0),
        new THREE.Vector3(to.x,   to.y,   0),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      });

      const line = new THREE.Line(geo, mat) as LineMesh;
      scene.add(line);
      allLines.push({ line, constIdx: ci, lineIdx: li });
    });
  });

  return { allStars, allLines };
}

function disposeScene(
  allStars: SceneStar[],
  allLines: SceneLine[],
  bgGeo: THREE.BufferGeometry,
  bgMat: THREE.PointsMaterial,
  renderer: THREE.WebGLRenderer
): void {
  allStars.forEach(({ mesh }) => {
    mesh.geometry.dispose();
    mesh.material.dispose();
  });

  allLines.forEach(({ line }) => {
    line.geometry.dispose();
    line.material.dispose();
  });

  bgGeo.dispose();
  bgMat.dispose();
  renderer.dispose();
}

export function useStarField(mountRef: React.RefObject<HTMLDivElement | null>) {
  const scrollRef = useRef(0);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(85, W / H, 0.1, 100);
    camera.position.z = CAMERA_Z;

    const { geo: bgGeo, mat: bgMat } = createBackgroundStars(scene);
    const { allStars, allLines }      = buildConstellationObjects(scene);

    const starOffsets    = buildStarOffsets();
    const totalElements  = allStars.length + allLines.length;

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newW = window.innerWidth;
        const newH = window.innerHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }, RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", onResize);

    const animate = (timestamp: number) => {
      animRef.current = requestAnimationFrame(animate);

      const progress = scrollRef.current;

      bgMat.opacity = BG_OPACITY_BASE + progress * BG_OPACITY_RANGE;

      allStars.forEach((s, i) => {
        const delay            = constellations[s.constIdx].delay ?? 0;
        const adjustedProgress = getAdjustedProgress(progress, delay);
        const visibleCount     = adjustedProgress * totalElements;
        const targetOpacity    = i < visibleCount ? 1 : 0;

        s.mesh.material.opacity +=
          (targetOpacity - s.mesh.material.opacity) * LERP_SPEED;

        if (s.mesh.material.opacity > 0.5) {
          s.mesh.material.opacity = THREE.MathUtils.clamp(
            s.mesh.material.opacity +
              Math.sin(timestamp * TWINKLE_SPEED + i) * TWINKLE_AMPLITUDE,
            0,
            1
          );
        }
      });

      allLines.forEach((l) => {
        const c                = constellations[l.constIdx];
        const delay            = c.delay ?? 0;
        const adjustedProgress = getAdjustedProgress(progress, delay);
        const visibleCount     = adjustedProgress * totalElements;
        const lineData         = c.lines[l.lineIdx];

        const secondStarGlobalIdx = starOffsets[l.constIdx] + lineData[1];
        const targetOpacity = secondStarGlobalIdx < visibleCount
          ? LINE_TARGET_OPACITY
          : 0;

        l.line.material.opacity +=
          (targetOpacity - l.line.material.opacity) * LERP_SPEED;
      });

      camera.position.y = -progress * CAMERA_Y_RANGE;
      camera.position.x = Math.sin(progress * Math.PI) * CAMERA_X_SWING;

      renderer.render(scene, camera);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      disposeScene(allStars, allLines, bgGeo, bgMat, renderer);

      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
}
