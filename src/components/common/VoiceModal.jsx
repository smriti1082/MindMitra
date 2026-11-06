import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  Volume2,
  X,
  Sparkles,
  Play,
  Droplets,
  Bell,
  HeartPulse
} from 'lucide-react';
import { initSpeechRecognizer, isSpeechRecognitionSupported, speak, stopSpeech } from '../../utils/speechHelper';
import { sounds } from '../../utils/soundEffects';

export const VoiceModal = () => {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    t,
    language,
    setActiveTab,
    addWaterGlass,
    setIsEmergencyModalOpen,
    reminders
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setSupported(isSpeechRecognitionSupported());
  }, []);

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  useEffect(() => {
    if (!isVoiceModalOpen) {
      stopListening();
      stopSpeech();
      setTranscript('');
      setAssistantReply('');
    } else {
      // Warm prompt when opening
      const greeting = language === 'hi' 
        ? 'नमस्ते! मैं आपका मित्र हूँ। आप क्या करना चाहते हैं?'
        : language === 'bn'
        ? 'নমস্কার! আমি মিত্র। আপনি কি খেলতে চান নাকি ঔষধ দেখতে চান?'
        : 'Hello! I am Mitra, your companion. How can I help you today?';
      
      setAssistantReply(greeting);
      speak(greeting, language, null, () => {
        // Automatically start listening after greeting
        startListening();
      });
    }

    return () => {
      stopListening();
      stopSpeech();
    };
  }, [isVoiceModalOpen]);

  const processCommand = (text) => {
    const lower = text.toLowerCase();
    sounds.playTone(587.33, 0.15); // Confirmation chime

    if (lower.includes('game') || lower.includes('memory') || lower.includes('khel') || lower.includes('khela') || lower.includes('play')) {
      const resp = language === 'hi' ? 'स्मृति खेल खोल रहा हूँ।' : 'Opening memory and brain games for you.';
      setAssistantReply(resp);
      speak(resp, language, null, () => {
        setIsVoiceModalOpen(false);
        setActiveTab('games');
      });
    } else if (lower.includes('water') || lower.includes('pani') || lower.includes('jal') || lower.includes('drink')) {
      addWaterGlass();
      const resp = language === 'hi' ? 'बहुत अच्छा! एक गिलास पानी दर्ज कर लिया गया है।' : 'Splendid! I have logged a fresh glass of water for you.';
      setAssistantReply(resp);
      speak(resp, language);
    } else if (lower.includes('medicine') || lower.includes('reminder') || lower.includes('dawa') || lower.includes('oshudh') || lower.includes('routine')) {
      const pendingMeds = reminders.filter(r => !r.taken);
      const resp = pendingMeds.length > 0 
        ? (language === 'hi' ? `आपके पास ${pendingMeds.length} आगामी दवाएं हैं।` : `You have ${pendingMeds.length} pending reminders today.`)
        : (language === 'hi' ? 'आपकी सभी दवाएं पूरी हो चुकी हैं।' : 'All your medicines are up to date!');
      setAssistantReply(resp);
      speak(resp, language, null, () => {
        setIsVoiceModalOpen(false);
        setActiveTab('reminders');
      });
    } else if (lower.includes('caregiver') || lower.includes('doctor') || lower.includes('daughter') || lower.includes('priya') || lower.includes('report')) {
      const resp = language === 'hi' ? 'केयरगिवर रिपोर्ट खोल रहा हूँ।' : 'Opening caregiver health dashboard.';
      setAssistantReply(resp);
      speak(resp, language, null, () => {
        setIsVoiceModalOpen(false);
        setActiveTab('caregiver');
      });
    } else if (lower.includes('emergency') || lower.includes('sos') || lower.includes('help') || lower.includes('bachao')) {
      const resp = language === 'hi' ? 'आपातकालीन संपर्क खोल रहा हूँ।' : 'Opening emergency contact screen right away.';
      setAssistantReply(resp);
      speak(resp, language, null, () => {
        setIsVoiceModalOpen(false);
        setIsEmergencyModalOpen(true);
      });
    } else if (lower.includes('home') || lower.includes('dashboard') || lower.includes('mukhya')) {
      const resp = language === 'hi' ? 'मुख्य पृष्ठ पर जा रहे हैं।' : 'Taking you back to Home Dashboard.';
      setAssistantReply(resp);
      speak(resp, language, null, () => {
        setIsVoiceModalOpen(false);
        setActiveTab('home');
      });
    } else {
      const resp = language === 'hi'
        ? `मैंने सुना: "${text}"। आप खेल खेलने, पानी दर्ज करने या दवा देखने के लिए कह सकते हैं।`
        : `I heard: "${text}". Try asking me to play games, log water, or check medicines.`;
      setAssistantReply(resp);
      speak(resp, language);
    }
  };

  const startListening = () => {
    if (!supported) return;
    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const rec = initSpeechRecognizer(language);
      if (!rec) return;

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript;
        setTranscript(resultTranscript);
        if (event.results[current].isFinal) {
          processCommand(resultTranscript);
        }
      };

      rec.onerror = (e) => {
        console.warn("Speech recognition error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.warn("Recognition start failed", e);
      setIsListening(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-4 border-tealbrand-400 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-tealbrand-600 to-brand-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-2xl font-black">{t.actionVoice}</h3>
              <p className="text-teal-100 text-sm font-medium">Mitra Cognitive Voice Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceModalOpen(false)}
            className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition focus:outline-none"
            aria-label="Close Voice Assistant"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Assistant Response Box */}
        <div className="p-6 space-y-6">
          <div className="bg-tealbrand-50 border-2 border-tealbrand-200 rounded-2xl p-5 relative shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-tealbrand-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-tealbrand-800">
                  {t.mitraSpeaking}
                </span>
                <p className="text-lg font-bold text-slate-800 mt-1 leading-relaxed">
                  {assistantReply || t.voiceListening}
                </p>
              </div>
            </div>
          </div>

          {/* User Transcript Display */}
          {transcript && (
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5 text-slate-700 text-base font-medium flex items-center gap-2">
              <span className="text-xs bg-slate-300 px-2 py-0.5 rounded font-bold uppercase">You said:</span>
              <span className="italic">"{transcript}"</span>
            </div>
          )}

          {/* Central Interactive Mic Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={toggleMic}
              className={`w-28 h-28 rounded-full flex items-center justify-center transition shadow-2xl focus:outline-none ${
                isListening
                  ? 'bg-rose-500 text-white animate-voice-glow ring-8 ring-rose-200'
                  : 'bg-gradient-to-tr from-brand-600 to-tealbrand-500 text-white hover:scale-105 active:scale-95'
              }`}
            >
              {isListening ? (
                <Mic className="w-12 h-12 animate-bounce" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </button>
            <span className="mt-3 text-base font-extrabold text-slate-700">
              {isListening ? t.tapToStop : t.tapToSpeak}
            </span>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {supported ? "Speak in your selected language" : "Microphone not detected, tap suggestions below"}
            </p>
          </div>

          {/* Quick Voice Shortcut Buttons (Elderly fallback 1-touch commands) */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              {t.voiceSpeakPrompt}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => processCommand("play memory game")}
                className="flex items-center gap-2 p-3 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl text-left font-bold text-brand-900 transition text-sm"
              >
                <Play className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Play Memory Game</span>
              </button>

              <button
                onClick={() => processCommand("drink water")}
                className="flex items-center gap-2 p-3 bg-tealbrand-50 hover:bg-tealbrand-100 border border-tealbrand-200 rounded-xl text-left font-bold text-tealbrand-900 transition text-sm"
              >
                <Droplets className="w-4 h-4 text-tealbrand-600 shrink-0" />
                <span>Drink Water (+1)</span>
              </button>

              <button
                onClick={() => processCommand("show my medicines")}
                className="flex items-center gap-2 p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left font-bold text-amber-900 transition text-sm"
              >
                <Bell className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Show Medicines</span>
              </button>

              <button
                onClick={() => processCommand("go to caregiver portal")}
                className="flex items-center gap-2 p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-left font-bold text-indigo-900 transition text-sm"
              >
                <HeartPulse className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Caregiver Portal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
