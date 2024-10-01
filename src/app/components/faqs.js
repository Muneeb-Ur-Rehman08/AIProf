import FaqImage from '../../assets/images/faq/faqpromptnew.png';
const Faqs = () => {
  return (
    <section className="faq mega-section" id="faq">
      <div className="shape-top-left"></div>
      <div className="shape-bottom-right"></div>
      <div className="pattern-top-end-dir"></div>
      <div className="pattern-bottom-start-dir"></div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5 align-self-center">
            <div
              className="faq-img start-dir-img-frame wow fadeIn"
              data-wow-delay="0.2s"
            >
              <img
                className="img-fluid "
                loading="lazy"
                src={FaqImage}
                style={{ borderRadius: "8px" }}
                alt=""
              />
            </div>
          </div>
          <div className="col-12 col-lg-7 ">
            <div className="sec-heading">
              <div className="content-area">
                <h2 className="title wow fadeInUp text-center" data-wow-delay=".2s">
                  <span className="hollow-text">Your</span> Questions{" "}
                </h2>
              </div>
            </div>
            <div className="faq-accordion " id="accordion">
              <div className="card mb-2">
                <div className="card-header " id="heading-1">
                  <h5 className="mb-0 faq-title">
                    <button
                      className="btn btn-link  faq-btn  collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-1"
                      aria-expanded="true"
                      aria-controls="collapse-1"
                    >
                      What is AI Prof?
                    </button>
                  </h5>
                </div>
                <div
                  className="collapse "
                  id="collapse-1"
                  aria-labelledby="collapse-1"
                  data-bs-parent="#accordion"
                >
                  <div className="card-body">
                    <p className="faq-answer">
                      AiProf transforms education by revolutionizing learning
                      experiences, improving knowledge retention, and offering
                      instant support, enhancing students' educational journeys.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-header " id="heading-2">
                  <h5 className="mb-0 faq-title">
                    <button
                      className="btn btn-link  faq-btn  collapsed "
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-2"
                      aria-expanded="true"
                      aria-controls="collapse-2"
                    >
                      Is AI Prof free?
                    </button>
                  </h5>
                </div>
                <div
                  className="collapse "
                  id="collapse-2"
                  aria-labelledby="collapse-2"
                  data-bs-parent="#accordion"
                >
                  <div className="card-body">
                    <p className="faq-answer">
                      We offer a free version with the Meet Your AI Prof chatbot
                      for quick answers, along with two subscription plans for
                      personalized solutions that cater to your specific needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-header " id="heading-3">
                  <h5 className="mb-0 faq-title">
                    <button
                      className="btn btn-link  faq-btn  collapsed "
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-3"
                      aria-expanded="true"
                      aria-controls="collapse-3"
                    >
                      Is AiProf for Charity?
                    </button>
                  </h5>
                </div>
                <div
                  className="collapse "
                  id="collapse-3"
                  aria-labelledby="collapse-3"
                  data-bs-parent="#accordion"
                >
                  <div className="card-body">
                    <p className="faq-answer">
                      Yes, AiProf also operates as a charity, dedicated to
                      providing free educational resources and support to
                      students.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card mb-2">
                <div className="card-header " id="heading-4">
                  <h5 className="mb-0 faq-title">
                    <button
                      className="btn btn-link  faq-btn  collapsed "
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-4"
                      aria-expanded="true"
                      aria-controls="collapse-4"
                    >
                      Is AIProf Safe?
                    </button>
                  </h5>
                </div>
                <div
                  className="collapse "
                  id="collapse-4"
                  aria-labelledby="collapse-4"
                  data-bs-parent="#accordion"
                >
                  <div className="card-body">
                    <p className="faq-answer">
                      AIProf is committed to data security, employing stringent
                      measures to safeguard your personal and business
                      information, guaranteeing its protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
