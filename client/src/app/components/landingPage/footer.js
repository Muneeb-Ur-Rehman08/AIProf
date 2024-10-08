import Logo from '../../../assets/images/logo/logo.svg';
import FooterBg from '../../../assets/images/sections-bg-images/footer-bg-1.jpg';
const Footer = () => {
  return (
    <footer className="page-footer dark-color-footer" id="page-footer">
      <div
        className="overlay-photo-image-bg"
        style={{ backgroundImage: `url(${FooterBg})`, opacity: 0.25 }}
      ></div>
      <div className="container">
        <div className="row footer-cols">
          <div className="col-12 col-md-8 col-lg-4  footer-col">
            <img
              className="img-fluid footer-logo"
              loading="lazy"
              src={Logo}
              alt="logo"
            />
            <div className="footer-col-content-wrapper">
              <p className="footer-text-about-us">
                AiProf Your Most Helpful Teacher Ever!
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-2  footer-col mt-2 text-center">
            <div className="footer-col-content-wrapper">
              <ul className="footer-menu ">
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="#page-hero"
                    alt="Starting page"
                  >
                    Home
                  </a>
                </li>
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="#about"
                    alt="about AI Prof Section"
                  >
                    About Us
                  </a>
                </li>
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="#services"
                    alt="services provided by AI Prof"
                  >
                    Services
                  </a>
                </li>
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="https://meetyourai.github.io/AIProf/blog/BlogIndex"
                    alt="AI Prof Blog page"
                    target="_blank"
                  >
                    Our Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-lg-2 footer-col mt-2 text-center">
            <div className="footer-col-content-wrapper">
              <ul className="footer-menu">
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="#pricing"
                    alt="AI Prof pricing section"
                  >
                    Pricing
                  </a>
                </li>
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="#faq"
                    alt="section about frequently asked Questions"
                  >
                    Faqs
                  </a>
                </li>
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="#why"
                    alt="section why choose AI Prof"
                  >
                    How it works
                  </a>
                </li>
                <li className="footer-menu-item">
                  <i className="bi bi-arrow-right icon "></i>
                  <a
                    className="footer-menu-link"
                    href="https://github.com/MeetYourAI/AIProf/tree/dev/assets"
                    alt="AI Prof brand assets"
                    target="_blank"
                  >
                    Brand Assets
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-4 footer-col text-center">
            <h2 className=" footer-col-title">contact information</h2>
            <div className="footer-col-content-wrapper">
              <div className="contact-info-card">
                <i className="bi bi-envelope icon"></i>
                <a
                  className="text-lowercase  info"
                  href="mailto:meetyouraihelper@gmail.com"
                >
                  meetyouraihelper@gmail.com
                </a>
              </div>
              <div className="contact-info-card">
                <i className="bi bi-geo-alt icon"></i>
                <span className="info">AI2BC Organization</span>
              </div>
              <div className="contact-info-card">
                <i className="bi bi-phone icon"></i>
                <a className="info" href="tel:+20123456789">
                  +447762293742
                </a>
              </div>
              <div className="contact-info-card">
                <div className="social-icons">
                  <div className="sc-wrapper dir-row sc-size-32">
                    <ul className="sc-list">
                      <li className="sc-item " title="Facebook">
                        <a
                          className="sc-link"
                          href=" https://www.facebook.com/AIPROF2BC?mibextid=ZbWKwL"
                          title="social media icon"
                          target="_blank"
                        >
                          <i className="fab fa-facebook-f sc-icon"></i>
                        </a>
                      </li>
                      <li className="sc-item " title="twitter">
                        <a
                          className="sc-link"
                          href=" https://twitter.com/ai_profedu"
                          title="social media icon"
                          target="_blank"
                        >
                          <i className="fab fa-twitter sc-icon"></i>
                        </a>
                      </li>
                      <li className="sc-item " title="Whatsapp">
                        <a
                          className="sc-link"
                          href=" https://wa.me/message/JNKBLQKB7HBCP1"
                          title="Social Media icon"
                          target="_blank"
                        >
                          <i className="fab fa-whatsapp sc-icon"></i>
                        </a>
                      </li>
                      <li className="sc-item " title="youtube">
                        <a
                          className="sc-link"
                          href="https://www.youtube.com/channel/UC0eO8rFeVcQMY_RDUjzu1Gw/featured"
                          title="youtube channel"
                          target="_blank"
                        >
                          <i className="fab fa-youtube sc-icon"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyrights ">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 d-flex justify-content-start mb-3">
              <p className="credits">
                &copy; 2023 This Project is
                <a className="LICENSE-link" href="LICENSE.html">
                  MIT Licensed{" "}
                </a>
              </p>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-end">
              <div className="terms-links">
                <a href="rules.html">Terms of Use </a>|{" "}
                <a href="privacy-policy.html">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
