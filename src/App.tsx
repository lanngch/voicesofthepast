/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HomeFrame } from './components/HomeFrame';
import { Frame1Overview } from './components/Frame1Overview';
import { LetterDetailFrame } from './components/LetterDetailFrame';
import { LETTERS, LetterData } from './data/letters';
import { soundEngine } from './services/soundEngine';

type AppView = 'home' | 'frame-1' | 'letter';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [currentLetter, setCurrentLetter] = useState<LetterData | null>(null);

  // Sync hash routing so users can refresh or link directly to frames
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setView('home');
        setCurrentLetter(null);
      } else if (hash === 'frame-1') {
        setView('frame-1');
        setCurrentLetter(null);
      } else if (hash.startsWith('frame-')) {
        const found = LETTERS.find((l) => l.id === hash);
        if (found) {
          setCurrentLetter(found);
          setView('letter');
        } else {
          setView('frame-1');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (view === 'letter') {
          soundEngine.playPaperRustle();
          navigateToFrame1();
        } else if (view === 'frame-1') {
          soundEngine.playPaperRustle();
          navigateToHome();
        }
      } else if (view === 'letter' && currentLetter) {
        const currentIndex = LETTERS.findIndex((l) => l.id === currentLetter.id);
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          soundEngine.playPaperRustle();
          handleNavigateLetter('prev');
        } else if (e.key === 'ArrowRight' && currentIndex < LETTERS.length - 1) {
          soundEngine.playPaperRustle();
          handleNavigateLetter('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, currentLetter]);

  const navigateToHome = () => {
    window.location.hash = 'home';
    setView('home');
    setCurrentLetter(null);
  };

  const navigateToFrame1 = () => {
    window.location.hash = 'frame-1';
    setView('frame-1');
    setCurrentLetter(null);
  };

  const handleSelectLetter = (letter: LetterData) => {
    window.location.hash = letter.id;
    setCurrentLetter(letter);
    setView('letter');
  };

  const handleNavigateLetter = (direction: 'prev' | 'next') => {
    if (!currentLetter) return;
    const currentIndex = LETTERS.findIndex((l) => l.id === currentLetter.id);
    if (direction === 'prev' && currentIndex > 0) {
      const prevLetter = LETTERS[currentIndex - 1];
      window.location.hash = prevLetter.id;
      setCurrentLetter(prevLetter);
    } else if (direction === 'next' && currentIndex < LETTERS.length - 1) {
      const nextLetter = LETTERS[currentIndex + 1];
      window.location.hash = nextLetter.id;
      setCurrentLetter(nextLetter);
    }
  };

  const currentIndex = currentLetter
    ? LETTERS.findIndex((l) => l.id === currentLetter.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < LETTERS.length - 1;

  if (view === 'home') {
    return <HomeFrame onNavigateToFrame1={navigateToFrame1} />;
  }

  if (view === 'frame-1') {
    return (
      <Frame1Overview
        onSelectLetter={handleSelectLetter}
        onBackToHome={navigateToHome}
      />
    );
  }

  if (view === 'letter' && currentLetter) {
    return (
      <LetterDetailFrame
        letter={currentLetter}
        onBackToOverview={navigateToFrame1}
        onNavigateLetter={handleNavigateLetter}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    );
  }

  return <HomeFrame onNavigateToFrame1={navigateToFrame1} />;
}
