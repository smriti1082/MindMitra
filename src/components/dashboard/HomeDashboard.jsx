import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  Gamepad2,
  Bell,
  Droplets,
  Mic,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Smile,
  Flame,
  Volume2
} from 'lucide-react';

export const HomeDashboard = () => {
  const {
    t,
    profile,
    setActiveTab,
    reminders,
    toggleReminderTaken,
    waterData,
    addWaterGlass,
    cognitiveStats,
    logMood,
    moodLogs,
    setIsVoiceModalOpen,
    speakHelper
  } = useApp();

  // Time-aware greeting
  const hour = new Date().getHours();
  const greetingText = hour < 12 
    ? t.greetingMorning 
    : hour < 17 
    ? t.greetingAfternoon 
    : t.greetingEvening;

  const todayDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Next pending medication or activity
  const nextPending = reminders.find(r => !r.taken);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fade-in pb-24">
      {/* Personalized Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-tealbrand-600 to-brand-800 text-white p-6 sm:p-10 shadow-xl shadow-tealbrand-900/10">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-teal-100 text-sm font-bold">
            <Calendar className="w-4 h-4" />
            <span>{todayDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {greetingText}, <span className="text-teal-200">{profile.preferredName || profile.name}</span>!
          </h1>

          <p className="text-lg sm:text-xl text-teal-50 font-medium leading-relaxed">
            {t.welcomeSub}
          </p>

          {/* Quick Voice Prompt & Streak */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-brand-900 hover:bg-teal-50 font-black shadow-md hover:scale-105 active:scale-95 transition text-base"
            >
              <Mic className="w-5 h-5 text-tealbrand-600 animate-pulse" />
              <span>{t.actionVoice}</span>
            </button>

            <button
              onClick={() => speakHelper(`${greetingText}, ${profile.preferredName}. Today is ${todayDate}. Have a wonderful day!`)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold backdrop-blur-md transition text-base"
              title="Read Greeting Aloud"
            >
              <Volume2 className="w-5 h-5" />
              <span className="hidden sm:inline">Listen</span>
            </button>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/20 text-teal-200 font-extrabold text-sm ml-auto">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>{cognitiveStats.streakDays} {t.streakDays}</span>
            </div>
          </div>
        </div>

        {/* Calming Decorative Background Geometry */}
        <div className="absolute right-[-30px] bottom-[-30px] w-80 h-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-5 text-white/10 hidden md:block pointer-events-none">
          <Brain className="w-64 h-64" />
        </div>
      </div>

      {/* Immediate Health Attention Alert (if pending medicine) */}
      {nextPending && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
                  {t.upcoming} {nextPending.time}
                </span>
                <span className="text-sm font-semibold text-amber-800">
                  {nextPending.notes}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {nextPending.name}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-slate-600 mt-0.5">
                {nextPending.dosage}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleReminderTaken(nextPending.id)}
            className="w-full md:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg transition"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>{t.takeMed}</span>
          </button>
        </div>
      )}

      {/* Mood Check-In Widget (Crucial for dementia wellness & sundowning monitoring) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Smile className="w-7 h-7 text-tealbrand-600" />
              <span>{t.moodPrompt}</span>
            </h2>
            <p className="text-sm font-medium text-slate-500">
              One tap lets your family and Mitra know how you feel right now.
            </p>
          </div>
          {moodLogs.length > 0 && (
            <div className="text-xs font-bold text-tealbrand-800 bg-tealbrand-50 px-3 py-1 rounded-full self-start">
              Latest: {moodLogs[0].emoji} {moodLogs[0].mood} ({moodLogs[0].time})
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <button
            onClick={() => logMood('Peaceful & Happy', '☀️')}
            className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-slate-900 font-extrabold text-center transition hover:scale-105 active:scale-95 shadow-sm group"
          >
            <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition">☀️</div>
            <div className="text-base sm:text-lg">{t.moodHappy}</div>
          </button>

          <button
            onClick={() => logMood('Calm & Content', '🌿')}
            className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-slate-900 font-extrabold text-center transition hover:scale-105 active:scale-95 shadow-sm group"
          >
            <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition">🌿</div>
            <div className="text-base sm:text-lg">{t.moodCalm}</div>
          </button>

          <button
            onClick={() => logMood('A Bit Foggy', '☁️')}
            className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-200 text-slate-900 font-extrabold text-center transition hover:scale-105 active:scale-95 shadow-sm group"
          >
            <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition">☁️</div>
            <div className="text-base sm:text-lg">{t.moodConfused}</div>
          </button>

          <button
            onClick={() => logMood('Need Some Rest', '🌙')}
            className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-slate-900 font-extrabold text-center transition hover:scale-105 active:scale-95 shadow-sm group"
          >
            <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition">🌙</div>
            <div className="text-base sm:text-lg">{t.moodTired}</div>
          </button>
        </div>
      </div>

      {/* 4 GIANT ELDER-FRIENDLY ACTION TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Tile 1: Brain Games */}
        <button
          onClick={() => setActiveTab('games')}
          className="p-6 rounded-3xl bg-gradient-to-br from-tealbrand-50 to-tealbrand-100/60 border-2 border-tealbrand-300 hover:border-tealbrand-500 text-left transition hover:shadow-lg hover:scale-[1.02] active:scale-98 group flex flex-col justify-between h-56"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-tealbrand-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <Gamepad2 className="w-7 h-7" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider bg-tealbrand-200 text-tealbrand-900 px-3 py-1 rounded-full">
              AI Adaptive
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-tealbrand-700 transition">
              {t.actionPlay}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {t.actionPlaySub}
            </p>
          </div>
          <div className="flex items-center text-tealbrand-700 font-black text-sm gap-1 group-hover:translate-x-1 transition">
            <span>Play Now</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Tile 2: Medicine & Routine */}
        <button
          onClick={() => setActiveTab('reminders')}
          className="p-6 rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100/60 border-2 border-brand-300 hover:border-brand-500 text-left transition hover:shadow-lg hover:scale-[1.02] active:scale-98 group flex flex-col justify-between h-56"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <Bell className="w-7 h-7" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider bg-brand-200 text-brand-900 px-3 py-1 rounded-full">
              {reminders.filter(r => r.taken).length}/{reminders.length} Done
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-brand-700 transition">
              {t.actionMeds}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {t.actionMedsSub}
            </p>
          </div>
          <div className="flex items-center text-brand-700 font-black text-sm gap-1 group-hover:translate-x-1 transition">
            <span>View Routine</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Tile 3: Drink Water with Instant 1-Click Action */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-sky-100/60 border-2 border-sky-300 hover:border-sky-500 text-left transition hover:shadow-lg group flex flex-col justify-between h-56">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
              <Droplets className="w-7 h-7" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider bg-sky-200 text-sky-900 px-3 py-1 rounded-full">
              {waterData.glasses} / {waterData.target} Cups
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {t.actionWater}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {waterData.glasses * waterData.glassSizeMl} ml consumed today
            </p>
          </div>
          <button
            onClick={addWaterGlass}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-extrabold text-sm flex items-center justify-center gap-1.5 shadow transition"
          >
            <span>+ Drink 1 Glass</span>
          </button>
        </div>

        {/* Tile 4: Talk to Mitra */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 border-2 border-indigo-300 hover:border-indigo-500 text-left transition hover:shadow-lg hover:scale-[1.02] active:scale-98 group flex flex-col justify-between h-56"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <Mic className="w-7 h-7" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider bg-indigo-200 text-indigo-900 px-3 py-1 rounded-full">
              Audio AI
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-700 transition">
              {t.actionVoice}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {t.actionVoiceSub}
            </p>
          </div>
          <div className="flex items-center text-indigo-700 font-black text-sm gap-1 group-hover:translate-x-1 transition">
            <span>Tap to Speak</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Mitra's Daily Recommended Exercise Card */}
      <div className="bg-gradient-to-r from-tealbrand-900 via-tealbrand-800 to-brand-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Recommended by Mitra AI</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              {t.memoryMatchTitle} ({t.difficultyEasy})
            </h3>
            <p className="text-base text-teal-100 leading-relaxed font-medium">
              Find matching cards of familiar everyday symbols. Mitra has set the cards to gentle pace with helpful hints so you feel peaceful and rewarded.
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold text-teal-200">
              <span>⏱️ 3-4 minutes</span>
              <span>•</span>
              <span>✨ No stressful countdowns</span>
              <span>•</span>
              <span>⭐ Adaptive Difficulty</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('games')}
            className="px-8 py-5 rounded-2xl bg-tealbrand-400 hover:bg-tealbrand-300 text-slate-950 font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition flex items-center gap-2 shrink-0"
          >
            <Brain className="w-6 h-6" />
            <span>Start Exercise Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
