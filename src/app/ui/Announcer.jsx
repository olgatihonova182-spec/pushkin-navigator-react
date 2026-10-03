import { useEffect, useState } from 'react';
import { useUiStore } from '@/shared/model';

/* Live region for screen readers. Text is cleared and set again a moment later,
   so the same message is announced twice in a row too. */
export function Announcer() {
  const announcement = useUiStore((s) => s.announcement);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!announcement) return undefined;
    setText('');
    const t = setTimeout(() => setText(announcement.text), 60);
    return () => clearTimeout(t);
  }, [announcement]);

  return (
    <div className="visually-hidden" role="status" aria-live="polite">
      {text}
    </div>
  );
}
