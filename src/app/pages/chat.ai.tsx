import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Mic, Send, Plus, Settings, User, MessageSquare, Book, LogOut, 
  File, VolumeX, Image as ImageIcon, Paperclip, Smile, Loader, StopCircle,
  PlayCircle
} from 'lucide-react';
import axios from 'axios';

// Import Bootstrap CSS (make sure this path is correct)
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JS (make sure this path is correct)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Simulated AI response function
const getAIResponse = async (message: string, onData: (chunk: string) => void): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        prompt: message,
        model: 'mixtral-8x7b-32768',
      }),
    });

    if (!response.body) {
      throw new Error('ReadableStream not supported');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value, { stream: true });
      onData(chunk);
    }
  } catch (error) {
    console.error('Failed to get AI response:', error);
    throw new Error('Failed to get AI response');
  }
};

export default function MultilingualVoiceChat() {
  const [messages, setMessages] = useState<Array<{ id: number; prompt: string; content: string; type: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<Array<{ name: string; content: string; type: string }>>([]);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [showMicPermissionDialog, setShowMicPermissionDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        setInputValue(prevInput => prevInput + ' ' + transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        alert("Failed to recognize speech. Please try again.");
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition not supported');
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      console.error('Speech synthesis not supported');
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
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setMicPermission('denied');
      } else {
        console.error('Error checking microphone permission:', err);
      }
    }
  }, []);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission('granted');
      setShowMicPermissionDialog(false);
    } catch (err) {
      console.error('Error requesting microphone permission:', err);
      setMicPermission('denied');
    }
  }, []);

  const toggleListening = useCallback(async () => {
    if (micPermission === 'prompt') {
      setShowMicPermissionDialog(true);
    } else if (micPermission === 'granted') {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        try {
          await recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.error('Error starting speech recognition:', err);
          alert("Failed to start speech recognition. Please try again.");
        }
      }
    } else {
      alert("Please enable microphone access in your browser settings to use voice input.");
    }
  }, [isListening, micPermission]);

  const speakMessage = useCallback((text: string) => {
    if (synthRef.current) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    }
  }, [selectedLanguage]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleSend = useCallback(async () => {
    let uniqueId = Math.floor(10000000000 + Math.random() * 90000000000);
    let messageToSpeak = '';
    if (inputValue.trim() || attachments.length > 0) {
      setIsSending(true);
      setMessages(prevMessages => [...prevMessages, { id: uniqueId, prompt: inputValue, content: '', type: 'text' }]);
      setInputValue('');
      setAttachments([]);

      try {
        await getAIResponse(inputValue, (chunk) => {
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            const messageToUpdate = updatedMessages.find(message => message.id == uniqueId);
            if (messageToUpdate) {
              messageToUpdate.content += chunk;
              messageToSpeak += chunk;
            }
            return updatedMessages;
          });
        });
      } catch (error) {
        console.error('Failed to get AI response:', error);
        alert("Failed to get AI response. Please try again.");
      } finally {
        setIsSending(false);
      }
      speakMessage(messageToSpeak);
    }
  }, [inputValue, attachments, messages, speakMessage]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setIsUploading(true);
    try {
      const uploadedFiles = await Promise.all(files.map(async (file) => {
        // Simulating file upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { name: file.name, content: URL.createObjectURL(file), type: file.type };
      }));
      setAttachments(prevAttachments => [...prevAttachments, ...uploadedFiles]);
    } catch (error) {
      console.error('File upload failed:', error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prevAttachments => prevAttachments.filter((_, i) => i !== index));
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

  return (
    <div className="container-fluid vh-100 d-flex" style={{ background: 'linear-gradient(to bottom right, #ff99cc, #ff6699, #ff3366)' }}>
      {/* Sidebar */}
      <div className="d-flex flex-column align-items-center p-3 text-white" style={{ backgroundColor: '#212529', width: '80px' }}>
        <button className="btn btn-link text-white mb-3"><MessageSquare /></button>
        <button className="btn btn-link text-white mb-3"><Book /></button>
        {/* Chat sections (for categories or topics) */}
        <div className="p-3 mt-3" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff20', width: '60px', height: '60px', color: 'white' }}>Topic 1</div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff20', width: '60px', height: '60px', color: 'white' }}>Topic 2</div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#ffffff20', width: '60px', height: '60px', color: 'white' }}>Topic 3</div>
        </div>
        <button className="btn btn-link text-white mb-3"><Settings /></button>
        <button className="btn btn-link text-white mt-auto mb-3"><User /></button>
        <button className="btn btn-link text-white"><LogOut /></button>
        
      </div>

      {/* Main chat area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Chat messages */}
        <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          {messages.length > 0 ? messages.map((message) => (
            <>
            {/* User message */}
           <div className='d-flex justify-content-end mb-3'>
            <div className='p-3 rounded-lg bg-primary text-white' style={{ maxWidth: '70%' }}>
              {message.prompt}
            </div>
            </div>
            {/* AI message */}
            <div className='d-flex justify-content-start mb-3'>
              <div className='p-3 rounded-lg bg-light text-dark' style={{ maxWidth: '70%' }}>
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              <div className="d-flex justify-content-end mt-2">
                {isSpeaking ? (
                  <button className="btn btn-link text-dark" onClick={stopSpeaking}><StopCircle size={18} /></button>
                ) : (
                  <button className="btn btn-link text-dark" onClick={() => speakMessage(message.content)}><PlayCircle size={18} /></button>
                )}
              </div>
              </div>
            </div>
            </>
          )) : (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%', textAlign: 'center' }}>
              <div className="text-light mb-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hello, Muneeb</div>
              <div className="text-light mb-3" style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>How can I help you today?</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3" style={{ backgroundColor: 'rgba(255, 105, 180, 0.3)', backdropFilter: 'blur(10px)' }}>
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
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              multiple
            />
            <input
              type="text"
              className="form-control me-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            <button
              className={`btn ${isListening ? 'btn-danger' : 'btn-outline-light'} me-2`}
              onClick={toggleListening}
            >
              <Mic size={24} />
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={isSending || (!inputValue.trim() && attachments.length === 0)}
            >
              {isSending ? <Loader size={24} className="spinner-border spinner-border-sm" /> : <Send size={24} />}
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
                <button type="button" className="btn-close" onClick={() => setShowMicPermissionDialog(false)}></button>
              </div>
              <div className="modal-body">
                <p>To use voice input, we need permission to access your microphone. This helps us understand what you're saying so we can respond better!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowMicPermissionDialog(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={requestMicrophonePermission}>Allow Microphone Access</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}