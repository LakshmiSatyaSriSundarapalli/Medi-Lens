import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

const UI_STRINGS = {
  en: {
    title: "MEDI-LENS",
    subtitle: "INTELLIGENT MEDICINE IDENTIFICATION & SAFETY ASSISTANT 👁️🔊",
    openCam: "1. OPEN CAMERA",
    identify: "2. IDENTIFY MEDICINE",
    analyzing: "ANALYZING DATA...",
    replay: "🔊 REPLAY INSTRUCTIONS",
    nav: { home: "Home", feat: "Features", work: "Workflow", know: "Knowledge" },
    auth: { logout: "Logout", profile: "My Profile", hello: "Hello" }
  },
  te: {
    title: "మెడ్-లెన్స్",
    subtitle: "అత్యవసర మరియు సాధారణ వైద్య సహాయకారి 👁️🔊",
    openCam: "1. కెమెరా తెరవండి",
    identify: "2. గుర్తించండి",
    analyzing: "విశ్లేషిస్తోంది...",
    replay: "🔊 మళ్ళీ వినండి",
    nav: { home: "హోమ్", feat: "ఫీచర్స్", work: "వర్క్‌ఫ్లో", know: "జ్ఞానం" },
    auth: { logout: "లాగ్ అవుట్", profile: "నా ప్రొఫైల్", hello: "నమస్తే" }
  }
};

const MED_DATABASE = {
  "dolo": {
    name: "Dolo 650",
    en: { time: "🕒 Anytime", food: "🍛 After Meal", info: "Take one tablet for fever after food.", warning: "Max 4 tablets daily." },
    te: { time: "🕒 ఎప్పుడైనా", food: "🍽️ భోజనం తర్వాత", info: "జ్వరం కోసం భోజనం తర్వాత ఒక టాబ్లెట్ తీసుకోండి.", warning: "రోజుకు 4 మించవద్దు." }
  },
  "crocin": {
    name: "Crocin",
    en: { time: "🕒 Anytime", food: "🍛 After Meal", info: "Take one tablet for fever after food.", warning: "Keep out of reach of children." },
    te: { time: "🕒 ఎప్పుడైనా", food: "🍽️ భోజనం తర్వాత", info: "జ్వరం కోసం భోజనం తర్వాత ఒక టాబ్లెట్ తీసుకోండి.", warning: "పిల్లలకు దూరంగా ఉంచండి." }
  },
  "pantoprazole": {
    name: "Pantoprazole",
    en: { time: "☀️ Morning", food: "🍽️ Before Meal", info: "Take one tablet for acidity on an empty stomach.", warning: "Do not crush the tablet." },
    te: { time: "☀️ ఉదయం", food: "🍽️ భోజనం ముందు", info: "ఎసిడిటీ కోసం పరగడుపున ఒక టాబ్లెట్ తీసుకోండి.", warning: "టాబ్లెట్‌ను నలగగొట్టవద్దు." }
  },
  "cetirizine": {
    name: "Cetirizine",
    en: { time: "🌙 Night", food: "🍛 After Meal", info: "Take one tablet for allergy before sleeping.", warning: "May cause drowsiness." },
    te: { time: "🌙 రాత్రి", food: "🍽️ భోజనం తర్వాత", info: "అలెర్జీ కోసం పడుకునే ముందు ఒక టాబ్లెట్ తీసుకోండి.", warning: "ఇది నిద్రను కలిగించవచ్చు." }
  },
  "thyronorm": {
    name: "Thyronorm",
    en: { time: "☀️ Morning", food: "🍽️ Before Meal", info: "Take daily as prescribed for thyroid management.", warning: "Regular blood tests required." },
    te: { time: "☀️ ఉదయం", food: "🍽️ భోజనం ముందు", info: "థైరాయిడ్ కోసం ప్రతిరోజూ సూచించిన విధంగా తీసుకోండి.", warning: "క్రమం తప్పకుండా రక్త పరీక్షలు చేయించుకోండి." }
  },
  "azithromycin": {
    name: "Azithromycin",
    en: { time: "☀️ Morning", food: "🍛 After Meal", info: "Antibiotic for bacterial infections. Complete the full course.", warning: "Don't skip doses." },
    te: { time: "☀️ ఉదయం", food: "🍽️ భోజనం తర్వాత", info: "యాంటీబయాటిక్. డాక్టర్ చెప్పినట్లు కోర్సు మొత్తం పూర్తి చేయండి.", warning: "మధ్యలో ఆపవద్దు." }
  }
};

function App() {
  const [view, setView] = useState('home'); 
  const [medInfo, setMedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanStatus, setScanStatus] = useState(""); 
  const [lang, setLang] = useState('en');
  const [db, setDb] = useState(MED_DATABASE);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "User", isLoggedIn: true });
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicines");
        if (response.ok) {
          const data = await response.json();
          console.log("✅ MongoDB Connected");
        }
      } catch (err) {
        console.log("⚠️ Backend not detected.");
      }
    };
    fetchMedicines();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
    } catch (err) { alert("Camera Error"); }
  };

  const scanMedicine = async () => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
    setLoading(true);
    setScanStatus("Capturing Image...");
    setMedInfo(null); 

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    
    setScanStatus("Reading Text...");
    const { data: { text } } = await Tesseract.recognize(canvasRef.current.toDataURL(), 'eng');
    const input = text.toLowerCase().trim();
    
    if (input.length > 2) {
        const foundKey = Object.keys(db).find(key => input.includes(key));
        if (foundKey) {
          const data = db[foundKey][lang];
          setMedInfo({ name: db[foundKey].name, ...data });
          speak(`${data.info}. ${data.warning}`, lang);
          setScanStatus("");
        } else { setScanStatus("Medicine not recognized."); }
    } else { setScanStatus("Could not read text."); }
    setLoading(false);
  };

  const speak = (text, langCode) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    if (langCode === 'te') {
      msg.voice = voices.find(v => v.lang.includes('te-IN')) || voices[0];
      msg.lang = 'te-IN';
    } else {
      msg.voice = voices.find(v => v.lang.includes('en-IN')) || voices[0];
      msg.lang = 'en-IN';
    }
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  };

  // Content Renderer updated to display styled pages
  const renderMainContent = () => {
    switch(view) {
      case 'features':
        return (
          <div className="content-page">
            <h2>{UI_STRINGS[lang].nav.feat}</h2>
            <div className="info-grid">
              <div className="info-card"><h3>🔍 AI OCR</h3><p>Extracts medicine names using highly accurate Tesseract.js AI.</p></div>
              <div className="info-card"><h3>🔊 Voice Guide</h3><p>Real-time multilingual instructions (Telugu & English) for accessibility.</p></div>
              <div className="info-card"><h3>⚠️ Safety First</h3><p>Automatic warning alerts and food compatibility checks.</p></div>
            </div>
          </div>
        );
      case 'workflow':
        return (
          <div className="content-page">
            <h2>{UI_STRINGS[lang].nav.work}</h2>
            <div className="workflow-steps">
              <div className="step"><span>01</span><p>Grant camera permissions to open the viewport.</p></div>
              <div className="step"><span>02</span><p>Align the medicine strip chemically printed name in focus.</p></div>
              <div className="step"><span>03</span><p>Click "Identify Medicine" to start AI analysis.</p></div>
              <div className="step"><span>04</span><p>Listen to the safety guidance spoken automatically.</p></div>
            </div>
          </div>
        );
      case 'knowledge':
        return (
          <div className="content-page">
            <h2>{UI_STRINGS[lang].nav.know}</h2>
            <div className="info-grid">
              <div className="info-card"><h3>👶 Child Care</h3><p>Guidance on safe dosages for children and common ailments.</p></div>
              <div className="info-card"><h3>👵 Elder Care</h3><p>Managing multiple medications and safety tips for seniors.</p></div>
              <div className="info-card"><h3>🧘 Balanced Life</h3><p>Integrating wellness, yoga, and diet alongside medical treatments.</p></div>
            </div>
          </div>
        );
      default:
        return (
          <main className="container">
            <div className="camera-viewport">
              <video ref={videoRef} autoPlay playsInline />
              {loading && <div className="scanning-overlay"><div className="laser"></div></div>}
            </div>
            {scanStatus && <div className="status-toast">{scanStatus}</div>}
            <div className="action-area">
              <button className="btn btn-secondary" onClick={startCamera}>{UI_STRINGS[lang].openCam}</button>
              <button className="btn btn-primary" onClick={scanMedicine} disabled={loading}>
                {loading ? UI_STRINGS[lang].analyzing : UI_STRINGS[lang].identify}
              </button>
            </div>
            {medInfo && (
              <div className="medical-card">
                <span className="badge">SCAN RESULT</span>
                <h2 className="med-name">{medInfo.name}</h2>
                <div className="med-grid">
                  <div className="med-item"><span>{medInfo.time.split(' ')[0]}</span><p>{medInfo.time.split(' ')[1]}</p></div>
                  <div className="med-item"><span>{medInfo.food.split(' ')[0]}</span><p>{medInfo.food.split(' ')[1]}</p></div>
                </div>
                <button className="btn-audio" onClick={() => speak(medInfo.info, lang)}>{UI_STRINGS[lang].replay}</button>
              </div>
            )}
          </main>
        );
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={() => setView('home')} style={{cursor: 'pointer'}}>{UI_STRINGS[lang].title}</div>
        <ul className="nav-links">
          <li onClick={() => setView('home')} className={view === 'home' ? 'active-link' : ''}>{UI_STRINGS[lang].nav.home}</li>
          <li onClick={() => setView('features')} className={view === 'features' ? 'active-link' : ''}>{UI_STRINGS[lang].nav.feat}</li>
          <li onClick={() => setView('workflow')} className={view === 'workflow' ? 'active-link' : ''}>{UI_STRINGS[lang].nav.work}</li>
          <li onClick={() => setView('knowledge')} className={view === 'knowledge' ? 'active-link' : ''}>{UI_STRINGS[lang].nav.know}</li>
        </ul>
        <div className="nav-right">
          <div className="lang-toggle-nav">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'te' ? 'active' : ''} onClick={() => setLang('te')}>తెలుగు</button>
          </div>
          <div className="profile-container">
            <div className="profile-account" onClick={() => setIsMenuOpen(!isMenuOpen)}>{user.name[0]}</div>
            {isMenuOpen && (
              <div className="profile-dropdown">
                <p>{UI_STRINGS[lang].auth.hello}, <strong>{user.name}</strong></p>
                <hr />
                <button onClick={() => {setView('home'); setIsMenuOpen(false)}}>{UI_STRINGS[lang].auth.profile}</button>
                <button onClick={() => {setUser({name:"", isLoggedIn:false}); setIsMenuOpen(false)}}>{UI_STRINGS[lang].auth.logout}</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <h1>{lang === 'en' ? "Everything Meds" : "ఔషధాలన్నీ"}<br/><span className="highlight">Automated!</span></h1>
        <p className="subtitle">{UI_STRINGS[lang].subtitle}</p>
      </header>
      {renderMainContent()}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
  );
}

export default App;