"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const OBRAS = [
  {
    img: "/obras/obra1.png",
    tag: "Residencial · Alphaville",
    name: "Casa Concreto Sunset",
    loc: "Alphaville, SP",
    area: "620 m²",
    year: "2024",
    type: "Unifamiliar",
    featured: true,
  },
  {
    img: "/obras/obra2.png",
    tag: "Multifamiliar · Pinheiros",
    name: "Edifício Corten",
    loc: "Pinheiros, SP",
    area: "3.200 m²",
    year: "2023",
    type: "Multifamiliar",
    featured: false,
  },
  {
    img: "/obras/obra3.png",
    tag: "Residencial · Guarujá",
    name: "Villa Praia Infinita",
    loc: "Guarujá, SP",
    area: "980 m²",
    year: "2023",
    type: "Unifamiliar",
    featured: false,
  },
  {
    img: "/obras/obra4.png",
    tag: "Alto Padrão · Itaim Bibi",
    name: "The Veridian Residences",
    loc: "Itaim Bibi, SP",
    area: "12.400 m²",
    year: "2022",
    type: "Multifamiliar",
    featured: false,
  },
  {
    img: "/obras/obra5.png",
    tag: "Residencial · Serra Negra",
    name: "Casa Pedra & Vidro",
    loc: "Serra Negra, SP",
    area: "540 m²",
    year: "2022",
    type: "Unifamiliar",
    featured: false,
  },
  {
    img: "/obras/obra6.png",
    tag: "Residencial · Campos do Jordão",
    name: "Casa Floresta Verde",
    loc: "Campos do Jordão, SP",
    area: "710 m²",
    year: "2021",
    type: "Unifamiliar",
    featured: false,
  },
];

type Filter = "Todos" | "Unifamiliar" | "Multifamiliar";

export function ObrasSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<Filter>("Todos");

  const filtered =
    filter === "Todos" ? OBRAS : OBRAS.filter((o) => o.type === filter);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 70);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filter]);

  return (
    <section id="obras" ref={sectionRef} className="obras-section">
      <div className="section-inner">
        <div className="obras-header">
          <div className="reveal">
            <p className="section-tag-light">Portfólio</p>
            <h2 className="section-title-light">
              Obras que
              <br />
              <em>falam por si</em>.
            </h2>
          </div>

          {/* Filtros */}
          <div className="obras-filters reveal">
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

        {/* Grid assimétrico */}
        <div className="obras-grid">
          {/* A CORREÇÃO FOI FEITA AQUI EMBAIXO: removido o (obra, i) */}
          {filtered.map((obra) => (
            <div
              key={obra.name}
              className={`obra-card reveal${obra.featured ? " obra-featured" : ""}`}
            >
              <div className="obra-img-wrap">
                <Image
                  src={obra.img}
                  alt={obra.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="obra-img"
                />
              </div>

              <div className="obra-overlay">
                <div className="obra-meta-top">
                  <span className="obra-year">{obra.year}</span>
                  <span className="obra-area">{obra.area}</span>
                </div>
                <div className="obra-meta-bottom">
                  <p className="obra-tag-label">{obra.tag}</p>
                  <p className="obra-name">{obra.name}</p>
                  <p className="obra-loc">
                    <span className="obra-loc-dot">·</span> {obra.loc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="obras-cta reveal">
          <a href="#contato" className="cta-outline">
            Discutir seu projeto <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
