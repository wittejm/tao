import { useState, useEffect } from 'react';
import ChapterDisplay from './components/ChapterDisplay';
import Navigation from './components/Navigation';
import type { Chapter } from './types/chapter';
import chaptersData from './data/extracted_content.json';
import './App.css';

const STORAGE_KEY = 'currentChapter';

function App() {
  const chapters: Chapter[] = chaptersData as Chapter[];
  const [currentChapter, setCurrentChapter] = useState<number>(1);

  // Load saved chapter from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const chapterNum = parseInt(saved, 10);
      if (chapterNum >= 1 && chapterNum <= chapters.length) {
        setCurrentChapter(chapterNum);
      }
    }
  }, [chapters.length]);

  // Save chapter to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentChapter.toString());
  }, [currentChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentChapter > 1) {
        setCurrentChapter((prev) => prev - 1);
      } else if (e.key === 'ArrowRight' && currentChapter < chapters.length) {
        setCurrentChapter((prev) => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter, chapters.length]);

  // Touch/swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50; // minimum distance for swipe
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentChapter < chapters.length) {
          // Swiped left -> next chapter
          setCurrentChapter((prev) => prev + 1);
        } else if (diff < 0 && currentChapter > 1) {
          // Swiped right -> previous chapter
          setCurrentChapter((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentChapter, chapters.length]);

  const handlePrevious = () => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter((prev) => prev + 1);
    }
  };

  const handleGoToChapter = (chapter: number) => {
    if (chapter >= 1 && chapter <= chapters.length) {
      setCurrentChapter(chapter);
    }
  };

  const currentChapterData = chapters[currentChapter - 1];

  if (!currentChapterData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <ChapterDisplay chapter={currentChapterData} />
      <Navigation
        currentChapter={currentChapter}
        totalChapters={chapters.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onGoToChapter={handleGoToChapter}
      />
    </div>
  );
}

export default App;
