export default function PushToTalk({ onStart, onStop, isRecording }) {
  return (
    <div
      className={`mic-orb ${isRecording ? "recording" : ""}`}
      onMouseDown={onStart}
      onMouseUp={onStop}
      onMouseLeave={onStop}
    >
      🎙️
    </div>
  );
}
