const Footer = () => {
  return (
    <footer id="main-footer" className="bg-light text-center">
      <div className="container py-2">
        <section className="social-links mb-4">
          <a className="btn btn-floating m-1 social-btn" 
             href="#" 
             aria-label="Facebook">
            <i className="fab fa-facebook-f fa-lg"></i>
          </a>
          <a className="btn btn-floating m-1 social-btn"
             href="#"
             aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="btn btn-floating m-1 social-btn"
             href="#"
             aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="btn btn-floating m-1 social-btn"
             href="#"
             aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a className="btn btn-floating m-1 social-btn"
             href="#"
             aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
        </section>

        <div className="copyright py-2">
          © {new Date().getFullYear()} Copyright:
          <a className="text-dark" href=""> NET</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;