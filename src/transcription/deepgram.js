let socket = null;

export function connectDeepgram(onTranscript) {
  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen" +
      "?model=nova-2" +
      "&language=en" +
      "&encoding=linear16" +
      "&sample_rate=16000" +
      "&interim_results=true" +
      "&endpointing=300" +
      "&punctuate=true" +
      "&smart_format=true",
    ["token", import.meta.env.VITE_DEEPGRAM_API_KEY]
  );

  socket.onopen = () => {
    console.log("✅ Deepgram connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const transcript =
      data.channel?.alternatives?.[0]?.transcript;

    if (transcript && transcript.length > 0) {
      onTranscript(transcript, data.is_final);
    }
  };

  socket.onerror = (err) => {
    console.error("❌ Deepgram error:", err);
  };

  socket.onclose = () => {
    console.log("🔌 Deepgram closed");
  };
}

export function sendAudioToDeepgram(audioBuffer) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(audioBuffer);
  }
}

export function closeDeepgram() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
    socket = null;
  }
}
