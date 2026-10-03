import { useEffect, useRef, useState } from 'react';
import { Button, ButtonRow, Icon, IconButton } from '@/shared/ui';
import { langProps } from '@/shared/config';
import { fill, pick } from '@/shared/lib';
import { getHall, hallLabel, hallLocation } from '@/entities/hall';
import { getExhibit, ExhibitCard } from '@/entities/exhibit';
import {
  getQuest, questUi, questLanguage, questNativeLang, isCheckable, isSettled, useQuestStore, LocalizedText, TASK_ICONS,
} from '@/entities/quest';
import { AnswerForm, revealAnswer, openHint } from '@/features/answer-quest-task';
import { TranslateToggle } from '@/features/translate-quest-task';
import { RouteHereButton } from '@/features/build-route';
import { nextTask, exitQuest } from '@/features/navigate-quest';
import { QuestSummary } from './QuestSummary';
import './QuestPlayer.css';

/* The quest itself: one task at a time. In the Russian mode every task can be translated
   into the native language; in the native mode everything is in that language, and the
   Russian phrases to say to people come with a translation. */
export function QuestPlayer({ questId }) {
  const quest = getQuest(questId);
  const session = useQuestStore((s) => s.sessions[questId]);
  const nativeLang = questNativeLang(quest, useQuestStore((s) => s.nativeLang));
  const lang = questLanguage(session, nativeLang);
  const ui = questUi(lang);
  const rootRef = useRef(null);

  // A new task (or the final screen) starts at the top, with focus on its heading.
  useEffect(() => {
    const screen = rootRef.current?.closest('.screen');
    if (screen) screen.scrollTop = 0;
    rootRef.current?.querySelector('[data-quest-focus]')?.focus({ preventScroll: true });
  }, [session.step, session.finished]);

  return (
    <div className="quest-player" ref={rootRef} {...langProps(lang)}>
      <div className="quest-player__top">
        <span className="quest-player__title" lang="ru" dir="auto">{quest.title.ru}</span>
        <IconButton icon="close" label={ui.exit} onClick={exitQuest} />
      </div>
      {session.finished ? (
        <QuestSummary quest={quest} session={session} lang={lang} nativeLang={nativeLang} />
      ) : (
        <TaskView
          key={quest.tasks[session.step].id}
          quest={quest}
          session={session}
          lang={lang}
          nativeLang={nativeLang}
        />
      )}
    </div>
  );
}

function TaskView({ quest, session, lang, nativeLang }) {
  const ui = questUi(lang);
  const task = quest.tasks[session.step];
  const result = session.results[task.id];
  const hall = getHall(task.hall);
  const showHint = !!result?.hintUsed;
  const [translated, setTranslated] = useState(false);
  const canTranslate = lang === 'ru' && nativeLang && nativeLang !== 'ru';
  const translateTo = canTranslate && translated ? nativeLang : null;
  const settled = isSettled(result);
  const isLast = session.step === quest.tasks.length - 1;

  return (
    <article className="task" aria-labelledby="task-heading">
      <div className="task__progress" aria-hidden="true">
        {quest.tasks.map((t, i) => (
          <span key={t.id} className={i < session.step ? 'is-passed' : i === session.step ? 'is-current' : ''} />
        ))}
      </div>
      <div className="task__head">
        <h2 id="task-heading" className="task__count" tabIndex={-1} data-quest-focus>
          {fill(ui.taskOf, { n: session.step + 1, m: quest.tasks.length })}
        </h2>
        <span className="task__type">
          <Icon name={TASK_ICONS[task.type]} />
          {ui.types[task.type]}
        </span>
      </div>

      <div className="task__place">
        <Icon name="place" />
        <span lang="ru" dir="auto">{hallLabel(hall)} · {hallLocation(hall)}</span>
      </div>

      {task.exhibit && getExhibit(task.exhibit) && <ExhibitCard exhibit={getExhibit(task.exhibit)} />}

      <LocalizedText text={task.prompt} lang={lang} translateTo={translateTo} className="task__prompt" />

      {canTranslate && <TranslateToggle on={translated} onToggle={() => setTranslated((v) => !v)} nativeLang={nativeLang} />}

      {task.phrase && <PhraseCard task={task} lang={lang} nativeLang={nativeLang} translated={!!translateTo} ui={ui} />}

      <AnswerForm questId={quest.id} task={task} result={result} lang={lang} translateTo={translateTo} />

      {result?.status === 'wrong' && (
        <p className="feedback feedback--wrong">
          <Icon name="close" />
          <span>{ui.wrong}</span>
        </p>
      )}
      {result?.status === 'correct' && (
        <p className="feedback feedback--correct">
          <Icon name="seen" filled />
          <span>{ui.correct}</span>
        </p>
      )}

      {!settled && (
        <ButtonRow>
          {!showHint && (
            <Button variant="outlined" icon="hint" onClick={() => openHint(quest.id, task)}>
              {ui.hint}
            </Button>
          )}
          {result?.status === 'wrong' && isCheckable(task) && (
            <Button variant="text" onClick={() => revealAnswer(quest.id, task)}>
              {ui.showAnswer}
            </Button>
          )}
          <RouteHereButton hallId={task.hall} variant="text" icon="routes">
            {ui.route}
          </RouteHereButton>
        </ButtonRow>
      )}

      {showHint && !settled && (
        <div className="task__hint">
          <Icon name="hint" />
          <div>
            <LocalizedText text={task.hint} lang={lang} translateTo={translateTo} />
          </div>
        </div>
      )}

      {settled && (
        <>
          <div className="task__explain">
            <LocalizedText text={task.explain} lang={lang} translateTo={translateTo} />
          </div>
          <Button variant="filled" icon={isLast ? 'flag' : 'next'} onClick={() => nextTask(quest.id)}>
            {isLast ? ui.finish : ui.next}
          </Button>
        </>
      )}
    </article>
  );
}

/* What to say to a person, always in Russian: staff and other teams speak Russian. */
function PhraseCard({ task, lang, nativeLang, translated, ui }) {
  const showTranslation = lang !== 'ru' || translated;
  const translationLang = lang !== 'ru' ? lang : nativeLang;
  return (
    <div className="phrase">
      <div className="phrase__label">{ui.phraseTitle}</div>
      <p className="phrase__ru" lang="ru" dir="ltr">{task.phrase.ru}</p>
      {showTranslation && translationLang && (
        <p className="phrase__translation" {...langProps(translationLang)}>{pick(task.phrase, translationLang)}</p>
      )}
    </div>
  );
}
