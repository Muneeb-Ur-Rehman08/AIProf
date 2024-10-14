import React from "react";
import { PlayCircle, StopCircle } from "lucide-react";
import { useUserConversation } from "../../context/UserConversationContext";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { LineWave } from "react-loader-spinner";

const ListingConversation = ({
  selectedConversation,
  isSpeaking,
  stopSpeaking,
  speakMessage,
  chatEndRef,
}) => {
  const { session } = useUserConversation();
  return (
    <div
      className="flex-grow-1 p-3 overflow-auto"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {selectedConversation?.messages?.length > 0 ? (
        selectedConversation?.messages.map((message) => (
          <div key={message.id} style={{ width: "90%" }} className="mx-auto">
            <div className="d-flex justify-content-end mb-3">
              <div
                className="p-3 rounded-pill text-white message-container bg-primary"
                style={{
                  maxWidth: "70%",
                  minWidth: "50%",
                  wordBreak: "break-word",
                  // backgroundColor: "#7A8396",
                }} // Consistent width and prevent overflow
              >
                {message.prompt}
              </div>
            </div>
            <div className="d-flex justify-content-start mb-3">
              {message.content ? (
                <div
                  className="p-3 rounded-lg text-light message-container position-relative"
                  style={{
                    maxWidth: "70%",
                    minWidth: "50%",
                    wordBreak: "break-word",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                  }} // Consistent width and prevent overflow
                >
                  <ReactMarkdown
                    children={message.content}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  />
                  <div className="position-absolute cursor-pointer" style={{bottom: "10px", right: "10px"}}>
                    {isSpeaking.speaking && isSpeaking.id == message.id ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => stopSpeaking(message.id)}
                        style={{cursor: "pointer"}}
                      >
                        <StopCircle size={18} />
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={() => speakMessage(message.content, message.id)}
                        style={{cursor: "pointer"}}
                      >
                        <PlayCircle size={18} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <LineWave
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
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center w-100"
          style={{ height: "100%", textAlign: "center" }}
        >
          <div
            className="text-light mb-3"
            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Hello,{" "}
            {session?.user?.user_metadata?.full_name ||
              session?.user?.user_metadata?.email ||
              "There"}
          </div>
          <div
            className="text-light mb-3"
            style={{ fontSize: "1.2rem", fontStyle: "italic" }}
          >
            How can I help you today?
          </div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ListingConversation;
