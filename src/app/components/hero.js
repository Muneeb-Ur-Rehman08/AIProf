import React, { useState } from 'react';
import TD_Animation_Style_Einstein_front from '../../assets/images/hero/3D_Animation_Style_Einstein_front.png';
import classNameroomScenario from '../../assets/images/sections-bg-images/classroomScenario.jpg';
import mic from '../../assets/images/mic/mic.svg';
import muteMic from '../../assets/images/mic/muteMic.svg';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import particalConfig from '../particals/partical.config';
import Particles from '@tsparticles/react';

// import '../../css/home.css';

const particlesLoaded = (container) => {
  console.log(container);
};

const Hero = () => {
  const [teacherName, setTeacherName] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  const changeTeacher = (e) => {
    e.preventDefault();
    setAvatarVisible(true);
    // Logic to handle teacher change can be added here
  };

  const handleAsk = () => {
    // Logic to handle asking a question can be added here
    setResponse(`You asked: ${question}`);
  };

  return (
    <section className="page-hero d-flex align-items-center" id="page-hero">
      <div className="overlay-photo-image-bg" style={{ backgroundImage: `url(${classNameroomScenario})`, opacity: 0.2 }}></div>
      {/* <div className="particles-js dots" id="particles-js"></div> */}
      <Particles options={particalConfig} className='particles-js dots' />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 pt-5 mt-2">
            <div id="title" className="hero-text-area mt-2">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className="hero-title">Ai Prof The Most <br /><span className="featured-text">Helpful Teacher<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path>
                  </svg> </span>
                    Ever!
                    <span className="design-element rounded-shape stripes"></span>
                  </h1>

                  <div className="hero-social-icons mb-3 mt-2">
                    <div className="sc-wrapper dir-row sc-flat text-center">
                      <h4>Tell your friends</h4>
                      <ul className="sc-list">
                        <li className="sc-item" title="Facebook">
                          <a className="sc-link" id="facebookShareLink" href="#0" title="social media icon">
                            <i className="fab fa-facebook-f sc-icon"></i>
                            {/* <FaFacebookF className='sc-icon fab fa-facebook-f' /> */}
                          </a>
                        </li>
                        <li className="sc-item" title="twitter">
                          <a className="sc-link" id="twitterShareLink" href="#0" title="social media icon">
                            <i className="fab fa-twitter sc-icon"></i>  
                            {/* <FaTwitter className='sc-icon fab fa-twitter' /> */}
                          </a>
                        </li>
                        <li className="sc-item" title="Whatsapp">
                          <a className="sc-link" id="whatsappShareLink" href="#0" title="social media icon">
                            <i className="fab fa-whatsapp sc-icon"></i>
                            {/* <FaWhatsapp className='sc-icon fab fa-whatsapp' /> */}
                          </a>
                        </li>
                        <li className="sc-item" title="youtube">
                          <a className="sc-link" href="https://www.youtube.com/channel/UC0eO8rFeVcQMY_RDUjzu1Gw/featured" title="youtube channel" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube sc-icon"></i>
                            {/* <FaYoutube className='sc-icon fab fa-youtube' /> */}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="cta-links-area d-flex justify-content-center">
                    <a id="toggleButton1" className="btn-outline cta-link cta-link-primary" href="https://youtu.be/iBKDmGIe3ZA" target="_blank" rel="noopener noreferrer" alt="demo video about how chatbot works">
                      Demo Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mx-md-auto col-lg-6 text-center mt-5">
            <div className="hero-image-area mb-5 mb-lg-0">
              <div className="hero-img-wraper">
                <img className="img-fluid" style={{ borderRadius: '18px' }} src={TD_Animation_Style_Einstein_front} alt="" draggable="false" id="generatedImage" />
              </div>
            </div>
            <div className="container mt-5">
              <div className="text-center">
                <button onClick={toggleInput} type="button" className={`btn-outline cta-link cta-link-primary ${inputVisible ? 'd-none' : ''}`} id="chooseTeacherBtn">Choose Your Teacher</button>
              </div>
              <form id="imageForm" onSubmit={changeTeacher}>
                <div className={`mt-3 text-center ${inputVisible ? '' : 'd-none'}`} id="input-container">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">👩‍🏫</span>
                    </div>
                    <input type="text" className="form-control mx-2" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="Enter Teacher's Name" style={{ height: '55px' }} />
                    <div className="input-group-append">
                      <button id="image-submit" type="submit" className="cta-btn btn-solid">Submit</button>
                    </div>
                  </div>
                </div>
              </form>
              <div className={`mt-3 text-center ${avatarVisible ? '' : 'd-none'}`}>
                <img id="avatar" src="placeholder_avatar.png" alt="Teacher Avatar" />
              </div>
            </div>

            <div id="ask-social">
              <div className="col-sm-8 mx-auto">
                <h4 className="mx-auto" style={{ width: 'max-content' }}>
                  Ask me anything
                </h4>
              </div>

              <div className="askContainer">
                <div className="askflex-container">
                  <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="question" placeholder="Enter your question..." aria-label="chatbot" />
                  <button onClick={handleAsk} id="ask">
                    Ask
                  </button>
                  <div id="mic-container">
                    <img id="mic" src={mic} alt="" />
                    <img id="muteMic" src={muteMic} alt="" />
                  </div>
                </div>
                <div id="loading-image"></div>
                {response && <div id="response">{response}</div>}
                <div className="speech-control">
                  <div id="speaker-container"></div>
                  <select style={{ display: 'none' }}></select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;