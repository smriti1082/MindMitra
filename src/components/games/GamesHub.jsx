import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemoryMatchGame } from './MemoryMatchGame';
import { PatternRecallGame } from './PatternRecallGame';
import { FocusSpotGame } from './FocusSpotGame';
import {
  Sparkles,
  Layers,
  Music,
  Eye,
  Info
} from 'lucide-react';

export const GamesHub = () => {
  const { t, cognitiveStats } = useApp();

  const [selectedGame, setSelectedGame] = useState('memory'); // 'memory', 'pattern', 'focus'
  const [manualDifficulty, setManualDifficulty] = useState(null); // null = use adaptive AI

  // Current difficulty (AI recommended or manual override)
  const effectiveDifficulty = manualDifficulty || cognitiveStats.adaptiveDifficulty || 'medium';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tealbrand-100 text-tealbrand-800 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Clinically-Inspired Cognitive Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.gamesTitle}
            </h1>
            <p className="text-base text-slate-600 font-medium mt-1">
              {t.gamesSub}
            </p>
          </div>

          {/* Adaptive AI Level Badge */}
          <div className="bg-gradient-to-br from-tealbrand-50 to-brand-50 border-2 border-tealbrand-200 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-tealbrand-600 text-white flex items-center justify-center font-black text-xl shadow-md">
              {cognitiveStats.currentScore}
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-tealbrand-800 flex items-center gap-1">
                <span>{t.difficultyAdaptive}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-base font-black text-slate-900 capitalize">
                {effectiveDifficulty === 'easy' ? t.difficultyEasy : effectiveDifficulty === 'hard' ? t.difficultyHard : t.difficultyMedium}
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive AI Notice */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Info className="w-5 h-5 text-brand-600 shrink-0" />
            <span>{t.adaptiveNotice}</span>
          </div>

          {/* Manual difficulty override buttons */}
          <div className="flex items-center gap-1 self-start sm:self-auto">
            <button
              onClick={() => setManualDifficulty(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                manualDifficulty === null ? 'bg-tealbrand-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Auto AI
            </button>
            <button
              onClick={() => setManualDifficulty('easy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                manualDifficulty === 'easy' ? 'bg-tealbrand-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Gentle
            </button>
            <button
              onClick={() => setManualDifficulty('medium')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                manualDifficulty === 'medium' ? 'bg-tealbrand-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setManualDifficulty('hard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                manualDifficulty === 'hard' ? 'bg-tealbrand-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedGame('memory')}
          className={`p-5 rounded-3xl border-3 text-left transition hover:scale-[1.01] active:scale-98 flex items-center gap-4 ${
            selectedGame === 'memory'
              ? 'bg-brand-50 border-brand-500 shadow-md ring-4 ring-brand-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
            selectedGame === 'memory' ? 'bg-brand-600' : 'bg-slate-500'
          }`}>
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{t.memoryMatchTitle}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5 line-clamp-1">
              Familiar pairs & nostalgic symbols
            </p>
          </div>
        </button>

        <button
          onClick={() => setSelectedGame('pattern')}
          className={`p-5 rounded-3xl border-3 text-left transition hover:scale-[1.01] active:scale-98 flex items-center gap-4 ${
            selectedGame === 'pattern'
              ? 'bg-tealbrand-50 border-tealbrand-500 shadow-md ring-4 ring-tealbrand-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
            selectedGame === 'pattern' ? 'bg-tealbrand-600' : 'bg-slate-500'
          }`}>
            <Music className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{t.patternRecallTitle}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5 line-clamp-1">
              Glowing musical sequence recall
            </p>
          </div>
        </button>

        <button
          onClick={() => setSelectedGame('focus')}
          className={`p-5 rounded-3xl border-3 text-left transition hover:scale-[1.01] active:scale-98 flex items-center gap-4 ${
            selectedGame === 'focus'
              ? 'bg-amber-50 border-amber-500 shadow-md ring-4 ring-amber-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
            selectedGame === 'focus' ? 'bg-amber-600' : 'bg-slate-500'
          }`}>
            <Eye className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{t.focusSpotTitle}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5 line-clamp-1">
              Visual attention & discrimination
            </p>
          </div>
        </button>
      </div>

      {/* Selected Game Area */}
      <div className="bg-slate-50/60 rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-inner">
        {selectedGame === 'memory' && (
          <MemoryMatchGame
            difficulty={effectiveDifficulty}
            onCompleteNext={() => setSelectedGame('pattern')}
          />
        )}
        {selectedGame === 'pattern' && (
          <PatternRecallGame
            difficulty={effectiveDifficulty}
            onCompleteNext={() => setSelectedGame('focus')}
          />
        )}
        {selectedGame === 'focus' && (
          <FocusSpotGame
            difficulty={effectiveDifficulty}
            onCompleteNext={() => setSelectedGame('memory')}
          />
        )}
      </div>
    </div>
  );
};
