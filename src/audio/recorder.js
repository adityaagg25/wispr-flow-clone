let audioContext = null;
let processor = null;
let source = null;
let streamRef = null;

export async function requestMicrophone() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    streamRef = stream;
    return stream;
  } catch (err) {
    console.error("Microphone access denied", err);
    throw err;
  }
}

export function startAudioCapture(stream, onAudioChunk) {
  if (audioContext) return; // prevent double start

  audioContext = new AudioContext({ sampleRate: 16000 });
  source = audioContext.createMediaStreamSource(stream);
  processor = audioContext.createScriptProcessor(2048, 1, 1);

  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    const pcm16 = new Int16Array(input.length);

    for (let i = 0; i < input.length; i++) {
      pcm16[i] = Math.max(-1, Math.min(1, input[i])) * 32767;
    }

    onAudioChunk(pcm16.buffer);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);
}

export function stopAudioCapture() {
  processor?.disconnect();
  source?.disconnect();

  processor = null;
  source = null;

  audioContext?.close();
  audioContext = null;

  streamRef?.getTracks().forEach((track) => track.stop());
  streamRef = null;
}
