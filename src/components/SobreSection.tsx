"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function SobreSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 120);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="sobre-section">
      <div className="section-inner">
        <div className="sobre-grid">
          {/* Coluna esquerda: imagem */}
          <div className="sobre-visual reveal">
            <div className="sobre-img-wrap">
              <Image
                src="/obras/obra6.jpg"
                alt="Casa ARCA em Campos do Jordão"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="sobre-img"
              />
            </div>
            <div className="sobre-accent-box" />
            {/* Plaquinha flutuante */}
            <div className="sobre-float-card">
              <p className="sfc-num">2003</p>
              <p className="sfc-label">Fundação da ARCA</p>
            </div>
          </div>

          {/* Coluna direita: texto */}
          <div className="sobre-content reveal">
            <p className="section-tag">Quem somos</p>
            <h2 className="section-title sobre-title">
              Sobre a<br />
              <em>ARCA</em>.
            </h2>

            <p className="sobre-body">
              Fundada em 2003, a ARCA nasceu da convicção de que construir bem é
              um ato de responsabilidade — com o cliente, com o ambiente e com
              as gerações que habitarão esses espaços.
            </p>
            <p className="sobre-body">
              Nossa equipe reúne mais de 80 profissionais entre engenheiros,
              arquitetos, mestres de obra e especialistas em acabamento. Cada
              obra é acompanhada por um gestor dedicado, do briefing à entrega
              das chaves.
            </p>
            <p className="sobre-body">
              Atuamos em São Paulo e região, com projetos em Alphaville,
              Guarujá, Serra Negra, Campos do Jordão e nos principais bairros
              nobres da capital.
            </p>

            <div className="sobre-values">
              <div className="sobre-value">
                <span className="sv-icon">◈</span>
                <span className="sv-text">Rigor técnico</span>
              </div>
              <div className="sobre-value">
                <span className="sv-icon">◉</span>
                <span className="sv-text">Transparência total</span>
              </div>
              <div className="sobre-value">
                <span className="sv-icon">◎</span>
                <span className="sv-text">Entrega impecável</span>
              </div>
            </div>

            <div className="sobre-stats">
              <div className="sobre-stat">
                <p className="ss-num">80+</p>
                <p className="ss-label">Profissionais</p>
              </div>
              <div className="sobre-stat">
                <p className="ss-num">SP</p>
                <p className="ss-label">& Interior</p>
              </div>
              <div className="sobre-stat">
                <p className="ss-num">AAA</p>
                <p className="ss-label">Rating Serasa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
