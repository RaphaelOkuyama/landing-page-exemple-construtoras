"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    phase: "Briefing",
    duration: "1–2 semanas",
    desc: "Reunião inicial para entender sua visão, necessidades e expectativas. Levantamento do terreno, programa de necessidades e definição de orçamento.",
  },
  {
    num: "02",
    phase: "Projeto",
    duration: "4–8 semanas",
    desc: "Desenvolvimento do anteprojeto arquitetônico, projetos complementares (estrutural, elétrico, hidráulico), aprovações em prefeitura e compatibilização BIM.",
  },
  {
    num: "03",
    phase: "Planejamento",
    duration: "2–3 semanas",
    desc: "Cronograma físico-financeiro, contratação de equipes especializadas, aquisição de materiais de longa entrega e mobilização do canteiro.",
  },
  {
    num: "04",
    phase: "Execução",
    duration: "12–18 meses",
    desc: "Construção com acompanhamento técnico diário, relatórios semanais ao cliente, controle rigoroso de qualidade e gestão de fornecedores.",
  },
  {
    num: "05",
    phase: "Acabamento",
    duration: "2–4 meses",
    desc: "Revestimentos, marcenaria, esquadrias, paisagismo e sistemas de automação. Cada detalhe executado por especialistas certificados.",
  },
  {
    num: "06",
    phase: "Entrega",
    duration: "1 semana",
    desc: "Vistoria final completa, manual do proprietário, treinamento de sistemas e entrega das chaves com toda a documentação de garantia.",
  },
];

export function ProcessoSection() {
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

  return (
    <section id="processo" ref={sectionRef} className="processo-section">
      <div className="section-inner">
        <div className="section-header reveal">
          <p className="section-tag">Como trabalhamos</p>
          <h2 className="section-title">
            Um processo <em>rigoroso</em>,<br />
            do início ao fim.
          </h2>
        </div>

        <div className="processo-timeline">
          {/* Linha conectora */}
          <div className="timeline-line" />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`timeline-step reveal${i % 2 === 0 ? " step-top" : " step-bottom"}`}
            >
              <div className="step-dot" />
              <div className="step-card">
                <div className="step-header">
                  <span className="step-num">{step.num}</span>
                  <span className="step-duration">{step.duration}</span>
                </div>
                <h3 className="step-phase">{step.phase}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
