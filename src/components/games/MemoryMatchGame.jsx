import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle,
  Eye,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';

const CARD_THEMES = {
  fruits: [
    { id: 'apple', label: 'Apple', icon: '🍎', color: 'bg-red-50 text-red-600 border-red-200' },
    { id: 'mango', label: 'Mango', icon: '🥭', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { id: 'banana', label: 'Banana', icon: '🍌', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
    { id: 'grapes', label: 'Grapes', icon: '🍇', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { id: 'coconut', label: 'Coconut', icon: '🥥', color: 'bg-stone-50 text-stone-700 border-stone-200' },
    { id: 'lotus', label: 'Lotus', icon: '🪷', color: 'bg-pink-50 text-pink-600 border-pink-200' },
    { id: 'orange', label: 'Orange', icon: '🍊', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { id: 'watermelon', label: 'Watermelon', icon: '🍉', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  ],
  animals: [
    { id: 'elephant', label: 'Elephant', icon: '🐘', color: 'bg-slate-50 text-slate-700 border-slate-200' },
    { id: 'peacock', label: 'Peacock', icon: '🦚', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { id: 'cow', label: 'Cow', icon: '🐄', color: 'bg-stone-50 text-stone-700 border-stone-200' },
    { id: 'parrot', label: 'Parrot', icon: '🦜', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'deer', label: 'Deer', icon: '🦌', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'dolphin', label: 'Dolphin', icon: '🐬', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { id: 'butterfly', label: 'Butterfly', icon: '🦋', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { id: 'rabbit', label: 'Rabbit', icon: '🐇', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ],
  heritage: [
    { id: 'diya', label: 'Diya (Lamp)', icon: '🪔', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'teacup', label: 'Chai Cup', icon: '☕', color: 'bg-orange-50 text-orange-800 border-orange-200' },
    { id: 'bell', label: 'Temple Bell', icon: '🔔', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { id: 'book', label: 'Holy Book', icon: '📖', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'tree', label: 'Banyan Tree', icon: '🌳', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { id: 'sun', label: 'Morning Sun', icon: '☀️', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { id: 'flower', label: 'Marigold', icon: '🌼', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
    { id: 'music', label: 'Classical Raga', icon: '🪕', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  ]
};

export const MemoryMatchGame = ({ difficulty = 'medium', onCompleteNext }) => {
  const { t, language, recordGameResult, speakHelper } = useApp();

  const [theme, setTheme] = useState('fruits');
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);

  const timersRef = useRef([]);

  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const pairsCount = difficulty === 'easy' ? 3 : difficulty === 'hard' ? 8 : 6;

  const initializeGame = () => {
    timersRef.current.forEach(id => clearTimeout(id));
    timersRef.current = [];

    const pool = CARD_THEMES[theme] || CARD_THEMES.fruits;
    const selected = pool.slice(0, pairsCount);
    const deck = [...selected, ...selected]
      .map((item, idx) => ({
        ...item,
        uniqueId: `${item.id}-${idx}`,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setTimerSeconds(0);
    setIsActive(true);
    setIsWon(false);
    setIsPeeking(false);
    setHintsRemaining(3);
  };

  useEffect(() => {
    initializeGame();
  }, [theme, difficulty]);

  useEffect(() => {
    let interval = null;
    if (isActive && !isWon) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isWon]);

  const handleCardClick = (index) => {
    if (isPeeking || flippedIndices.length >= 2 || flippedIndices.includes(index)) return;
    const clickedCard = cards[index];
    if (matchedIds.includes(clickedCard.id)) return;

    sounds.playCardFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.id === secondCard.id) {
        addTimeout(() => {
          sounds.playMatchSound();
          const nextMatched = [...matchedIds, firstCard.id];
          setMatchedIds(nextMatched);
          setFlippedIndices([]);

          if (nextMatched.length === pairsCount) {
            handleVictory();
          }
        }, 500);
      } else {
        addTimeout(() => {
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  const handleMitraHint = () => {
    if (hintsRemaining <= 0 || isWon || isPeeking) return;
    setHintsRemaining(h => h - 1);
    setIsPeeking(true);
    sounds.playTone(700, 0.2);
    speakHelper(language === 'hi' ? 'यहाँ एक झलक देखिए!' : 'Here is a friendly glimpse for you!');

    addTimeout(() => {
      setIsPeeking(false);
    }, 2200);
  };

  const handleVictory = () => {
    setIsWon(true);
    setIsActive(false);
    sounds.playSuccessFanfare();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const calculatedAccuracy = Math.max(65, Math.min(100, Math.round((pairsCount / Math.max(moves + 1, pairsCount)) * 100)));
    recordGameResult('memoryMatch', {
      accuracy: calculatedAccuracy,
      moves: moves + 1,
      timeSeconds: timerSeconds,
      won: true
    });

    speakHelper(t.gameVictoryMsg);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="space-y-6">
      {/* Controls & Status Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Theme Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-500">Theme:</span>
          <div className="flex items-center bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setTheme('fruits')}
              className={`px-3 py-1.5 rounded-lg text-sm font-extrabold transition ${
                theme === 'fruits' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🍎 Fruits
            </button>
            <button
              onClick={() => setTheme('animals')}
              className={`px-3 py-1.5 rounded-lg text-sm font-extrabold transition ${
                theme === 'animals' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🐘 Animals
            </button>
            <button
              onClick={() => setTheme('heritage')}
              className={`px-3 py-1.5 rounded-lg text-sm font-extrabold transition ${
                theme === 'heritage' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🪔 Heritage
            </button>
          </div>
        </div>

        {/* Game Stats Pills */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 text-slate-700 font-extrabold text-base">
            <Clock className="w-5 h-5 text-brand-600" />
            <span>{formatTime(timerSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700 font-extrabold text-base">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>{moves} {t.moves}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-700 font-extrabold text-base">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>{matchedIds.length} / {pairsCount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleMitraHint}
            disabled={hintsRemaining <= 0 || isWon || isPeeking}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-extrabold text-sm flex items-center justify-center gap-2 disabled:opacity-40 transition"
            title="Mitra shows a gentle peek"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{t.hint} ({hintsRemaining})</span>
          </button>

          <button
            onClick={initializeGame}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
            title={t.restart}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid gap-3 sm:gap-4 ${
          pairsCount === 3
            ? 'grid-cols-3 max-w-xl mx-auto'
            : pairsCount === 6
            ? 'grid-cols-3 sm:grid-cols-4 max-w-3xl mx-auto'
            : 'grid-cols-4 max-w-4xl mx-auto'
        }`}
      >
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index);
          const isMatched = matchedIds.includes(card.id);
          const isRevealed = isFlipped || isMatched || isPeeking;

          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              disabled={isMatched || isWon}
              className={`h-28 sm:h-36 rounded-3xl p-2 font-black transition-all transform perspective-1000 focus:outline-none focus:ring-4 focus:ring-tealbrand-400 ${
                isMatched
                  ? 'opacity-80 scale-95 cursor-default'
                  : 'hover:scale-[1.03] active:scale-95 shadow-md'
              }`}
            >
              <div
                className={`w-full h-full rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300 ${
                  isRevealed
                    ? `${card.color} shadow-inner`
                    : 'bg-gradient-to-br from-brand-600 to-tealbrand-600 border-tealbrand-400 text-white shadow'
                }`}
              >
                {isRevealed ? (
                  <div className="flex flex-col items-center justify-center animate-fade-in">
                    <span className="text-4xl sm:text-5xl">{card.icon}</span>
                    <span className="text-xs sm:text-sm font-extrabold mt-1 tracking-tight text-center">
                      {card.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-teal-100">
                    <Sparkles className="w-8 h-8 opacity-60" />
                    <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-75">
                      MindMitra
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Victory Celebration Modal */}
      {isWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-tealbrand-400 space-y-5 animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-900">{t.wellDone}</h3>
              <p className="text-base text-slate-600 font-medium mt-1">
                {t.gameVictoryMsg}
              </p>
            </div>

            {/* Performance Snapshot */}
            <div className="bg-tealbrand-50 border border-tealbrand-200 rounded-2xl p-4 grid grid-cols-2 gap-3 text-slate-800">
              <div>
                <span className="text-xs font-bold text-tealbrand-800 uppercase">{t.timeElapsed}</span>
                <div className="text-2xl font-black text-tealbrand-950">{formatTime(timerSeconds)}</div>
              </div>
              <div>
                <span className="text-xs font-bold text-tealbrand-800 uppercase">{t.moves}</span>
                <div className="text-2xl font-black text-tealbrand-950">{moves}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={initializeGame}
                className="flex-1 py-4 px-6 rounded-2xl bg-tealbrand-600 hover:bg-tealbrand-700 text-white font-black text-base shadow-lg transition active:scale-95"
              >
                {t.restart}
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
