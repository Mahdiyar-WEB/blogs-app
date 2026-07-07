"use client";

import { useEffect, useRef } from "react";

/**
 * SpiderwebMeshBackground
 * -------------------------------------------------
 * یک بک‌گراند تور مانند (شبیه تار عنکبوت): نقاط در یک شبکه با کمی
 * پراکندگی تصادفی قرار می‌گیرند و با خط‌های نازک به همسایه‌ی راست،
 * پایین، و قطر خودشان وصل می‌شوند و مثلث‌هایی به‌صورت "خط‌دار"
 * (نه پر شده) می‌سازند — پس هیچ همپوشانی/توهم بصری ایجاد نمی‌شود.
 *
 * ویژگی‌ها:
 *  - فقط تا یک خط مشخص (fadeStartRatio) کامل دیده می‌شود، و از آنجا
 *    به بعد به‌صورت نرم محو می‌شود تا کاملاً ناپدید شود (fadeEndRatio)
 *  - هر نقطه یک نوسان ریز و مستقل خودش دارد (idle wiggle) تا کاملاً
 *    ثابت/مرده به نظر نرسد
 *  - وقتی موس نزدیک می‌شود، نقاط اطراف با یک فنر نرم (spring) عقب
 *    می‌روند و دوباره برمی‌گردند - یک تکان نرم و طبیعی
 *
 * استفاده (مثلا در app/layout.js):
 *
 *   import SpiderwebMeshBackground from "@/components/SpiderwebMeshBackground";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="fa" dir="rtl">
 *         <body>
 *           <SpiderwebMeshBackground />
 *           {children}
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * نکته z-index: کانواس با position: fixed و z-index: -1 پشت محتوای
 * صفحه قرار می‌گیرد، پس body نباید background-color غیر شفاف داشته باشد.
 */

const CONFIG = {
  // فاصله‌ی شبکه بین نقاط (کوچکتر = مش ریزتر و متراکم‌تر)
  spacing: 85,
  // پراکندگی تصادفی هر نقطه نسبت به موقعیت پایه‌اش در شبکه
  jitter: 30,

  // خط قرمز شما اینجا تعریف می‌شود: تا این نسبت از ارتفاع صفحه کاملاً
  // دیده می‌شود (۰ = بالای صفحه، ۱ = پایین صفحه)
  fadeStartRatio: 0.1,
  // از این نسبت به بعد کاملاً محو/نامرئی می‌شود
  fadeEndRatio: 0.85,

  // ظاهر خط‌ها
  lineColor: "59,130,246",
  lineWidth: 1.6,
  maxLineOpacity: 0.18,

  // نقطه‌های کوچک روی هر گره برای ظاهر تمیزتر
  nodeRadius: 0.8, //1.3
  nodeColor: "160, 160, 172",

  // نوسان مستقل و آرام هر نقطه، حتی بدون موس
  idleAmplitude: 4,
  idleSpeedMin: 0.3,
  idleSpeedMax: 0.8,

  // واکنش به موس
  mouseRadius: 150,
  mouseStrength: 15,
  // چقدر سریع نقطه به سمت موقعیت هدف "فنر" می‌شود (کمتر = نرم‌تر)
  springEase: 0.12,
  damping: 0.82,
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default function SpiderwebMeshBackground() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const colsRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationRef = useRef(null);
  const clockRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function buildPoints() {
      const list = [];
      const spacing = CONFIG.spacing;

      const rows = Math.ceil(height / spacing) + 3;
      const cols = Math.ceil(width / spacing) + 2;

      colsRef.current = cols + 1;

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const jitterX = (Math.random() - 0.5) * CONFIG.jitter;
          const jitterY = (Math.random() - 0.5) * CONFIG.jitter;

          const baseX = col * spacing + jitterX;

          // از پایین canvas شروع می‌کنیم
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

    function resize() {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildPoints();
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function onTouchMove(e) {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();

        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    }

    // فاکتور شفافیت بر اساس ارتفاع y: کامل قبل از fadeStart، صفر بعد
    // از fadeEnd، و بین این دو به‌صورت نرم (smoothstep)
    function fadeFactorForY(y) {
      const fadeStartY = height * CONFIG.fadeStartRatio;
      const fadeEndY = height * CONFIG.fadeEndRatio;

      if (y <= fadeStartY) return 0;
      if (y >= fadeEndY) return 1;

      const t = (y - fadeStartY) / (fadeEndY - fadeStartY);

      return t * t * (3 - 2 * t);
    }

    function update() {
      clockRef.current += 0.016;
      const t = clockRef.current;
      const mouse = mouseRef.current;

      for (const p of pointsRef.current) {
        // نوسان ریز و مستقل هر نقطه (idle wiggle)
        const idleX =
          Math.sin(t * p.idleSpeed + p.idlePhaseX) * CONFIG.idleAmplitude;
        const idleY =
          Math.cos(t * p.idleSpeed + p.idlePhaseY) * CONFIG.idleAmplitude;

        let targetX = p.baseX + idleX;
        let targetY = p.baseY + idleY;

        // واکنش نرم به موس (فنر مانند)
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

    function drawEdge(a, b) {
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

    function drawNode(p) {
      const fade = fadeFactorForY(p.y);
      if (fade <= 0.01) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.nodeColor}, ${fade * 0.35})`;
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const pts = pointsRef.current;
      const cols = colsRef.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const isLastCol = (i + 1) % cols === 0;
        const right = !isLastCol ? pts[i + 1] : null;
        const down = pts[i + cols];
        const downRight = !isLastCol ? pts[i + cols + 1] : null;

        if (right) drawEdge(p, right);
        if (down) drawEdge(p, down);
        // قطر برای ساختن مثلث‌های خط‌دار (تار عنکبوتی)
        if (downRight) drawEdge(p, downRight);
      }

      for (const p of pts) {
        drawNode(p);
      }
    }

    function loop() {
      update();
      draw();
      animationRef.current = requestAnimationFrame(loop);
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 left-0 w-full h-[45vh] md:h-[32vh] -z-20 bg-gradient-to-t from-blue-50/10 to-transparent"
    />
  );
}
