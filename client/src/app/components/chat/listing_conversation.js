import React from 'react';
import { PlayCircle, StopCircle } from 'lucide-react';

const ListingConversation = ({
  selectedConversation,
  token,
  isSpeaking,
  stopSpeaking,
  speakMessage,
  chatEndRef,
}) => {
  return (
    <div
      className="flex-grow-1 p-3 overflow-auto"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      {selectedConversation?.messages?.length > 0 ? (
        selectedConversation?.messages.map((message) => (
          <React.Fragment key={message.id} className="w-100">
            <div className="d-flex justify-content-end mb-3">
              <div
                className="p-3 rounded-lg bg-primary text-white message-container"
                style={{ maxWidth: "70%", minWidth: "50%", wordBreak: "break-word" }} // Consistent width and prevent overflow
              >
                {message.prompt}
              </div>
            </div>
            <div className="d-flex justify-content-start mb-3">
              <div
                className="p-3 rounded-lg bg-light text-dark message-container"
                style={{ maxWidth: "70%", minWidth: "50%", wordBreak: "break-word" }} // Consistent width and prevent overflow
              >
                <div
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
                <div className="d-flex justify-content-end mt-2">
                  {isSpeaking ? (
                    <button
                      className="btn btn-link text-dark"
                      onClick={stopSpeaking}
                    >
                      <StopCircle size={18} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-link text-dark"
                      onClick={() => speakMessage(message.content)}
                    >
                      <PlayCircle size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
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
            Hello, {token?.user?.user_metadata?.full_name || token?.user?.user_metadata?.email || 'Muneeb'}
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