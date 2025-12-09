import type { Chapter } from '../types/chapter';
import styles from './ChapterDisplay.module.css';

interface ChapterDisplayProps {
  chapter: Chapter;
}

export default function ChapterDisplay({ chapter }: ChapterDisplayProps) {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.chapterNumber}>Chapter {chapter.chapter}</h1>
        <h2 className={styles.title}>{chapter.title}</h2>
      </header>

      <div className={styles.body}>
        {chapter.body.split('\n').map((line, index) => (
          <p key={index} className={styles.verseLine}>
            {line}
          </p>
        ))}
      </div>

      {chapter.footnotes && (
        <>
          <div className={styles.separator} />
          <div className={styles.footnotes}>
            <p>{chapter.footnotes}</p>
          </div>
        </>
      )}
    </article>
  );
}
