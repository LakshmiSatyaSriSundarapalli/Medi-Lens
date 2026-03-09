# Medi-Lens: Zero-Literacy Assistive Interface 👁️🔊

**Medi-Lens** is a web-based assistive tool designed to help elderly and illiterate individuals safely identify and take their medications. It bridges the literacy-healthcare gap by turning a smartphone into an intelligent "talking lens."

## 🚀 The Problem
Many elderly individuals in rural and semi-urban areas suffer from vision impairment or functional illiteracy. They often struggle to read the tiny, complex text on medicine strips, leading to:
- **Medical Non-Adherence:** Skipping doses due to confusion.
- **Accidental Toxicity:** Misidentifying dosage levels.
- **Dependency:** Relying entirely on family members for basic health tasks.

## ✨ Our Solution
Medi-Lens shifts the burden of "understanding" from the human to the machine through:
1. **Optical Recognition:** Using `Tesseract.js` to scan medicine names directly in the browser.
2. **Audio Output:** Utilizing the `Web Speech API` to announce instructions in local languages.
3. **Zero-Text UI:** A high-contrast interface using universal icons (Sun, Moon, Plate) for intuitive guidance.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Styling:** Standard CSS (Accessibility-First)
- **OCR Engine:** Tesseract.js
- **Voice Synthesis:** Web Speech API
- **Backend/Database:** Firebase

## 📂 Project Structure
- `/src/components`: UI elements like Camera and Result Cards.
- `/src/logic`: OCR processing and text filtering.
- `/src/data`: Firebase configuration and medicine mapping.
- `/public`: Assets and iconography.

## 🛠️ Installation & Setup
1. Clone the repository:
   `git clone https://github.com/YOUR_USERNAME/medi-lens.git`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm start`

---
*Developed as a Computer Science Engineering project to promote accessible healthcare technology.*
