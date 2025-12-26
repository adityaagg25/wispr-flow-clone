🎙️ Wispr Flow Clone — Voice to Text Desktop App

A lightweight push-to-talk voice-to-text desktop application inspired by Wispr Flow, built using Tauri, React, and Deepgram for real-time speech transcription.

📌 Project Overview

This project demonstrates how to build a real-time speech-to-text desktop application with:

Live microphone audio capture

Real-time streaming transcription

Push-to-talk interaction model

Clean separation of concerns

The focus of this project is functionality, real-time streaming, and architecture, not UI polish.

🧱 Tech Stack

Frontend: React (Vite)

Desktop Framework: Tauri

Speech-to-Text: Deepgram Real-Time API (WebSocket)

Language: JavaScript

Audio Processing: Web Audio API (PCM 16-bit)

✨ Features

🎙 Push-to-Talk Recording

📝 Live Partial Transcription

✅ Finalized Accurate Transcription

🔁 Real-Time Audio Streaming

🧼 Clean start/stop lifecycle

🧠 Handles real-world streaming edge cases

🏗️ Architecture Overview
UI (React)
  ├─ Push-to-Talk Button
  ├─ Transcript Display
  ↓
Audio Layer
  ├─ Microphone Access
  ├─ PCM Audio Conversion (16-bit, 16kHz)
  ↓
Streaming Layer
  ├─ WebSocket Audio Streaming
  ↓
Deepgram API
  ├─ Partial Transcripts
  ├─ Final Transcripts
  ↓
UI Update


Each layer has one clear responsibility, making the codebase easy to reason about and extend.

📁 Project Structure
src/
 ├─ audio/
 │   └─ recorder.js        # Microphone & audio processing
 ├─ transcription/
 │   └─ deepgram.js        # Deepgram WebSocket logic
 ├─ ui/
 │   └─ PushToTalk.jsx     # Push-to-Talk button
 ├─ App.jsx                # Application state & orchestration
 └─ main.jsx

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/wispr-flow-clone.git
cd wispr-flow-clone

2️⃣ Install Dependencies
npm install

3️⃣ Add Deepgram API Key

Create a .env file in the project root:

VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here


⚠️ The .env file is ignored by Git to keep credentials secure.

4️⃣ Run the App (Desktop)
npm run tauri dev

🎬 How It Works (User Flow)

Launch the desktop app

Hold the “Hold to Talk” button

Speak into the microphone

See live transcription while speaking

Release the button

The final sentence completes automatically

🧠 Important Design Decisions
✅ Partial vs Final Transcripts

Deepgram sends:

Partial transcripts (fast, changing)

Final transcripts (confirmed)

To avoid duplication:

Partial transcripts are shown live

Only final transcripts are permanently appended

✅ Stream Finalization Handling

A key challenge in real-time speech systems is sentence cut-off.

Solution used:

The microphone stops immediately on button release

The WebSocket remains open

The app waits for Deepgram’s is_final: true event

Only then is the stream closed

This ensures no words are lost, even at the end of speech.

⚠️ Known Limitations

Accuracy depends on microphone quality and environment noise

No speaker diarization

English language only (can be extended)

UI is intentionally minimal

🚀 Possible Improvements

Add language selection

Add copy / clear transcript buttons

Add keyboard shortcut for push-to-talk

Add transcript export

Improve UI styling

🎥 Demo Video

The demo video shows:

App launch

Push-to-talk recording

Live transcription

Clean final sentence on release

🧾 Assumptions

User has a working microphone

Stable internet connection

Deepgram API key with real-time access

📚 References

Deepgram Real-Time API Documentation

Tauri Documentation

Web Audio API (MDN)

👤 Author

Aditya Aggarwal
Built as a practical demonstration of real-time streaming, desktop app architecture, and API integration.

✅ Final Note for Evaluators

This project prioritizes:

Real-time streaming correctness

Clean lifecycle management

Clear architectural separation

Practical engineering decisions