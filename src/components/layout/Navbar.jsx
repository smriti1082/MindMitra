import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  Home,
  Gamepad2,
  Bell,
  Activity,
  Settings,
  Mic,
  Volume2,
  VolumeX,
  Eye,
  PhoneCall,
  Languages
} from 'lucide-react';

export const Navbar = () => {
  const {
    t,
    language,
    setLanguage,
    languages,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    soundEnabled,
    setSoundEnabled,
    activeTab,
    setActiveTab,
    setIsVoiceModalOpen,
    setIsEmergencyModalOpen,
    profile
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-colors">
      {/* Top Accessibility & Emergency Bar */}
      <div className="bg-gradient-to-r from-brand-700 via-tealbrand-700 to-brand-800 text-white px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          {/* Patient greeting badge */}
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold tracking-wide">
              {profile.preferredName || profile.name}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-white/20">
              {profile.stage}
            </span>
          </div>

          {/* Quick Accessibility Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-black/20 rounded-lg p-0.5" title="Text Size">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded text-xs font-bold transition ${
                  fontSize === 'normal' ? 'bg-white text-brand-900 shadow-sm' : 'text-white/80 hover:text-white'
                }`}
                aria-label="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded text-sm font-bold transition ${
                  fontSize === 'large' ? 'bg-white text-brand-900 shadow-sm' : 'text-white/80 hover:text-white'
                }`}
                aria-label="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded text-base font-extrabold transition ${
                  fontSize === 'xl' ? 'bg-white text-brand-900 shadow-sm' : 'text-white/80 hover:text-white'
                }`}
                aria-label="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                highContrast ? 'bg-amber-400 text-slate-950 shadow' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
              title="Toggle High Contrast"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.highContrast}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                soundEnabled ? 'bg-black/20 text-white hover:bg-black/30' : 'bg-rose-500/80 text-white'
              }`}
              title={soundEnabled ? t.soundOn : t.soundOff}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Regional Language Switcher */}
            <div className="relative flex items-center bg-black/20 rounded-lg px-2 py-1">
              <Languages className="w-3.5 h-3.5 mr-1 text-teal-200" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="text-slate-900">
                    {lang.flag} {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency SOS Call Button */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-extrabold shadow-md hover:scale-105 transition animate-pulse"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-brand-600 to-tealbrand-500 flex items-center justify-center text-white shadow-lg shadow-tealbrand-500/20 group-hover:scale-105 transition p-2.5">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 group-hover:text-brand-700 transition">
                  Mind<span className="text-tealbrand-600">Mitra</span>
                </span>
                <span className="bg-tealbrand-100 text-tealbrand-800 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  Dementia Care
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 line-clamp-1">
                {t.appTagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-base transition ${
                activeTab === 'home'
                  ? 'bg-brand-50 text-brand-700 border-2 border-brand-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Home className="w-5 h-5 text-brand-600" />
              <span>{t.navHome}</span>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-base transition ${
                activeTab === 'games'
                  ? 'bg-tealbrand-50 text-tealbrand-700 border-2 border-tealbrand-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Gamepad2 className="w-5 h-5 text-tealbrand-600" />
              <span>{t.navGames}</span>
            </button>

            <button
              onClick={() => setActiveTab('reminders')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-base transition ${
                activeTab === 'reminders'
                  ? 'bg-brand-50 text-brand-700 border-2 border-brand-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-5 h-5 text-brand-600" />
              <span>{t.navReminders}</span>
            </button>

            <button
              onClick={() => setActiveTab('caregiver')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-base transition ${
                activeTab === 'caregiver'
                  ? 'bg-indigo-50 text-indigo-700 border-2 border-indigo-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-5 h-5 text-indigo-600" />
              <span>{t.navCaregiver}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-base transition ${
                activeTab === 'settings'
                  ? 'bg-slate-100 text-slate-900 border-2 border-slate-300'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-5 h-5 text-slate-500" />
              <span>{t.navSettings}</span>
            </button>
          </nav>

          {/* Voice Assistant Trigger Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-gradient-to-r from-tealbrand-500 to-brand-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition group"
              title="Speak to Mitra"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs uppercase tracking-wider text-tealbrand-100 font-semibold">
                  Web Speech AI
                </div>
                <div className="text-sm font-extrabold leading-tight">
                  {t.actionVoice}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'home' ? 'text-brand-600 font-bold bg-brand-50' : 'text-slate-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">{t.navHome}</span>
        </button>

        <button
          onClick={() => setActiveTab('games')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'games' ? 'text-tealbrand-600 font-bold bg-tealbrand-50' : 'text-slate-500'
          }`}
        >
          <Gamepad2 className="w-6 h-6" />
          <span className="text-xs mt-1">{t.navGames}</span>
        </button>

        <button
          onClick={() => setActiveTab('reminders')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'reminders' ? 'text-brand-600 font-bold bg-brand-50' : 'text-slate-500'
          }`}
        >
          <Bell className="w-6 h-6" />
          <span className="text-xs mt-1">{t.navReminders}</span>
        </button>

        <button
          onClick={() => setActiveTab('caregiver')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'caregiver' ? 'text-indigo-600 font-bold bg-indigo-50' : 'text-slate-500'
          }`}
        >
          <Activity className="w-6 h-6" />
          <span className="text-xs mt-1">{t.navCaregiver}</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'settings' ? 'text-slate-900 font-bold bg-slate-100' : 'text-slate-500'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">{t.navSettings}</span>
        </button>
      </div>
    </header>
  );
};
