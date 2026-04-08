"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done" | "leaving">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Velocidade variável — rápido no início, lento no final
      const remaining = 100 - current;
      const step = Math.max(
        1,
        Math.floor(remaining * 0.08) + Math.random() * 3,
      );
      current = Math.min(100, current + step);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 400);
        setTimeout(() => {
          setPhase("leaving");
          document.body.style.overflow = "";
        }, 1200);
      }
    }, 55);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "leaving") return null;

  return (
    <div className={`preloader${phase === "done" ? " preloader-out" : ""}`}>
      {/* Cenário de construção (Escalado no CSS para não ficar gigante) */}
      <div className="preloader-scene">
        {/* Guindaste SVG animado com as cores da marca */}
        <svg
          className="crane-svg"
          viewBox="0 0 320 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="130"
            y="340"
            width="60"
            height="20"
            rx="2"
            fill="var(--charcoal)"
          />
          <rect
            x="140"
            y="320"
            width="40"
            height="22"
            rx="1"
            fill="var(--charcoal)"
          />

          <rect x="151" y="80" width="18" height="242" rx="1" fill="#2A2A28" />
          <line
            x1="151"
            y1="120"
            x2="169"
            y2="120"
            stroke="var(--charcoal)"
            strokeWidth="1.5"
          />
          <line
            x1="151"
            y1="160"
            x2="169"
            y2="160"
            stroke="var(--charcoal)"
            strokeWidth="1.5"
          />
          <line
            x1="151"
            y1="200"
            x2="169"
            y2="200"
            stroke="var(--charcoal)"
            strokeWidth="1.5"
          />
          <line
            x1="151"
            y1="240"
            x2="169"
            y2="240"
            stroke="var(--charcoal)"
            strokeWidth="1.5"
          />
          <line
            x1="151"
            y1="280"
            x2="169"
            y2="280"
            stroke="var(--charcoal)"
            strokeWidth="1.5"
          />

          <rect
            x="80"
            y="74"
            width="180"
            height="12"
            rx="2"
            fill="var(--gold)"
          />
          <rect
            x="80"
            y="74"
            width="60"
            height="10"
            rx="1"
            fill="var(--gold-light)"
          />
          <rect
            x="66"
            y="72"
            width="26"
            height="22"
            rx="2"
            fill="var(--charcoal)"
          />

          <rect
            x="155"
            y="82"
            width="30"
            height="22"
            rx="2"
            fill="var(--charcoal)"
          />
          <rect
            x="159"
            y="86"
            width="10"
            height="10"
            rx="1"
            fill="var(--gold-dim)"
          />

          <line
            className="crane-cable"
            x1="220"
            y1="80"
            x2="220"
            y2="220"
            stroke="var(--stone)"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />

          <g className="crane-hook">
            <circle
              cx="220"
              cy="226"
              r="5"
              stroke="var(--gold)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M220 231 Q215 240 218 248 Q222 255 228 252"
              stroke="var(--gold)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          <g className="crane-load">
            <rect
              x="200"
              y="248"
              width="40"
              height="28"
              rx="2"
              fill="var(--charcoal)"
              stroke="var(--gold)"
              strokeWidth="0.8"
            />
            <rect
              x="206"
              y="254"
              width="8"
              height="8"
              rx="1"
              fill="var(--stone)"
              opacity="0.4"
            />
            <rect
              x="224"
              y="254"
              width="8"
              height="8"
              rx="1"
              fill="var(--stone)"
              opacity="0.4"
            />
          </g>

          <line
            x1="80"
            y1="74"
            x2="160"
            y2="80"
            stroke="var(--stone)"
            strokeWidth="1"
          />
          <line
            x1="260"
            y1="74"
            x2="160"
            y2="80"
            stroke="var(--stone)"
            strokeWidth="1"
          />
          <circle cx="220" cy="77" r="4" fill="var(--charcoal)" />
        </svg>

        <div className="building-construct">
          {[...Array(5)].map((_, i) => {
            const threshold = (i + 1) * 18;
            const visible = progress >= threshold;
            return (
              <div
                key={i}
                className={`floor-block${visible ? " floor-visible" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="floor-windows">
                  <div className="window" />
                  <div className="window" />
                  <div className="window" />
                  <div className="window" />
                </div>
              </div>
            );
          })}
          <div className="foundation-block" />
        </div>
      </div>

      <div className="preloader-progress">
        <div className="preloader-bar">
          <div className="preloader-fill" style={{ width: `${progress}%` }} />
          <div className="preloader-spark" style={{ left: `${progress}%` }} />
        </div>
        <div className="preloader-labels">
          <span className="preloader-brand">ARCA</span>
          <span className="preloader-pct">{progress}%</span>
        </div>
        <p className="preloader-sub">
          {progress < 30 && "Preparando o terreno…"}
          {progress >= 30 && progress < 60 && "Erguendo as estruturas…"}
          {progress >= 60 && progress < 90 && "Aplicando os acabamentos…"}
          {progress >= 90 && "Pronto para a entrega."}
        </p>
      </div>
    </div>
  );
}
