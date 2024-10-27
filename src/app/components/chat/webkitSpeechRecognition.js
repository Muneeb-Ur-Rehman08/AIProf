// src/app/utils/webkitSpeechRecognition.js

export function initializeSpeechRecognition(selectedLanguage, setInputValue, setIsListening) {
  if ("webkitSpeechRecognition" in window) {
    const recognition = new (window).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInputValue(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  } else {
    console.error("Speech recognition not supported");
    return null;
  }
}

