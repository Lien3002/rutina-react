import { SITE_CONFIG, SOCIAL_LINKS } from "../constants/config";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-light text-center"
      role="contentinfo"
    >
      <div className="container py-1">
        <div className="footer-brand mb-1">
          <img
            src={SITE_CONFIG.logo}
            alt={SITE_CONFIG.logoAlt}
            className="footer-logo"
            width="35"
            height="35"
          />
          <span className="ms-2 fw-bold">{SITE_CONFIG.name}</span>
        </div>
        <section className="social-links mb-2">
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

        <div className="copyright py-1">
          © {currentYear} Copyright:
          <a
            className="text-dark ms-1"
            href={SITE_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_CONFIG.siteName}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
