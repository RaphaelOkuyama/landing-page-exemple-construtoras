"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const TOTAL_FRAMES = 124;

const STAGES = [
  {
    threshold: 0,
    label: "Fundação",
    desc: "O terreno se prepara",
    pct: "0–20%",
  },
  {
    threshold: 0.2,
    label: "Alicerce",
    desc: "As bases ganham forma",
    pct: "20–40%",
  },
  {
    threshold: 0.4,
    label: "Estrutura",
    desc: "A estrutura se ergue",
    pct: "40–65%",
  },
  {
    threshold: 0.65,
    label: "Vedação",
    desc: "As paredes definem o espaço",
    pct: "65–85%",
  },
  {
    threshold: 0.85,
    label: "Conclusão",
    desc: "O sonho se materializa",
    pct: "85–100%",
  },
];

export function ConstrucaoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const progress = useScrollProgress({ containerRef: sectionRef });

  const drawFrameIndex = useCallback(
    (index: number, images?: HTMLImageElement[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const imgs = images ?? imagesRef.current;
      const img = imgs[index];
      if (!img?.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const scale = Math.min(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * scale,
        dh = img.naturalHeight * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    },
    [],
  );

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;
    const onDone = (i: number, ok: boolean) => {
      loaded++;
      if (ok) setLoadedCount(loaded);
      if (loaded === TOTAL_FRAMES) {
        imagesRef.current = images;
        setIsLoaded(true);
        drawFrameIndex(0, images);
      }
    };
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i + 1).padStart(3, "0")}.webp`;
      img.onload = () => onDone(i, true);
      img.onerror = () => onDone(i, false);
      images[i] = img;
    }
  }, [drawFrameIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (isLoaded) {
        const idx = Math.round(progress * (TOTAL_FRAMES - 1));
        drawFrameIndex(Math.min(Math.max(idx, 0), TOTAL_FRAMES - 1));
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isLoaded, progress, drawFrameIndex]);

  useEffect(() => {
    if (!isLoaded) return;
    const idx = Math.round(progress * (TOTAL_FRAMES - 1));
    drawFrameIndex(Math.min(Math.max(idx, 0), TOTAL_FRAMES - 1));
  }, [progress, isLoaded, drawFrameIndex]);

  let currentStage = 0;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (progress >= STAGES[i].threshold) {
      currentStage = i;
      break;
    }
  }

  const pct = Math.round(progress * 100);
  const stage = STAGES[currentStage];

  return (
    <section id="construcao" ref={sectionRef} className="construcao-section">
      <div className="construcao-sticky">
        {/* Esquerda: texto */}
        <div className="construcao-left">
          <p className="section-tag">Processo construtivo</p>
          <h2 className="construcao-title">
            Do alicerce
            <br />à <em>entrega</em>.
          </h2>
          <p className="construcao-desc">
            Acompanhe em tempo real cada fase da construção. Role para ver a
            evolução completa de uma obra ARCA.
          </p>

          <div className="construcao-stages">
            {STAGES.map((s, i) => (
              <div
                key={s.label}
                className={`cstage${i === currentStage ? " active" : ""}${i < currentStage ? " done" : ""}`}
              >
                <div className="cstage-bullet">
                  {i < currentStage ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  )}
                </div>
                <div>
                  <p className="cstage-name">{s.label}</p>
                  {i === currentStage && (
                    <p className="cstage-pct">{s.pct} concluído</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="construcao-prog">
            <div className="cp-track">
              <div className="cp-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="cp-row">
              <span className="cp-desc">{stage.desc}</span>
              <span className="cp-pct">{pct}%</span>
            </div>
          </div>
        </div>

        {/* Direita: card maior */}
        <div className="construcao-right">
          <div className="construcao-card">
            {/* Header do card */}
            <div className="ccard-header">
              <div className="ccard-dots">
                <span className="ccd red" />
                <span className="ccd yellow" />
                <span className="ccd green" />
              </div>
              <p className="ccard-label">Residência Tipo A — Visualização</p>
              <div className="ccard-badge">
                <span className="cbadge-num">
                  {String(currentStage + 1).padStart(2, "0")}/{STAGES.length}
                </span>
                <span className="cbadge-name">{stage.label}</span>
              </div>
            </div>

            {/* Canvas */}
            <div className="ccard-canvas-wrap">
              {!isLoaded && (
                <div className="ccard-loading">
                  <p className="cl-label">Carregando visualização</p>
                  <div className="cl-bar">
                    <div
                      className="cl-fill"
                      style={{
                        width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="cl-pct">
                    {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                  </p>
                </div>
              )}
              <canvas ref={canvasRef} className="ccard-canvas" />
            </div>

            {/* Footer do card */}
            <div className="ccard-footer">
              <div className="ccard-prog-dots">
                {STAGES.map((_, i) => (
                  <div
                    key={i}
                    className={`cpd${i <= currentStage ? " active" : ""}`}
                  />
                ))}
              </div>
              <p className="ccard-scroll-hint">↓ role para construir</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
