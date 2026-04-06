"use client";

import { useEffect, useRef } from "react";

export function HeroSection() {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Monta animação de entrada tipográfica
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      bodyRef.current?.classList.add("is-mounted");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* A MÁGICA DA PERFORMANCE:
        Vídeo HTML5 nativo acelerado por hardware.
        O scale(1.08) dá um zoom de 8%, empurrando a marca d'água para fora da tela.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/hero-drone.mp4"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.08)", // Corta as bordas (crop)
          pointerEvents: "none", // Impede o usuário de clicar no vídeo
          zIndex: 0,
        }}
      />

      {/* Gradientes sobre o vídeo */}
      <div
        className="hero-overlay-grad"
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      />

      {/* Conteúdo */}
      <div
        ref={bodyRef}
        className="hero-body"
        style={{ position: "relative", zIndex: 2 }}
      >
        <p className="hero-tag">
          <span className="tag-line" />
          Est. 2003 — São Paulo
          <span className="tag-line" />
        </p>

        <h1 className="hero-display">
          <span className="display-line display-line-1">Construímos</span>
          <span className="display-line display-line-2">
            <em>sonhos</em>
          </span>
          <span className="display-line display-line-3">em pedra</span>
          <span className="display-line display-line-4">e concreto.</span>
        </h1>

        <div className="hero-footer-row">
          <p className="hero-desc">
            Mais de duas décadas erguendo residências
            <br />
            que transcendem o ordinário — onde cada detalhe
            <br />é uma declaração de permanência.
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

      {/* Texto decorativo fundo */}
      <span
        className="hero-bg-word"
        style={{ position: "absolute", zIndex: 1 }}
      >
        ARCA
      </span>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" style={{ zIndex: 2 }}>
        <div className="scroll-track">
          <div className="scroll-thumb" />
        </div>
        <span className="scroll-label">scroll</span>
      </div>
    </section>
  );
}
