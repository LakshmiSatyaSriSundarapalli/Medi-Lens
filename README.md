# Medi-Lens: Intelligent Medicine Identification & Safety Assistant 👁️🔊

<p align="center">
  <img src="./Screenshot (388).png" width="850" alt="Medi-Lens Project Header">
  <br>
  <em>"Turning a smartphone into an intelligent talking lens for healthcare accessibility."</em>
</p>

---

## 🌟 Overview
**Medi-Lens** is an AI-powered assistive web application designed to help elderly and visually impaired individuals identify medications and understand dosage instructions safely. By combining **Optical Character Recognition (OCR)** with real-time **Voice Synthesis**, it bridges the literacy-healthcare gap for those who struggle with technical medical English or fine print.

## 🚀 The Problem
Many elderly individuals struggle with "Medical Illiteracy," leading to:
* **Medication Errors:** Confusion over dosage timing and medicine names.
* **Vision Barriers:** Difficulty reading the tiny text on medicine strips.
* **Language Gaps:** Lack of localized instructions (e.g., Telugu) on standard packaging.

## ✨ Our Solution
Medi-Lens simplifies the process into a seamless, 3-step interaction:

1.  **Intelligent Scanning:** Uses `Tesseract.js` to extract medicine names from live camera feeds directly in the browser (Edge AI).
2.  **Multilingual Support:** Provides instructions in both **English and Telugu**, ensuring local accessibility.
3.  **Audio-First Guidance:** Automatically speaks dosage instructions (e.g., "Take after food") using the **Web Speech API**.
4.  **Visual Workflow:** A high-contrast UI using universal iconography (**Sun ☀️, Moon 🌙, Plate 🍽️**) to indicate timing without requiring high literacy.

---

## 🛠️ Tech Stack (MERN + AI)
* **Frontend:** React.js (Hooks, Refs, Context API)
* **OCR Engine:** Tesseract.js (Client-side Computer Vision)
* **Voice Synthesis:** Web Speech API (Multilingual TTS)
* **Backend:** Node.js & Express.js (Scalable API Routing)
* **Database:** MongoDB (with a local JSON Fail-Safe for offline/demo use)
* **Styling:** CSS3 (Accessibility-focused Custom Grid & Flexbox architecture)

---

## 📂 Project Structure
- **/src/App.js:** Main application logic, state management, and OCR integration.
- **/src/App.css:** Professional UI styling and responsive mobile-first layouts.
- **/src/data:** `MED_DATABASE` containing medicine information and localized warnings.
- **/public:** Core HTML entry point, brand assets, and high-contrast icons.

## ⚙️ Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/LakshmiSatyaSriSundarapalli/Medi-Lens.git](https://github.com/LakshmiSatyaSriSundarapalli/Medi-Lens.git)