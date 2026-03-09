import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

// DATABASE: Local Medicine Information
const MED_DATABASE = {
  "dolo": { name: "Dolo 650", time: "☀️ Morning", food: "🍽️ After Food", info: "Take one tablet for fever and pain after food." },
  "para": { name: "Paracetamol", time: "☀️ Morning", food: "🍽️ After Food", info: "Take one tablet for fever after food." },
  "met": { name: "Metformin", time: "🌙 Evening", food: "🥣 Before Food", info: "Take half a tablet for sugar before dinner." },
  "cet": { name: "Cetirizine", time: "🌙 Night", food: "🛌 Before Sleep", info: "Take one tablet for allergy or cold at night." }
};

function App() {
  const [medInfo, setMedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // LOGIC: Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access is required for Med-Lens.");
    }
  };

  // LOGIC: Capture Image and Run OCR
  const scanMedicine = async () => {
    setLoading(true);
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const image = canvasRef.current.toDataURL('image/png');

    const { data: { text } } = await Tesseract.recognize(image, 'eng');
    const input = text.toLowerCase();
    
    const foundKey = Object.keys(MED_DATABASE).find(key => input.includes(key));
    
    if (foundKey) {
      const data = MED_DATABASE[foundKey];
      setMedInfo(data);
      speak(data.info);
    } else {
      speak("Medicine not recognized. Please scan the label again.");
    }
    setLoading(false);
  };

  // LOGIC: Voice Output
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.8; 
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>MED-LENS</h1>
        <p>Zero-Literacy Assistive Interface</p>
      </header>

      <div className="main-content">
        <div className="camera-box">
          <video ref={videoRef} autoPlay playsInline />
          <div className="laser-line"></div>
        </div>

        <div className="btn-group">
          <button className="btn btn-start" onClick={startCamera}>1. OPEN CAMERA</button>
          <button className="btn btn-scan" onClick={scanMedicine}>
            {loading ? "SCANNING..." : "2. IDENTIFY MEDICINE"}
          </button>
        </div>

        {medInfo && (
          <div className="result-card">
            <h2>{medInfo.name}</h2>
            <div className="icon-row">
              <div className="icon-tile"><span>{medInfo.time.split(' ')[0]}</span><p>{medInfo.time.split(' ')[1]}</p></div>
              <div className="icon-tile"><span>{medInfo.food.split(' ')[0]}</span><p>{medInfo.food.split(' ')[1]}</p></div>
            </div>
            <button className="btn-voice" onClick={() => speak(medInfo.info)}>🔊 REPLAY VOICE</button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
  );
}

export default App;