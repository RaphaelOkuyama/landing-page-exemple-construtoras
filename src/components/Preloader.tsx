"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Partícula de poeira / faísca ─── */
type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "dust" | "spark";
};

const PHASES = [
  "Preparando o terreno",
  "Fundação concretada",
  "Estrutura em andamento",
  "Vedação e esquadrias",
  "Acabamentos finais",
  "Obra concluída",
];

/* MÁGICA DE PERFORMANCE:
  Em vez de calcular aleatoriedade na hora de renderizar (o que irrita o React e quebra o SSR),
  nós predefinimos 20 valores "pseudo-aleatórios" de opacidade para a nossa grade de pontos.
  Zero re-renders, zero lentidão, zero erros no console!
*/
const DOT_OPACITIES = [
  0.12, 0.35, 0.08, 0.41, 0.22, 0.15, 0.38, 0.09, 0.27, 0.44, 0.18, 0.31, 0.06,
  0.43, 0.25, 0.11, 0.36, 0.19, 0.29, 0.39,
];

export function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number | null>(null);
  const particleId = useRef(0);

  const [displayPct, setDisplayPct] = useState(0);
  const [phase, setPhase] = useState(0);
  const [status, setStatus] = useState<"loading" | "done" | "out">("loading");
  const [floorsVisible, setFloorsVisible] = useState<boolean[]>(
    Array(8).fill(false),
  );

  /* ── Canvas: partículas de construção ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticles = () => {
      const count = Math.random() < 0.3 ? 2 : 1;

      for (let i = 0; i < count; i++) {
        const W = canvas.width;
        const H = canvas.height;
        const isSpark = Math.random() < 0.25;
        particlesRef.current.push({
          id: particleId.current++,
          x: W * 0.35 + Math.random() * W * 0.3,
          y: H * 0.65 + Math.random() * H * 0.15,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(Math.random() * 1.5 + 0.4),
          life: 0,
          maxLife: 80 + Math.random() * 60,
          size: isSpark ? 1.5 + Math.random() * 1.5 : 1 + Math.random() * 2,
          type: isSpark ? "spark" : "dust",
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life++;

        const alpha = (1 - p.life / p.maxLife) * 0.6;

        if (p.type === "spark") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 151, 90, ${alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(184,151,90,0.8)";
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140, 126, 110, ${alpha * 0.5})`;
          ctx.fill();
        }

        return p.life < p.maxLife;
      });

      if (progressRef.current < 100) spawnParticles();
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  /* ── Progresso e lógica de saída ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Easing: rápido até ~70%, desacelera no final
      const speed =
        current < 70 ? Math.random() * 3.5 + 1.5 : Math.random() * 1.2 + 0.4;

      current = Math.min(100, current + speed);
      const pct = Math.round(current);

      progressRef.current = pct;
      setDisplayPct(pct);

      const phaseIdx = Math.min(
        Math.floor(pct / (100 / PHASES.length)),
        PHASES.length - 1,
      );
      setPhase(phaseIdx);

      setFloorsVisible((prev) => {
        const next = [...prev];
        const floor = Math.floor((pct / 100) * 8);
        for (let i = 0; i < floor; i++) next[i] = true;
        return next;
      });

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setStatus("done"), 300);
        setTimeout(() => {
          setStatus("out");
          document.body.style.overflow = "";
        }, 1600);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (status === "out") return null;

  return (
    <div
      ref={wrapperRef}
      className={`pl-wrap${status === "done" ? " pl-out" : ""}`}
    >
      <canvas ref={canvasRef} className="pl-canvas" />

      <div className="pl-line-top">
        <div className="pl-line-fill" style={{ width: `${displayPct}%` }} />
      </div>

      <div className="pl-corner-tl">
        <span className="pl-logo">ARCA</span>
        <span className="pl-tagline">Construtora</span>
      </div>

      <div className="pl-corner-tr">
        <span className="pl-year">Est. 2003</span>
      </div>

      <div className="pl-center">
        <div className="pl-crane-wrap">
          <svg
            viewBox="0 0 160 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pl-crane-svg"
          >
            <rect x="68" y="60" width="12" height="220" rx="1" fill="#2A2A28" />
            {[90, 120, 150, 180, 210, 240].map((y) => (
              <line
                key={y}
                x1="68"
                y1={y}
                x2="80"
                y2={y}
                stroke="#1C1C1A"
                strokeWidth="1"
              />
            ))}
            <rect x="20" y="54" width="120" height="8" rx="2" fill="#B8975A" />
            <rect x="20" y="54" width="38" height="7" rx="1" fill="#8A6E3E" />
            <rect x="12" y="52" width="20" height="16" rx="2" fill="#5A4830" />
            <rect x="72" y="58" width="20" height="16" rx="2" fill="#1C1C1A" />
            <rect
              x="75"
              y="61"
              width="8"
              height="8"
              rx="1"
              fill="rgba(90,140,180,0.5)"
            />
            <line
              className="pl-cable"
              x1="110"
              y1="58"
              x2="110"
              y2="170"
              stroke="#8C7E6E"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
            <g className="pl-hook">
              <circle
                cx="110"
                cy="175"
                r="4"
                stroke="#B8975A"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M110 179 Q106 186 108 192 Q111 197 116 194"
                stroke="#B8975A"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
            <circle cx="110" cy="56" r="3" fill="#8A7060" />
            <line
              x1="20"
              y1="54"
              x2="74"
              y2="60"
              stroke="#6A5E50"
              strokeWidth="0.8"
            />
            <line
              x1="140"
              y1="54"
              x2="74"
              y2="60"
              stroke="#6A5E50"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        <div className="pl-building">
          {[...Array(8)].map((_, i) => {
            const floorIdx = 7 - i;
            const visible = floorsVisible[floorIdx];
            return (
              <div
                key={i}
                className={`pl-floor${visible ? " pl-floor-in" : ""}`}
                style={{
                  transitionDelay: `${floorIdx * 0.06}s`,
                  width: `${72 + floorIdx * 4}px`,
                }}
              >
                <div className="pl-windows">
                  {[...Array(3)].map((_, w) => (
                    <div
                      key={w}
                      className={`pl-win${visible ? " pl-win-on" : ""}`}
                      style={{
                        animationDelay: `${(floorIdx * 3 + w) * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="pl-slab" />
              </div>
            );
          })}
          <div className="pl-foundation" style={{ width: `${72 + 7 * 4}px` }} />
          <div className="pl-ground" />
        </div>
      </div>

      <div className="pl-footer">
        <div className="pl-pct-wrap">
          <span
            className="pl-pct-num"
            style={{ transform: `translateY(${(100 - displayPct) * 0.15}px)` }}
          >
            {String(displayPct).padStart(3, "0")}
          </span>
          <span className="pl-pct-sym">%</span>
        </div>

        <div className="pl-bar-wrap">
          <div className="pl-bar">
            <div className="pl-bar-fill" style={{ width: `${displayPct}%` }}>
              <div className="pl-spark" />
            </div>
          </div>

          <div className="pl-phase-wrap">
            <div className="pl-phase" key={phase}>
              {PHASES[phase]}
            </div>
          </div>
        </div>
      </div>

      <div className="pl-dot-grid" aria-hidden="true">
        {DOT_OPACITIES.map((opacity, i) => (
          <div key={i} className="pl-dot" style={{ opacity }} />
        ))}
      </div>
    </div>
  );
}
