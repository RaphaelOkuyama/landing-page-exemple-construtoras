"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      { threshold: 0.1 },
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
            <p className="section-tag">Fale conosco</p>
            <h2 className="section-title contato-title">
              Cada grande obra
              <br />
              começa com uma
              <br />
              <em>conversa</em>.
            </h2>
            <p className="contato-desc">
              Nossa equipe responde em até 24 horas úteis. Para projetos
              urgentes, ligue diretamente.
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
                  <SelectTrigger className="input-custom">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
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
                <SelectTrigger className="input-custom">
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
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
                placeholder="Localização, prazo desejado, inspirações, diferenciais importantes para você..."
                className="input-custom"
                rows={5}
              />
            </div>

            <Button type="submit" className="btn-submit">
              Enviar mensagem <span>→</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
