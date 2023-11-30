import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { message } from "antd";

const RecordedAudio = ({ blob }) => {
  const url = URL.createObjectURL(blob);

  return (
    <div>
      <audio controls src={url} />
    </div>
  );
};

function App() {
  const [error, setError] = useState("");

  const recorderControls = useAudioRecorder({}, (err) => {
    console.table("error", err);

    if (
      err instanceof DOMException &&
      err.message === "Requested device not found"
    ) {
      setError(
        "Microphone not found. Please ensure that a microphone is connected."
      );
    } else {
      setError("An error occurred during audio recording.");
    }
  });

  const [recordedBlob, setRecordedBlob] = useState(null);

  const addAudioElement = (blob) => {
    setRecordedBlob(blob);
    setError(""); // Clear error on successful recording
  };

  const handleStopRecording = () => {
    recorderControls.stopRecording();
    setError(""); // Clear error when stopping recording
  };

  return (
    <div className="bg-red-300">
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        showVisualizer={true}
      />
      <br />

      <span className="text-red-700">{error}</span>
      <br />
      <button onClick={handleStopRecording}>Stop recording</button>
      <br />
      {recordedBlob && <RecordedAudio blob={recordedBlob} />}
    </div>
  );
}

export default App;
