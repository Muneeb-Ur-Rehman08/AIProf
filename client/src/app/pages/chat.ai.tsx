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
import { getUser, Teachers, uuid_generate_v4 } from "../../comon.lib";
import ListingHistory from "../components/chat/listing_history";
import { EnhancedLoginWithSignup } from "../components/auth/enhanced-login-with-signup";
import ListingConversation from "../components/chat/listing_conversation";
import { useUserConversation } from "../context/UserConversationContext";
import SupabaseAuth from "../components/auth/supabase-auth";
import "../../css/chat-layout.css";
import SelectField from "../components/select-field";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const getAIResponse = async (
  userId: string,
  conversationId: string,
  message: string,
  onData: (chunk: string) => void
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/chat_ai`,
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
  const [isSpeaking, setIsSpeaking] = useState({
    speaking: false,
    id: "",
  });
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
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const [showSidebar, setShowSidebar] = useState(window.innerWidth <= 768);
  const [token, setToken] = useState(getUser());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [speakingMode, setSpeakingMode] = useState(false);
  const { conversations, setConversations, signOut, session, selectedConversation, setSelectedConversation } = useUserConversation();
  // get teacher and question from url
  const teacherName = localStorage.getItem("teacherName");
  const question = localStorage.getItem("question");
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

        setInputValue((prevInput) => transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        console.error("Failed to recognize speech. Please try again.");
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

  const startVisualizing = useCallback(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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

  const speakMessage = useCallback(
    (text: string, id: string) => {
        stopSpeaking();
      if (synthRef.current) {
        setIsSpeaking({
          speaking: true,
          id: id,
        });
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage;
        utterance.onend = () => setIsSpeaking({
          speaking: false,
          id: "",
        });
        synthRef.current.speak(utterance);
      }
    },
    [selectedLanguage]
  );

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking({
        speaking: false,
        id: "",
      });
    }
  }, []);

  const handleSend = useCallback(async (inputValue: string) => {
    let uniqueId = uuid_generate_v4();
    let conversationId = selectedConversation?.conversation_id || uuid_generate_v4();
    let messageToSpeak = {
      id: '',
      content: '',
    };
    if (inputValue.trim() || attachments.length > 0) {
      setIsSending(true);
      setSelectedConversation((prevMessages: any) => {
        return {
          ...prevMessages,
          conversation_id: conversationId,
          title: inputValue,
          messages: [
            ...(prevMessages?.messages || []),
            {
              id: uniqueId,
              conversation_id: conversationId,
              prompt: inputValue,
              content: "",
              type: "text",
            },
          ],
        };
      });
      try {
        await getAIResponse(
          session?.user?.id,
          conversationId,
          inputValue,
          (chunk) => {
            setSelectedConversation((prevMessages: any) => {
              const updatedMessages = [...(prevMessages?.messages || [])];
              const messageToUpdate = updatedMessages.find(
                (message) => message?.id == uniqueId
              );
              if (messageToUpdate) {
                messageToUpdate.content += chunk;
                messageToSpeak.content += chunk;
                messageToSpeak.id = messageToUpdate?.id;
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
              conversation.conversation_id === conversationId
          );
          if (conversationExists) {
            return prevHistory.map((conversation: any) => {
              if (
                conversation.conversation_id === conversationId
              ) {
                return {
                  ...conversation,
                  messages: [
                    ...conversation.messages,
                    {
                      id: uniqueId,
                      conversation_id: conversationId,
                      prompt: inputValue,
                      content: messageToSpeak.content,
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
                conversation_id: conversationId,
                messages: [
                  {
                    id: uniqueId,
                    conversation_id: conversationId,
                    prompt: inputValue,
                    content: messageToSpeak.content,
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
        console.error("Failed to get AI response. Please try again.", error);
      } finally {
        setIsSending(false);
      }
      if (speakingMode) {
        speakMessage(messageToSpeak.content, messageToSpeak.id);
      }
    }
    setInputValue("");
    localStorage.removeItem("teacherName");
    localStorage.removeItem("question");
  }, [inputValue, attachments, selectedConversation, speakMessage]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
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

  useEffect(() => {
    checkMicrophonePermission();
  }, [checkMicrophonePermission]);

  useEffect(() => {
    if (question) {
      setInputValue(question);
      handleSend(question);
    }
  }, [question]);


  return (
    <>
      {showLoginModal && !session && (
          <SupabaseAuth 
            handleCancel={() => setShowLoginModal(false)}
          />
      )}
      <div
        className="vh-100 row"
        style={{
          // background:
          //   "linear-gradient(to bottom right, #ff99cc, #ff6699, #ff3366)",
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
        }}
      >
        {/* Sidebar */}
        <div
          className={`px-3 mx-2 py-2 bg-dark text-white col-md-3 col-lg-2 d-flex flex-column w-100  ${
            showSidebar ? "d-block" : "d-none"
          } d-md-block`}
          style={{
            // backgroundColor: "#2c2c2e",
            height: "100vh",
            position: "relative",
            borderRight: "1px solid #4d4949",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle"
                style={{
                  backgroundColor: "#3f3f41",
                }}
              ></div>
              <div className="fw-bold">AIProf</div>
            </div>
            <div className="position-relative">
              <button
                className="btn btn-outline-light chat-layout-button"
                style={{ border: "none" }}
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                // onBlur={() => setShowSettingsDropdown(false)}
              >
                <Settings size={18} />
              </button>
              {/* {showSettingsDropdown && session && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "#343a40",
                    border: "none",
                    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <button
                    className="dropdown-item text-white"
                    onClick={ () => {
                      signOut();
                      setShowSettingsDropdown(false);
                    }}
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              )} */}
            </div>
          </div>

          <div className="mb-4">
            <button
              className="w-100 btn text-white text-start mb-3 d-flex flex-row align-items-center gap-2 p-2 rounded-4 chat-layout-button"
              onClick={() => setSelectedConversation(null)}
            >
              <MessageSquare /> Ask me anything
            </button>
          </div>

          <ListingHistory setSelectedConversation={setSelectedConversation} />

          <div className="position-absolute " style={{ bottom: "16px", left: "20px", right: "20px" }}>
            <button
              className="btn btn-outline-light outline-none w-100 d-flex flex-row justify-content-center align-items-center gap-2 chat-layout-button"
              onClick={() => {
                if (session) {
                  signOut();
                } else {
                  setShowLoginModal(true);
                }
              }}
            >
              <User size={18} />{" "}
              {session ? "Sign Out" : "Login"}
            </button>
          </div>
        </div>

        {/* Main chat area */}
        <div className="d-flex flex-column col-md-9 col-lg-10 w-100 mb-auto" style={{ height: "100vh"}}>
          {/* Sign Out Button */}
          <div className="p-2 w-100 d-flex flex-row gap-2">
            <div className="w-25">
              <SelectField
                options={Teachers}
                onChange={(value: any) => console.log(value)}
              />
            </div>
          {/* toggle button to change the speaking state */}
          <BootstrapSwitchButton checked={speakingMode} width={75} height={25} onlabel="Speak" offlabel="Mute" onChange={() => setSpeakingMode(!speakingMode)}
          onstyle="primary"
          offstyle="secondary"
          />
          </div>
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
              <div
                className={`btn me-2`}
                onClick={toggleListening}
                style={{
                  backgroundColor: isListening ? "dark" : "rgba(255, 255, 255, 0.1)",
                  border: isListening ? "2px solid dark" : "2px solid rgba(255, 255, 255, 0.1)",
                  transition: "background-color 0.3s, border 0.3s",
                }}
              >
                {isListening ? (
                  <canvas ref={canvasRef} width={24} height={18} style={{ rotate: "-90deg", opacity: 1 }} />
                ) : (
                  <Mic size={24} />
                )}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => handleSend(inputValue)}
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
      </div>
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
    </>
  );
}
