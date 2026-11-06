import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  TrendingUp,
  Award,
  Clock,
  ShieldCheck,
  FileText,
  Plus,
  Printer
} from 'lucide-react';

export const CaregiverDashboard = () => {
  const {
    t,
    profile,
    cognitiveStats,
    reminders,
    waterData,
    caregiverNotes,
    addCaregiverNote,
    moodLogs
  } = useApp();

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Priya (Daughter)');
  const [showDoctorReport, setShowDoctorReport] = useState(false);

  const completedMeds = reminders.filter(r => r.taken).length;
  const complianceRate = reminders.length > 0 ? Math.round((completedMeds / reminders.length) * 100) : 100;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteContent) return;
    addCaregiverNote(noteContent, noteAuthor);
    setNoteContent('');
    setIsNoteModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Family & Clinical Oversight</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.caregiverTitle}
          </h1>
          <p className="text-base text-slate-600 font-medium mt-1">
            Monitoring profile for <strong className="text-slate-900">{profile.name}</strong> ({profile.age} yrs • {profile.stage})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDoctorReport(true)}
            className="px-5 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-lg transition active:scale-95 flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            <span>{t.exportDoctorReport}</span>
          </button>
        </div>
      </div>

      {/* Key Vital Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Cognitive Vitality Score */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-tealbrand-50 to-tealbrand-100/60 border-2 border-tealbrand-300 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-tealbrand-900">
              {t.overallScore}
            </span>
            <div className="w-10 h-10 rounded-xl bg-tealbrand-600 text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-4xl font-black text-slate-900 flex items-baseline gap-2">
              <span>{cognitiveStats.currentScore}</span>
              <span className="text-lg font-bold text-slate-500">/ 100</span>
            </div>
            <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <span>↑ +8% improvement this week</span>
            </p>
          </div>
          <div className="text-xs font-bold text-slate-600 border-t border-tealbrand-200 pt-2">
            Status: <span className="text-tealbrand-800 font-extrabold capitalize">{cognitiveStats.adaptiveDifficulty} stability</span>
          </div>
        </div>

        {/* Card 2: Medicine Adherence Rate */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100/60 border-2 border-brand-300 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-brand-900">
              {t.medCompliance}
            </span>
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-4xl font-black text-slate-900 flex items-baseline gap-2">
              <span>{complianceRate}%</span>
            </div>
            <p className="text-xs font-semibold text-brand-800 mt-1">
              {completedMeds} of {reminders.length} doses on schedule
            </p>
          </div>
          <div className="text-xs font-bold text-slate-600 border-t border-brand-200 pt-2">
            Hydration: <span className="text-brand-800 font-extrabold">{waterData.glasses * 250}ml logged</span>
          </div>
        </div>

        {/* Card 3: Reaction Time */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/60 border-2 border-amber-300 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900">
              {t.reactionTime}
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-4xl font-black text-slate-900 flex items-baseline gap-2">
              <span>{cognitiveStats.avgReactionTimeMs / 1000}s</span>
            </div>
            <p className="text-xs font-semibold text-emerald-700 mt-1">
              0.4s faster than baseline
            </p>
          </div>
          <div className="text-xs font-bold text-slate-600 border-t border-amber-200 pt-2">
            Neuro-motor responsiveness steady
          </div>
        </div>

        {/* Card 4: Games Completed & Streak */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100/60 border-2 border-purple-300 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-purple-900">
              Active Engagement
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-4xl font-black text-slate-900 flex items-baseline gap-2">
              <span>{cognitiveStats.totalGamesPlayed}</span>
              <span className="text-lg font-bold text-slate-500">sessions</span>
            </div>
            <p className="text-xs font-semibold text-purple-800 mt-1">
              {cognitiveStats.streakDays} consecutive days active
            </p>
          </div>
          <div className="text-xs font-bold text-slate-600 border-t border-purple-200 pt-2">
            High dementia resistance engagement
          </div>
        </div>
      </div>

      {/* Cognitive Vitality Trend Chart (SVG Accessible Visualizer) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              7-Day Cognitive Performance & Reaction Curve
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">
              Daily scoring across Memory Match, Pattern Rhythm and Visual Attention exercises
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-tealbrand-700">
              <span className="w-3.5 h-3.5 rounded-full bg-tealbrand-500" />
              <span>Cognitive Score (0-100)</span>
            </div>
            <div className="flex items-center gap-1.5 text-brand-700">
              <span className="w-3.5 h-3.5 rounded-full bg-brand-500" />
              <span>Medicine Compliance (%)</span>
            </div>
          </div>
        </div>

        {/* 7-Day Visual Bars */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-6 items-end h-64 border-b border-slate-200 pb-3">
          {cognitiveStats.history7Days.map((entry, idx) => (
            <div key={idx} className="flex flex-col items-center h-full justify-end group">
              <div className="text-xs font-black text-slate-700 opacity-0 group-hover:opacity-100 transition mb-1">
                {entry.score} pts
              </div>

              {/* Bar Stack */}
              <div className="w-full max-w-[42px] bg-slate-100 rounded-2xl h-44 flex flex-col justify-end p-1 relative">
                {/* Score bar */}
                <div
                  className="w-full bg-gradient-to-t from-tealbrand-600 to-tealbrand-400 rounded-xl transition-all duration-500 shadow-sm"
                  style={{ height: `${entry.score}%` }}
                />
              </div>

              <div className="text-xs font-extrabold text-slate-700 mt-2">
                {entry.day}
              </div>
              <div className="text-[10px] font-semibold text-slate-400">
                {entry.reactionSec}s
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinician Notes & Mood Tracker Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood & Alertness Feed (Left 1 col) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">Mood & Sundowning</h3>
            <span className="text-xs font-bold text-slate-500">Live Feed</span>
          </div>

          <div className="space-y-3">
            {moodLogs.map((log, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{log.emoji}</span>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm">{log.mood}</div>
                    <div className="text-xs text-slate-500 font-medium">{log.note}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor & Caregiver Clinical Notes (Right 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">{t.caregiverNotes}</h3>
              <p className="text-xs font-semibold text-slate-500">Daily observations for upcoming clinical appointments</p>
            </div>

            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addNote}</span>
            </button>
          </div>

          <div className="space-y-3">
            {caregiverNotes.map(note => (
              <div key={note.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900">{note.author}</span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">
                      {note.tag}
                    </span>
                  </div>
                  <span className="text-slate-400 font-semibold">{note.date}</span>
                </div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-indigo-300 space-y-5 animate-scale-up">
            <h3 className="text-2xl font-black text-slate-900">{t.addNote}</h3>
            
            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Author / Role
                </label>
                <select
                  value={noteAuthor}
                  onChange={(e) => setNoteAuthor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 font-semibold focus:outline-none"
                >
                  <option value="Priya (Daughter)">Priya Sharma (Daughter / Primary)</option>
                  <option value="Dr. Arvind Sen">Dr. Arvind Sen (Neuro-Geriatrician)</option>
                  <option value="Nurse Suman">Nurse Suman (Visiting Attendant)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Clinical Observation / Note
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Note mood, orientation, sleep quality, appetite or memory episodes..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 font-medium focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="flex-1 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exportable Doctor's Clinical Report Modal */}
      {showDoctorReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-3xl w-full shadow-2xl border border-slate-300 space-y-6 my-8 print:p-0 print:border-none print:shadow-none">
            {/* Header / Hospital Branding */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-brand-700">
                  MindMitra Dementia Care Clinical Summary
                </div>
                <h2 className="text-3xl font-black text-slate-900 mt-1">
                  Cognitive Assessment & Adherence Report
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Generated for Consultation with {profile.physician.name} ({profile.physician.clinic})
                </p>
              </div>
              <button
                onClick={() => setShowDoctorReport(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs print:hidden"
              >
                Close
              </button>
            </div>

            {/* Patient Info Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 font-bold block">Patient:</span>
                <span className="font-black text-slate-900 text-sm">{profile.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Age / Gender:</span>
                <span className="font-black text-slate-900 text-sm">{profile.age} Y / M</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Clinical Stage:</span>
                <span className="font-black text-tealbrand-800 text-sm">{profile.stage}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Blood Group:</span>
                <span className="font-black text-rose-600 text-sm">{profile.bloodGroup}</span>
              </div>
            </div>

            {/* Clinical Highlights */}
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-base border-b pb-1">
                Cognitive Agility & Neuro-Motor Metrics
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-tealbrand-50 rounded-xl border border-tealbrand-200">
                  <span className="text-xs text-tealbrand-800 font-bold">Vitality Score</span>
                  <div className="text-2xl font-black text-tealbrand-950">{cognitiveStats.currentScore} / 100</div>
                </div>
                <div className="p-3 bg-brand-50 rounded-xl border border-brand-200">
                  <span className="text-xs text-brand-800 font-bold">Medicine Adherence</span>
                  <div className="text-2xl font-black text-brand-950">{complianceRate}%</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-xs text-amber-800 font-bold">Avg Reaction Time</span>
                  <div className="text-2xl font-black text-amber-950">{cognitiveStats.avgReactionTimeMs / 1000}s</div>
                </div>
              </div>
            </div>

            {/* Active Medication Schedule */}
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 text-base border-b pb-1">
                Prescribed Medication Regimen
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                {reminders.filter(r => r.type === 'medicine').map(m => (
                  <li key={m.id} className="flex justify-between py-1 border-b border-slate-100">
                    <span><strong>{m.name}</strong> ({m.dosage})</span>
                    <span className="text-slate-500">Scheduled: {m.time} ({m.category})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Observations */}
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 text-base border-b pb-1">
                Caregiver & Clinician Observations
              </h4>
              <div className="text-xs text-slate-700 space-y-2 font-medium">
                {caregiverNotes.map(n => (
                  <p key={n.id}>
                    <strong>[{n.date}] {n.author} ({n.tag}):</strong> {n.content}
                  </p>
                ))}
              </div>
            </div>

            {/* Print & Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t print:hidden">
              <span className="text-xs text-slate-400 font-medium">
                Report generated via MindMitra Local Diagnostic Engine.
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center gap-2 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Clinical Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
