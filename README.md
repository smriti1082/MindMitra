# 🧠 MindMitra (माइंडमित्रा)
### AI-Powered Cognitive Gaming & Memory Assistance Companion for Elderly Dementia Patients

> **"Mitra" means friend.** MindMitra is a clinically-inspired, empathetic digital health companion crafted specifically for elderly individuals experiencing Mild Cognitive Impairment (MCI) and early-to-moderate dementia.

---

## 🌟 Key Features & Built Modules

### 1. 🏠 Home Dashboard & Personalized Welcome
- **Time-Aware Personalized Greeting**: Warmly greets seniors by their preferred friendly name (e.g. *"Good Morning, Dada Ji!"*).
- **Daily Wellness & Mood Pulse**: 1-tap emotional check-in (☀️ Peaceful & Happy, 🌿 Calm & Content, ☁️ A Bit Foggy, 🌙 Need Rest) providing non-intrusive sundowning detection for caregivers.
- **Immediate Health Action Card**: Surfaces the next upcoming medication or activity with a single-tap *"Mark as Taken"* button.
- **Hydration Quick-Log**: Instant `+ Drink 1 Glass (250ml)` button with water chime sound and real-time progress.
- **Mitra's Daily Recommended Exercise**: AI-tailored brain exercise suggestion to encourage daily engagement without decision fatigue.

### 2. 🎴 Memory Matching Cognitive Game
- **Familiar Nostalgic Themes**: Familiar Fruits 🍎, Gentle Animals 🐘, and Heritage & Daily Items 🪔.
- **3D Card Flip Perspective**: Smooth, tactile card rotation with Web Audio synthesized click and match chimes.
- **"Mitra Peek" Hint Feature**: Reveals non-matched cards for 2 seconds to reduce frustration and preserve confidence.
- **No Stressful Countdowns**: Uses gentle elapsed time counters instead of anxiety-inducing countdown timers.
- **Celebration Confetti & Fanfare**: Positive reinforcement on completion.

### 3. 🎶 Rhythm & Pattern Recall Game (Attention & Sequence)
- **4 Soothing Musical Pads**: Golden Sun (329Hz), Ocean Sky (392Hz), Sage Leaf (440Hz), and Lotus Blossom (523Hz).
- **Adaptive Sequence Length**: Starts at 2 harmonious steps and gently scales.
- **Gentle Non-Punitive Feedback**: If a sequence is missed, a calming melody sounds with words of encouragement (*"Wonderful effort! Let's listen together again"*).

### 4. 🔍 Focus & Spot The Odd One (Visual Scanning & Differentiation)
- **High Contrast Grid**: Detects distinct objects (e.g. finding a gentle Lotus among sunflowers or a sacred Diya among teacups).
- **Strengthens Optical Scanning**: Helps counter spatial and visual neglect often associated with dementia progression.

### 5. 🤖 Adaptive AI Difficulty Engine
- **Dynamically Recalibrates**: Evaluates accuracy, move counts, and reaction time to adjust game grid dimensions (Gentle 2x3, Comfortable 3x4, Challenging 4x4).
- **Cognitive Vitality Score**: Tracks agility score (0–100) and ensures exercises stay restorative rather than stressful.

### 6. ⏰ Medicine, Water & Routine Reminders
- **Time Buckets**: Morning, Afternoon, Evening, and Night regimens.
- **Audio Chime & Speech Announcer**: Seniors can hear the reminder preview spoken aloud in their native language.
- **Interactive Hydration Station**: 8 interactive glasses showing volume in ml and percentage of daily goal.
- **Customizable**: Allows adding, toggling, and removing medications and daily walking/music activities.

### 7. 📊 Caregiver & Clinical Oversight Portal
- **7-Day Trend Visualizer**: SVG chart displaying cognitive vitality scores and reaction time evolution.
- **Compliance Rate**: Real-time percentage of medications taken on schedule.
- **Printable Clinical Summary Report**: 1-click generation of a formatted diagnostic report ready for neurologist and geriatrician consultations.
- **Caregiver Observations Feed**: Notes diary to record sleep quality, orientation, and sundowning episodes.

### 8. 🎙️ Web Speech API Voice Companion
- **Real-time Speech Recognition**: Handles commands like *"Play memory game"*, *"Drink a glass of water"*, *"Show my medicines"*, or *"Call daughter Priya"*.
- **Speech Synthesis**: Speaks in a warm, patient, slower pace (0.85 rate) suited for elderly hearing.
- **Interactive Fallback**: Quick-command buttons available when microphones are restricted.

### 9. 🌐 Regional Multi-Language Support
- Full translation dictionary and voice localization for **8 languages**:
  - 🇬🇧 English
  - 🇮🇳 Hindi (हिन्दी)
  - 🇮🇳 Bengali (বাংলা)
  - 🇮🇳 Tamil (தமிழ்)
  - 🇮🇳 Telugu (తెలుగు)
  - 🇮🇳 Marathi (मराठी)
  - 🇮🇳 Gujarati (ગુજરાતી)
  - 🇪🇸 Spanish (Español)

### 10. ♿ Geriatric Accessibility & Offline Ready
- **Font Scale Modifier**: One-click toggles for Standard (A), Large (A+), and Extra Large (A++).
- **High Contrast Mode**: Tailored for cataracts and low-contrast sensitivity.
- **Ultra-Simple Senior Mode**: Switches the entire interface to 4 giant 1-tap tiles designed for seniors with hand tremors.
- **1-Touch Emergency SOS**: Instant contact card with direct phone links to primary caregiver, attending physician, and local ambulance.
- **100% Offline Storage**: All states, logs, and game scores persist reliably in `localStorage`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 / Vite 6
- **Styling**: Tailwind CSS, Custom High-Contrast & Elderly Font Scaling
- **Audio Synthesizer**: Web Audio API (zero audio file dependencies, works 100% offline)
- **Voice Engine**: Web Speech API (`webkitSpeechRecognition` & `speechSynthesis`)
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti

---

## 🚀 How to Run MindMitra Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` or `http://127.0.0.1:3000`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## ☁️ Deployment to Vercel

The project includes an optimized [`vercel.json`](./vercel.json) configured for Single Page Applications (SPA):
- Automatic client-side routing rewrites (`/(.*)` -> `/index.html`) so refreshing on any route works seamlessly.
- Strict security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`).

### Option A: Via GitHub (Recommended)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of MindMitra"
   ```
2. Push to your GitHub repository.
3. In [Vercel Dashboard](https://vercel.com/new), click **"Add New Project"**, select your repository, and click **Deploy**. Vercel will automatically detect Vite and run `npm run build`.

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```
