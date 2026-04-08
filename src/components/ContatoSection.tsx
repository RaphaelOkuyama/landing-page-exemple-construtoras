"use client";

import { useEffect, useRef, useState } from "react";
// Usamos Input e Textarea nativos com classes customizadas para maior controle
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── O BOTÃO COM FÍSICA PERFEITA (TRATOR) ───
function SubmitButton() {
  const [status, setStatus] = useState<"idle" | "pushing" | "success">("idle");
  // Duração total da animação (2.5 segundos)
  const animationDuration = 2500;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    // Inicia a animação
    setStatus("pushing");

    // Espera a animação terminar para mostrar o sucesso
    setTimeout(() => {
      setStatus("success");
      // TODO: Lógica de envio de email (EmailJS/Resend) entrará aqui

      // Após 3 segundos de sucesso, volta ao estado original
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, animationDuration);
  };

  return (
    <button
      className="btn-submit"
      onClick={handleClick}
      disabled={status !== "idle"}
      // ATRIBUTO CHAVE: Avisa ao CSS qual animação disparar
      data-status={status}
    >
      {/* ─── MENSAGEM DE SUCESSO ─── */}
      <div className="success-message">MENSAGEM ENVIADA ✓</div>

      {/* ─── O CARRINHO (SEGURA O TRATOR E O TEXTO JUNTOS) ─── */}
      <div className="push-cart">
        {/* ÍCONE DO TRATOR */}
        <div className="tractor">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12h4l1 5h9l1-3h3l1 3h2" />
            <path d="M19 17v2" />
            <path d="M16 11h-4" />
            <path d="M7 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
            <circle cx="8" cy="17" r="2" />
            <circle cx="16" cy="17" r="2" />
            <path d="M22 19l-2-6V9" />
          </svg>
        </div>

        {/* O TEXTO DO BOTÃO */}
        <span>
          {status === "pushing" ? "ENVIANDO..." : "ENVIAR MENSAGEM →"}
        </span>
      </div>
    </button>
  );
}

// ─── A SEÇÃO PRINCIPAL DE CONTATO ───
export function ContatoSection() {
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
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contato" ref={sectionRef} className="contato-section">
      <div className="section-inner">
        <div className="contato-layout">
          {/* Esquerda: info */}
          <div className="contato-info reveal">
            <p className="section-tag-light">Fale conosco</p>
            <h2 className="section-title-light contato-title">
              Cada grande obra
              <br />
              começa com uma
              <br />
              <em>conversa</em>.
            </h2>
            <p className="contato-desc">
              Nossa equipe responde em até 24 horas úteis.
            </p>

            <div className="contato-details">
              <div className="cd-item">
                <p className="cd-label">Atendimento</p>
                <p className="cd-value">Seg – Sex, 9h às 18h</p>
              </div>
              <div className="cd-item">
                <p className="cd-label">Telefone</p>
                <p className="cd-value">+55 (11) 3456-7890</p>
              </div>
              <div className="cd-item">
                <p className="cd-label">WhatsApp</p>
                <p className="cd-value">+55 (11) 99876-5432</p>
              </div>
              <div className="cd-item">
                <p className="cd-label">E-mail</p>
                <p className="cd-value">projetos@arcaconstrutora.com.br</p>
              </div>
              <div className="cd-item">
                <p className="cd-label">Endereço</p>
                <p className="cd-value">
                  Av. Brigadeiro Faria Lima, 3.000
                  <br />
                  Itaim Bibi — São Paulo, SP
                </p>
              </div>
            </div>
          </div>

          {/* Direita: formulário */}
          <form
            className="contato-form reveal"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome completo</label>
                <Input
                  id="nome"
                  placeholder="Seu nome"
                  className="input-custom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="input-custom"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tel">Telefone</label>
                <Input
                  id="tel"
                  placeholder="(11) 9xxxx-xxxx"
                  className="input-custom"
                />
              </div>
              <div className="form-group">
                <label>Tipo de projeto</label>
                <Select>
                  <SelectTrigger className="input-custom select-trigger-custom">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent
                    className="select-content-custom"
                    position="popper"
                    sideOffset={4}
                  >
                    <SelectItem value="residencial">
                      Residência unifamiliar
                    </SelectItem>
                    <SelectItem value="multifamiliar">
                      Empreendimento multifamiliar
                    </SelectItem>
                    <SelectItem value="campo">Casa de campo / praia</SelectItem>
                    <SelectItem value="reforma">
                      Reforma de alto padrão
                    </SelectItem>
                    <SelectItem value="comercial">
                      Comercial / corporativo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="form-group">
              <label>Área estimada</label>
              <Select>
                <SelectTrigger className="input-custom select-trigger-custom">
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent
                  className="select-content-custom"
                  position="popper"
                  sideOffset={4}
                >
                  <SelectItem value="300">Até 300 m²</SelectItem>
                  <SelectItem value="600">300 – 600 m²</SelectItem>
                  <SelectItem value="1000">600 m² – 1.000 m²</SelectItem>
                  <SelectItem value="mais">Acima de 1.000 m²</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <label htmlFor="mensagem">Conte-nos sobre seu projeto</label>
              <Textarea
                id="mensagem"
                placeholder="Localização, prazo desejado, inspirações..."
                className="input-custom"
                rows={5}
              />
            </div>

            {/* Nosso botão animado */}
            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}
