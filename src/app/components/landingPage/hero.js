import React, { useState, useEffect, useCallback, useRef } from 'react';
import Particles from '@tsparticles/react';
import mic from '../../../assets/images/mic/mic.svg';
import particalConfig from '../../particals/partical.config';
import muteMic from '../../../assets/images/mic/muteMic.svg';
import micOn from '../../../assets/images/mic/mic.svg';
import classNameroomScenario from '../../../assets/images/sections-bg-images/classroomScenario.jpg';
import TD_Animation_Style_Einstein_front from '../../../assets/images/hero/3D_Animation_Style_Einstein_front.png';
// import { useNavigate } from 'react-router-dom';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import ReactMarkdown from 'react-markdown';
import { uuid_generate_v4 } from '../../../comon.lib';
import CustomModal from '../chat/customChat/custom_chat';
import { checkMicrophonePermission, requestMicrophonePermission } from '../chat/microphoneUtils';
import { initializeSpeechRecognition } from '../chat/webkitSpeechRecognition';
import { Button } from 'react-bootstrap/Button';

const Hero = () => {
  const [teacherName, setTeacherName] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micPermission, setMicPermission] = useState("prompt");
  const [showMicPermissionDialog, setShowMicPermissionDialog] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const canvasRef = useRef(null);

  // const navigate = useNavigate();
  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  const changeTeacher = (e) => {
    e.preventDefault();
    setAvatarVisible(true);
    // Logic to handle teacher change can be added here
  };

  useEffect(() => {
    const recognition = initializeSpeechRecognition('en-US', setQuestion, setIsListening);
    recognitionRef.current = recognition;

    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      console.error("Speech synthesis not supported");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, ['en-US']);

  const startVisualizing = useCallback(() => {
    if (navigator?.mediaDevices && navigator?.mediaDevices?.getUserMedia) {
      navigator?.mediaDevices?.getUserMedia({ audio: true })
        .then(stream => {
          const audioContext = new (window.AudioContext || window?.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.fftSize = 256;

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");

          const draw = () => {
            requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            if (ctx && canvas) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              const barWidth = (canvas.width / bufferLength) * 2.5;
              let barHeight;
              let x = 0;

              for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                ctx.fillStyle = "#4fff78"; // Set the bar color to green
                ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth + 1; // Space between bars
              }
            }
          };

          draw();
        })
        .catch(err => console.error('Error accessing microphone:', err));
    }
  }, []);

  const toggleListening = useCallback(async () => {
    console.log(micPermission, 'micPermission');
    if (micPermission === "prompt") {
      setShowMicPermissionDialog(true);
    } else if (micPermission === "granted") {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        try {
          await recognitionRef.current.start();
          startVisualizing();
          setIsListening(true);
        } catch (err) {
          console.error("Error starting speech recognition:", err);
          alert("Failed to start speech recognition. Please try again.");
        }
      }
    } else {
      alert(
        "Please enable microphone access in your browser settings to use voice input."
      );
    }
  }, [isListening, micPermission]);

  const checkMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission("granted");
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setMicPermission("denied");
      } else {
        console.error("Error checking microphone permission:", err);
      }
    }
  }, []);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission("granted");
      setShowMicPermissionDialog(false);
    } catch (err) {
      console.error("Error requesting microphone permission:", err);
      setMicPermission("denied");
    }
  }, []);

  const onCloseHandler = () => {
    setIsModalOpen(false);
    setQuestion('');    
  }

  const handleKeyPress = (event) => {
    if (event?.key === 'Enter') {
        setTimeout(() => {
            setIsModalOpen(true);
        }, 600); // Delay of 600 milliseconds
    }
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, [checkMicrophonePermission]);

  return (
    <React.Fragment>
      {isModalOpen && <CustomModal isOpen={isModalOpen} onClose={onCloseHandler} question={question} ref={canvasRef} setIsListening={setIsListening} isListening={isListening} toggleListening={toggleListening} mic={mic} muteMic={muteMic} />} 
  
    <section className="page-hero d-flex align-items-center" id="page-hero">
      <div className="overlay-photo-image-bg" style={{ backgroundImage: `url(${classNameroomScenario})`, opacity: 0.2 }}></div>
      {/* <div className="particles-js dots" id="particles-js"></div> */}
      <Particles id="particles-js" options={particalConfig} className='particles-js dots' />
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
                  <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="question" onKeyDown={handleKeyPress} placeholder="Enter your question..." aria-label="chatbot" autoComplete="off" />
                  <button onClick={() => {setIsModalOpen(true); setIsListening(false);}} id="ask" disabled={isLoading}>
                    Ask
                  </button>
                  <div id="mic-container">
                  <img ref={canvasRef} id={isListening ? 'mic' : 'muteMic'} src={isListening ? mic : muteMic} onClick={toggleListening} alt="" />

                    {/* <img id="mic" src={mic} alt="" />
                    <img id="muteMic" src={muteMic} alt="" /> */}
                  </div>
                </div>
                <div id="loading-image"></div>
                {response && <div id="response">
                  <ReactMarkdown
                    children={response}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  />
                </div>}
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
    {showMicPermissionDialog && (
          <div className="modal d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Microphone Access Required</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowMicPermissionDialog(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    To use voice input, we need permission to access your
                    microphone. This helps us understand what you're saying so
                    we can respond better!
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowMicPermissionDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={requestMicrophonePermission}
                  >
                    Allow Microphone Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </React.Fragment>
  );
}

export default Hero;
