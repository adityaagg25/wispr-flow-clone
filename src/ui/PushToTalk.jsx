export default function PushToTalk({ onStart, onStop, isRecording }) {
  const handleStart = (e) => {
    e.preventDefault();
    if (!isRecording) {
      onStart();
    }
  };

  const handleStop = (e) => {
    e.preventDefault();
    if (isRecording) {
      onStop();
    }
  };

  return (
    <button
      onMouseDown={handleStart}
      onMouseUp={handleStop}
      onMouseLeave={handleStop}
      onTouchStart={handleStart}
      onTouchEnd={handleStop}
      onTouchCancel={handleStop}
      aria-pressed={isRecording}
      style={{
        padding: "16px 24px",
        fontSize: "16px",
        background: isRecording ? "#d32f2f" : "#000",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {isRecording ? "Recording..." : "Hold to Talk"}
    </button>
  );
}
