export default function PushToTalk({ onStart, onStop, isRecording }) {
  return (
    <button
      onMouseDown={onStart}
      onMouseUp={onStop}
      onTouchStart={onStart}
      onTouchEnd={onStop}
      style={{
        padding: "16px 24px",
        fontSize: "16px",
        background: isRecording ? "red" : "black",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}
    >
      {isRecording ? "Recording..." : "Hold to Talk"}
    </button>
  );
}
