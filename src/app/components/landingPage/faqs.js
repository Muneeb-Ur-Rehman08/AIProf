import { useState } from 'react';
import FaqImage from '../../../assets/images/faq/faqpromptnew.png';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
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
              {[
                {
                  question: "What is AI Prof?",
                  answer: "AiProf transforms education by revolutionizing learning experiences, improving knowledge retention, and offering instant support, enhancing students' educational journeys."
                },
                {
                  question: "Is AI Prof free?",
                  answer: "We offer a free version with the Meet Your AI Prof chatbot for quick answers, along with two subscription plans for personalized solutions that cater to your specific needs."
                },
                {
                  question: "Is AiProf for Charity?",
                  answer: "Yes, AiProf also operates as a charity, dedicated to providing free educational resources and support to students."
                },
                {
                  question: "Is AIProf Safe?",
                  answer: "AIProf is committed to data security, employing stringent measures to safeguard your personal and business information, guaranteeing its protection."
                }
              ].map((faq, index) => (
                <div className="card mb-2" key={index}>
                  <div className="card-header" id={`heading-${index + 1}`}>
                    <h5 className="mb-0 faq-title">
                      <button
                        className="btn btn-link faq-btn collapsed"
                        onClick={() => toggleFAQ(index)}
                        aria-expanded={openIndex === index}
                        aria-controls={`collapse-${index + 1}`}
                      >
                        {faq.question}
                      </button>
                    </h5>
                  </div>
                  <div
                    className={`collapse t ${openIndex === index ? 'show' : ''}`}
                    id={`collapse-${index + 1}`}
                    aria-labelledby={`heading-${index + 1}`}
                    data-bs-parent="#accordion"
                  >
                   
                    <div className="card-body ">
                      <p className="faq-answer">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
