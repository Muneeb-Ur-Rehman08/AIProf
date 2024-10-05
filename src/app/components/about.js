import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import aboutImage from "../../assets/images/about/Whystudentchoose.png";
import AboutUs from "../../assets/images/about/Aboutus.png";

const About = ({ activeSection, startCounter, setStartCounter }) => {

  useEffect(() => {
    if (activeSection == "about" && !startCounter) { 
      setTimeout(() => {
        setStartCounter(true);
      }, 3500);
    }
  }, [activeSection, startCounter, setStartCounter]);


  return (
    <section className="about mega-section" id="about">
      <div className="container">
        <div className="content-block">
          <div className="row">
            <div
              className="col-12 col-lg-6 d-flex align-items-center order-1 order-lg-0 about-col pad-end  wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="text-area">
                <div className="sec-heading light-title mb-5">
                  <div className="content-area">
                    <h2
                      className="title wow fadeInUp text-center"
                      data-wow-delay=".4s"
                    >
                      {" "}
                      <span className="featured-text">
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
                <div className="info-items-list">
                  <div className="row" id="featuresAbout">
                    <div className="col-9 col-xl-6">
                      <div className="info-item">
                        <i className="fas fa-universal-access info-icon"></i>
                        <div className="info-content text-center">
                          <h5 className="info-title">Dedicated to accessibility</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-9 col-xl-6">
                      <div className="info-item">
                        <i className="fas fa-user-graduate info-icon"></i>
                        <div className="info-content text-center">
                          <h5 className="info-title">Personalized education</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-9 col-xl-6">
                      <div className="info-item">
                        <i className="far fa-lightbulb info-icon"></i>
                        <div className="info-content text-center">
                          <h5 className="info-title">Creative Innovation</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-9 col-xl-6">
                      <div className="info-item">
                        <i className="fas fa-users info-icon"></i>
                        <div className="info-content text-center">
                          <h5 className="info-title">
                            Building a learning community
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cta-area">
                  <a className=" btn-solid reveal-start" href="#contact-us">
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-lg-6 d-flex align-items-center order-0 order-lg-1 about-col  wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="img-area  ">
                <div className="image">
                  <img
                    className="about-img img-fluid "
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
        <section className="stats js-stats-counter bg-transparent mega-section">
          <h2 className="text-center text-light mb-5">Our Progress so far</h2>
          <div className="container">
            <div className="stats-inner">
              <div className="row ">
                <div className="col-12 col-md-6 col-lg-3 stat-box ">
                  <div className="stat-box-inner">
                    <i className="flaticon-project-management stat-icon"></i>
                    <p className="stat-num">
                      <span
                        className="counter"
                        data-from="5"
                        data-to="503"
                        data-speed="3000"
                        data-refresh-interval="50"
                      >
                        {(activeSection === "about" && !startCounter) ? <CountUp start={0} end={503} duration={3} /> : 503}
                      </span>
                    </p>
                    <span className="stat-desc">Users</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 stat-box ">
                  <div className="stat-box-inner">
                    <i className="flaticon-content-management stat-icon"></i>
                    <p className="stat-num ">
                      <span className="counter">
                        {(activeSection === "about" && !startCounter) ? <CountUp start={0} end={227} duration={3} /> : 227}
                      </span>
                    </p>
                    <span className="stat-desc">Teacher Interactions</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 stat-box ">
                  <div className="stat-box-inner">
                    <i className="flaticon-user stat-icon"></i>
                    <p className="stat-num ">
                      <span className="counter">
                        {(activeSection === "about" && !startCounter) ? <CountUp start={0} end={6} duration={5} /> : 6}
                      </span>
                    </p>
                    <span className="stat-desc">Avg Daily Minute</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 stat-box ">
                  <div className="stat-box-inner">
                    <i className="flaticon-aim stat-icon"></i>
                    <p className="stat-num ">
                      <span className="counter">
                        {(activeSection === "about" && !startCounter) ? <CountUp start={0} end={75} duration={3} /> : 75}
                      </span>
                    </p>
                    <span className="stat-desc">Total Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="content-block mt-5" id="why">
          <div className="row">
            <div
              className="col-12 col-lg-6 d-flex align-items-center about-col  wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="img-area">
                <div className="image">
                  <img
                    className="about-img img-fluid "
                    loading="lazy"
                    src={aboutImage}
                    style={{ borderRadius: "8px" }}
                    alt="about"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-12 col-lg-6 d-flex align-items-center about-col pad-start  wow fadeInUp "
              data-wow-delay="0.6s"
            >
              <div className="text-area ">
                <div className="sec-heading  light-title ">
                  <div className="content-area">
                    <h2 className=" title wow fadeInUp" data-wow-delay=".4s">
                      How <span className="hollow-text"> To</span> Use{" "}
                      <span className="featured-text">
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
                <div className="info-items-list">
                  <div className="row">
                    <div className="col-12 ">
                      <div className="info-item">
                        <span className="info-number ">01.</span>
                        <div className="info-content">
                          <h5 className="info-title">Ask Any Question (FREE)</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="info-item">
                        <span className="info-number ">02.</span>
                        <div className="info-content">
                          <h5 className="info-title">
                            Customize Your Teacher (FREE)
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="info-item">
                        <span className="info-number ">03.</span>
                        <div className="info-content">
                          <h5 className="info-title">
                            Book Your Teacher With A Group
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="info-item">
                        <span className="info-number ">04.</span>
                        <div className="info-content">
                          <h5 className="info-title">Book Your Own AiProf</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cta-links-area d-flex justify-content-center">
                  <a
                    id="toggleButton3"
                    className=" btn-outline cta-link cta-link-primary"
                    href="https://www.youtube.com/watch?v=ZRTOWPQkT8g"
                    target="_blank"
                    alt="video about AI Prof pricing information"
                  >
                    Demo Video <i className="bi bi-arrow-right icon "></i>
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
