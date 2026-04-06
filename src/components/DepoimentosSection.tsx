"use client";

import { useEffect, useRef, useState } from "react";

const DEPOIMENTOS = [
  {
    name: "Ricardo & Fernanda Almeida",
    role: "Casa Concreto Sunset · Alphaville",
    initials: "RF",
    stars: 5,
    text: "A ARCA transformou nosso terreno em algo que supera qualquer expectativa que tínhamos. O que mais nos impressionou foi a transparência ao longo de todo o processo — jamais ficamos sem resposta. A casa foi entregue 3 semanas antes do prazo. Indicamos para todos os amigos.",
  },
  {
    name: "Grupo Monteiro Investimentos",
    role: "The Veridian Residences · Itaim Bibi",
    initials: "GM",
    stars: 5,
    text: "Construímos com a ARCA nosso empreendimento mais ambicioso até hoje — 12.400 m² em pleno Itaim. O resultado excedeu as projeções de VGV em 18%. A equipe técnica demonstrou domínio absoluto sobre cronograma e custo. Já assinamos o contrato para o próximo projeto.",
  },
  {
    name: "Dra. Camila Torres",
    role: "Villa Praia Infinita · Guarujá",
    initials: "CT",
    stars: 5,
    text: "Sonhei com essa casa por 10 anos. A ARCA não só entendeu o que eu queria — foi além. Os acabamentos são impecáveis, a piscina infinita ficou exatamente como eu imaginava, e eles cuidaram de absolutamente tudo, incluindo o paisagismo e a automação. Perfeito.",
  },
  {
    name: "Arq. Paulo & Luíza Mendes",
    role: "Casa Pedra & Vidro · Serra Negra",
    initials: "PM",
    stars: 5,
    text: "Como arquiteta, tenho um olhar crítico exigente. Fui surpreendida pela qualidade de execução em cada detalhe — das esquadrias às juntas de concreto aparente. A ARCA respeitou o projeto ao milímetro e ainda trouxe sugestões técnicas que o enriqueceram.",
  },
];

export function DepoimentosSection() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 100);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % DEPOIMENTOS.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % DEPOIMENTOS.length);
    }, 6000);
  };

  const d = DEPOIMENTOS[active];

  return (
    <section id="depoimentos" ref={sectionRef} className="depoimentos-section">
      <div className="section-inner">
        <div className="section-header reveal">
          <p className="section-tag">O que dizem</p>
          <h2 className="section-title">
            Clientes que
            <br />
            <em>confiam</em> na ARCA.
          </h2>
        </div>

        <div className="depoimentos-wrap reveal">
          {/* Citação decorativa corrigida */}
          <span className="dep-quote-mark">&quot;</span>

          <div className="dep-content">
            <p className="dep-text" key={active}>
              {d.text}
            </p>

            <div className="dep-author">
              <div className="dep-avatar">{d.initials}</div>
              <div>
                <p className="dep-name">{d.name}</p>
                <p className="dep-role">{d.role}</p>
              </div>
              <div className="dep-stars">{"★".repeat(d.stars)}</div>
            </div>
          </div>

          {/* Navegação */}
          <div className="dep-nav">
            {DEPOIMENTOS.map((_, i) => (
              <button
                key={i}
                className={`dep-dot${i === active ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Cards secundários */}
        <div className="dep-cards-row reveal">
          {DEPOIMENTOS.map((d, i) => (
            <button
              key={d.name}
              className={`dep-mini-card${i === active ? " active" : ""}`}
              onClick={() => goTo(i)}
            >
              <div className="dep-mini-avatar">{d.initials}</div>
              <div>
                <p className="dep-mini-name">{d.name}</p>
                <p className="dep-mini-role">{d.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
