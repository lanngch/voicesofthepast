import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc3, Mic, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import { speechService } from '../services/speechService';
import { LetterData } from '../data/letters';

interface AudioBarProps {
  currentLetter?: LetterData | null;
  activeParagraphIndex?: number;
  onParagraphChange?: (index: number) => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({
  currentLetter,
  onParagraphChange,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(soundEngine.isPlaying());
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [volume, setVolume] = useState(soundEngine.getVolume());
  const [isNarrating, setIsNarrating] = useState(false);
  const [isNarratePaused, setIsNarratePaused] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    setIsPlayingMusic(soundEngine.isPlaying());
  }, [currentLetter]);

  const toggleMusic = () => {
    if (isPlayingMusic) {
      soundEngine.stopTheme(true);
      setIsPlayingMusic(false);
    } else {
      const preset = currentLetter ? currentLetter.audioTheme.preset : 'flute-guitar';
      soundEngine.playTheme(preset);
      setIsPlayingMusic(true);
    }
  };

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(soundEngine.toggleMute());
    }
  };

  const startNarration = () => {
    if (!currentLetter) return;

    if (isNarrating && isNarratePaused) {
      speechService.resume();
      setIsNarratePaused(false);
      return;
    }

    if (isNarrating) {
      speechService.pause();
      setIsNarratePaused(true);
      return;
    }

    // Start reading full letter
    const allText = [
      ...currentLetter.fullHeader,
      currentLetter.salutation || '',
      ...currentLetter.paragraphs,
      currentLetter.signOff || '',
      currentLetter.postScript || '',
    ].filter(Boolean);

    soundEngine.playPaperRustle();
    setIsNarrating(true);
    setIsNarratePaused(false);

    // If music isn't playing, start background music quietly for atmosphere
    if (!isPlayingMusic) {
      soundEngine.playTheme(currentLetter.audioTheme.preset);
      setIsPlayingMusic(true);
    }

    speechService.startReading(allText, {
      onParagraphChange: (idx) => {
        onParagraphChange?.(idx);
      },
      onFinish: () => {
        setIsNarrating(false);
        setIsNarratePaused(false);
        onParagraphChange?.(-1);
      },
      onError: () => {
        setIsNarrating(false);
        setIsNarratePaused(false);
        onParagraphChange?.(-1);
      },
    });
  };

  const stopNarration = () => {
    speechService.stop();
    setIsNarrating(false);
    setIsNarratePaused(false);
    onParagraphChange?.(-1);
  };

  return (
    <div className="relative z-50">
      <div className="flex items-center gap-2 bg-[#f6eee0]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-400/35 shadow-sm text-stone-800">
        {/* Soundtrack Title / Ambient indicator */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-2 text-xs font-sans text-stone-700 hover:text-stone-950 transition-colors pr-1 cursor-pointer"
          title="Audio settings"
        >
          <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-amber-900/10 text-amber-900">
            <Music className={`w-3 h-3 ${isPlayingMusic ? 'animate-pulse' : ''}`} />
          </div>
          <span className="hidden sm:inline-block max-w-[130px] md:max-w-[180px] truncate font-medium">
            {currentLetter ? currentLetter.audioTheme.title.split('(')[0] : 'Historical Ambience'}
          </span>
        </button>

        {/* Play/Pause Music Button */}
        <button
          onClick={toggleMusic}
          className="p-1 rounded-full hover:bg-stone-300/40 text-stone-700 transition-colors"
          title={isPlayingMusic ? 'Pause Music' : 'Play Music'}
          aria-label={isPlayingMusic ? 'Pause Music' : 'Play Music'}
        >
          {isPlayingMusic ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Read Aloud Narration Button (when on a letter page) */}
        {currentLetter && (
          <button
            onClick={startNarration}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sans font-medium transition-all ${
              isNarrating && !isNarratePaused
                ? 'bg-amber-800 text-amber-50 shadow-sm'
                : 'bg-stone-200/70 hover:bg-stone-300/80 text-stone-800'
            }`}
            title="Read letter aloud with voice narration"
          >
            <Mic className="w-3 h-3" />
            <span className="hidden md:inline">
              {isNarrating ? (isNarratePaused ? 'Resume Voice' : 'Reading...') : 'Read Aloud'}
            </span>
          </button>
        )}

        {isNarrating && (
          <button
            onClick={stopNarration}
            className="p-1 rounded-full hover:bg-stone-300/40 text-stone-600 transition-colors"
            title="Stop narration"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}

        {/* Volume & Mute */}
        <button
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-stone-300/40 text-stone-700 transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Audio Settings Flyout */}
      {showControls && (
        <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-[#fdf9f0] border border-stone-300/70 rounded-xl shadow-xl text-stone-800 text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Sound & Narration
            </span>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">Web Audio</span>
          </div>

          <div>
            <div className="flex justify-between text-stone-600 mb-1">
              <span>Master Volume</span>
              <span className="font-mono">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-amber-800 cursor-pointer"
            />
          </div>

          {currentLetter && (
            <div className="bg-amber-950/5 p-2 rounded-lg border border-amber-900/10 space-y-1">
              <div className="text-[11px] font-semibold text-amber-900">
                {currentLetter.audioTheme.title}
              </div>
              <div className="text-[11px] text-stone-600 leading-snug">
                {currentLetter.audioTheme.description}
              </div>
            </div>
          )}

          <div className="pt-1 flex items-center justify-between text-stone-500 text-[11px]">
            <span>Paper & Pen Sound FX</span>
            <span className="text-amber-800 font-medium">Active</span>
          </div>
        </div>
      )}
    </div>
  );
};
