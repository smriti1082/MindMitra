// Web Speech API Helper with language mapping and elderly-friendly pacing

const LANG_CODE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  es: 'es-ES'
};

export const speak = (text, lang = 'en', onStart = null, onEnd = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("Speech Synthesis not supported");
    if (onEnd) onEnd();
    return;
  }

  // Cancel any running speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const targetLang = LANG_CODE_MAP[lang] || 'en-US';
  utterance.lang = targetLang;

  // Slower, gentle rate for elderly dementia patients (0.85 rate)
  utterance.rate = 0.85;
  utterance.pitch = 1.05;

  // Try to pick a natural regional voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]) || v.lang === targetLang);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onStart) utterance.onstart = onStart;
  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  utterance.onerror = (err) => {
    console.warn("Speech error:", err);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Check if Speech Recognition is supported
export const isSpeechRecognitionSupported = () => {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
};

// Create Speech Recognizer instance
export const initSpeechRecognizer = (lang = 'en') => {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRec();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = LANG_CODE_MAP[lang] || 'en-IN';

  return recognition;
};
