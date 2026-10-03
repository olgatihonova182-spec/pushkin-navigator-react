import { useEffect, useState } from 'react';
import { Button, ButtonRow, Icon } from '@/shared/ui';
import { langProps } from '@/shared/config';
import { fill, pick } from '@/shared/lib';
import { getHall } from '@/entities/hall';
import { questUi, questSummary, LocalizedText, SUMMARY_TEXT, TASK_ICONS } from '@/entities/quest';
import { TranslateToggle } from '@/features/translate-quest-task';
import { exitQuest, restartQuest } from '@/features/navigate-quest';
import './QuestSummary.css';

const CONFETTI = 14;
const OUTCOME_ICONS = { firstTry: 'star', retry: 'seen', revealed: 'attention', done: 'seen' };

/* Final screen: a playful summary — rank, numbers, badges, the student's own words, the path. */
export function QuestSummary({ quest, session, lang, nativeLang }) {
  const ui = questUi(lang);
  const sum = questSummary(quest, session);
  const t = (text, vars) => (vars ? fill(pick(text, lang), vars) : pick(text, lang));
  const [translated, setTranslated] = useState(false);
  const canTranslate = lang === 'ru' && nativeLang && nativeLang !== 'ru';
  const translateTo = canTranslate && translated ? nativeLang : null;

  // Confetti once on arrival; nothing is drawn with reduced motion (see CSS).
  const [party, setParty] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setParty(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="summary">
      {party && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: CONFETTI }, (_, i) => <span key={i} style={{ '--i': i }} />)}
        </div>
      )}

      <div className="summary__hero">
        <span className="summary__trophy"><Icon name="trophy" filled /></span>
        <h2 className="t-headline-s" tabIndex={-1} data-quest-focus>{ui.finishedTitle}</h2>
        <p className="summary__label">{t(SUMMARY_TEXT.rankTitle)}</p>
        <LocalizedText as="p" text={sum.rank.name} lang={lang} translateTo={translateTo} className="summary__rank" />
        <LocalizedText text={sum.rank.comment} lang={lang} translateTo={translateTo} className="summary__comment" />
        {canTranslate && <TranslateToggle on={translated} onToggle={() => setTranslated((v) => !v)} nativeLang={nativeLang} />}
      </div>

      <ul className="summary__stats">
        <Stat icon="star" value={`${sum.firstTry}/${sum.total}`} label={fill(ui.score, { n: sum.firstTry, m: sum.total })} />
        <Stat icon="flag" value={sum.tasksDone} label={t(SUMMARY_TEXT.tasksDone, { n: sum.tasksDone })} />
        <Stat icon="hint" value={sum.hintsUsed} label={t(SUMMARY_TEXT.hintsUsed, { n: sum.hintsUsed })} />
        <Stat icon="hall" value={sum.halls} label={t(SUMMARY_TEXT.hallsVisited, { n: sum.halls })} />
      </ul>

      <h3 className="summary__title">{t(SUMMARY_TEXT.badgesTitle)}</h3>
      <ul className="badges">
        {sum.badges.map((b) => (
          <li key={b.id} className={`badge${b.earned ? ' badge--earned' : ''}`}>
            <span className="badge__icon"><Icon name={b.icon} filled={b.earned} /></span>
            <span className="badge__name">{t(b.name)}</span>
            {translateTo && <span className="badge__translation" {...langProps(translateTo)}>{pick(b.name, translateTo)}</span>}
            <span className="badge__state">{t(b.earned ? SUMMARY_TEXT.earned : SUMMARY_TEXT.notEarned)}</span>
          </li>
        ))}
      </ul>

      {sum.quotes.length > 0 && (
        <>
          <h3 className="summary__title">{t(SUMMARY_TEXT.quotesTitle)}</h3>
          {sum.quotes.map(({ task, text }) => (
            <figure key={task.id} className="quote">
              <blockquote dir="auto">«{text}»</blockquote>
              <figcaption lang="ru" dir="auto">{getHall(task.hall).name}</figcaption>
            </figure>
          ))}
        </>
      )}

      <h3 className="summary__title">{t(SUMMARY_TEXT.pathTitle)}</h3>
      <ol className="path">
        {sum.path.map(({ task, outcome }, i) => (
          <li key={task.id} className={`path__step path__step--${outcome}`}>
            <span className="path__n">{i + 1}</span>
            <Icon name={TASK_ICONS[task.type]} />
            <span className="path__text">
              <span>{ui.types[task.type]}</span>
              <span className="path__hall" lang="ru" dir="auto">{getHall(task.hall).shortName}</span>
            </span>
            <span className="path__outcome">
              <Icon name={OUTCOME_ICONS[outcome]} filled={outcome === 'firstTry'} />
              {t(SUMMARY_TEXT.outcomes[outcome])}
            </span>
          </li>
        ))}
      </ol>

      <ButtonRow>
        <Button variant="filled" onClick={exitQuest}>{ui.toList}</Button>
        <Button variant="outlined" icon="replay" onClick={() => restartQuest(quest.id)}>{ui.again}</Button>
      </ButtonRow>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return (
    <li className="stat">
      <Icon name={icon} />
      <span className="stat__value" aria-hidden="true">{value}</span>
      <span className="stat__label">{label}</span>
    </li>
  );
}
