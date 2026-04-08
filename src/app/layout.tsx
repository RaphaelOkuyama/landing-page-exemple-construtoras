import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCA Construtora — Arquitetura de Alto Padrão",
  description:
    "Há mais de duas décadas construindo residências e empreendimentos de alto padrão em São Paulo e região. Rigor técnico, materiais nobres, entrega impecável.",
  openGraph: {
    title: "ARCA Construtora — Arquitetura de Alto Padrão",
    description: "Construindo sonhos em pedra e concreto desde 2003.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${(cormorant as unknown as { variable: string }).variable} ${(jost as unknown as { variable: string }).variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
