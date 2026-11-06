import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  Trophy,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';

const FOCUS_LEVELS = [
  {
    targetName: 'Gentle Lotus 🪷',
    targetIcon: '🪷',
    distractorIcon: '🌻',
    instruction: 'Find the gentle Lotus blossom among the sunflowers!'
  },
  {
    targetName: 'Sweet Mango 🥭',
    targetIcon: '🥭',
    distractorIcon: '🍎',
    instruction: 'Spot the sweet Golden Mango among the apples!'
  },
  {
    targetName: 'Graceful Peacock 🦚',
    targetIcon: '🦚',
    distractorIcon: '🐘',
    instruction: 'Locate the graceful Peacock among the gentle elephants!'
  },
  {
    targetName: 'Sacred Diya Lamp 🪔',
    targetIcon: '🪔',
    distractorIcon: '☕',
    instruction: 'Find the sacred glowing Diya among the teacups!'
  },
  {
    targetName: 'Bright Sun ☀️',
    targetIcon: '☀️',
    distractorIcon: '⭐',
    instruction: 'Spot the warm morning Sun among the stars!'
  }
];

export const FocusSpotGame = ({ difficulty = 'medium', onCompleteNext }) => {
  const { t, recordGameResult, speakHelper } = useApp();

  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [gridItems, setGridItems] = useState([]);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isWon, setIsWon] = useState(false);
  const [score, setScore] = useState(0);

  const gridSize = difficulty === 'easy' ? 9 : difficulty === 'hard' ? 25 : 16;
  const gridColsClass = difficulty === 'easy' ? 'grid-cols-3 max-w-sm' : difficulty === 'hard' ? 'grid-cols-5 max-w-xl' : 'grid-cols-4 max-w-md';

  const setupLevel = (idx) => {
    const level = FOCUS_LEVELS[idx % FOCUS_LEVELS.length];
    const randTargetIdx = Math.floor(Math.random() * gridSize);
    setTargetIndex(randTargetIdx);

    const items = [];
    for (let i = 0; i < gridSize; i++) {
      if (i === randTargetIdx) {
        items.push({ icon: level.targetIcon, isTarget: true });
      } else {
        items.push({ icon: level.distractorIcon, isTarget: false });
      }
    }
    setGridItems(items);
    speakHelper(level.instruction);
  };

  useEffect(() => {
    setCurrentLevelIdx(0);
    setScore(0);
    setIsWon(false);
    setupLevel(0);
  }, [difficulty]);

  const handleItemClick = (index) => {
    if (index === targetIndex) {
      sounds.playMatchSound();
      const nextScore = score + 1;
      setScore(nextScore);

      if (currentLevelIdx + 1 >= FOCUS_LEVELS.length) {
        setIsWon(true);
        sounds.playSuccessFanfare();
        try {
          confetti({ particleCount: 75, spread: 60 });
        } catch (e) {}

        recordGameResult('focusSpot', {
          accuracy: 95,
          moves: 5,
          timeSeconds: 20,
          won: true
        });
        speakHelper(t.wellDone);
      } else {
        const nextIdx = currentLevelIdx + 1;
        setCurrentLevelIdx(nextIdx);
        setupLevel(nextIdx);
      }
    } else {
      sounds.playGentleBuzzer();
    }
  };

  const currentLevel = FOCUS_LEVELS[currentLevelIdx % FOCUS_LEVELS.length];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            {t.focusSpotTitle}
          </h3>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            Level {currentLevelIdx + 1} of {FOCUS_LEVELS.length} • Visual scanning and optical focus
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentLevelIdx(0);
            setScore(0);
            setIsWon(false);
            setupLevel(0);
          }}
          className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1.5 text-sm"
          title={t.restart}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.restart}</span>
        </button>
      </div>

      {/* Target Prompt Box */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 text-center shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Your Mission
        </span>
        <h4 className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
          {currentLevel.instruction}
        </h4>
      </div>

      {/* Grid of Visual Items */}
      <div className={`grid gap-3 sm:gap-4 mx-auto py-2 ${gridColsClass}`}>
        {gridItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(index)}
            className="h-20 sm:h-24 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 border-2 border-slate-200 hover:border-tealbrand-400 flex items-center justify-center text-4xl sm:text-5xl shadow-sm transition"
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Victory Modal */}
      {isWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-tealbrand-400 space-y-5 animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-900">{t.wellDone}</h3>
              <p className="text-base text-slate-600 font-medium mt-1">
                Your visual attention and reaction are sharp and flourishing today!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentLevelIdx(0);
                  setScore(0);
                  setIsWon(false);
                  setupLevel(0);
                }}
                className="flex-1 py-4 px-6 rounded-2xl bg-tealbrand-600 hover:bg-tealbrand-700 text-white font-black text-base shadow-lg transition active:scale-95"
              >
                Play Again
              </button>
              {onCompleteNext && (
                <button
                  onClick={onCompleteNext}
                  className="flex-1 py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-base shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>{t.nextLevel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
