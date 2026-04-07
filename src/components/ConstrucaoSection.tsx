"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const TOTAL_FRAMES = 63;

// Em mobile carregamos menos frames para performance
const MOBILE_STEP = 3; // carrega 1 a cada 3 frames → ~41 imagens
const MOBILE_FRAMES = Math.ceil(TOTAL_FRAMES / MOBILE_STEP);

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
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const progress = useScrollProgress({ containerRef: sectionRef });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const drawFrameIndex = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[index];
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
  }, []);

  // Carregamento lazy — só começa quando a seção entra na tela
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const step = isMobile ? MOBILE_STEP : 1;
        const count = isMobile ? MOBILE_FRAMES : TOTAL_FRAMES;
        const images = new Array<HTMLImageElement | null>(TOTAL_FRAMES).fill(
          null,
        );
        let loaded = 0;

        const onDone = (realIdx: number, ok: boolean) => {
          loaded++;
          if (ok) setLoadedCount(loaded);
          if (loaded >= count) {
            imagesRef.current = images;
            setIsLoaded(true);
            // Desenha primeiro frame
            const firstIdx = images.findIndex((img) => img !== null);
            if (firstIdx >= 0) drawFrameIndex(firstIdx);
          }
        };

        for (let i = 0; i < TOTAL_FRAMES; i += step) {
          const img = new Image();

          // A MÁGICA FOI AQUI: Removido o padStart(3, "0").
          // Agora ele procura frame_1, frame_2, frame_3, etc.
          img.src = `/frames/frame_${i + 1}.webp`;

          img.onload = () => {
            images[i] = img;
            onDone(i, true);
          };
          img.onerror = () => onDone(i, false);
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isMobile, drawFrameIndex]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (isLoaded) {
        const raw = Math.round(progress * (TOTAL_FRAMES - 1));
        drawFrameIndex(findNearestLoaded(raw));
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isLoaded, progress, drawFrameIndex]);

  // Atualiza frame no scroll
  useEffect(() => {
    if (!isLoaded) return;
    const raw = Math.round(progress * (TOTAL_FRAMES - 1));
    drawFrameIndex(findNearestLoaded(raw));
  }, [progress, isLoaded, drawFrameIndex]);

  function findNearestLoaded(idx: number): number {
    const imgs = imagesRef.current;
    if (imgs[idx]) return idx;
    // Busca o frame carregado mais próximo
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      if (idx - d >= 0 && imgs[idx - d]) return idx - d;
      if (idx + d < TOTAL_FRAMES && imgs[idx + d]) return idx + d;
    }
    return 0;
  }

  let currentStage = 0;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (progress >= STAGES[i].threshold) {
      currentStage = i;
      break;
    }
  }

  const pct = Math.round(progress * 100);
  const stage = STAGES[currentStage];
  const loadPct = Math.round(
    (loadedCount / (isMobile ? MOBILE_FRAMES : TOTAL_FRAMES)) * 100,
  );

  return (
    <section id="construcao" ref={sectionRef} className="construcao-section">
      <div className="construcao-sticky">
        {/* Mobile: card em cima, texto embaixo */}
        {/* Desktop: esquerda/direita */}

        {/* Card */}
        <div className="construcao-right">
          <div className="construcao-card">
            <div className="ccard-header">
              <div className="ccard-dots">
                <span className="ccd red" />
                <span className="ccd yellow" />
                <span className="ccd green" />
              </div>
              <p className="ccard-label">Residência Tipo A</p>
              <div className="ccard-badge">
                <span className="cbadge-num">
                  {String(currentStage + 1).padStart(2, "0")}/{STAGES.length}
                </span>
                <span className="cbadge-name">{stage.label}</span>
              </div>
            </div>

            <div className="ccard-canvas-wrap">
              {!isLoaded && (
                <div className="ccard-loading">
                  <p className="cl-label">Carregando</p>
                  <div className="cl-bar">
                    <div className="cl-fill" style={{ width: `${loadPct}%` }} />
                  </div>
                  <p className="cl-pct">{loadPct}%</p>
                </div>
              )}
              <canvas ref={canvasRef} className="ccard-canvas" />
            </div>

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

        {/* Texto */}
        <div className="construcao-left">
          <p className="section-tag">Processo construtivo</p>
          <h2 className="construcao-title">
            Do alicerce
            <br />à <em>entrega</em>.
          </h2>
          <p className="construcao-desc">
            Acompanhe em tempo real cada fase da construção. Role para ver a
            evolução completa.
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
      </div>
    </section>
  );
}
