import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, languages } from '../utils/translations';
import {
  initialProfile,
  initialReminders,
  initialWaterData,
  initialCognitiveStats,
  initialCaregiverNotes,
  initialMoodHistory
} from '../utils/sampleData';
import { sounds } from '../utils/soundEffects';
import { speak, stopSpeech } from '../utils/speechHelper';

const AppContext = createContext();

const VALID_TABS = ['home', 'games', 'reminders', 'caregiver', 'settings'];

export const AppProvider = ({ children }) => {
  // Load persisted state or fallback
  const getStored = (key, fallback) => {
    try {
      const item = localStorage.getItem(`mindmitra_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_TABS.includes(hash)) return hash;
    }
    return 'home';
  };

  const [language, setLanguageState] = useState(() => getStored('lang', 'en'));
  const [fontSize, setFontSizeState] = useState(() => getStored('fontSize', 'large')); // Default large for elderly clarity
  const [highContrast, setHighContrastState] = useState(() => getStored('highContrast', false));
  const [soundEnabled, setSoundEnabledState] = useState(() => getStored('sound', true));
  const [voiceGuidance, setVoiceGuidanceState] = useState(() => getStored('voiceGuidance', true));
  const [simpleMode, setSimpleModeState] = useState(() => getStored('simpleMode', false));
  
  const [profile, setProfileState] = useState(() => getStored('profile', initialProfile));
  const [reminders, setRemindersState] = useState(() => getStored('reminders', initialReminders));
  const [waterData, setWaterDataState] = useState(() => getStored('water', initialWaterData));
  const [cognitiveStats, setCognitiveStatsState] = useState(() => getStored('cognitive', initialCognitiveStats));
  const [caregiverNotes, setCaregiverNotesState] = useState(() => getStored('notes', initialCaregiverNotes));
  const [moodLogs, setMoodLogsState] = useState(() => getStored('moods', initialMoodHistory));

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date().toLocaleTimeString());

  // Listen to browser hash changes (for back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_TABS.includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setActiveTab = useCallback((tab) => {
    if (VALID_TABS.includes(tab)) {
      setActiveTabState(tab);
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Translations
  const t = translations[language] || translations.en;

  // Sync sounds state
  useEffect(() => {
    sounds.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Persist handlers
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('mindmitra_lang', JSON.stringify(lang));
    setLastSaved(new Date().toLocaleTimeString());
  };

  const setFontSize = (size) => {
    setFontSizeState(size);
    localStorage.setItem('mindmitra_fontSize', JSON.stringify(size));
  };

  const setHighContrast = (val) => {
    setHighContrastState(val);
    localStorage.setItem('mindmitra_highContrast', JSON.stringify(val));
  };

  const setSoundEnabled = (val) => {
    setSoundEnabledState(val);
    localStorage.setItem('mindmitra_sound', JSON.stringify(val));
  };

  const setVoiceGuidance = (val) => {
    setVoiceGuidanceState(val);
    localStorage.setItem('mindmitra_voiceGuidance', JSON.stringify(val));
    if (!val) stopSpeech();
  };

  const setSimpleMode = (val) => {
    setSimpleModeState(val);
    localStorage.setItem('mindmitra_simpleMode', JSON.stringify(val));
  };

  const setProfile = (newProfile) => {
    setProfileState(newProfile);
    localStorage.setItem('mindmitra_profile', JSON.stringify(newProfile));
    setLastSaved(new Date().toLocaleTimeString());
  };

  const toggleReminderTaken = (id) => {
    const updated = reminders.map(r => {
      if (r.id === id) {
        const nextTaken = !r.taken;
        return {
          ...r,
          taken: nextTaken,
          takenAt: nextTaken ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
        };
      }
      return r;
    });
    setRemindersState(updated);
    localStorage.setItem('mindmitra_reminders', JSON.stringify(updated));
    sounds.playTone(660, 0.15, 'sine', 0.18);
  };

  const addReminder = (newRem) => {
    const reminderWithId = {
      ...newRem,
      id: 'custom-' + Date.now(),
      taken: false,
      takenAt: null
    };
    const updated = [...reminders, reminderWithId];
    setRemindersState(updated);
    localStorage.setItem('mindmitra_reminders', JSON.stringify(updated));
    sounds.playTone(550, 0.12);
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setRemindersState(updated);
    localStorage.setItem('mindmitra_reminders', JSON.stringify(updated));
  };

  const addWaterGlass = () => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newGlasses = Math.min(waterData.glasses + 1, 16);
    const updated = {
      ...waterData,
      glasses: newGlasses,
      history: [{ time: nowTime, amount: waterData.glassSizeMl }, ...waterData.history]
    };
    setWaterDataState(updated);
    localStorage.setItem('mindmitra_water', JSON.stringify(updated));
    sounds.playWaterChime();

    if (voiceGuidance) {
      speak(language === 'hi' ? 'शाबाश! आपने एक गिलास पानी पी लिया।' : 'Wonderful! You drank a glass of water.', language);
    }
  };

  const resetWater = () => {
    const updated = {
      ...waterData,
      glasses: 0,
      history: []
    };
    setWaterDataState(updated);
    localStorage.setItem('mindmitra_water', JSON.stringify(updated));
  };

  // Adaptive game difficulty scoring
  const recordGameResult = (gameType, { accuracy, moves, timeSeconds, won }) => {
    setCognitiveStatsState(prev => {
      const newTotal = prev.totalGamesPlayed + 1;
      const current = prev.currentScore;
      const boost = won ? 1 : 0;
      const newScore = Math.min(99, Math.max(60, Math.round(current * 0.9 + (accuracy || 85) * 0.1 + boost)));
      
      // Determine adaptive difficulty automatically
      let nextDifficulty = prev.adaptiveDifficulty;
      if (newScore > 88) nextDifficulty = 'hard';
      else if (newScore < 75) nextDifficulty = 'easy';
      else nextDifficulty = 'medium';

      const updatedHistory = [...prev.history7Days];
      if (updatedHistory.length > 0) {
        const lastIdx = updatedHistory.length - 1;
        updatedHistory[lastIdx] = {
          ...updatedHistory[lastIdx],
          score: newScore,
          reactionSec: Math.round(((timeSeconds / Math.max(moves, 1)) || 2.2) * 10) / 10
        };
      }

      const updated = {
        ...prev,
        currentScore: newScore,
        adaptiveDifficulty: nextDifficulty,
        totalGamesPlayed: newTotal,
        history7Days: updatedHistory
      };
      localStorage.setItem('mindmitra_cognitive', JSON.stringify(updated));
      return updated;
    });
  };

  const addCaregiverNote = (content, author = 'Caregiver') => {
    const newNote = {
      id: 'note-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      author,
      tag: 'Caregiver Update',
      content
    };
    const updated = [newNote, ...caregiverNotes];
    setCaregiverNotesState(updated);
    localStorage.setItem('mindmitra_notes', JSON.stringify(updated));
  };

  const logMood = (moodName, emoji) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      time: timeNow,
      mood: moodName,
      emoji: emoji,
      note: 'Checked in by patient'
    };
    const updated = [newLog, ...moodLogs];
    setMoodLogsState(updated);
    localStorage.setItem('mindmitra_moods', JSON.stringify(updated));
    sounds.playTone(523.25, 0.2);

    if (voiceGuidance) {
      speak(t.moodRecorded, language);
    }
  };

  const speakHelper = (text) => {
    if (voiceGuidance) {
      speak(text, language);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        languages,
        t,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        soundEnabled,
        setSoundEnabled,
        voiceGuidance,
        setVoiceGuidance,
        simpleMode,
        setSimpleMode,
        profile,
        setProfile,
        reminders,
        toggleReminderTaken,
        addReminder,
        deleteReminder,
        waterData,
        addWaterGlass,
        resetWater,
        cognitiveStats,
        recordGameResult,
        caregiverNotes,
        addCaregiverNote,
        moodLogs,
        logMood,
        activeTab,
        setActiveTab,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        speakHelper,
        lastSaved
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
