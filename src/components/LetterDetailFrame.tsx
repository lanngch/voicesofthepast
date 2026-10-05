import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Info, BookOpen, Volume2, Type } from 'lucide-react';
import { LetterData } from '../data/letters';
import { AudioBar } from './AudioBar';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';

type CursiveStyle = 'cursive' | 'marck' | 'apple' | 'serif';

interface LetterDetailFrameProps {
  letter: LetterData;
  onBackToOverview: () => void;
  onNavigateLetter: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const LetterDetailFrame: React.FC<LetterDetailFrameProps> = ({
  letter,
  onBackToOverview,
  onNavigateLetter,
  hasPrev,
  hasNext,
}) => {
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number>(-1);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [fontMode, setFontMode] = useState<CursiveStyle>('cursive');

  // When letter changes or mounts, play its specific atmospheric music theme!
  useEffect(() => {
    soundEngine.playTheme(letter.audioTheme.preset);
    setActiveParagraphIndex(-1);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      speechService.stop();
    };
  }, [letter]);

  const handleBack = () => {
    speechService.stop();
    soundEngine.playPaperRustle();
    onBackToOverview();
  };

  const handlePrev = () => {
    if (!hasPrev) return;
    speechService.stop();
    soundEngine.playPaperRustle();
    onNavigateLetter('prev');
  };

  const handleNext = () => {
    if (!hasNext) return;
    speechService.stop();
    soundEngine.playPaperRustle();
    onNavigateLetter('next');
  };

  // Font class resolver
  const getFontClass = () => {
    switch (fontMode) {
      case 'marck':
        return 'font-marck text-xl sm:text-[23px] md:text-[26px] leading-[2.1] sm:leading-[2.2]';
      case 'apple':
        return 'font-apple text-lg sm:text-[21px] md:text-[23px] leading-[2.2] sm:leading-[2.4]';
      case 'serif':
        return 'font-editorial text-base sm:text-[18px] md:text-[20px] leading-[1.85]';
      case 'cursive':
      default:
        return 'font-cursive-letter text-xl sm:text-[23px] md:text-[25px] leading-[2.0] sm:leading-[2.15]';
    }
  };

  const getHeaderFontClass = () => {
    switch (fontMode) {
      case 'serif':
        return 'font-editorial text-base sm:text-lg';
      case 'apple':
        return 'font-apple text-base sm:text-lg';
      default:
        return 'font-cursive-letter text-lg sm:text-[21px]';
    }
  };

  return (
    <div className="relative min-h-screen w-full parchment-bg flex flex-col justify-between overflow-x-hidden p-4 sm:p-8 md:p-12">
      {/* Top Header matching Frame 2-6: "← Voices of the past" */}
      <header className="relative z-30 flex items-center justify-between w-full max-w-5xl mx-auto mb-6 sm:mb-8">
        {/* Back Link with Arrow and Script Title */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 text-stone-800 hover:text-stone-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 rounded-lg p-1"
          aria-label="Back to Voices of the Past overview"
        >
          <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 text-[#22394c] group-hover:-translate-x-1.5 transition-transform" />
          <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[#22394c] font-semibold tracking-wide drop-shadow-sm select-none">
            Voices of the past
          </span>
        </button>

        {/* Audio Controls and Utility Toggles */}
        <div className="flex items-center gap-2">
          {/* Cursive Penmanship Style Selector */}
          <div className="hidden sm:flex items-center bg-stone-300/40 rounded-full p-0.5 border border-stone-400/30 text-xs font-sans">
            <button
              onClick={() => setFontMode('cursive')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                fontMode === 'cursive' ? 'bg-[#fbf5e6] text-stone-900 shadow-xs font-semibold' : 'text-stone-700 hover:text-stone-950'
              }`}
              title="Handwritten Cursive Penmanship"
            >
              Letter Cursive
            </button>
            <button
              onClick={() => setFontMode('marck')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                fontMode === 'marck' ? 'bg-[#fbf5e6] text-stone-900 shadow-xs font-semibold' : 'text-stone-700 hover:text-stone-950'
              }`}
              title="Poetic Script"
            >
              Poet Script
            </button>
            <button
              onClick={() => setFontMode('apple')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                fontMode === 'apple' ? 'bg-[#fbf5e6] text-stone-900 shadow-xs font-semibold' : 'text-stone-700 hover:text-stone-950'
              }`}
              title="Fountain Pen Ink"
            >
              Fountain Pen
            </button>
          </div>

          {/* Historical Context Info Toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-sans transition-colors cursor-pointer ${
              showHistory
                ? 'bg-amber-900 text-amber-50 shadow-sm'
                : 'bg-stone-300/40 hover:bg-stone-300/70 text-stone-700'
            }`}
            title="Historical Context & Biography"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden md:inline">History</span>
          </button>

          <AudioBar
            currentLetter={letter}
            activeParagraphIndex={activeParagraphIndex}
            onParagraphChange={setActiveParagraphIndex}
          />
        </div>
      </header>

      {/* Historical Context Modal / Dropdown */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative z-30 max-w-4xl mx-auto w-full mb-6 p-5 sm:p-6 bg-[#fbf5ea] border border-amber-900/20 rounded-xl shadow-lg text-stone-800"
          >
            <div className="flex items-center justify-between border-b border-amber-900/15 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <h3 className="font-serif font-semibold text-base text-amber-950">
                  Historical Background: {letter.author}
                </h3>
              </div>
              <span className="text-xs text-amber-800/80 font-sans">{letter.historicalContext.period}</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed font-serif">
              {letter.historicalContext.biography}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Letter Reading Area matching Frame 2, 3, 4, 5, 6 */}
      <main className="relative z-20 flex-1 max-w-4xl mx-auto w-full py-4 sm:py-6">
        <motion.article
          key={letter.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`space-y-6 sm:space-y-7 text-[#261d15] ${getFontClass()}`}
        >
          {/* Header Lines matching screenshots */}
          <div className="space-y-1.5 pb-4 border-b border-stone-400/25">
            {letter.fullHeader.map((hdr, idx) => (
              <p
                key={idx}
                className={`${getHeaderFontClass()} text-stone-700 font-normal leading-snug tracking-wide`}
              >
                {hdr}
              </p>
            ))}
          </div>

          {/* Salutation if present */}
          {letter.salutation && (
            <p
              className={`${getHeaderFontClass()} text-2xl sm:text-[28px] text-stone-900 font-semibold tracking-wide transition-all duration-300 ${
                activeParagraphIndex === letter.fullHeader.length
                  ? 'bg-amber-400/25 px-2 py-0.5 rounded shadow-sm'
                  : ''
              }`}
            >
              {letter.salutation}
            </p>
          )}

          {/* Letter Body Paragraphs */}
          <div className="space-y-5 sm:space-y-6">
            {letter.paragraphs.map((para, idx) => {
              const paragraphGlobalIndex =
                letter.fullHeader.length + (letter.salutation ? 1 : 0) + idx;
              const isCurrent = activeParagraphIndex === paragraphGlobalIndex;

              return (
                <motion.p
                  key={idx}
                  className={`tracking-wide transition-all duration-300 rounded px-2 py-1 ${
                    isCurrent
                      ? 'bg-amber-300/30 ring-1 ring-amber-500/40 text-stone-950 shadow-sm'
                      : ''
                  }`}
                >
                  {para}
                </motion.p>
              );
            })}
          </div>

          {/* Sign-off if present */}
          {letter.signOff && (
            <div className="pt-4 space-y-1">
              {letter.signOff.split('\n').map((line, idx) => (
                <p
                  key={idx}
                  className={`text-stone-900 ${
                    idx === 1
                      ? 'font-script text-3xl sm:text-4xl text-[#22394c] font-semibold'
                      : 'text-xl sm:text-2xl'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Postscript if present (e.g. Dang Thuy Tram) */}
          {letter.postScript && (
            <div className="pt-4 border-t border-stone-400/20 text-stone-700 text-lg sm:text-[22px] leading-relaxed">
              <p>{letter.postScript}</p>
            </div>
          )}
        </motion.article>
      </main>

      {/* Letter Bottom Navigation: Prev / Next / Back */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto pt-8 pb-4 flex items-center justify-between border-t border-stone-400/25 mt-8">
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-sans font-medium transition-colors ${
            hasPrev
              ? 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/40 cursor-pointer'
              : 'text-stone-400 cursor-not-allowed opacity-50'
          }`}
          aria-label="Previous letter"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Letter</span>
        </button>

        {/* Back to all letters button */}
        <button
          onClick={handleBack}
          className="text-xs sm:text-sm font-sans font-medium text-stone-700 hover:text-stone-950 px-3 py-1.5 rounded-lg hover:bg-stone-300/40 transition-colors"
        >
          All Letters (Frame 1)
        </button>

        <button
          onClick={handleNext}
          disabled={!hasNext}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-sans font-medium transition-colors ${
            hasNext
              ? 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/40 cursor-pointer'
              : 'text-stone-400 cursor-not-allowed opacity-50'
          }`}
          aria-label="Next letter"
        >
          <span>Next Letter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
