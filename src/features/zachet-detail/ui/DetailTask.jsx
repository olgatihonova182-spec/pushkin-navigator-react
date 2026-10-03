import { useEffect, useState } from 'react';
import { Button, Icon } from '@/shared/ui';
import { fill } from '@/shared/lib';
import { useZachetStore, difficulty, ZACHET_UI } from '@/entities/zachet';
import './DetailTask.css';

/* Step 1 «Find the detail»: lead from the visitor's culture, question, three options,
   timer and hint by difficulty. After the timer the answer still counts — no losing. */
export function DetailTask({ stop, dir }) {
  const uiLang = useZachetStore((s) => s.uiLang);
  const level = difficulty(useZachetStore((s) => s.profile.difficulty));
  const state = useZachetStore((s) => s.stops[stop.id]) || {};
  const answer = useZachetStore((s) => s.answer);
  const ui = ZACHET_UI[uiLang];
  const [now, setNow] = useState(Date.now());
  const [hintOpen, setHintOpen] = useState(false);
  const done = Boolean(state.answer);

  useEffect(() => {
    if (done) return undefined;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [done]);

  const left = Math.max(0, level.seconds - Math.floor((now - (state.taskStartedAt || now)) / 1000));
  const wrong = state.wrong || [];
  const showHint = level.hint === 'always' || (level.hint === 'button' && hintOpen);

  return (
    <div className="detail">
      {!done && (
        <div className={left ? 'detail__timer' : 'detail__timer detail__timer--over'} role="timer" aria-live="off">
          <Icon name="clock" />
          <span>{left ? fill(ui.seconds, { s: left }) : ui.timeUp}</span>
        </div>
      )}
      {stop.task.lead && <p className="detail__lead" dir={dir}>{stop.task.lead}</p>}
      <p className="detail__question" dir={dir}>{stop.task.question}</p>
      <div className="detail__options" role="group">
        {stop.task.options.map((option, i) => {
          const isRight = done && i === stop.task.correct;
          const isWrong = wrong.includes(i);
          return (
            <button
              key={i}
              type="button"
              dir={dir}
              className={`detail__option state-layer${isRight ? ' detail__option--right' : ''}${isWrong ? ' detail__option--wrong' : ''}`}
              aria-disabled={done || isWrong}
              onClick={() => !done && !isWrong && answer(stop.id, i)}
            >
              <span>{option}</span>
              {isRight && <Icon name="seen" filled />}
              {isWrong && <Icon name="close" />}
            </button>
          );
        })}
      </div>
      {!done && wrong.length > 0 && <p className="detail__feedback detail__feedback--wrong" role="status">{ui.wrong}</p>}
      {!done && level.hint === 'button' && !hintOpen && (
        <Button variant="outlined" icon="hint" onClick={() => setHintOpen(true)}>{ui.hint}</Button>
      )}
      {!done && level.hint === 'none' && <p className="detail__note">{ui.noHints}</p>}
      {!done && showHint && stop.task.hint && (
        <p className="detail__hint" dir={dir}><Icon name="hint" /><span>{stop.task.hint}</span></p>
      )}
      {done && (
        <div className="detail__result" role="status">
          <p className="detail__feedback detail__feedback--right">
            {ui.correct} {fill(ui.points, { n: state.answer.points })}
          </p>
          {stop.task.explain && <p dir={dir}>{stop.task.explain}</p>}
        </div>
      )}
    </div>
  );
}
