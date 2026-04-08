"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "Qual o prazo médio de uma obra residencial?",
    a: "Depende da complexidade e área do projeto. Uma residência unifamiliar de 400–700 m² geralmente leva de 14 a 20 meses. Obras maiores ou com alto grau de customização podem levar de 24 a 30 meses. Sempre apresentamos um cronograma detalhado no contrato, com garantia de prazo.",
  },
  {
    q: "Vocês trabalham com financiamento bancário?",
    a: "Sim. Temos parceria com os principais bancos e assessores de crédito imobiliário para obras. Nossa equipe auxilia o cliente em todo o processo de documentação e liberação das parcelas construtivas, que geralmente seguem o avanço físico da obra.",
  },
  {
    q: "Posso usar meu próprio arquiteto?",
    a: "Absolutamente. A ARCA atua tanto como construtora de projetos de terceiros quanto como empresa de construção + projetos. Se você já tem um arquiteto, nossa equipe técnica trabalha em colaboração estreita com ele, respeitando o projeto e garantindo excelência na execução.",
  },
  {
    q: "Como funciona o acompanhamento da obra?",
    a: "Você terá acesso ao diário de obra digital atualizado diariamente, relatório fotográfico semanal enviado por e-mail, reunião mensal de avanço com o gestor da obra e um canal direto pelo WhatsApp com o engenheiro responsável.",
  },
  {
    q: "Qual é a garantia oferecida após a entrega?",
    a: "Seguimos e superamos as exigências do CBIC: 5 anos de garantia estrutural, 3 anos para impermeabilização e instalações, 1 ano para acabamentos. Além disso, oferecemos assistência técnica ilimitada no primeiro ano após a entrega, sem custo adicional.",
  },
  {
    q: "Vocês fazem reformas e retrofits?",
    a: "Realizamos reformas de alto padrão em residências e empreendimentos comerciais, desde que o projeto tenha escopo e complexidade compatíveis com nossa estrutura. Não trabalhamos com pequenas reformas pontuais — nosso foco é em projetos de maior abrangência e valor.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
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
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" ref={sectionRef} className="faq-section">
      <div className="section-inner">
        <div className="faq-layout">
          <div className="faq-header reveal">
            <p className="section-tag">Dúvidas frequentes</p>
            <h2 className="section-title">
              Perguntas que
              <br />
              <em>respondemos</em>
              <br />
              todo dia.
            </h2>
            <p className="faq-sub">
              Não encontrou o que procura?{" "}
              <a href="#contato" className="faq-link">
                Fale com nossa equipe →
              </a>
            </p>
          </div>

          {/* A MÁGICA FOI AQUI: A classe 'reveal' fica apenas no pai, blindando contra os re-renders do React */}
          <div className="faq-list reveal">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;

              return (
                <div key={i} className={`faq-item${isOpen ? " open" : ""}`}>
                  <button
                    className="faq-question"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Solução moderna e hiper-leve (CSS Grid) */}
                  <div
                    className="faq-answer"
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition:
                        "grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
