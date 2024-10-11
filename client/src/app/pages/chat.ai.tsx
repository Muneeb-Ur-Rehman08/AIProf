import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Mic,
  Send,
  Settings,
  User,
  MessageSquare,
  LogOut,
  Paperclip,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getUser, sginout, uuid_generate_v4 } from "../../comon.lib";
import ListingHistory from "../components/chat/listing_history";
import { EnhancedLoginWithSignup } from "../components/auth/enhanced-login-with-signup";
import ListingConversation from "../components/chat/listing_conversation";
import { useUserConversation } from "../context/UserConversationContext";

const getAIResponse = async (
  userId: string,
  conversationId: string,
  message: string,
  onData: (chunk: string) => void
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
        body: JSON.stringify({
          prompt: message,
          model: "mixtral-8x7b-32768",
          user_id: userId,
          conversation_id: conversationId,
        }),
      }
    );

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
      onData(chunk);
    }
  } catch (error) {
    console.error("Failed to get AI response:", error);
    throw new Error("Failed to get AI response");
  }
};

export default function MultilingualVoiceChat() {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<
    Array<{ name: string; content: string; type: string }>
  >([]);
  const [micPermission, setMicPermission] = useState<
    "granted" | "denied" | "prompt"
  >("prompt");
  const [showMicPermissionDialog, setShowMicPermissionDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showSidebar, setShowSidebar] = useState(window.innerWidth <= 768);
  const [token, setToken] = useState(getUser());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const { conversations, setConversations } = useUserConversation();
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");

        setInputValue((prevInput) => prevInput + " " + transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        alert("Failed to recognize speech. Please try again.");
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error("Speech recognition not supported");
    }

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
  }, [selectedLanguage]);

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

  const toggleListening = useCallback(async () => {
    if (micPermission === "prompt") {
      setShowMicPermissionDialog(true);
    } else if (micPermission === "granted") {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        try {
          await recognitionRef.current.start();
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

  const speakMessage = useCallback(
    (text: string) => {
      if (synthRef.current) {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage;
        utterance.onend = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
      }
    },
    [selectedLanguage]
  );

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleSend = useCallback(async () => {
    let uniqueId = uuid_generate_v4();
    let messageToSpeak = "";
    if (inputValue.trim() || attachments.length > 0) {
      setIsSending(true);
      setSelectedConversation((prevMessages: any) => {
        return {
          ...prevMessages,
          messages: [
            ...(prevMessages?.messages || []),
            {
              id: uniqueId,
              conversation_id:
                selectedConversation?.conversation_id || uuid_generate_v4(),
              prompt: inputValue,
              content: "",
              type: "text",
            },
          ],
        };
      });
      try {
        await getAIResponse(
          token?.user?.id,
          selectedConversation?.conversation_id || uuid_generate_v4(),
          inputValue,
          (chunk) => {
            setSelectedConversation((prevMessages: any) => {
              const updatedMessages = [...(prevMessages?.messages || [])];
              const messageToUpdate = updatedMessages.find(
                (message) => message?.id == uniqueId
              );
              if (messageToUpdate) {
                messageToUpdate.content += chunk;
                messageToSpeak += chunk;
              }
              return {
                ...prevMessages,
                messages: updatedMessages,
              };
            });
          }
        );
        setConversations((prevHistory: any) => {
          if (Array.isArray(prevHistory) && prevHistory?.length > 0) {
          const conversationExists = prevHistory.some(
            (conversation: any) =>
              conversation.conversation_id ===
              selectedConversation?.conversation_id
          );
          if (conversationExists) {
            return prevHistory.map((conversation: any) => {
              if (
                conversation.conversation_id ===
                selectedConversation?.conversation_id
              ) {
                return {
                  ...conversation,
                  messages: [
                    ...conversation.messages,
                    {
                      id: uniqueId,
                      conversation_id:
                        selectedConversation?.conversation_id ||
                        uuid_generate_v4(),
                      prompt: inputValue,
                      content: messageToSpeak,
                      type: "text",
                    },
                  ],
                };
              }
                return conversation;
              });
            } else {
              return [
              ...prevHistory,
              {
                conversation_id:
                  selectedConversation?.conversation_id || uuid_generate_v4(),
                messages: [
                  {
                    id: uniqueId,
                    conversation_id:
                      selectedConversation?.conversation_id ||
                      uuid_generate_v4(),
                    prompt: inputValue,
                    content: messageToSpeak,
                    type: "text",
                  },
                ],
              },
            ];
          }
        }
        });
      } catch (error) {
        console.error("Failed to get AI response:", error);
        alert("Failed to get AI response. Please try again.");
      } finally {
        setIsSending(false);
      }
      speakMessage(messageToSpeak);
    }
  }, [inputValue, attachments, selectedConversation, speakMessage]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    setIsUploading(true);
    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return {
            name: file.name,
            content: URL.createObjectURL(file),
            type: file.type,
          };
        })
      );
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        ...uploadedFiles,
      ]);
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    if (recognitionRef.current) {
      recognitionRef.current.lang = e.target.value;
    }
  };

  const handleSignOut = () => {
    sginout();
    setToken(null);
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, [checkMicrophonePermission]);

  return (
    <>
      {showLoginModal && (
        <EnhancedLoginWithSignup
          show={showLoginModal}
          handleClose={() => setShowLoginModal(false)}
          setToken={setToken}
        />
      )}
      <div
        className="vh-100 d-flex"
        style={{
          background:
            "linear-gradient(to bottom right, #ff99cc, #ff6699, #ff3366)",
        }}
      >
        {/* Sidebar */}
        <div
          className={`d-flex flex-column p-3 text-white ${
            showSidebar ? "d-block" : "d-none"
          } d-md-flex`}
          style={{
            backgroundColor: "#2c2c2e",
            // width: "25%",
            maxWidth: "30%",
            maxHeight: "100vh",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#3f3f41",
                }}
              ></div>
              <div className="fw-bold">AIProf</div>
            </div>
            <button
              className="btn btn-outline-light"
              style={{ border: "none" }}
            >
              <Settings size={18} />
            </button>
          </div>

          <div className="mb-4">
            <button
              className="btn text-white text-start mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textWrap: "nowrap",
              }}
              onClick={() => setSelectedConversation(null)}
            >
              <MessageSquare /> Ask me anything
            </button>
          </div>

          <ListingHistory setSelectedConversation={setSelectedConversation} />

          <div className="mt-auto mb-2">
            <button
              className="btn btn-outline-light w-100 d-flex flex-row justify-content-center align-items-center gap-2"
              onClick={() => setShowLoginModal(true)}
            >
              <User size={18} />{" "}
              {token?.user?.id && token?.user?.user_metadata
                ? token?.user?.user_metadata?.full_name ||
                  token?.user?.user_metadata?.email ||
                  "Muneeb"
                : "Login"}
            </button>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Sign Out Button */}
          {token?.user?.id && (
            <div className="d-flex justify-content-end p-2">
              <button className="btn btn-outline-light" onClick={handleSignOut}>
                <LogOut size={18} /> Sign Out -
              </button>
            </div>
          )}

          {/* Toggle sidebar button (visible on small screens) */}
          <button
            className="btn btn-light d-md-none position-absolute"
            style={{ top: "10px", left: "10px", zIndex: 1000 }}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <ChevronLeft /> : <ChevronRight />}
          </button>

          {/* Chat messages */}
          <ListingConversation
            selectedConversation={selectedConversation}
            token={token}
            isSpeaking={isSpeaking}
            stopSpeaking={stopSpeaking}
            speakMessage={speakMessage}
            chatEndRef={chatEndRef}
          />

          {/* Input area */}
          <div
            className="p-3"
            style={{
              backgroundColor: "rgba(255, 105, 180, 0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-light me-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={24} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
                multiple
              />
              <input
                type="text"
                className="form-control me-2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              />
              <button
                className={`btn ${
                  isListening ? "btn-danger" : "btn-outline-light"
                } me-2`}
                onClick={toggleListening}
              >
                <Mic size={24} />
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSend}
                disabled={
                  isSending || (!inputValue.trim() && attachments.length === 0)
                }
              >
                {isSending ? (
                  <Loader
                    size={24}
                    className="spinner-border spinner-border-sm"
                  />
                ) : (
                  <Send size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Microphone Permission Modal */}
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
      </div>
    </>
  );
}
