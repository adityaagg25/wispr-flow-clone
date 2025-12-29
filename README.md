# 🎙️ FlowType Studio — Voice-to-Text Desktop App

FlowType Studio is a lightweight, push-to-talk voice-to-text desktop application inspired by Wispr Flow.
It focuses on real-time dictation, clean UX, and clear separation of concerns, built using modern web and desktop technologies.


## 📌 Project Overview
To demonstrate the ability to:
- Capture live microphone audio
- Stream audio in real time
- Transcribe speech with low latency
- Build a practical, user-focused desktop experience

FlowType Studio enables users to hold a microphone button, speak naturally, and see their words appear instantly on screen.
The transcribed text can then be inserted into a target writing area, simulating real-world dictation workflows.

### This project prioritizes:
- Functionality over visual polish
- Clear architecture over complex abstractions
- Real-time interaction over batch processing

It is intentionally kept minimal, readable, and extensible.

---

## ✨ Key Features
- 🎤 Push-to-Talk Voice Input
  - Hold the microphone button to start speaking; release to stop.

- ⚡ Real-Time Transcription
  - Live partial transcription with finalized, accurate results.

- 📝 Insert Text Workflow
  - Transcribed text can be inserted into a writing surface inside the app.

- 📋 Clipboard Support
  - Easily copy transcribed text for use in other applications.

- 🖥️ Cross-Platform Desktop App
  - Runs on Windows, macOS, and Linux using Tauri.
  
---

## 🧠 How It Works (High Level)
1. User presses and holds the microphone button.
2. Microphone audio is captured using the Web Audio API.
3. Audio is streamed in real time to Deepgram via WebSocket.
4. Partial and final transcripts are received live.
5. Final text can be inserted into the target writing area or copied.

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS (custom, no UI libraries)

### Desktop Framework
- Tauri (lightweight, native desktop runtime)

### Speech-to-Text
- Deepgram Real-Time API (WebSocket)

### Audio Processing
- Web Audio API
- 16-bit PCM audio streaming

---

## 🧱 Architecture & Design Decisions

FlowType Studio is designed with a clear separation of concerns to ensure maintainability and clarity.

### Audio Capture
- Microphone access and audio capture are handled in `audio/recorder.js`
- Uses the Web Audio API to stream 16-bit PCM audio
- Audio lifecycle (start/stop) is tightly controlled to avoid leaks

### Transcription
- Speech-to-text is implemented via Deepgram’s real-time WebSocket API
- Partial transcripts are displayed live
- Final transcripts are committed only when confirmed by the API to avoid duplication or truncation

### UI Layer
- UI is built using React with minimal abstraction
- Push-to-talk behavior is isolated in `PushToTalk.jsx`
- Layout is fullscreen and canvas-based, inspired by modern dictation tools
- No external UI libraries are used to keep the implementation transparent

### Desktop Runtime
- Tauri is used instead of Electron for a lightweight native desktop experience
- Keeps memory usage low while maintaining native performance

---

## 📁 Project Structure
```
src/
├── audio/
│   └── recorder.js        # Microphone access & audio capture
├── transcription/
│   └── deepgram.js        # Deepgram WebSocket integration
├── ui/
│   └── PushToTalk.jsx     # Push-to-talk microphone component
├── App.jsx                # Main application logic & layout
├── App.css                # Global styles and layout
├── main.jsx               # App entry point
```

---

## 🛠️ Setup & Installation

### Prerequisites

Ensure the following are installed on your system:

- Node.js (v18 or later recommended)
- npm
- Rust (required for Tauri)
- Tauri OS prerequisites  
  https://tauri.app/start/prerequisites/

> **Note:** VS Code alone is not sufficient — system build tools must be installed.

---

1. ### Clone the Repository

```bash
git clone https://github.com/your-username/flowtype-studio.git
cd flowtype-studio
```

2. ### Install Dependencies
```bash
npm install
```

3. ### Configure Environment Variables
Create a .env file in the project root directory:
```env
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
```
You can generate an API key from:
https://console.deepgram.com/

> **Note:**⚠️ Never commit your .env file to version control.

4. ### Running the Application (Development)
```bash
npm run tauri dev
```
This will:
- Start the Vite development server
- Launch the Tauri desktop application
- Enable live reload during development

---

## 📘 Usage Guide

1. Launch the application.
2. Press and hold the microphone button at the bottom of the screen.
3. Speak naturally while holding the button.
4. Live transcription will appear on the screen as you speak.
5. Release the microphone button to stop recording.
6. Once transcription appears:
   - Click **Insert** to insert the text into the writing surface.
   - Click **Copy** to copy the text to your clipboard.
7. Edit or continue dictating as needed.

---

## ⚠️ Known Limitations

- Transcription accuracy depends on:
  - Microphone quality
  - Background noise
  - Internet connection
- Currently supports **English language only**.
- No offline transcription support.
- Limited to short sentences.

These limitations are intentional to keep the project focused and lightweight.

---

## 🚀 Future Improvements

- Language selection support
- Larger audio inputs
- Keyboard shortcut for push-to-talk (e.g. Spacebar)
- Cursor-aware text insertion
- Transcription history panel
- Optional auto-insert mode
- Dark / light theme toggle
- Word-by-word animation or subtle waveform visualization
- Global clipboard / system-level dictation support


## 🖼️ Screenshots

### Main Application Interface

![FlowType Studio UI]()

