import React from 'react';
import { motion } from 'motion/react';
import { LetterData } from '../data/letters';
import { soundEngine } from '../services/soundEngine';

interface ParchmentCardProps {
  letter: LetterData;
  onClick: () => void;
  index: number;
}

export const ParchmentCard: React.FC<ParchmentCardProps> = ({ letter, onClick, index }) => {
  const handleClick = () => {
    soundEngine.playPaperRustle();
    soundEngine.playChime(580 + index * 40);
    onClick();
  };

  // Asymmetric deckle edge variations so cards look uniquely weathered
  const clipPaths = [
    'polygon(1% 4%, 18% 1%, 38% 3%, 62% 0%, 82% 2%, 99% 1%, 98% 22%, 100% 48%, 98% 74%, 99% 97%, 82% 98%, 62% 96%, 38% 99%, 18% 97%, 1% 99%, 2% 76%, 0% 49%, 2% 24%)',
    'polygon(2% 2%, 22% 0%, 44% 3%, 68% 1%, 88% 2%, 99% 3%, 98% 28%, 100% 55%, 97% 80%, 99% 98%, 78% 97%, 56% 99%, 34% 96%, 14% 98%, 1% 97%, 3% 72%, 1% 44%, 3% 20%)',
    'polygon(0% 3%, 20% 1%, 42% 2%, 65% 0%, 86% 2%, 98% 1%, 100% 25%, 98% 52%, 100% 77%, 98% 99%, 76% 97%, 52% 99%, 30% 97%, 10% 98%, 2% 96%, 1% 70%, 2% 45%, 0% 22%)',
    'polygon(2% 1%, 25% 3%, 48% 0%, 72% 2%, 92% 1%, 99% 4%, 97% 30%, 100% 58%, 98% 82%, 99% 97%, 75% 99%, 52% 96%, 28% 98%, 8% 97%, 1% 98%, 3% 68%, 1% 40%, 2% 18%)',
    'polygon(1% 2%, 19% 1%, 40% 3%, 64% 1%, 85% 2%, 99% 2%, 98% 24%, 100% 50%, 97% 76%, 99% 98%, 80% 97%, 58% 99%, 36% 96%, 16% 98%, 1% 96%, 2% 72%, 0% 46%, 2% 22%)',
  ];

  const currentClip = clipPaths[index % clipPaths.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: (index % 2 === 0 ? -1 : 1) * 0.8 }}
      animate={{ opacity: 1, y: 0, rotate: (index % 2 === 0 ? -0.8 : 0.8) }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{
        scale: 1.025,
        y: -5,
        rotate: 0,
        transition: { duration: 0.2 },
      }}
      className="relative group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => soundEngine.playPenScratch()}
    >
      {/* Deep charred shadow under burned paper */}
      <div
        className="absolute -inset-2 bg-[#422812]/25 blur-lg rounded-xl opacity-70 group-hover:opacity-95 transition-opacity duration-300"
        style={{ transform: 'translateY(12px) scale(0.96)' }}
      />

      {/* Burned Deckle Edge Container */}
      <div
        className="relative w-full min-h-[220px] sm:min-h-[240px] md:min-h-[260px] p-6 sm:p-7 md:p-8 flex flex-col justify-between select-none"
        style={{
          clipPath: currentClip,
          background: 'radial-gradient(ellipse at 50% 50%, #fbf5e7 0%, #f3e6cd 68%, #debfa0 88%, #9f6e40 96%, #522d14 100%)',
          boxShadow: 'inset 0 0 26px rgba(85,48,22,0.45), 0 8px 24px rgba(60,35,15,0.22)',
        }}
      >
        {/* Ragged scorched burnt edges gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-85"
          style={{
            background: 'radial-gradient(circle at center, transparent 72%, rgba(130,75,30,0.3) 88%, rgba(68,34,14,0.7) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Paper texture subtle scratches/fibers */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#5a3a1f_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Letter Summary Content */}
        <div className="relative z-10 space-y-3 pr-2">
          {letter.summaryBullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-[#3c2a1c] text-lg leading-tight select-none mt-1">•</span>
              <p
                className={`text-[#261d15] leading-relaxed tracking-wide ${
                  index === 3
                    ? 'font-flowing-cursive text-xl sm:text-[23px] font-normal' // Van Minh flowing script
                    : 'font-cursive-letter text-lg sm:text-[20px] font-normal'
                }`}
              >
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* "Click me" text button in bottom right corner */}
        <div className="relative z-20 flex justify-end items-center mt-4 pt-2">
          <button
            type="button"
            className="group/btn flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600/50 rounded px-2 py-1"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            aria-label={`Open letter by ${letter.author}`}
          >
            <span className="font-script text-2xl sm:text-[28px] text-[#22394c] font-semibold tracking-wide group-hover/btn:text-[#0f2334] group-hover/btn:underline transition-colors drop-shadow-sm">
              Click me
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
