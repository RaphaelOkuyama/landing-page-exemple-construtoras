"use client";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-logo">ARCA</p>
            <p className="footer-tagline">
              Arquitetura · Construção · Excelência
            </p>
            <p className="footer-desc">
              Construindo sonhos em pedra e concreto
              <br />
              desde 2003, em São Paulo e região.
            </p>
          </div>

          <div className="footer-links-group">
            <p className="footer-group-title">Navegação</p>
            <ul className="footer-links">
              <li>
                <a href="#diferenciais">Diferenciais</a>
              </li>
              <li>
                <a href="#obras">Obras</a>
              </li>
              <li>
                <a href="#processo">Processo</a>
              </li>
              <li>
                <a href="#sobre">Sobre</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
            </ul>
          </div>

          <div className="footer-links-group">
            <p className="footer-group-title">Contato</p>
            <ul className="footer-links footer-contact">
              <li>+55 (11) 3456-7890</li>
              <li>projetos@arcaconstrutora.com.br</li>
              <li>Av. Faria Lima, 3.000 — Itaim Bibi</li>
              <li>São Paulo, SP — CEP 04538-132</li>
            </ul>
          </div>

          <div className="footer-links-group">
            <p className="footer-group-title">Redes sociais</p>
            <ul className="footer-links">
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">Houzz</a>
              </li>
              <li>
                <a href="#">Pinterest</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 ARCA Construtora. Todos os direitos reservados.
          </p>
          <div className="footer-legal">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
