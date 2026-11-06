import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  Trophy,
  Play,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';

const PAD_CONFIG = [
  {
    id: 0,
    name: 'Golden Sun',
    color: 'bg-amber-400 border-amber-300',
    activeColor: 'bg-amber-200 ring-8 ring-amber-300 scale-105 shadow-2xl',
    icon: '☀️',
    label: 'Sun'
  },
  {
    id: 1,
    name: 'Ocean Sky',
    color: 'bg-sky-500 border-sky-400',
    activeColor: 'bg-sky-200 ring-8 ring-sky-300 scale-105 shadow-2xl',
    icon: '🌊',
    label: 'Ocean'
  },
  {
    id: 2,
    name: 'Sage Leaf',
    color: 'bg-emerald-500 border-emerald-400',
    activeColor: 'bg-emerald-200 ring-8 ring-emerald-300 scale-105 shadow-2xl',
    icon: '🌿',
    label: 'Leaf'
  },
  {
    id: 3,
    name: 'Lotus Blossom',
    color: 'bg-pink-500 border-pink-400',
    activeColor: 'bg-pink-200 ring-8 ring-pink-300 scale-105 shadow-2xl',
    icon: '🪷',
    label: 'Lotus'
  }
];

export const PatternRecallGame = ({ difficulty = 'medium', onCompleteNext }) => {
  const { t, language, recordGameResult, speakHelper } = useApp();

  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'showing', 'user_turn', 'won', 'retry'
  const [round, setRound] = useState(1);
  const [maxRound, setMaxRound] = useState(difficulty === 'easy' ? 4 : difficulty === 'hard' ? 7 : 5);
  const [statusMessage, setStatusMessage] = useState('Press "Start Pattern" to begin');

  const timersRef = useRef([]);

  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach(id => clearTimeout(id));
    timersRef.current = [];
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  useEffect(() => {
    setMaxRound(difficulty === 'easy' ? 4 : difficulty === 'hard' ? 7 : 5);
  }, [difficulty]);

  const startGame = () => {
    clearAllTimers();
    const initialSeq = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    setSequence(initialSeq);
    setRound(1);
    setUserStep(0);
    playSequence(initialSeq);
  };

  const playSequence = (seq) => {
    setGameState('showing');
    setStatusMessage('👀 Watch and listen to the soothing pattern...');
    speakHelper(language === 'hi' ? 'ध्यान से देखें और सुनें।' : 'Watch and listen carefully.');

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < seq.length) {
        const padId = seq[idx];
        flashPad(padId);
        idx++;
      } else {
        clearInterval(interval);
        addTimeout(() => {
          setGameState('user_turn');
          setUserStep(0);
          setStatusMessage('👉 Your turn! Tap the pads in the same sequence.');
        }, 600);
      }
    }, 900);
    timersRef.current.push(interval);
  };

  const flashPad = (padId) => {
    setActivePad(padId);
    sounds.playPatternTone(padId);
    addTimeout(() => {
      setActivePad(null);
    }, 450);
  };

  const handlePadClick = (padId) => {
    if (gameState !== 'user_turn') return;

    flashPad(padId);

    if (padId === sequence[userStep]) {
      const nextStep = userStep + 1;
      if (nextStep === sequence.length) {
        if (round >= maxRound) {
          handleVictory();
        } else {
          setGameState('showing');
          const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
          setSequence(nextSeq);
          setRound(r => r + 1);
          addTimeout(() => {
            playSequence(nextSeq);
          }, 1000);
        }
      } else {
        setUserStep(nextStep);
      }
    } else {
      sounds.playGentleBuzzer();
      setGameState('retry');
      setStatusMessage('💛 Wonderful effort! Let us listen to it one more time.');
      speakHelper(language === 'hi' ? 'बहुत अच्छा प्रयास! चलिए फिर से सुनते हैं।' : 'Good effort! Let us listen together again.');

      addTimeout(() => {
        playSequence(sequence);
      }, 1800);
    }
  };

  const handleVictory = () => {
    setGameState('won');
    sounds.playSuccessFanfare();
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    recordGameResult('patternRecall', {
      accuracy: 92,
      moves: round,
      timeSeconds: round * 4,
      won: true
    });

    speakHelper(t.gameVictoryMsg);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>{t.patternRecallTitle}</span>
          </h3>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            Round {round} of {maxRound} • Sequence length: {sequence.length || 2}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {gameState === 'idle' ? (
            <button
              onClick={startGame}
              className="px-6 py-3.5 rounded-2xl bg-tealbrand-600 hover:bg-tealbrand-700 text-white font-black text-base shadow-lg transition active:scale-95 flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Pattern</span>
            </button>
          ) : (
            <button
              onClick={startGame}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1.5 text-sm"
              title={t.restart}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.restart}</span>
            </button>
          )}
        </div>
      </div>

      {/* Gentle Instructions Banner */}
      <div className="bg-tealbrand-50 border-2 border-tealbrand-200 rounded-2xl p-4 text-center">
        <p className="text-lg font-black text-tealbrand-950">
          {statusMessage}
        </p>
      </div>

      {/* 4 Large Musical Glowing Pads */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto py-4">
        {PAD_CONFIG.map(pad => {
          const isActive = activePad === pad.id;
          return (
            <button
              key={pad.id}
              onClick={() => handlePadClick(pad.id)}
              disabled={gameState === 'showing' || gameState === 'idle'}
              className={`h-40 sm:h-48 rounded-3xl p-4 flex flex-col items-center justify-center border-4 text-white font-black shadow-lg transition-all duration-200 focus:outline-none ${
                isActive ? pad.activeColor : pad.color
              } ${
                gameState === 'user_turn' ? 'hover:scale-105 active:scale-95 cursor-pointer' : 'cursor-default'
              }`}
            >
              <span className="text-5xl sm:text-6xl mb-2">{pad.icon}</span>
              <span className="text-lg sm:text-xl tracking-wide">{pad.label}</span>
            </button>
          );
        })}
      </div>

      {/* Victory Modal */}
      {gameState === 'won' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-tealbrand-400 space-y-5 animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-900">{t.wellDone}</h3>
              <p className="text-base text-slate-600 font-medium mt-1">
                You recalled the full musical rhythm with supreme concentration!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={startGame}
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
