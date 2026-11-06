export const initialProfile = {
  name: "Ramesh Sharma",
  preferredName: "Dada Ji",
  age: 74,
  stage: "Mild Cognitive Impairment (Early Stage)",
  language: "en",
  emergencyContact: {
    name: "Priya Sharma",
    relation: "Daughter & Primary Caregiver",
    phone: "+91 98765 43210",
    alternatePhone: "+91 98222 33445"
  },
  physician: {
    name: "Dr. Arvind Sen",
    specialty: "Consultant Neuro-Geriatrician",
    clinic: "Apollo Memory & Geriatric Clinic",
    phone: "+91 98111 22334"
  },
  homeAddress: "Flat 402, Shanti Kunj Apartments, Green Glen Layout, Bengaluru",
  bloodGroup: "B+"
};

export const initialReminders = [
  {
    id: 'med-1',
    name: 'Donepezil (Aricept) 5mg',
    dosage: '1 tablet with warm milk',
    time: '08:30',
    category: 'morning',
    type: 'medicine',
    taken: true,
    takenAt: '08:34 AM',
    notes: 'Cognitive & memory support'
  },
  {
    id: 'med-2',
    name: 'Telmisartan 40mg',
    dosage: '1 tablet after breakfast',
    time: '09:00',
    category: 'morning',
    type: 'medicine',
    taken: true,
    takenAt: '09:12 AM',
    notes: 'Blood pressure regulator'
  },
  {
    id: 'act-1',
    name: 'Morning Balcony Walk & Sunlight',
    dosage: '15 minutes gentle strolling',
    time: '10:00',
    category: 'morning',
    type: 'activity',
    taken: true,
    takenAt: '10:15 AM',
    notes: 'Vitamin D & mood boost'
  },
  {
    id: 'med-3',
    name: 'Neurobion Forte & Omega-3',
    dosage: '1 capsule after lunch',
    time: '13:30',
    category: 'afternoon',
    type: 'medicine',
    taken: false,
    takenAt: null,
    notes: 'Nerve health & brain circulation'
  },
  {
    id: 'act-2',
    name: 'Evening Breathing & Bhajans / Music',
    dosage: '20 minutes relaxing raga',
    time: '18:00',
    category: 'evening',
    type: 'activity',
    taken: false,
    takenAt: null,
    notes: 'Sundowning calming therapy'
  },
  {
    id: 'med-4',
    name: 'Atorvastatin 10mg',
    dosage: '1 tablet before sleep',
    time: '21:30',
    category: 'night',
    type: 'medicine',
    taken: false,
    takenAt: null,
    notes: 'Cholesterol & vascular health'
  }
];

export const initialWaterData = {
  glasses: 4,
  target: 8,
  glassSizeMl: 250,
  history: [
    { time: '08:15 AM', amount: 250 },
    { time: '09:30 AM', amount: 250 },
    { time: '11:15 AM', amount: 250 },
    { time: '01:00 PM', amount: 250 }
  ]
};

export const initialCognitiveStats = {
  currentScore: 84, // 0-100
  scoreTrend: 'improving',
  adaptiveDifficulty: 'medium', // 'easy', 'medium', 'hard'
  streakDays: 6,
  totalGamesPlayed: 34,
  avgReactionTimeMs: 2350,
  memoryMatchAccuracy: 88,
  patternRecallAccuracy: 82,
  focusSpotAccuracy: 91,
  history7Days: [
    { day: 'Mon', score: 76, reactionSec: 2.7, compliance: 100 },
    { day: 'Tue', score: 79, reactionSec: 2.5, compliance: 85 },
    { day: 'Wed', score: 81, reactionSec: 2.4, compliance: 100 },
    { day: 'Thu', score: 80, reactionSec: 2.6, compliance: 100 },
    { day: 'Fri', score: 83, reactionSec: 2.3, compliance: 100 },
    { day: 'Sat', score: 85, reactionSec: 2.2, compliance: 100 },
    { day: 'Sun', score: 84, reactionSec: 2.3, compliance: 100 }
  ]
};

export const initialCaregiverNotes = [
  {
    id: 'note-1',
    date: '2026-11-05',
    author: 'Priya (Daughter)',
    tag: 'Mood & Sleep',
    content: 'Dada Ji slept soundly for 7.5 hours last night. Enjoyed looking at old family album during morning tea and named 8 relatives accurately.'
  },
  {
    id: 'note-2',
    date: '2026-11-03',
    author: 'Dr. Arvind Sen',
    tag: 'Clinical Review',
    content: 'Memory agility stable. Mild disorientation noticed only around 6 PM sundowning period. Recommended continuing music routine and Donepezil.'
  },
  {
    id: 'note-3',
    date: '2026-11-01',
    author: 'Priya (Daughter)',
    tag: 'Hydration',
    content: 'Completed all 8 glasses of water today. Voice reminders helped prompt him without causing irritation.'
  }
];

export const initialMoodHistory = [
  { time: '09:00 AM', mood: 'Happy', emoji: '☀️', note: 'Feeling fresh after walk' },
  { time: '01:30 PM', mood: 'Calm', emoji: '🌿', note: 'Relaxed after lunch' }
];
