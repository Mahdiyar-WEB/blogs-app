"use client";

import { useEffect, useRef } from "react";

type Point = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  idlePhaseX: number;
  idlePhaseY: number;
  idleSpeed: number;
};

type PointerPosition = {
  x: number;
  y: number;
};

const CONFIG = {
  spacing: 85,
  jitter: 30,
  fadeStartRatio: 0.1,
  fadeEndRatio: 0.85,
  lineColor: "59,130,246",
  lineWidth: 1.6,
  maxLineOpacity: 0.18,
  nodeRadius: 0.8,
  nodeColor: "160, 160, 172",
  idleAmplitude: 4,
  idleSpeedMin: 0.3,
  idleSpeedMax: 0.8,
  mouseRadius: 150,
  mouseStrength: 15,
  springEase: 0.12,
  damping: 0.82,
} as const;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function SpiderwebMeshBackground(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const colsRef = useRef<number>(0);
  const mouseRef = useRef<PointerPosition>({ x: -9999, y: -9999 });
  const animationRef = useRef<number | null>(null);
  const clockRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cleanup = setupSpiderwebMesh({
      canvas,
      ctx,
      pointsRef,
      colsRef,
      mouseRef,
      animationRef,
      clockRef,
    });

    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 left-0 w-full h-[35vh] md:h-[32vh] -z-20 bg-gradient-to-t from-blue-50/10 to-transparent"
    />
  );
}

type SetupArgs = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pointsRef: React.MutableRefObject<Point[]>;
  colsRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<PointerPosition>;
  animationRef: React.MutableRefObject<number | null>;
  clockRef: React.MutableRefObject<number>;
};

function setupSpiderwebMesh({
  canvas,
  ctx,
  pointsRef,
  colsRef,
  mouseRef,
  animationRef,
  clockRef,
}: SetupArgs): () => void {
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function buildPoints(): void {
    const list: Point[] = [];
    const spacing = CONFIG.spacing;

    const rows = Math.ceil(height / spacing) + 3;
    const cols = Math.ceil(width / spacing) + 2;

    colsRef.current = cols + 1;

    for (let row = 0; row <= rows; row++) {
      for (let col = 0; col <= cols; col++) {
        const jitterX = (Math.random() - 0.5) * CONFIG.jitter;
        const jitterY = (Math.random() - 0.5) * CONFIG.jitter;

        const baseX = col * spacing + jitterX;
        const baseY = height - row * spacing + jitterY;

        list.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          idlePhaseX: randomBetween(0, Math.PI * 2),
          idlePhaseY: randomBetween(0, Math.PI * 2),
          idleSpeed: randomBetween(CONFIG.idleSpeedMin, CONFIG.idleSpeedMax),
        });
      }
    }

    pointsRef.current = list;
  }

  function resize(): void {
    const rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    buildPoints();
  }

  function onMouseMove(e: MouseEvent): void {
    const rect = canvas.getBoundingClientRect();

    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function onMouseLeave(): void {
    mouseRef.current = { x: -9999, y: -9999 };
  }

  function onTouchMove(e: TouchEvent): void {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();

      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
  }

  function fadeFactorForY(y: number): number {
    const fadeStartY = height * CONFIG.fadeStartRatio;
    const fadeEndY = height * CONFIG.fadeEndRatio;

    if (y <= fadeStartY) return 0;
    if (y >= fadeEndY) return 1;

    const t = (y - fadeStartY) / (fadeEndY - fadeStartY);
    return t * t * (3 - 2 * t);
  }

  function update(): void {
    clockRef.current += 0.016;
    const t = clockRef.current;
    const mouse = mouseRef.current;

    for (const p of pointsRef.current) {
      const idleX =
        Math.sin(t * p.idleSpeed + p.idlePhaseX) * CONFIG.idleAmplitude;
      const idleY =
        Math.cos(t * p.idleSpeed + p.idlePhaseY) * CONFIG.idleAmplitude;

      let targetX = p.baseX + idleX;
      let targetY = p.baseY + idleY;

      const dx = p.baseX - mouse.x;
      const dy = p.baseY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.mouseRadius) {
        const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseStrength;
        const angle = Math.atan2(dy, dx);
        targetX += Math.cos(angle) * force;
        targetY += Math.sin(angle) * force;
      }

      p.vx += (targetX - p.x) * CONFIG.springEase;
      p.vy += (targetY - p.y) * CONFIG.springEase;
      p.vx *= CONFIG.damping;
      p.vy *= CONFIG.damping;
      p.x += p.vx;
      p.y += p.vy;
    }
  }

  function drawEdge(a: Point, b: Point): void {
    const midY = (a.y + b.y) / 2;
    const fade = fadeFactorForY(midY);
    if (fade <= 0.01) return;

    ctx.strokeStyle = `rgba(${CONFIG.lineColor}, ${fade * CONFIG.maxLineOpacity})`;
    ctx.lineWidth = CONFIG.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function drawNode(p: Point): void {
    const fade = fadeFactorForY(p.y);
    if (fade <= 0.01) return;

    ctx.beginPath();
    ctx.arc(p.x, p.y, CONFIG.nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.nodeColor}, ${fade * 0.35})`;
    ctx.fill();
  }

  function draw(): void {
    ctx.clearRect(0, 0, width, height);
    const pts = pointsRef.current;
    const cols = colsRef.current;

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const isLastCol = (i + 1) % cols === 0;
      const right = !isLastCol ? pts[i + 1] : undefined;
      const down = pts[i + cols];
      const downRight = !isLastCol ? pts[i + cols + 1] : undefined;

      if (right) drawEdge(p, right);
      if (down) drawEdge(p, down);
      if (downRight) drawEdge(p, downRight);
    }

    for (const p of pts) {
      drawNode(p);
    }
  }

  function loop(): void {
    update();
    draw();
    animationRef.current = window.requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("touchmove", onTouchMove, { passive: true });

  loop();

  return () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseleave", onMouseLeave);
    window.removeEventListener("touchmove", onTouchMove);

    if (animationRef.current !== null) {
      window.cancelAnimationFrame(animationRef.current);
    }
  };
}
