import { useState } from "react";
import PushToTalk from "./ui/PushToTalk";

import {
  requestMicrophone,
  startAudioCapture,
  stopAudioCapture,
} from "./audio/recorder";

import {
  connectDeepgram,
  sendAudioToDeepgram,
  closeDeepgram,
} from "./transcription/deepgram";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [partialTranscript, setPartialTranscript] = useState("");
  const [waitingForFinal, setWaitingForFinal] = useState(false);

  const handleTranscript = (text, isFinal) => {
    if (isFinal) {
      setFinalTranscript((prev) => prev + " " + text);
      setPartialTranscript("");

      if (waitingForFinal) {
        closeDeepgram();
        setWaitingForFinal(false);
      }
    } else {
      setPartialTranscript(text);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await requestMicrophone();

      connectDeepgram(handleTranscript);

      startAudioCapture(stream, (audioChunk) => {
        sendAudioToDeepgram(audioChunk);
      });

      setIsRecording(true);
    } catch (err) {
      alert("Microphone permission denied or error occurred");
      console.error(err);
    }
  };

  const stopRecording = () => {
    stopAudioCapture();
    setWaitingForFinal(true);
    setIsRecording(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Voice to Text</h1>

      <PushToTalk
        onStart={startRecording}
        onStop={stopRecording}
        isRecording={isRecording}
      />

      <textarea
        value={`${finalTranscript} ${partialTranscript}`}
        readOnly
        rows={6}
        placeholder="Your transcription will appear here..."
        style={{
          width: "100%",
          marginTop: 20,
          padding: 10,
          fontSize: 14,
        }}
      />
    </div>
  );
}

export default App;
