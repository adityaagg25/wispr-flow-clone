import "./App.css";
import PushToTalk from "./ui/PushToTalk";
import { useState } from "react";

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
  const [targetText, setTargetText] = useState("");

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
    if (isRecording) return;
    const stream = await requestMicrophone();
    connectDeepgram(handleTranscript);
    startAudioCapture(stream, sendAudioToDeepgram);
    setIsRecording(true);
  };

  const stopRecording = () => {
    stopAudioCapture();
    setWaitingForFinal(true);
    setIsRecording(false);
  };

  const transcriptText = `${finalTranscript} ${partialTranscript}`.trim();

  const handleInsert = () => {
    setTargetText((t) => (t ? t + " " + transcriptText : transcriptText));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcriptText);
  };

  const handleClearTranscript = () => {
    setFinalTranscript("");
    setPartialTranscript("");
  };

  const handleClearTarget = () => {
    setTargetText("");
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-content">
          <h1>FlowType Studio</h1>
          <p className="tagline">Think it. Say it. Place it.</p>
        </div>
      </header>

      <main className="app-main">
        <div className="main-content">
          <div className="content-wrapper">
            <div className="text-panel left-panel">
              <div className="panel-header">
                <h2>Live Transcription</h2>
                <div className="panel-actions">
                  <button 
                    className="icon-button" 
                    onClick={handleCopy}
                    title="Copy transcription"
                  >
                    <span className="icon">📋</span>
                  </button>
                  <button 
                    className="icon-button" 
                    onClick={handleClearTranscript}
                    title="Clear transcription"
                  >
                    <span className="icon">🗑️</span>
                  </button>
                </div>
              </div>
              <div className="text-area-container">
                <textarea
                  readOnly
                  value={transcriptText}
                  placeholder="Speak to see live transcription here..."
                  className="transcription-textarea"
                />
                <div className="status-indicator">
                  {isRecording ? (
                    <span className="recording-status">
                      <span className="pulse-dot"></span> Listening...
                    </span>
                  ) : (
                    <span className="idle-status">Ready for speech</span>
                  )}
                </div>
              </div>
              <div className="panel-footer">
                <button 
                  className="insert-button"
                  onClick={handleInsert}
                  disabled={!transcriptText}
                >
                  Insert into Target
                </button>
              </div>
            </div>

            <div className="center-controls">
              <div className="mic-container">
                <PushToTalk
                  onStart={startRecording}
                  onStop={stopRecording}
                  isRecording={isRecording}
                />
                <div className="mic-hint">
                  {isRecording ? "Release to stop" : "Hold to speak"}
                </div>
              </div>
            </div>

            <div className="text-panel right-panel">
              <div className="panel-header">
                <h2>Target Text</h2>
                <div className="panel-actions">
                  <button 
                    className="icon-button" 
                    onClick={() => navigator.clipboard.writeText(targetText)}
                    disabled={!targetText}
                    title="Copy target text"
                  >
                    <span className="icon">📋</span>
                  </button>
                  <button 
                    className="icon-button" 
                    onClick={handleClearTarget}
                    disabled={!targetText}
                    title="Clear target text"
                  >
                    <span className="icon">🗑️</span>
                  </button>
                </div>
              </div>
              <div className="text-area-container">
                <textarea
                  value={targetText}
                  onChange={(e) => setTargetText(e.target.value)}
                  placeholder="Inserted text will appear here..."
                  className="target-textarea"
                />
                <div className="character-count">
                  {targetText.length} characters
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Flow to create with voice</p>
      </footer>
    </div>
  );
}

export default App;