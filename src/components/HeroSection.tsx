"use client";

import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobile(
        window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent),
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Atraso de 100ms para garantir que a animação de entrada funcione sempre
  useEffect(() => {
    const timer = setTimeout(() => {
      if (bodyRef.current) {
        bodyRef.current.classList.add("is-mounted");
      }
    }, 2500); // <-- MUDAMOS DE 100 PARA 2500 AQUI
    return () => clearTimeout(timer);
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

    const drawFrame = () => {
      if (video.readyState < 2) {
        frameRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const W = canvas.width;
      const H = canvas.height;

      const cropR = Math.floor(vw * 0.06);
      const cropB = Math.floor(vh * 0.06);
      const srcW = vw - cropR;
      const srcH = vh - cropB;

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

      frameRef.current = requestAnimationFrame(drawFrame);
    };

    const start = () => {
      setVideoReady(true);
      video.play().catch(() => {});
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
      {!isMobile && (
        <>
          <video
            ref={videoRef}
            src="/hero-drone.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{ display: "none" }}
          />
          <canvas
            ref={canvasRef}
            className="hero-canvas"
            style={{
              opacity: videoReady ? 1 : 0,
              transition: "opacity 0.8s",
              position: "absolute",
              inset: 0,
            }}
          />
          {!videoReady && (
            <div
              className="hero-fallback-bg"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#141210",
              }}
            />
          )}
        </>
      )}

      {isMobile && (
        <video
          src="/hero-drone.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="none"
          className="hero-video-mobile"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      <div className="hero-overlay-grad" />

      <div ref={bodyRef} className="hero-body">
        <p className="hero-tag">
          <span className="tag-line" />
          Est. 2003 — São Paulo
          <span className="tag-line" />
        </p>

        {/* H1 Otimizado para SEO com animação cinematográfica */}
        {/* H1 Gigante com animação de Máscara Cinematográfica */}
        <h1 className="hero-display">
          <span className="display-line-wrap">
            <span className="display-line display-line-1">Erguemos o</span>
          </span>
          <span className="display-line-wrap">
            {/* Adicionamos a classe line-alicerce aqui */}
            <span className="display-line display-line-2 line-alicerce">
              alicerce
            </span>
          </span>
          <span className="display-line-wrap">
            <span className="display-line display-line-3">do seu legado</span>
          </span>
          <span className="display-line-wrap">
            <span className="display-line display-line-4">familiar.</span>
          </span>
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
