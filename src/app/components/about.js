import React from "react";
import aboutImage from "../../assets/images/about/Whystudentchoose.png";
import AboutUs from "../../assets/images/about/Aboutus.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import { useEffect } from "react";

const About = () => {
  return (
    <section class="about mega-section" id="about">
      <div class="container">
        <div class="content-block">
          <div class="row">
            <div
              class="col-12 col-lg-6 d-flex align-items-center order-1 order-lg-0 about-col pad-end  wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div class="text-area">
                <div class="sec-heading light-title mb-5">
                  <div class="content-area">
                    <h2
                      class="title wow fadeInUp text-center"
                      data-wow-delay=".4s"
                    >
                      {" "}
                      <span class="featured-text">
                        About AIProf{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 500 150"
                          preserveAspectRatio="none"
                        >
                          <path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path>
                        </svg>
                      </span>
                    </h2>
                  </div>
                </div>
                <div class="info-items-list">
                  <div class="row" id="featuresAbout">
                    <div class="col-9 col-xl-6">
                      <div class="info-item">
                        <i class="fas fa-universal-access info-icon"></i>
                        <div class="info-content text-center">
                          <h5 class="info-title">Dedicated to accessibility</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-9 col-xl-6">
                      <div class="info-item">
                        <i class="fas fa-user-graduate info-icon"></i>
                        <div class="info-content text-center">
                          <h5 class="info-title">Personalized education</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-9 col-xl-6">
                      <div class="info-item">
                        <i class="far fa-lightbulb info-icon"></i>
                        <div class="info-content text-center">
                          <h5 class="info-title">Creative Innovation</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-9 col-xl-6">
                      <div class="info-item">
                        <i class="fas fa-users info-icon"></i>
                        <div class="info-content text-center">
                          <h5 class="info-title">
                            Building a learning community
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cta-area">
                  <a class=" btn-solid reveal-start" href="#contact-us">
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
            <div
              class="col-12 col-lg-6 d-flex align-items-center order-0 order-lg-1 about-col  wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div class="img-area  ">
                <div class="image">
                  <img
                    class="about-img img-fluid "
                    loading="lazy"
                    src={AboutUs}
                    style={{ borderRadius: "8px" }}
                    alt="Our vision"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="stats js-stats-counter bg-transparent mega-section">
          <h2 class="text-center text-light mb-5">Our Progress so far</h2>
          <div class="container">
            <div class="stats-inner">
              <div class="row ">
                <div class="col-12 col-md-6 col-lg-3 stat-box ">
                  <div class="stat-box-inner">
                    <i class="flaticon-project-management stat-icon"></i>
                    <p class="stat-num">
                      <span
                        class="counter"
                        data-from="5"
                        data-to="503"
                        data-speed="3000"
                        data-refresh-interval="50"
                      ></span>
                    </p>
                    <span class="stat-desc">Users</span>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 stat-box ">
                  <div class="stat-box-inner">
                    <i class="flaticon-content-management stat-icon"></i>
                    <p class="stat-num ">
                      <span
                        class="counter"
                        data-from="0"
                        data-to="227"
                        data-speed="3000"
                        data-refresh-interval="50"
                      ></span>
                    </p>
                    <span class="stat-desc">Teacher Interactions</span>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 stat-box ">
                  <div class="stat-box-inner">
                    <i class="flaticon-user stat-icon"></i>
                    <p class="stat-num ">
                      <span
                        class="counter"
                        data-from="0"
                        data-to="6"
                        data-speed="3000"
                        data-refresh-interval="50"
                      ></span>
                    </p>
                    <span class="stat-desc">Avg Daily Minute</span>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 stat-box ">
                  <div class="stat-box-inner">
                    <i class="flaticon-aim stat-icon"></i>
                    <p class="stat-num ">
                      <span
                        class="counter"
                        data-from="0"
                        data-to="75"
                        data-speed="3000"
                        data-refresh-interval="50"
                      ></span>
                    </p>
                    <span class="stat-desc">Total Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="content-block mt-5" id="why">
          <div class="row">
            <div
              class="col-12 col-lg-6 d-flex align-items-center about-col  wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div class="img-area">
                <div class="image">
                  <img
                    class="about-img img-fluid "
                    loading="lazy"
                    src={aboutImage}
                    style={{ borderRadius: "8px" }}
                    alt="about"
                  />
                </div>
              </div>
            </div>
            <div
              class="col-12 col-lg-6 d-flex align-items-center about-col pad-start  wow fadeInUp "
              data-wow-delay="0.6s"
            >
              <div class="text-area ">
                <div class="sec-heading  light-title ">
                  <div class="content-area">
                    <h2 class=" title wow fadeInUp" data-wow-delay=".4s">
                      How <span class="hollow-text"> To</span> Use{" "}
                      <span class="featured-text">
                        AIProf
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 500 150"
                          preserveAspectRatio="none"
                        >
                          <path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path>
                        </svg>
                      </span>
                    </h2>
                  </div>
                </div>
                <div class="info-items-list">
                  <div class="row">
                    <div class="col-12 ">
                      <div class="info-item">
                        <span class="info-number ">01.</span>
                        <div class="info-content">
                          <h5 class="info-title">Ask Any Question (FREE)</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 ">
                      <div class="info-item">
                        <span class="info-number ">02.</span>
                        <div class="info-content">
                          <h5 class="info-title">
                            Customize Your Teacher (FREE)
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 ">
                      <div class="info-item">
                        <span class="info-number ">03.</span>
                        <div class="info-content">
                          <h5 class="info-title">
                            Book Your Teacher With A Group
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="info-item">
                        <span class="info-number ">04.</span>
                        <div class="info-content">
                          <h5 class="info-title">Book Your Own AiProf</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cta-links-area d-flex justify-content-center">
                  <a
                    id="toggleButton3"
                    class=" btn-outline cta-link cta-link-primary"
                    href="https://www.youtube.com/watch?v=ZRTOWPQkT8g"
                    target="_blank"
                    alt="video about AI Prof pricing information"
                  >
                    Demo Video <i class="bi bi-arrow-right icon "></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
