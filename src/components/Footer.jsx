const BRAND_INFO = {
  name: "ESTILO DE VIDA",
  logo: "/imagenes/logo.png",
  alt: "Logo",
};

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: "facebook-f",
    url: "https://facebook.com/tuempresa",
  },
  {
    name: "X",
    icon: "fa-brands fa-x-twitter",
    url: "https://x.com/tuempresa",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://instagram.com/tuempresa",
  },
  {
    name: "LinkedIn",
    icon: "linkedin-in",
    url: "https://linkedin.com/company/tuempresa",
  },
  {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/tuusuario",
  },
];

const SITE_NAME = "NET";
const SITE_URL = "https://appejercicios.com";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-light text-center"
      role="contentinfo"
    >
      <div className="container py-2">
        <div className="footer-brand mb-3">
          <img
            src={BRAND_INFO.logo}
            alt={BRAND_INFO.alt}
            className="footer-logo"
            width="50"
            height="50"
          />
          <span className="ms-2 fw-bold">{BRAND_INFO.name}</span>
        </div>
        <section className="social-links mb-4">
          {SOCIAL_LINKS.map(({ name, icon, url }) => (
            <a
              key={name}
              className="btn btn-floating m-1 social-btn"
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-${icon}`} aria-hidden="true"></i>
            </a>
          ))}
        </section>

        <div className="copyright py-2">
          © {currentYear} Copyright:
          <a
            className="text-dark ms-1"
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_NAME}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
