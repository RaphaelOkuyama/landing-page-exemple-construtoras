"use client";

import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const dirRef = useRef<1 | -1>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Usamos o setTimeout (mesmo com 0ms) para jogar a atualização de estado
    // para o final da fila de execução do navegador.
    // Isso evita o erro de "Cascading renders" do React.
    const timer = setTimeout(() => {
      setIsMobile(
        window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent),
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Animação de entrada via DOM (sem setState)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      bodyRef.current?.classList.add("is-mounted");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Loop canvas — só em desktop
  useEffect(() => {
    if (isMobile) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Velocidade: avança ~1/60s por frame (60fps)
    const SPEED = 1 / 60;

    const drawFrame = () => {
      if (video.readyState < 2) {
        frameRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const W = canvas.width;
      const H = canvas.height;

      // Crop 6% inferior e direito para remover marca d'água
      const cropR = Math.floor(vw * 0.06);
      const cropB = Math.floor(vh * 0.06);
      const srcW = vw - cropR;
      const srcH = vh - cropB;

      // Cover fit
      const scale = Math.max(W / srcW, H / srcH);
      const dw = srcW * scale;
      const dh = srcH * scale;

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(
        video,
        0,
        0,
        srcW,
        srcH,
        (W - dw) / 2,
        (H - dh) / 2,
        dw,
        dh,
      );

      // Avança/recua tempo
      const next = video.currentTime + SPEED * dirRef.current;
      video.currentTime = Math.max(0, Math.min(video.duration || 0, next));

      if (video.currentTime >= (video.duration || 0) - 0.05)
        dirRef.current = -1;
      else if (video.currentTime <= 0.05) dirRef.current = 1;

      frameRef.current = requestAnimationFrame(drawFrame);
    };

    const start = () => {
      setVideoReady(true);
      video.pause();
      drawFrame();
    };

    video.addEventListener("loadeddata", start);
    if (video.readyState >= 2) start();

    return () => {
      window.removeEventListener("resize", resize);
      video.removeEventListener("loadeddata", start);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isMobile]);

  return (
    <section id="hero" className="hero-section">
      {/* Desktop: canvas controlado */}
      {!isMobile && (
        <>
          <video
            ref={videoRef}
            src="/hero-drone.mp4"
            muted
            playsInline
            preload="metadata"
            style={{ display: "none" }}
          />
          <canvas
            ref={canvasRef}
            className="hero-canvas"
            style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.8s" }}
          />
          {/* Fundo enquanto vídeo carrega */}
          {!videoReady && <div className="hero-fallback-bg" />}
        </>
      )}

      {/* Mobile: vídeo nativo (autoplay funciona melhor) */}
      {isMobile && (
        <video
          src="/hero-drone.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="none"
          className="hero-video-mobile"
        />
      )}

      <div className="hero-overlay-grad" />

      <div ref={bodyRef} className="hero-body">
        <p className="hero-tag">
          <span className="tag-line" />
          Est. 2003 — São Paulo
          <span className="tag-line" />
        </p>

        <h1 className="hero-display">
          <span className="display-line display-line-1">Construímos</span>
          {/* "sonhos" com fundo escuro garantindo contraste */}
          <span className="display-line display-line-2">
            <em className="hero-em-sonhos">sonhos</em>
          </span>
          <span className="display-line display-line-3">em pedra</span>
          <span className="display-line display-line-4">e concreto.</span>
        </h1>

        <div className="hero-footer-row">
          <p className="hero-desc">
            Mais de duas décadas erguendo residências
            <br className="hero-br" />
            que transcendem o ordinário — onde cada detalhe
            <br className="hero-br" />é uma declaração de permanência.
          </p>
          <div className="hero-ctas">
            <a href="#obras" className="cta-primary">
              Ver portfólio <span className="cta-arrow">↓</span>
            </a>
            <a href="#contato" className="cta-secondary">
              Iniciar projeto
            </a>
          </div>
        </div>
      </div>

      <span className="hero-bg-word" aria-hidden="true">
        ARCA
      </span>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-track">
          <div className="scroll-thumb" />
        </div>
        <span className="scroll-label">scroll</span>
      </div>
    </section>
  );
}
