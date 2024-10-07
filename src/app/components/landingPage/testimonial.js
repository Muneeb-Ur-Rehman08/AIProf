import testimonial1 from '../../../assets/images/testimonials/Testimonial 1.png';
import testimonial2 from '../../../assets/images/testimonials/Testimonial2new.png';
import testimonial3 from '../../../assets/images/testimonials/Testimonial 3.png';
import bgImage from '../../../assets/images/sections-bg-images/1.jpg';
import { useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Pagination } from 'react-bootstrap';
import Swiper from 'swiper';

const Testimonial = () => {

    useEffect(() => {
        Swiper.use([Navigation, Pagination, Autoplay]);
        new Swiper(
            ".testimonials-1-col .swiper-container",
            {
              speed: 500,
              loop: true,
              grabCursor: true,
              slidesPerView: 1,
              spaceBetween: 50,
              autoplay: {
                delay: 5000,
                disableOnInteraction: false,
              },
              navigation: {
                nextEl: ".testimonials-1-col .swiper-button-next",
                prevEl: ".testimonials-1-col .swiper-button-prev",
              },
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              on: {
                resize: function () {
                  this.update();
                },
              },
            }
          );
    }, []);
    
  return (
    <section
      className="testimonials testimonials-1-col has-dark-bg mega-section"
      id="testimonials"
    >
      <div
        className="overlay-photo-image-bg parallax"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.25 }}
      >
      </div>
      <div className="container">
        <div className="sec-heading centered">
          <div className="content-area">
            <span className="pre-title wow fadeInUp" data-wow-delay=".2s">
              testimonials
            </span>
            <h2 className="title wow fadeInUp" data-wow-delay=".4s">
              Users <span className="hollow-text">testimonials</span>
            </h2>
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-10 mx-auto">
            <div className="swiper-container wow fadeInUp" data-wow-delay="0.2s">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-card d-flex align-items-center justify-content-center">
                    <div className="testimonial-content">
                      <div className="customer-img">
                        <img
                          className="img-fluid"
                          loading="lazy"
                          src={testimonial1}
                          alt="First Slide"
                        />
                      </div>
                      <div className="cta-links-area d-flex justify-content-center">
                        <div id="toggleButton4">
                          <a
                            className="btn-outline cta-link cta-link-primary"
                            href="https://www.youtube.com/watch?v=qiHlZPDVPbQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="video about the benefits of AI in education"
                          >
                            Demo Video
                          </a>
                        </div>
                      </div>
                      <div className="customer-info">
                        <div className="customer-details">
                          <p className="customer-name">Micheal Arif</p>
                          <p className="customer-role">Student</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-card d-flex align-items-center justify-content-center">
                    <div className="testimonial-content">
                      <div className="customer-img">
                        <img
                          className="img-fluid"
                          loading="lazy"
                          src={testimonial2}
                          alt="Second Slide"
                        />
                      </div>
                      <div className="cta-links-area d-flex justify-content-center">
                        <div id="toggleButton4">
                          <a
                            className="btn-outline cta-link cta-link-primary"
                            href="https://www.youtube.com/watch?v=6xKQ2Yx2MTg"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="video about the benefits of AI in education"
                          >
                            Demo Video
                          </a>
                        </div>
                      </div>
                      <div className="customer-info">
                        <div className="customer-details">
                          <p className="customer-name">Henry Lawson</p>
                          <p className="customer-role">Teacher</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-card d-flex align-items-center justify-content-center">
                    <div className="testimonial-content">
                      <div className="customer-img">
                        <img
                          className="img-fluid"
                          loading="lazy"
                          src={testimonial3}
                          alt="Third Slide"
                        />
                      </div>
                      <div className="cta-links-area d-flex justify-content-center">
                        <div id="toggleButton4">
                          <a
                            className="btn-outline cta-link cta-link-primary"
                            href="https://www.youtube.com/shorts/bBKBxK3YSWA"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="video about the benefits of AI in education"
                          >
                            Demo Video
                          </a>
                        </div>
                      </div>
                      <div className="customer-info">
                        <div className="customer-details">
                          <p className="customer-name">Janet</p>
                          <p className="customer-role">Student</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-button-prev">
                <div className="left-arrow">
                  <i className="bi bi-chevron-left icon"></i>
                </div>
              </div>
              <div className="swiper-button-next">
                <div className="right-arrow">
                  <i className="bi bi-chevron-right icon"></i>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
