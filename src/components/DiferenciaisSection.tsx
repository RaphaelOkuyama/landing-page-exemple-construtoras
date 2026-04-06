"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  {
    num: "01",
    title: "Materiais de procedência nobre",
    desc: "Trabalhamos exclusivamente com fornecedores certificados. Cada material — do concreto aparente ao revestimento importado — é selecionado por critérios de durabilidade, estética e sustentabilidade.",
    icon: "◈",
  },
  {
    num: "02",
    title: "Engenharia sem concessões",
    desc: "Nossa equipe técnica reúne engenheiros com mais de 15 anos de experiência em obras de alta complexidade. Cada projeto passa por revisão estrutural independente antes do primeiro bloco ser assentado.",
    icon: "◉",
  },
  {
    num: "03",
    title: "Prazo com garantia contratual",
    desc: "Cumprimos 100% dos prazos contratados nos últimos 5 anos. Nosso sistema de gestão de obras em tempo real permite antecipar gargalos antes que se tornem atrasos.",
    icon: "◎",
  },
  {
    num: "04",
    title: "Transparência total na execução",
    desc: "O cliente acompanha cada etapa por relatórios fotográficos semanais, acesso ao diário de obra digital e reuniões mensais de alinhamento com o gestor responsável.",
    icon: "◇",
  },
  {
    num: "05",
    title: "Pós-obra e garantia estendida",
    desc: "Oferecemos 5 anos de garantia estrutural e assistência técnica ilimitada no primeiro ano após a entrega. Porque nossa relação com o cliente não termina na entrega das chaves.",
    icon: "◈",
  },
  {
    num: "06",
    title: "Sustentabilidade incorporada",
    desc: "Todas as nossas obras seguem protocolos de gestão de resíduos, eficiência hídrica e energética. Trabalhamos com projetos certificados LEED e GBC Brasil.",
    icon: "◉",
  },
];

export function DiferenciaisSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="diferenciais"
      ref={sectionRef}
      className="diferenciais-section"
    >
      <div className="section-inner">
        <div className="section-header reveal">
          <p className="section-tag">Por que a ARCA</p>
          <h2 className="section-title">
            O padrão que nos
            <br />
            <em>distingue</em>.
          </h2>
        </div>

        <div className="diferenciais-grid">
          {ITEMS.map((item) => (
            <div key={item.num} className="dif-card reveal">
              <div className="dif-num">{item.num}</div>
              <div className="dif-icon">{item.icon}</div>
              <h3 className="dif-title">{item.title}</h3>
              <p className="dif-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
