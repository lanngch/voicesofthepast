import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AirmailEnvelope } from './AirmailEnvelope';
import { AudioBar } from './AudioBar';
import { soundEngine } from '../services/soundEngine';

interface HomeFrameProps {
  onNavigateToFrame1: () => void;
}

export const HomeFrame: React.FC<HomeFrameProps> = ({ onNavigateToFrame1 }) => {
  useEffect(() => {
    // Start gentle vintage home ambience if audio initialized
    if (soundEngine.isPlaying()) {
      soundEngine.playTheme('flute-guitar');
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full parchment-bg flex flex-col justify-between overflow-x-hidden p-6 sm:p-10 md:p-12">
      {/* Header Bar */}
      <header className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Top-Left Signature Title matching 1. home.png */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl text-[#22394c] tracking-wide select-none drop-shadow-sm font-semibold"
        >
          Voices of the past
        </motion.h1>

        {/* Ambient Audio Controls */}
        <AudioBar />
      </header>

      {/* Main Stage: Airmail Envelope Centerpiece */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 mt-4 sm:mt-6">
        <AirmailEnvelope onOpen={onNavigateToFrame1} />
      </main>

      {/* Footer subtle historical archival badge */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500/80 font-sans pt-4 border-t border-stone-400/20">
        <div className="flex items-center gap-2">
          <span>Vietnam War Historical Letter Archive</span>
          <span>·</span>
          <span>Preserved Words &amp; Memories</span>
        </div>
        <div className="mt-2 sm:mt-0">
          <span>Click the letter envelope to enter Frame 1</span>
        </div>
      </footer>
    </div>
  );
};
