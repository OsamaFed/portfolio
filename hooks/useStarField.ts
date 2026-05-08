"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { constellations } from "@/Data/constellations"

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
  const offsets: number[] = []
  let total = 0
  for (const c of constellations) {
    offsets.push(total)
    total += c.stars.length
  }
  return offsets
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

function getConstellationDistribution(windowWidth: number, windowHeight: number): { scaleX: number; scaleY: number } {
  const aspectRatio = windowWidth / windowHeight;
  
  if (windowWidth >= 1024) return { scaleX: 1.4, scaleY: 1 };
  if (windowWidth >= 768) return { scaleX: 1.2, scaleY: 1 };
  if (aspectRatio >= 1.2) return { scaleX: 1.1, scaleY: 1 };
  if (aspectRatio >= 1) return { scaleX: 1.05, scaleY: 1 };
  
  return { scaleX: 1, scaleY: 1 };
}




function buildConstellationObjects(scene: THREE.Scene): {
  allStars: SceneStar[];
  allLines: SceneLine[];
  groups: THREE.Group[];
} {
  const allStars: SceneStar[] = [];
  const allLines: SceneLine[] = [];
  const groups: THREE.Group[] = [];

  const distribution = getConstellationDistribution(window.innerWidth, window.innerHeight);

  constellations.forEach((c, ci) => {
    const group = new THREE.Group();
    scene.add(group);
    groups.push(group);

    c.stars.forEach((s) => {
      const effectiveSize = s.size > 0 ? s.size : 0.0001;
      const geo = new THREE.SphereGeometry(effectiveSize, 4, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      });

      const mesh = new THREE.Mesh(geo, mat) as StarMesh;
      const scaledX = s.x * distribution.scaleX;
      const scaledY = s.y * distribution.scaleY;
      mesh.position.set(scaledX, scaledY, 0);

      if (s.size === 0) {
        mesh.visible = false;
      }

      group.add(mesh);
      allStars.push({ mesh, constIdx: ci });
    });

    c.lines.forEach((l, li) => {
      const from = c.stars[l[0]];
      const to   = c.stars[l[1]];

      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(from.x * distribution.scaleX, from.y * distribution.scaleY, 0),
        new THREE.Vector3(to.x * distribution.scaleX, to.y * distribution.scaleY, 0),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      });

      const line = new THREE.Line(geo, mat) as LineMesh;
      group.add(line);
      allLines.push({ line, constIdx: ci, lineIdx: li });
    });
  });

  return { allStars, allLines, groups };
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

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function useStarField(
  mountRef: React.RefObject<HTMLDivElement | null>,
  frozen = false
) {
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);
  const initRef = useRef(false);
  const visibleRef = useRef(false);
  const frozenRef = useRef(frozen);

  useEffect(() => {
    frozenRef.current = frozen;
  }, [frozen]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let bgGeo: THREE.BufferGeometry | null = null;
    let bgMat: THREE.PointsMaterial | null = null;
    let allStars: SceneStar[] = [];
    let allLines: SceneLine[] = [];
    let groups: THREE.Group[] = [];
    let resizeTimer: number | null = null;
    let observer: IntersectionObserver | null = null;

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (!initRef.current) {
        initScene();
      }
    };

    let lastDistribution = getConstellationDistribution(window.innerWidth, window.innerHeight);
    let pendingResize = false;

    const onResize = () => {
      // تجنب معالجة متعددة للـ resize في نفس الوقت
      if (pendingResize) return;
      pendingResize = true;

      const currentRenderer = renderer;
      const currentCamera = camera;
      const currentScene = scene;
      if (!currentRenderer || !currentCamera || !currentScene) {
        pendingResize = false;
        return;
      }

      if (resizeTimer !== null) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(() => {
        const newW = window.innerWidth;
        const newH = window.innerHeight;

        // تحديث حجم الكاميرا والرندرر دائماً
        currentCamera.aspect = newW / newH;
        currentCamera.updateProjectionMatrix();
        currentRenderer.setSize(newW, newH);

        // إعادة بناء الكوكبات فقط إذا تغيرت نقطة التوزيع
        const newDistribution = getConstellationDistribution(newW, newH);
        const scaleChanged =
          newDistribution.scaleX !== lastDistribution.scaleX ||
          newDistribution.scaleY !== lastDistribution.scaleY;

        if (scaleChanged) {
          lastDistribution = newDistribution;

          // تحسين الأداء: تنظيف الموارد بكفاءة
          allStars.forEach(({ mesh }) => {
            mesh.geometry.dispose();
            mesh.material.dispose();
          });
          allLines.forEach(({ line }) => {
            line.geometry.dispose();
            line.material.dispose();
          });
          
          // إزالة المجموعات من المشهد في دفعة واحدة
          groups.forEach((g) => currentScene.remove(g));
          groups.length = 0;

          // إعادة بناء الكوكبات بالمعامل الجديد
          const built = buildConstellationObjects(currentScene);
          allStars.length = 0;
          allStars.push(...built.allStars);
          allLines.length = 0;
          allLines.push(...built.allLines);
          groups.push(...built.groups);
        }

        pendingResize = false;
      }, RESIZE_DEBOUNCE_MS);
    };

    const startAnimation = () => {
      if (animRef.current) return;
      animRef.current = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = 0;
      }
    };

    const animate = (timestamp: number) => {
      if (!visibleRef.current || !renderer || !camera || !bgMat || !scene) {
        animRef.current = 0;
        return;
      }

      const progress = frozenRef.current ? 0.3 : scrollRef.current;
      bgMat.opacity = BG_OPACITY_BASE + progress * BG_OPACITY_RANGE;

      const totalElements = allStars.length + allLines.length;
      const starOffsets = buildStarOffsets();

      allStars.forEach((s, i) => {
        const delay = constellations[s.constIdx].delay ?? 0;
        const adjustedProgress = getAdjustedProgress(progress, delay);
        const visibleCount = adjustedProgress * totalElements;
        const targetOpacity = i < visibleCount ? 1 : 0;

        s.mesh.material.opacity += (targetOpacity - s.mesh.material.opacity) * LERP_SPEED;

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
        const c = constellations[l.constIdx];
        const delay = c.delay ?? 0;
        const adjustedProgress = getAdjustedProgress(progress, delay);
        const visibleCount = adjustedProgress * totalElements;
        const lineData = c.lines[l.lineIdx];

        const secondStarGlobalIdx = starOffsets[l.constIdx] + lineData[1];
        const targetOpacity = secondStarGlobalIdx < visibleCount ? LINE_TARGET_OPACITY : 0;

        l.line.material.opacity += (targetOpacity - l.line.material.opacity) * LERP_SPEED;
      });

      camera.position.y = -progress * CAMERA_Y_RANGE;
      camera.position.x = Math.sin(progress * Math.PI) * CAMERA_X_SWING;

      renderer.render(scene, camera);
      animRef.current = requestAnimationFrame(animate);
    };

    const initScene = () => {
      if (initRef.current || !mountRef.current || !isWebGLAvailable()) return;
      initRef.current = true;

      const W = window.innerWidth;
      const H = window.innerHeight;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }

      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(85, W / H, 0.1, 100);
      camera.position.z = CAMERA_Z;

      const bgStars = createBackgroundStars(scene);
      bgGeo = bgStars.geo;
      bgMat = bgStars.mat;

      const built = buildConstellationObjects(scene);
      allStars.push(...built.allStars);
      allLines.push(...built.allLines);
      groups.push(...built.groups);

      scrollRef.current = 0;

      window.addEventListener("resize", onResize);

      if (visibleRef.current) {
        startAnimation();
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        visibleRef.current = isVisible;

        if (isVisible) {
          initScene();
          if (initRef.current) {
            startAnimation();
          }
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(mountRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stopAnimation();
      if (observer && mountRef.current) {
        observer.unobserve(mountRef.current);
        observer.disconnect();
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      if (renderer && initRef.current && bgGeo && bgMat) {
        disposeScene(allStars, allLines, bgGeo, bgMat, renderer);
        if (mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [mountRef]);
}
