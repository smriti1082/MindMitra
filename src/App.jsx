import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { GamesHub } from './components/games/GamesHub';
import { RemindersModule } from './components/reminders/RemindersModule';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { SettingsModule } from './components/settings/SettingsModule';
import { VoiceModal } from './components/common/VoiceModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import {
  Gamepad2,
  Bell,
  Droplets,
  Mic,
  PhoneCall,
  Brain,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    fontSize,
    highContrast,
    simpleMode,
    setSimpleMode,
    t,
    profile,
    addWaterGlass,
    setIsVoiceModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  // Apply font scale and high contrast classes to document body
  useEffect(() => {
    document.body.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-xl');
    document.body.classList.add(`font-scale-${fontSize}`);

    if (highContrast) {
      document.body.classList.add('mode-high-contrast');
    } else {
      document.body.classList.remove('mode-high-contrast');
    }
  }, [fontSize, highContrast]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar */}
      <Navbar />

      {/* Ultra Simple Mode Banner (if toggled on) */}
      {simpleMode && (
        <div className="bg-amber-100 border-b-2 border-amber-300 py-3 px-4 text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-amber-950 font-black">
            <span className="text-base sm:text-lg">
              ✨ Ultra-Simple Senior Mode Active
            </span>
            <button
              onClick={() => setSimpleMode(false)}
              className="text-xs bg-amber-800 text-white px-3 py-1.5 rounded-lg hover:bg-amber-900"
            >
              Switch to Standard View
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {simpleMode ? (
          /* Senior Ultra Simple 4-Giant Tiles Screen */
          <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-4xl font-black text-slate-900">
                Namaste, {profile.preferredName || profile.name}
              </h2>
              <p className="text-xl text-slate-600 font-semibold">
                Tap any giant button below:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setSimpleMode(false);
                  setActiveTab('games');
                }}
                className="h-48 rounded-3xl bg-tealbrand-600 text-white p-6 flex flex-col items-center justify-center text-center shadow-xl active:scale-95 transition"
              >
                <Gamepad2 className="w-16 h-16 mb-2" />
                <span className="text-2xl font-black">{t.actionPlay}</span>
                <span className="text-sm font-semibold opacity-90 mt-1">Memory & Brain Games</span>
              </button>

              <button
                onClick={() => {
                  setSimpleMode(false);
                  setActiveTab('reminders');
                }}
                className="h-48 rounded-3xl bg-brand-600 text-white p-6 flex flex-col items-center justify-center text-center shadow-xl active:scale-95 transition"
              >
                <Bell className="w-16 h-16 mb-2" />
                <span className="text-2xl font-black">{t.actionMeds}</span>
                <span className="text-sm font-semibold opacity-90 mt-1">Check today's tablets</span>
              </button>

              <button
                onClick={addWaterGlass}
                className="h-48 rounded-3xl bg-sky-600 text-white p-6 flex flex-col items-center justify-center text-center shadow-xl active:scale-95 transition"
              >
                <Droplets className="w-16 h-16 mb-2" />
                <span className="text-2xl font-black">{t.actionWater}</span>
                <span className="text-sm font-semibold opacity-90 mt-1">+1 Fresh Glass</span>
              </button>

              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="h-48 rounded-3xl bg-indigo-600 text-white p-6 flex flex-col items-center justify-center text-center shadow-xl active:scale-95 transition"
              >
                <Mic className="w-16 h-16 mb-2" />
                <span className="text-2xl font-black">{t.actionVoice}</span>
                <span className="text-sm font-semibold opacity-90 mt-1">Speak to Mitra</span>
              </button>
            </div>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="w-full py-5 rounded-3xl bg-rose-600 text-white font-black text-xl flex items-center justify-center gap-3 shadow-xl active:scale-95 mt-4"
            >
              <PhoneCall className="w-8 h-8" />
              <span>Call Daughter Priya / Doctor (SOS)</span>
            </button>
          </div>
        ) : (
          /* Standard Rich Tabs */
          <>
            {activeTab === 'home' && <HomeDashboard />}
            {activeTab === 'games' && <GamesHub />}
            {activeTab === 'reminders' && <RemindersModule />}
            {activeTab === 'caregiver' && <CaregiverDashboard />}
            {activeTab === 'settings' && <SettingsModule />}
          </>
        )}
      </main>

      {/* Voice Assistant Overlay Modal */}
      <VoiceModal />

      {/* Emergency Quick SOS Modal */}
      <EmergencyModal />

      {/* Accessible Healthcare Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 text-center text-slate-500 text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-tealbrand-600" />
            <span className="font-extrabold text-slate-900">MindMitra</span>
            <span>— AI-Powered Cognitive Care & Dementia Companion</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Offline Local Storage Safe</span>
            </span>
            <span>•</span>
            <span>Geriatric Healthcare Interface</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
