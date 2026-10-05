import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../services/soundEngine';

interface AirmailEnvelopeProps {
  onOpen: () => void;
}

export const AirmailEnvelope: React.FC<AirmailEnvelopeProps> = ({ onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    soundEngine.playPaperRustle();
    soundEngine.playChime(660);
    onOpen();
  };

  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4 mt-2 sm:mt-4">
      {/* Tilted container matching 1. home.png (-15deg tilt, sized gracefully so it never touches title) */}
      <motion.div
        className="relative cursor-pointer select-none"
        style={{ transformOrigin: 'center center' }}
        initial={{ rotate: -14, scale: 0.92, y: 12 }}
        animate={{
          rotate: isHovered ? -12 : -14,
          scale: isHovered ? 0.96 : 0.92,
          y: isHovered ? 4 : 12,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onMouseEnter={() => {
          setIsHovered(true);
          soundEngine.playPenScratch();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Soft realistic drop shadow on the table/parchment */}
        <div
          className="absolute -inset-4 bg-amber-950/20 blur-2xl rounded-2xl -z-10 transition-opacity duration-300"
          style={{ transform: 'translateY(20px) scale(0.9)' }}
        />

        {/* Envelope Outer Frame with Diagonal Airmail Border (proportionately scaled) */}
        <div className="relative w-[290px] sm:w-[380px] md:w-[440px] h-[200px] sm:h-[265px] md:h-[305px] rounded-lg shadow-2xl p-[8px] sm:p-[11px] airmail-border overflow-visible">
          {/* Inner Envelope Container */}
          <div className="relative w-full h-full bg-[#fbf8ee] rounded shadow-inner overflow-visible">
            {/* Darker Inner Pocket Lining (revealed behind open flap) */}
            <div className="absolute inset-0 bg-[#e7decd] rounded overflow-hidden">
              {/* Inner fold shadows */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-transparent to-amber-950/30" />
            </div>

            {/* Top Open Flap (folded upward & back) */}
            <div
              className="absolute -top-[55px] sm:-top-[75px] md:-top-[88px] left-0 right-0 h-[65px] sm:h-[85px] md:h-[100px] overflow-visible"
              style={{
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                background: 'linear-gradient(to top, #ded5c2, #ece4d4)',
                filter: 'drop-shadow(0 -3px 5px rgba(90,65,40,0.18))',
              }}
            >
              {/* Flap crease highlight */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-950/15" />
            </div>

            {/* THREE BURNED-EDGE PARCHMENT LETTERS TUCKED INSIDE (Animated) */}
            <div className="absolute -top-[50px] sm:-top-[70px] md:-top-[82px] inset-x-6 sm:inset-x-9 h-[140px] sm:h-[185px] z-10 pointer-events-none">
              {/* Letter 1 (Back, angled left) */}
              <motion.div
                className="absolute inset-x-2 h-[105px] sm:h-[135px] md:h-[155px] rounded-t-sm"
                style={{
                  background: 'linear-gradient(to bottom, #d2b07e 0%, #e8d7b8 15%, #f6edd9 100%)',
                  boxShadow: '0 -4px 10px rgba(80,50,20,0.25)',
                  clipPath: 'polygon(0% 25%, 3% 15%, 8% 18%, 15% 10%, 25% 15%, 35% 8%, 45% 16%, 55% 9%, 68% 17%, 78% 10%, 88% 18%, 95% 12%, 100% 22%, 100% 100%, 0% 100%)',
                  transformOrigin: 'bottom center',
                }}
                animate={{
                  y: isHovered ? -16 : 0,
                  rotate: isHovered ? -5 : -3,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                {/* Charred scorched line on ragged top edge */}
                <div className="h-3.5 bg-gradient-to-b from-[#643a18] via-[#a87440] to-transparent opacity-85" />
              </motion.div>

              {/* Letter 2 (Middle, angled right) */}
              <motion.div
                className="absolute inset-x-4 h-[115px] sm:h-[150px] md:h-[170px] rounded-t-sm"
                style={{
                  background: 'linear-gradient(to bottom, #cfac78 0%, #ecdcb9 18%, #f8f1df 100%)',
                  boxShadow: '0 -4px 12px rgba(80,50,20,0.28)',
                  clipPath: 'polygon(0% 22%, 4% 12%, 12% 16%, 22% 8%, 32% 16%, 42% 7%, 54% 15%, 65% 8%, 76% 16%, 86% 9%, 94% 15%, 100% 18%, 100% 100%, 0% 100%)',
                  transformOrigin: 'bottom center',
                }}
                animate={{
                  y: isHovered ? -24 : 0,
                  rotate: isHovered ? 4 : 2,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.02 }}
              >
                <div className="h-4 bg-gradient-to-b from-[#5c3414] via-[#9e6d3a] to-transparent opacity-90" />
              </motion.div>

              {/* Letter 3 (Front, center - most prominent) */}
              <motion.div
                className="absolute inset-x-1.5 h-[120px] sm:h-[160px] md:h-[180px] rounded-t-sm"
                style={{
                  background: 'linear-gradient(to bottom, #caa36d 0%, #ebd7b3 20%, #faf3e4 100%)',
                  boxShadow: '0 -5px 14px rgba(70,45,18,0.3)',
                  clipPath: 'polygon(0% 26%, 5% 15%, 12% 19%, 20% 9%, 30% 17%, 40% 8%, 50% 15%, 62% 7%, 74% 16%, 84% 8%, 93% 16%, 100% 20%, 100% 100%, 0% 100%)',
                  transformOrigin: 'bottom center',
                }}
                animate={{
                  y: isHovered ? -32 : 0,
                  rotate: isHovered ? -1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.04 }}
              >
                <div className="h-4 bg-gradient-to-b from-[#522d10] via-[#946231] to-transparent opacity-95" />
                {/* Subtle vintage handwritten lines on parchment */}
                <div className="p-3 sm:p-4 space-y-1.5 opacity-25">
                  <div className="h-1 bg-stone-700/40 rounded w-3/4" />
                  <div className="h-1 bg-stone-700/40 rounded w-5/6" />
                  <div className="h-1 bg-stone-700/40 rounded w-2/3" />
                </div>
              </motion.div>
            </div>

            {/* Front Envelope Pocket (Left and Right folded flaps) */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                clipPath: 'polygon(0% 0%, 50% 48%, 0% 100%)',
                background: 'linear-gradient(135deg, #f7f1e1, #efe4ce)',
                filter: 'drop-shadow(3px 0 4px rgba(110,85,50,0.15))',
              }}
            />
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                clipPath: 'polygon(100% 0%, 50% 48%, 100% 100%)',
                background: 'linear-gradient(225deg, #f7f1e1, #efe4ce)',
                filter: 'drop-shadow(-3px 0 4px rgba(110,85,50,0.15))',
              }}
            />

            {/* Front Lower Triangular Flap (The prominent front face of the envelope) */}
            <div
              className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
              style={{
                clipPath: 'polygon(0% 100%, 50% 46%, 100% 100%)',
                background: 'linear-gradient(to top, #ede2cb 0%, #fbf6e8 100%)',
                filter: 'drop-shadow(0 -3px 6px rgba(100,70,40,0.22))',
              }}
            />

            {/* "Click me" Text Button positioned on the envelope front */}
            <div className="absolute bottom-[24px] sm:bottom-[36px] md:bottom-[44px] inset-x-0 z-40 flex items-center justify-center">
              <motion.button
                type="button"
                className="group px-3 py-1.5 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50 rounded-lg transition-transform duration-200"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                aria-label="Click to open Voices of the Past archive"
              >
                <span className="font-script text-[28px] sm:text-[38px] md:text-[44px] leading-none text-[#233c52] font-semibold tracking-wide drop-shadow-sm group-hover:text-[#162736] transition-colors">
                  Click me
                </span>
                {/* Subtle handwritten underline glow on hover */}
                <motion.div
                  className="h-[2px] bg-[#233c52]/60 rounded-full mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? '80%' : '0%' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Ambient instruction hint below envelope */}
        <p className="mt-6 sm:mt-7 text-center text-xs tracking-wider uppercase font-sans text-stone-600/70 select-none">
          Click envelope or &ldquo;Click me&rdquo; to unfold letters
        </p>
      </motion.div>
    </div>
  );
};
