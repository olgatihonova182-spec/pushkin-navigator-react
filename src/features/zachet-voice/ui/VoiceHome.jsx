import { useEffect, useState } from 'react';
import { Button, Icon } from '@/shared/ui';
import { fill } from '@/shared/lib';
import { useZachetStore, VOICE_SECONDS, ZACHET_UI } from '@/entities/zachet';
import './VoiceHome.css';

/* Step 2 «Voice message home»: a topic and a 20-second timer. The recording itself happens in
   the student's messenger — the app records nothing. */
export function VoiceHome({ stop, dir }) {
  const uiLang = useZachetStore((s) => s.uiLang);
  const result = useZachetStore((s) => s.stops[stop.id]?.voice);
  const voice = useZachetStore((s) => s.voice);
  const ui = ZACHET_UI[uiLang];
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (left === null || left <= 0) return undefined;
    const t = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  return (
    <div className="voice">
      <p className="supporting-text">{ui.voiceTopic}</p>
      <p className="voice__topic" dir={dir}>{stop.voiceTopic}</p>
      <p className="supporting-text">{ui.voiceNote}</p>
      {!result && (
        <>
          {left === null ? (
            <Button variant="tonal" icon="clock" onClick={() => setLeft(VOICE_SECONDS)}>{ui.voiceStart}</Button>
          ) : (
            <p className="voice__timer" role="timer" aria-live="off"><Icon name="clock" /> {fill(ui.seconds, { s: left })}</p>
          )}
          <div className="buttons">
            <Button variant="filled" icon="check" onClick={() => voice(stop.id, 'sent')}>{ui.sent}</Button>
            <Button variant="text" onClick={() => voice(stop.id, 'skipped')}>{ui.skip}</Button>
          </div>
        </>
      )}
      {result && <p className="voice__done" role="status"><Icon name={result === 'sent' ? 'seen' : 'next'} /> {result === 'sent' ? ui.sent : ui.skip}</p>}
    </div>
  );
}
