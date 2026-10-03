import { useState } from 'react';
import { Button, Icon } from '@/shared/ui';
import { langProps } from '@/shared/config';
import { pick } from '@/shared/lib';
import { questUi, isSettled } from '@/entities/quest';
import { submitAnswer, completeTask } from '../model/answer';
import './AnswerForm.css';

/* Answer field for a task: a number, options, or free text / "done". */
export function AnswerForm({ questId, task, result, lang, translateTo }) {
  const { answer } = task;
  if (answer.kind === 'number') return <NumberAnswer questId={questId} task={task} result={result} lang={lang} />;
  if (answer.kind === 'choice') {
    return <ChoiceAnswer questId={questId} task={task} result={result} lang={lang} translateTo={translateTo} />;
  }
  return <FreeAnswer questId={questId} task={task} result={result} lang={lang} />;
}

function NumberAnswer({ questId, task, result, lang }) {
  const ui = questUi(lang);
  const [value, setValue] = useState('');
  const settled = isSettled(result);
  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) submitAnswer(questId, task, value, lang);
  };
  if (settled) {
    return <p className="answer-locked" {...langProps(lang)}>{ui.answerIs.replace('{answer}', task.answer.value)}</p>;
  }
  return (
    <form className="answer-row" onSubmit={onSubmit}>
      <input
        className="answer-input"
        inputMode="numeric"
        autoComplete="off"
        placeholder={ui.answerPlaceholder}
        aria-label={ui.answerPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...langProps(lang)}
      />
      <Button variant="filled" type="submit" disabled={!value.trim()}>
        {ui.check}
      </Button>
    </form>
  );
}

/* Tapping an option checks it at once; a wrong option stays marked. */
function ChoiceAnswer({ questId, task, result, lang, translateTo }) {
  const [wrongPicks, setWrongPicks] = useState([]);
  const settled = isSettled(result);
  const pickOption = (i) => {
    if (settled) return;
    if (!submitAnswer(questId, task, i, lang)) setWrongPicks((w) => [...w, i]);
  };
  return (
    <div className="options" role="group">
      {task.answer.options.map((option, i) => {
        const isCorrect = settled && i === task.answer.correct;
        const isWrong = wrongPicks.includes(i);
        const translation = translateTo ? pick(option, translateTo) : null;
        const main = pick(option, lang);
        return (
          <button
            key={i}
            type="button"
            className={`option state-layer${isCorrect ? ' option--correct' : ''}${isWrong ? ' option--wrong' : ''}`}
            aria-disabled={settled || isWrong}
            onClick={() => !isWrong && pickOption(i)}
          >
            <span className="option__text">
              <span {...langProps(lang)}>{main}</span>
              {translation && translation !== main && (
                <span className="option__translation" {...langProps(translateTo)}>{translation}</span>
              )}
            </span>
            {isCorrect && <Icon name="seen" filled />}
            {isWrong && <Icon name="close" />}
          </button>
        );
      })}
    </div>
  );
}

function FreeAnswer({ questId, task, result, lang }) {
  const ui = questUi(lang);
  const [text, setText] = useState(result?.text || '');
  if (isSettled(result)) {
    return result.text ? <blockquote className="answer-locked" dir="auto">{result.text}</blockquote> : null;
  }
  const needsText = task.answer.requiresText;
  return (
    <form
      className="answer-free"
      onSubmit={(e) => {
        e.preventDefault();
        completeTask(questId, task, text.trim());
      }}
    >
      {needsText && (
        <textarea
          className="answer-input answer-textarea"
          rows={3}
          dir="auto"
          placeholder={ui.textPlaceholder}
          aria-label={ui.textPlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <Button variant="filled" type="submit" icon="check" disabled={needsText && !text.trim()}>
        {ui.done}
      </Button>
    </form>
  );
}
