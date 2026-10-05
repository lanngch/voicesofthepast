import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import { LETTERS, LetterData } from '../data/letters';
import { ParchmentCard } from './ParchmentCard';
import { AudioBar } from './AudioBar';
import { soundEngine } from '../services/soundEngine';

interface Frame1OverviewProps {
  onSelectLetter: (letter: LetterData) => void;
  onBackToHome: () => void;
}

export const Frame1Overview: React.FC<Frame1OverviewProps> = ({
  onSelectLetter,
  onBackToHome,
}) => {
  const [showAdditionalLetters, setShowAdditionalLetters] = useState(false);

  useEffect(() => {
    // Play warm contemplative ambience
    soundEngine.playTheme('flute-guitar');
  }, []);

  // Primary 5 letters from Frame 1.png
  const row1Letters = LETTERS.slice(0, 3); // Frame 2, 3, 4
  const row2Letters = LETTERS.slice(3, 5); // Frame 5, 6
  const extraLetters = LETTERS.slice(5);   // Frame 7, 8 (if expanded)

  return (
    <div className="relative min-h-screen w-full parchment-bg flex flex-col justify-between overflow-x-hidden p-4 sm:p-8 md:p-12">
      {/* Top Navigation Bar */}
      <header className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          {/* Back to Home Button */}
          <button
            onClick={() => {
              soundEngine.playPaperRustle();
              onBackToHome();
            }}
            className="group flex items-center gap-2 text-stone-700 hover:text-stone-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 rounded-lg p-1"
            title="Return to Envelope Home"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Title matching Frame 1.png */}
          <h1
            onClick={() => {
              soundEngine.playPaperRustle();
              onBackToHome();
            }}
            className="font-script text-4xl sm:text-5xl md:text-6xl text-[#22394c] tracking-wide select-none drop-shadow-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Voices of the past
          </h1>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-3">
          <AudioBar />
        </div>
      </header>

      {/* Main Grid matching Frame 1.png */}
      <main className="relative z-20 flex-1 max-w-7xl mx-auto w-full flex flex-col justify-center space-y-6 sm:space-y-8 py-2 sm:py-4">
        {/* ROW 1: 3 Burned Parchment Papers (Left to Right: Frame 2, 3, 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {row1Letters.map((letter, idx) => (
            <ParchmentCard
              key={letter.id}
              letter={letter}
              index={idx}
              onClick={() => onSelectLetter(letter)}
            />
          ))}
        </div>

        {/* ROW 2: 2 Burned Parchment Papers Centered (Frame 5, 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full items-stretch">
          {row2Letters.map((letter, idx) => (
            <ParchmentCard
              key={letter.id}
              letter={letter}
              index={idx + 3}
              onClick={() => onSelectLetter(letter)}
            />
          ))}
        </div>

        {/* Archival Extension: Frames 7 & 8 toggle for complete 2-8 collection */}
        <div className="pt-2 text-center">
          <button
            onClick={() => {
              soundEngine.playPaperRustle();
              setShowAdditionalLetters(!showAdditionalLetters);
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-sans font-medium text-stone-700 bg-stone-300/40 hover:bg-stone-300/70 border border-stone-400/30 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-stone-600" />
            <span>
              {showAdditionalLetters
                ? 'Hide Additional Letters (Frames 7 & 8)'
                : 'View More Archival Letters (Frames 7 & 8: Lê Văn Huỳnh & Nguyễn Văn Thạc)'}
            </span>
          </button>
        </div>

        {/* Expanded Frames 7 & 8 */}
        {showAdditionalLetters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full pt-2"
          >
            {extraLetters.map((letter, idx) => (
              <ParchmentCard
                key={letter.id}
                letter={letter}
                index={idx + 5}
                onClick={() => onSelectLetter(letter)}
              />
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer Instructions */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto pt-6 text-center text-xs text-stone-500 font-sans border-t border-stone-400/20 mt-4">
        <span>Click &ldquo;Click me&rdquo; on any letter to read the full handwritten message and hear its audio soundscape</span>
      </footer>
    </div>
  );
};
