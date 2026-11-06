import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  User,
  Eye,
  Database,
  RotateCcw,
  CheckCircle,
  Save,
  Languages,
  Type
} from 'lucide-react';

export const SettingsModule = () => {
  const {
    t,
    profile,
    setProfile,
    language,
    setLanguage,
    languages,
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
    lastSaved
  } = useApp();

  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const resetAllDataToDefault = () => {
    if (window.confirm("Restore sample clinic demonstration data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences & Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.navSettings}
          </h1>
          <p className="text-base text-slate-600 font-medium mt-1">
            Customize patient information, accessibility, and offline synchronization
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold">
          <Database className="w-4 h-4 text-emerald-600" />
          <span>Offline Ready • Synced: {lastSaved}</span>
        </div>
      </div>

      {/* Patient Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-2xl font-black text-slate-900 border-b pb-3 flex items-center gap-2.5">
          <User className="w-6 h-6 text-brand-600" />
          <span>Patient & Medical Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Preferred Friendly Name (How Mitra greets patient)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dada Ji or Grandpa Ramesh"
              value={formData.preferredName}
              onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Dementia Diagnosis Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            >
              <option value="Mild Cognitive Impairment (Early Stage)">Mild Cognitive Impairment (Early Stage)</option>
              <option value="Moderate Dementia">Moderate Dementia</option>
              <option value="General Senior Memory & Cognitive Agility">General Senior Memory & Cognitive Agility</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Primary Caregiver Contact Name & Relation
            </label>
            <input
              type="text"
              value={formData.emergencyContact.name}
              onChange={(e) => setFormData({
                ...formData,
                emergencyContact: { ...formData.emergencyContact, name: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Caregiver Phone (SOS Alert Number)
            </label>
            <input
              type="tel"
              value={formData.emergencyContact.phone}
              onChange={(e) => setFormData({
                ...formData,
                emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Consulting Neuro-Geriatrician
            </label>
            <input
              type="text"
              value={formData.physician.name}
              onChange={(e) => setFormData({
                ...formData,
                physician: { ...formData.physician, name: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Physician Phone
            </label>
            <input
              type="tel"
              value={formData.physician.phone}
              onChange={(e) => setFormData({
                ...formData,
                physician: { ...formData.physician, phone: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          {savedSuccess && (
            <span className="text-emerald-600 font-bold flex items-center gap-1.5 text-sm">
              <CheckCircle className="w-5 h-5" />
              <span>Profile saved successfully!</span>
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-base shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>

      {/* Senior Accessibility Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-2xl font-black text-slate-900 border-b pb-3 flex items-center gap-2.5">
          <Eye className="w-6 h-6 text-tealbrand-600" />
          <span>Elderly-Friendly Accessibility & Regional Language</span>
        </h3>

        {/* Language Selection Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-tealbrand-600" />
            <span className="font-black text-slate-900 text-base">Application Language</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {languages.map(l => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`p-2.5 rounded-xl border-2 font-bold text-sm transition flex items-center justify-center gap-1.5 ${
                  language === l.code
                    ? 'bg-tealbrand-600 border-tealbrand-500 text-white shadow'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.native}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Preset */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-brand-600" />
            <span className="font-black text-slate-900 text-base">Default Font Size Scaling</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`p-3 rounded-xl border-2 font-bold text-sm transition ${
                fontSize === 'normal'
                  ? 'bg-brand-600 border-brand-500 text-white shadow'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Standard (A)
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`p-3 rounded-xl border-2 font-bold text-base transition ${
                fontSize === 'large'
                  ? 'bg-brand-600 border-brand-500 text-white shadow'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Large (A+)
            </button>
            <button
              type="button"
              onClick={() => setFontSize('xl')}
              className={`p-3 rounded-xl border-2 font-black text-lg transition ${
                fontSize === 'xl'
                  ? 'bg-brand-600 border-brand-500 text-white shadow'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Extra Large (A++)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Simple Mode Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-black text-slate-900 text-base">{t.simpleMode}</div>
              <p className="text-xs text-slate-500 font-medium">Extra large 1-tap tiles for tremors & motor fatigue</p>
            </div>
            <button
              type="button"
              onClick={() => setSimpleMode(!simpleMode)}
              className={`w-14 h-8 rounded-full transition-colors p-1 flex items-center ${
                simpleMode ? 'bg-tealbrand-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Voice Guidance Read-Aloud */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-black text-slate-900 text-base">{t.speechVoice}</div>
              <p className="text-xs text-slate-500 font-medium">Spoken audio reading for cards, tips & reminders</p>
            </div>
            <button
              type="button"
              onClick={() => setVoiceGuidance(!voiceGuidance)}
              className={`w-14 h-8 rounded-full transition-colors p-1 flex items-center ${
                voiceGuidance ? 'bg-tealbrand-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Sound Effects Chime */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-black text-slate-900 text-base">Sound Chimes & Bells</div>
              <p className="text-xs text-slate-500 font-medium">Pleasant Web Audio synthesizers for game cues</p>
            </div>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-14 h-8 rounded-full transition-colors p-1 flex items-center ${
                soundEnabled ? 'bg-tealbrand-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* High Contrast */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-black text-slate-900 text-base">{t.highContrast}</div>
              <p className="text-xs text-slate-500 font-medium">Darkened contrast for cataract clarity</p>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className={`w-14 h-8 rounded-full transition-colors p-1 flex items-center ${
                highContrast ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>
      </div>

      {/* Reset & Hackathon Demo Helper */}
      <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-black text-slate-900 text-base">
            Reset Clinic Demo Dataset
          </h4>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Restores initial realistic senior records, 7-day cognitive history, and sample medications.
          </p>
        </div>

        <button
          onClick={resetAllDataToDefault}
          className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 font-extrabold text-sm transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restore Default Demo Data</span>
        </button>
      </div>
    </div>
  );
};
