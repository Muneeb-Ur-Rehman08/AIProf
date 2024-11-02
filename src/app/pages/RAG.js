import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeacherContext } from "../context/teacherContext";
import { Loader, Send, Upload } from "lucide-react";
import { MutatingDots } from "react-loader-spinner";
import { MDBCard, MDBCardBody, MDBCol, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import '../components/chat/customChat/chat.css'
import { cloneDeep } from "lodash";


function RAG() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { doc_id, setDocId, addNewQna, doc_name, setDocName } = useTeacherContext();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFetchingAnswer, setIsFetchingAnswer] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitPdf = async () => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", file.name);
      formData.append("file_type", file.type);

      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/upload_doc/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setDocId(res.data.result.id);
          setDocName(res.data.result.source.replace(/(_|\.pdf)/g, " "));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No file selected");
    }
    setLoading(false);
  };

  const handleQuestionSubmit = () => {
    const question = cloneDeep(inputValue);
    setInputValue("");
    setIsFetchingAnswer(true);
    if (question) {
      addNewQna({message: question, sender: "user"});
      axios
        .post(`${process.env.REACT_APP_API_URL}api/rag/`, {
          question: question,
          doc_id: doc_id,
        })
        .then((res) => {
          addNewQna({message: res.data.answer, sender: "bot"});
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } else {
      console.log("No question entered");
    }
    setIsFetchingAnswer(false);
  };

  const handleKeyPress = (e) => {    
    if (e.key === "Enter" && !e.shiftKey) {
      handleQuestionSubmit();
    }
  };

  useEffect(() => {
    if (file && file.name) {
      handleSubmitPdf();
      setFile(null);
    }
  }, [file]);


  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "linear-gradient(to right, #2b1055, #7597de)" }}
      >
        {loading && (
          <div className="mutating-dots-loading">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {doc_id ? (
          <div className="w-75">
            <p>Doc ID: {doc_id}</p>
            {/* display the file first page */}
            <div>
              {/* replace all _ and extension */}
              <p>File Name: {doc_name.replace('temp\\', '')}</p>
            </div>

            {/* chatbot UI Listing */}
            <ChatbotUIListing />

            {/* create chatbot UI */}
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message here..."
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Lighter input background
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleQuestionSubmit}
                disabled={loading || !inputValue.trim()}
              >
                {loading ? (
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
        ) : (
          <div
            className="card p-4 text-center"
            style={{
              width: "300px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              color: "#fff",
            }}
          >
            <h5 className="mb-3">Upload File</h5>
            <p className="mb-4" style={{ fontSize: "14px" }}>
              Drag and drop your file here or click to browse
            </p>

            <div
              className="file-upload-wrapper"
              style={{
                border: "2px dashed rgba(255, 255, 255, 0.4)",
                borderRadius: "8px",
                padding: "20px",
                position: "relative",
              }}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              <i
                className="bi bi-upload"
                style={{ fontSize: "2rem", color: "rgba(255, 255, 255, 0.7)" }}
              ></i>
            </div>

            <button
              className="btn mt-3"
              style={{
                backgroundColor: "#a563ff",
                color: "#fff",
                borderRadius: "5px",
                fontSize: "14px",
              }}
              onClick={handleSubmitPdf}
            >
              Choose File
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const ChatbotUIListing = () => {
  const { qna } = useTeacherContext();
  return (
    // <MDBRow center className="modal">
    //   <MDBCol md="7" lg="6" xl="7" xxl="7" className="mb-4 mb-md-0">
    //     <MDBCard className="mask-custom">
    <>
          <MDBCardBody className="p-0">
            <MDBTypography className="text-white mb-0 pb-0">
              <ul className="message-list">
                {Array.isArray(qna) && qna.length > 0 ? (
                  qna.map((ans, index) => (
                    <li key={index} className={`d-flex justify-content-${ans.sender === "user" ? "end" : "start"} mb-4`}>
                      <div className="mask-custom shadow-lg bg-secondary">
                        <p className="pr-3 pl-3 pt-3 mb-0">
                          <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            children={ans.message}
                          />
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="d-flex justify-content-center mb-4">
                    <div className="mask-custo">
                      <p className="pr-3 pl-3 pt-3 mb-0">No QnA</p>
                    </div>
                  </li>
                )}
              </ul>
            </MDBTypography>
          </MDBCardBody>
        {/* </MDBCard>
      </MDBCol>
      </MDBRow> */}
      </>
  );
};

export default RAG;
