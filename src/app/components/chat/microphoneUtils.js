// src/app/utils/microphoneUtils.js

export const checkMicrophonePermission = async (setMicPermission) => {
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
};

export const requestMicrophonePermission = async (setMicPermission, setShowMicPermissionDialog) => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    setMicPermission("granted");
    setShowMicPermissionDialog(false);
  } catch (err) {
    console.error("Error requesting microphone permission:", err);
    setMicPermission("denied");
  }
};

