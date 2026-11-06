import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Droplets,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Sun,
  Sunset,
  Moon,
  Trash2,
  Volume2,
  Heart,
  X
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const RemindersModule = () => {
  const {
    t,
    language,
    reminders,
    toggleReminderTaken,
    addReminder,
    deleteReminder,
    waterData,
    addWaterGlass,
    resetWater,
    speakHelper
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    time: '09:00',
    category: 'morning',
    type: 'medicine',
    notes: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addReminder(formData);
    setFormData({
      name: '',
      dosage: '',
      time: '09:00',
      category: 'morning',
      type: 'medicine',
      notes: ''
    });
    setIsAddModalOpen(false);
  };

  const playChimeSample = (reminder) => {
    sounds.playReminderChime();
    speakHelper(
      language === 'hi'
        ? `स्मरण: ${reminder.name} लेने का समय, ${reminder.dosage}`
        : `Reminder: Time for ${reminder.name}, ${reminder.dosage}`
    );
  };

  const morningItems = reminders.filter(r => r.category === 'morning');
  const afternoonItems = reminders.filter(r => r.category === 'afternoon');
  const eveningItems = reminders.filter(r => r.category === 'evening');
  const nightItems = reminders.filter(r => r.category === 'night');

  const completedCount = reminders.filter(r => r.taken).length;
  const compliancePct = reminders.length > 0 ? Math.round((completedCount / reminders.length) * 100) : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-black uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5" />
            <span>Health & Routine Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.remindersTitle}
          </h1>
          <p className="text-base text-slate-600 font-medium mt-1">
            {t.remindersSub}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-brand-50 border-2 border-brand-200 rounded-2xl p-4 text-center">
            <span className="text-xs font-bold uppercase text-brand-800">Compliance Today</span>
            <div className="text-2xl font-black text-brand-950">{compliancePct}%</div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-base shadow-lg transition active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t.addReminder}</span>
          </button>
        </div>
      </div>

      {/* Hydration Station (Water Tracker) */}
      <div className="bg-gradient-to-br from-sky-50 to-teal-50 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
              <Droplets className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{t.waterTitle}</h2>
              <p className="text-sm font-semibold text-slate-600">
                Target: {waterData.target * waterData.glassSizeMl} ml (8 glasses) per day
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={addWaterGlass}
              className="px-6 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-base shadow-lg transition active:scale-95 flex items-center gap-2"
            >
              <Droplets className="w-5 h-5" />
              <span>{t.addGlass}</span>
            </button>

            <button
              onClick={resetWater}
              className="px-4 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 transition"
              title="Reset today's water count"
            >
              {t.resetWater}
            </button>
          </div>
        </div>

        {/* 8 Glasses Interactive Visual Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 pt-2">
          {Array.from({ length: waterData.target }).map((_, idx) => {
            const isFilled = idx < waterData.glasses;
            return (
              <button
                key={idx}
                onClick={addWaterGlass}
                className={`h-24 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${
                  isFilled
                    ? 'bg-sky-500 border-sky-400 text-white shadow-md'
                    : 'bg-white/80 border-sky-200 text-sky-400 hover:border-sky-400'
                }`}
              >
                <Droplets className={`w-8 h-8 ${isFilled ? 'fill-white animate-bounce' : 'opacity-40'}`} />
                <span className="text-xs font-black mt-2">
                  Glass {idx + 1}
                </span>
                <span className="text-[10px] opacity-75">250ml</span>
              </button>
            );
          })}
        </div>

        {/* Hydration Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-extrabold text-slate-600 mb-1.5">
            <span>Progress: {waterData.glasses * waterData.glassSizeMl} / {waterData.target * waterData.glassSizeMl} ml</span>
            <span>{Math.round((waterData.glasses / waterData.target) * 100)}%</span>
          </div>
          <div className="w-full h-4 bg-white rounded-full overflow-hidden border border-sky-200 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-tealbrand-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (waterData.glasses / waterData.target) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Medication & Routine Schedule Categories */}
      <div className="space-y-6">
        {/* Morning Category */}
        <ReminderCategorySection
          title="Morning (सुबह / সকাল)"
          icon={<Sun className="w-6 h-6 text-amber-500" />}
          items={morningItems}
          onToggle={toggleReminderTaken}
          onDelete={deleteReminder}
          onChime={playChimeSample}
          t={t}
        />

        {/* Afternoon Category */}
        <ReminderCategorySection
          title="Afternoon (दोपहर / দুপুর)"
          icon={<Sun className="w-6 h-6 text-orange-500" />}
          items={afternoonItems}
          onToggle={toggleReminderTaken}
          onDelete={deleteReminder}
          onChime={playChimeSample}
          t={t}
        />

        {/* Evening Category */}
        <ReminderCategorySection
          title="Evening (संध्या / সন্ধ্যা)"
          icon={<Sunset className="w-6 h-6 text-rose-500" />}
          items={eveningItems}
          onToggle={toggleReminderTaken}
          onDelete={deleteReminder}
          onChime={playChimeSample}
          t={t}
        />

        {/* Night Category */}
        <ReminderCategorySection
          title="Night / Bedtime (रात / रात्रि)"
          icon={<Moon className="w-6 h-6 text-indigo-500" />}
          items={nightItems}
          onToggle={toggleReminderTaken}
          onDelete={deleteReminder}
          onChime={playChimeSample}
          t={t}
        />
      </div>

      {/* Add Reminder Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-brand-300 space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-2xl font-black text-slate-900">{t.addReminder}</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  {t.medName}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Donepezil 5mg or Morning Walk"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    {t.medTime}
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Time of Day
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  {t.medDosage}
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 Tablet after food with water"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Purpose / Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Memory boost / Blood pressure"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 font-semibold focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black transition shadow-md"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ReminderCategorySection = ({ title, icon, items, onToggle, onDelete, onChime }) => {
  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        {icon}
        <h3 className="text-xl font-black text-slate-900">{title}</h3>
        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full ml-auto">
          {items.filter(i => i.taken).length} / {items.length} completed
        </span>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            className={`p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
              item.taken
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => onToggle(item.id)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition active:scale-95 shadow-sm ${
                  item.taken
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 border-2 border-slate-300 text-slate-400 hover:border-brand-500'
                }`}
                title="Mark as taken / not taken"
              >
                {item.taken ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </span>
                  {item.notes && (
                    <span className="text-xs font-semibold text-slate-500">
                      • {item.notes}
                    </span>
                  )}
                  {item.taken && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Taken at {item.takenAt || 'Today'}
                    </span>
                  )}
                </div>

                <h4 className={`text-lg sm:text-xl font-black mt-1 ${item.taken ? 'text-slate-600 line-through' : 'text-slate-900'}`}>
                  {item.name}
                </h4>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">
                  {item.dosage}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => onChime(item)}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1 text-xs"
                title="Hear reminder announcement"
              >
                <Volume2 className="w-4 h-4 text-brand-600" />
                <span className="hidden sm:inline">Play Chime</span>
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="p-3 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition"
                title="Remove reminder"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
