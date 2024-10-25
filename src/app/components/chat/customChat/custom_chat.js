import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import '../../../../index.css';
import './chat.css';

export default function CustomChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      message: 'Hello, how are you?'
    },
    {
      sender: 'bot',
      message: 'I am fine, thank you for asking!'
    },
    {
      sender: 'user',
      message: 'What is the capital of France?'
    },
    {
      sender: 'bot',
      message: 'The capital of France is Paris.'
    },
    {
      sender: 'user',
      message: 'Thank you!'
    },
    {
      sender: 'bot',
      message: 'You are welcome!'
    },
    {
      sender: 'user',
      message: 'Hello, how are you?'
    },
    {
      sender: 'bot',
      message: 'I am fine, thank you for asking!'
    },
    {
      sender: 'user',
      message: 'What is the capital of France?'
    },
    {
      sender: 'bot',
      message: 'The capital of France is Paris.'
    },
    {
      sender: 'user',
      message: 'Thank you!'
    },
    {
      sender: 'bot',
      message: 'You are welcome!'
    },
    {
      sender: 'user',
      message: 'Hello, how are you?'
    },
    {
      sender: 'bot',
      message: 'I am fine, thank you for asking!'
    },
    {
      sender: 'user',
      message: 'What is the capital of France?'
    },
    {
      sender: 'bot',
      message: 'The capital of France is Paris.'
    },
    {
      sender: 'user',
      message: 'Thank you!'
    },
    {
      sender: 'bot',
      message: 'You are welcome!'
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }

    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="modal">
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <MDBCard className="mask-custom">
            <MDBCardBody>
              <div className="d-flex justify-content-end mr-3 mb-4">
                <div className="close-container" onClick={onClose}>
                  <div className="leftright"></div>
                  <div className="rightleft"></div>
                </div>
              </div>
              <MDBTypography className="text-white">
                <ul className="message-list">
                  {messages.map((message, index) => (
                    <MessageBody key={index} message={message} />
                  ))}
                </ul>
                <li className="mb-3">
                  {/* <MDBTextArea label="Message" id="textAreaExample" rows={4} /> */}
                </li>
                <MDBBtn color="light" size="lg" rounded className="float-end">
                  Send
                </MDBBtn>
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

const MessageBody = ({ message }) => {
  return (
    <li className={`d-flex justify-content-${message.sender === 'user' ? 'end' : 'start'} mb-4`}>
      <MDBCard className="mask-custom">
        <MDBCardBody>
          <p className="mb-0">
            {message.message}
          </p>
        </MDBCardBody>
      </MDBCard>
    </li>
  );
}
