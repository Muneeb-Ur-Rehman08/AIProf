import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import "../../../../index.css";
import "./chat.css";
import { FiSend } from "react-icons/fi";
import { uuid_generate_v4 } from "../../../../comon.lib";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { LineWave } from "react-loader-spinner";
import { Modal } from "react-bootstrap/Modal";


export default function CustomChat({ isOpen, onClose, question,ref,isListening,toggleListening,setIsListening,mic,muteMic }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [prompt, setPrompt] = useState(question);
  const [parentMessageId, setParentMessageId] = useState(null);

  const getAIResponse = async () => {
    setMessages((prev) => [...prev, { message: prompt, sender: "user" }, { message: '', sender: "ai" }]);
    setPrompt("");
    const conversation_id = uuid_generate_v4();
    let payload = {
      content: {
        content_type: "text",
        parts: [prompt],
        created_time: new Date().toISOString(),
        role: "user",
        id: uuid_generate_v4(),
      },
      conversation_id: conversation_id,
      parent_message_id: parentMessageId,
      created_at: new Date().toISOString(),
      stream_type: "text",
    };
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "Content-Type",
        },
        body: JSON.stringify(payload),
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });
        console.log("Raw chunk:", chunk);

        try {
          // Remove any leading/trailing whitespace and ensure valid JSON
          const cleanedChunk = chunk.trim();
          if (!cleanedChunk) continue;

          const parsedChunk = JSON.parse(cleanedChunk);
          console.log("Parsed chunk:", parsedChunk);

          if (
            parsedChunk &&
            Array.isArray(parsedChunk.parts) &&
            parsedChunk.parts.length > 0
          ) {
            // Try to parse the nested JSON string in parts
            const innerContent = JSON.parse(parsedChunk.parts[0]);
            console.log("Inner content:", innerContent);

            if (
              innerContent &&
              Array.isArray(innerContent.parts) &&
              innerContent.parts.length > 0
            ) {
              const messageText = innerContent.parts[0];
              console.log("Message text:", messageText);

              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.sender === "ai") {
                  lastMessage.message += messageText;
                  return [...prev];
                } else {
                  return [...prev, { message: messageText, sender: "ai" }];
                }
              });
            }
          }
          if (parsedChunk?.error) {
            const errorMessage = parsedChunk.error;
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.sender === "ai") {
                  lastMessage.message += errorMessage;
                  return [...prev];
                } else {
                  return [...prev, { message: errorMessage, sender: "ai" }];
                }
            });
          }
        } catch (e) {
          console.error("Error processing chunk:", e);
          // If JSON parsing fails, try to display the chunk directly
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.sender === "ai") {
              lastMessage.message += chunk;
              return [...prev];
            } else {
              return [...prev, { message: chunk, sender: "ai" }];
            }
          });
        }
      }
    } catch (error) {
      console.error("Failed to get AI response:", error);
      throw new Error("Failed to get AI response");
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  useEffect(() => {
    // scroll to the end of message list
    const messageList = document.querySelector(".message-list");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    if (prompt) {
      setParentMessageId(uuid_generate_v4());
      getAIResponse();
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isOpen]);

  // const toggleListening = () => {

  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <MDBContainer >
    <MDBRow className="modal position-fixed d-flex justify-content-center align-items-center mx-auto">
      <MDBCol md="7" lg="6" xl="7" xxl="7" className="chat-container">
        <MDBCard className="mask-custom">
          <MDBCardBody className="p-0">
            <div className="d-flex justify-content-between justify-items-center p-2 border-bottom-color header-chat">
              <h5 className="pt-2">AI Prof</h5>
                {/* <IoCloseCircle className="leftright m-2" /> */}
               
              <div className="close-container" onClick={onClose}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
              </div>
            </div>
            <MDBTypography className="text-white mb-0 pb-0">
              <ul className="message-list">
                {messages.map((message, index) =>   <>                 
                {(isLoading && index == messages.length - 1 && message?.message?.length < 1) ? <LineWave
                      visible={true}
                      height="75"
                      width="75"
                      color="#4fa94d"
                      ariaLabel="line-wave-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    /> : <MessageBody key={index} message={message} />
                }
                </>
                )}
              </ul>
              {/* <li className="mb-3 border-top-color"> */}
              {/* <MDBTextArea label="Message" id="textAreaExample" rows={4} /> */}
              {/* </li> */}
              <div className="d-flex align-items-center p-3 m-0 mb-1 border-top-color footer-chat">
                <input
                  type="text"
                  className="form-control me-2 input-chat shadow-lg"
                  placeholder="Enter your Question"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="mic-container">
                  <img className="" src={isListening ? mic : muteMic} id={isListening ? 'mic' : 'muteMic'} alt="" ref={ref} onClick={toggleListening} />
                </div>
                <div>
                  <FiSend
                    className="cursor-send shadow-lg"
                    onClick={getAIResponse}
                  />
                </div>
              </div>
            </MDBTypography>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </MDBContainer>
  );
}

const MessageBody = ({ message }) => {
  
 let error = false;
 let text = message.message;
 if (message.message.startsWith('!!') && message.message.endsWith('!!')) {
   error = true;
   text = message.message.replaceAll('!!', '');
 }

  return (
    <li
      className={`d-flex justify-content-${
        message.sender === "user" ? "end" : "start"
      } mb-4`}
    >
      <div
        className={`mask-custom shadow-lg ${
          message.sender === "user"
            ? "bg-main text-black font-weight-bol"
            : "bg-secondary"
        }`}
      >
        <p className="pr-3 pl-3 pt-3 ">
          <p className={`mb-0 ${error ? 'text-danger' : ''}`}>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              children={text}
            />
          </p>
        </p>
      </div>
    </li>
  );
};
