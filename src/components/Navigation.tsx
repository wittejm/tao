import { useState, useRef, useEffect } from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentChapter: number;
  totalChapters: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToChapter: (chapter: number) => void;
}

export default function Navigation({
  currentChapter,
  totalChapters,
  onPrevious,
  onNext,
  onGoToChapter,
}: NavigationProps) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isInputActive]);

  const handleIndicatorClick = () => {
    setInputValue(currentChapter.toString());
    setIsInputActive(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    const chapterNum = parseInt(inputValue, 10);
    if (!isNaN(chapterNum) && chapterNum >= 1 && chapterNum <= totalChapters) {
      onGoToChapter(chapterNum);
    }
    setIsInputActive(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    } else if (e.key === 'Escape') {
      setIsInputActive(false);
    }
  };

  const handleInputBlur = () => {
    handleInputSubmit();
  };

  return (
    <nav className={styles.container}>
      <button
        className={styles.button}
        onClick={onPrevious}
        disabled={currentChapter === 1}
        aria-label="Previous chapter"
      >
        ← Previous
      </button>

      {isInputActive ? (
        <input
          ref={inputRef}
          type="number"
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          min={1}
          max={totalChapters}
          aria-label="Go to chapter"
        />
      ) : (
        <button
          className={styles.indicator}
          onClick={handleIndicatorClick}
          aria-label="Jump to chapter"
        >
          {currentChapter}
        </button>
      )}

      <button
        className={styles.button}
        onClick={onNext}
        disabled={currentChapter === totalChapters}
        aria-label="Next chapter"
      >
        Next →
      </button>
    </nav>
  );
}
