"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const OBRAS = [
  {
    imgBg: "/obras/obra1.webp",
    imgCutout: "/obras/obra1-cutout.webp",
    tag: "Residencial · Alphaville",
    name: "Casa Concreto Sunset",
    loc: "Alphaville, SP",
    area: "620 m²",
    year: "2024",
    type: "Unifamiliar",
  },
  {
    imgBg: "/obras/obra2.webp",
    imgCutout: "/obras/obra2-cutout.webp",
    tag: "Multifamiliar · Pinheiros",
    name: "Edifício Corten",
    loc: "Pinheiros, SP",
    area: "3.200 m²",
    year: "2023",
    type: "Multifamiliar",
  },
  {
    imgBg: "/obras/obra3.webp",
    imgCutout: "/obras/obra3-cutout.webp",
    tag: "Residencial · Guarujá",
    name: "Villa Praia Infinita",
    loc: "Guarujá, SP",
    area: "980 m²",
    year: "2023",
    type: "Unifamiliar",
  },
  {
    imgBg: "/obras/obra4.webp",
    imgCutout: "/obras/obra4-cutout.webp",
    tag: "Alto Padrão · Itaim Bibi",
    name: "The Veridian Residences",
    loc: "Itaim Bibi, SP",
    area: "12.400 m²",
    year: "2022",
    type: "Multifamiliar",
  },
  {
    imgBg: "/obras/obra5.webp",
    imgCutout: "/obras/obra5-cutout.webp",
    tag: "Residencial · Serra Negra",
    name: "Casa Pedra & Vidro",
    loc: "Serra Negra, SP",
    area: "540 m²",
    year: "2022",
    type: "Unifamiliar",
  },
  {
    imgBg: "/obras/obra6.webp",
    imgCutout: "/obras/obra6-cutout.webp",
    tag: "Residencial · Campos do Jordão",
    name: "Casa Floresta Verde",
    loc: "Campos do Jordão, SP",
    area: "710 m²",
    year: "2021",
    type: "Unifamiliar",
  },
];

type Filter = "Todos" | "Unifamiliar" | "Multifamiliar";

function useParallax(ref: React.RefObject<HTMLDivElement | null>) {
  const [transform, setTransform] = useState({ rotX: 0, rotY: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTransform({ rotX: -dy * 10, rotY: dx * 10 });
    };

    const onLeave = () => setTransform({ rotX: 0, rotY: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);

  return transform;
}

function ObraCard({ obra }: { obra: (typeof OBRAS)[0] }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { rotX, rotY } = useParallax(cardRef);
  const isHovered = rotX !== 0 || rotY !== 0;

  return (
    <div ref={cardRef} className="obra-card reveal">
      <div
        className="obra-inner"
        style={{
          transform: isHovered
            ? `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
        }}
      >
        <div className="obra-img-wrap">
          {/* Camada 1: Fundo (Vai para trás e escurece). Adicionado priority para corrigir o erro LCP */}
          <Image
            src={obra.imgBg}
            alt={obra.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="obra-img-base"
          />

          {/* Camada 2: Prédio Recortado (Pula para frente) */}
          <Image
            src={obra.imgCutout}
            alt={`${obra.name} cutout`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="obra-img-cutout"
          />
        </div>

        {/* Camada 3: Textos */}
        <div className="obra-overlay">
          <div className="obra-meta-top">
            <span className="obra-year">{obra.year}</span>
            <span className="obra-area">{obra.area}</span>
          </div>
          <div className={`obra-meta-bottom${isHovered ? " visible" : ""}`}>
            <p className="obra-tag-label">{obra.tag}</p>
            <p className="obra-name">{obra.name}</p>
            <p className="obra-loc">
              <span className="obra-loc-dot">·</span> {obra.loc}
            </p>
          </div>
        </div>

        {/* Reflexo de Luz */}
        <div
          className="obra-glare"
          style={{
            opacity: isHovered ? 0.12 : 0,
            background: `radial-gradient(circle at ${50 + rotY * 5}% ${50 - rotX * 5}%, rgba(250,248,244,0.8), transparent 60%)`,
          }}
        />
      </div>

      {/* Sombra base da obra projetada no fundo */}
      <div className="obra-shadow"></div>
    </div>
  );
}

export function ObrasSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<Filter>("Todos");

  const filtered =
    filter === "Todos" ? OBRAS : OBRAS.filter((o) => o.type === filter);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filter]);

  return (
    <section id="obras" ref={sectionRef} className="obras-section">
      <div className="obras-inner">
        <div className="obras-header reveal">
          <div>
            {/* Trocado de -light para escuro, para aparecer no fundo Bege */}
            <p className="section-tag">Portfólio</p>
            <h2 className="section-title">
              Obras que <em>falam por si</em>.
            </h2>
          </div>
          <div className="obras-filters">
            {(["Todos", "Unifamiliar", "Multifamiliar"] as Filter[]).map(
              (f) => (
                <button
                  key={f}
                  className={`filter-btn${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="obras-grid">
          {filtered.map((obra) => (
            <ObraCard key={obra.name} obra={obra} />
          ))}
        </div>

        <div className="obras-cta reveal">
          {/* Você pode trocar a classe do botão aqui também se quiser ele escuro */}
          <a href="#contato" className="cta-outline">
            Discutir seu projeto <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
