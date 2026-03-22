Medi-Lens: Intelligent Medicine Identification & Safety Assistant 👁️🔊
Medi-Lens is an AI-powered assistive web application designed to help elderly and visually impaired individuals identify medications and understand dosage instructions safely. By combining Optical Character Recognition (OCR) with real-time Voice Synthesis, it turns a smartphone into a "talking lens" for healthcare.

🚀 The Problem
Many elderly individuals struggle with "Medical Illiteracy"—the inability to read or understand the tiny, complex text on medicine strips. This leads to:

Medication Errors: Taking the wrong pill at the wrong time.

Vision Barriers: Difficulty reading fine print due to age-related impairments.

Language Gaps: Confusion caused by technical medical English on packaging.

✨ Our Solution
Medi-Lens simplifies the process into a 3-step interaction:

Intelligent Scanning: Uses Tesseract.js to extract medicine names from live camera feeds directly in the browser.

Multilingual Support: Provides instructions in both English and Telugu, ensuring local accessibility.

Audio-First Guidance: Automatically speaks dosage instructions (e.g., "Take after food") using the Web Speech API.

Visual Workflow: A high-contrast UI using universal iconography (Sun ☀️, Moon 🌙) to indicate timing without requiring high literacy.

🛠️ Tech Stack
Frontend: React.js (Hooks, Refs, Context)

OCR Engine: Tesseract.js (Client-side AI)

Voice Synthesis: Web Speech API (Multilingual TTS)

Backend: Node.js / Express (Optional API)

Database: MongoDB (with local Fail-Safe JSON for offline/demo use)

Styling: CSS3 (Custom Grid & Flexbox architecture)

📂 Project Structure
/src/App.js: Main application logic, routing, and OCR integration.

/src/App.css: Professional UI styling and responsive layouts.

/src/data: MED_DATABASE containing medicine information and warnings.

/public: Core HTML entry point and brand assets.

🛠️ Installation & Setup
Clone the repository:

Bash
git clone https://github.com/LakshmiSatyaSriSundarapalli/Medi-Lens.git
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm start
Note on Permissions: Ensure you grant Camera Access in your browser. For mobile testing, use an HTTPS connection to enable getUserMedia.

Developed as a 2nd Year Computer Science Engineering project to bridge the gap between AI and accessible healthcare.