import { GOOGLE_TERMS_LINK, GOOGLE_PRIVACY_LINK } from "../constants";

export default function Footer() {
  return (
    <footer className="footer">
      <a href={GOOGLE_TERMS_LINK} target="__blank" rel="noopener noreferrer">
        Termos de Uso
      </a>{" "}
      e{" "}
      <a href={GOOGLE_PRIVACY_LINK} target="__blank" rel="noopener noreferrer">
        Política de Privacidade
      </a>
    </footer>
  );
}
