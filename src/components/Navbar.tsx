"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription, // <-- ADICIONADO
} from "@/components/ui/sheet";

const LINKS = [
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#obras", label: "Obras" },
  { href: "#processo", label: "Processo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <Link href="/" className="nav-logo">
        ARCA
      </Link>

      <ul className="nav-links nav-links-desktop">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="nav-hamburger" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="nav-sheet">
          <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
          {/* <-- ADICIONADO PARA SUMIR COM O ERRO --> */}
          <SheetDescription className="sr-only">
            Acesse as seções do site
          </SheetDescription>

          <div className="nav-sheet-inner">
            <p className="nav-sheet-logo">ARCA</p>
            <ul className="nav-sheet-links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="nav-sheet-tagline">
              Arquitetura · Construção · Excelência
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
