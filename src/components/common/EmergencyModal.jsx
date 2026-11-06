import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PhoneCall,
  AlertTriangle,
  X,
  User,
  Heart,
  MapPin,
  CheckCircle,
  Stethoscope,
  ShieldAlert
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const EmergencyModal = () => {
  const {
    isEmergencyModalOpen,
    setIsEmergencyModalOpen,
    profile,
    addCaregiverNote,
    t
  } = useApp();

  const [alertSent, setAlertSent] = useState(false);

  if (!isEmergencyModalOpen) return null;

  const triggerSOSAlert = () => {
    sounds.playTone(880, 0.4, 'sawtooth', 0.2);
    setTimeout(() => sounds.playTone(660, 0.4, 'sawtooth', 0.2), 200);

    addCaregiverNote(
      `🚨 EMERGENCY SOS ALERT triggered by ${profile.preferredName || profile.name} at ${new Date().toLocaleTimeString()}. Immediate check requested.`,
      'SOS System'
    );
    setAlertSent(true);
    setTimeout(() => {
      setAlertSent(false);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-4 border-rose-500 overflow-hidden relative">
        {/* Header */}
        <div className="bg-rose-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black">{t.emergencySOS}</h3>
              <p className="text-rose-100 text-sm font-medium">Quick Assistance & Medical Identity</p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition focus:outline-none"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Reassurance Message */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-base">You are safe and help is right here.</h4>
              <p className="text-sm text-amber-900 mt-0.5 font-medium">
                Tap any button below to call your daughter Priya, your doctor, or medical ambulance.
              </p>
            </div>
          </div>

          {/* SOS Caregiver Ping Button */}
          <button
            onClick={triggerSOSAlert}
            className={`w-full py-4 px-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg transition active:scale-95 ${
              alertSent
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
            }`}
          >
            {alertSent ? (
              <>
                <CheckCircle className="w-6 h-6" />
                <span>{t.emergencyAlertSent}</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-6 h-6" />
                <span>{t.emergencyAlert} (SOS)</span>
              </>
            )}
          </button>

          {/* Direct Call Cards */}
          <div className="space-y-3">
            {/* Primary Caregiver (Daughter) */}
            <a
              href={`tel:${profile.emergencyContact.phone}`}
              className="flex items-center justify-between p-4 bg-brand-50 hover:bg-brand-100 border-2 border-brand-300 rounded-2xl transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-brand-700 tracking-wider">
                    {profile.emergencyContact.relation}
                  </div>
                  <div className="text-lg font-black text-slate-900">
                    {profile.emergencyContact.name}
                  </div>
                  <div className="text-sm font-semibold text-brand-800">
                    {profile.emergencyContact.phone}
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center group-hover:scale-110 transition shadow-md">
                <PhoneCall className="w-6 h-6" />
              </div>
            </a>

            {/* Doctor */}
            <a
              href={`tel:${profile.physician.phone}`}
              className="flex items-center justify-between p-4 bg-tealbrand-50 hover:bg-tealbrand-100 border-2 border-tealbrand-300 rounded-2xl transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-tealbrand-600 text-white flex items-center justify-center shadow-md">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-tealbrand-700 tracking-wider">
                    Doctor & Clinic
                  </div>
                  <div className="text-lg font-black text-slate-900">
                    {profile.physician.name}
                  </div>
                  <div className="text-sm font-semibold text-tealbrand-800">
                    {profile.physician.phone}
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-tealbrand-600 text-white flex items-center justify-center group-hover:scale-110 transition shadow-md">
                <PhoneCall className="w-6 h-6" />
              </div>
            </a>
          </div>

          {/* Medical Identity Badge */}
          <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 font-medium">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Blood Group: <strong className="text-rose-600 text-base">{profile.bloodGroup}</strong></span>
              <span className="mx-2">•</span>
              <span>Age: {profile.age}</span>
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>Home: {profile.homeAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
