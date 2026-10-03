import { Button, Icon } from '@/shared/ui';
import { fill } from '@/shared/lib';
import { useZachetStore, REWARDS, minutesSpent, totalPoints } from '@/entities/zachet';
import { postcardText, CopyPostcard } from '@/features/zachet-postcard';
import { useUi, exhibitName, getExhibit, textDir } from './common';

/* 7. The postcard home: «The Pushkin in N minutes», captions of the passed stops, one sentence
   to the family in their own language, «next time», copy. */
export function PostcardScreen() {
  const { uiLang, ui } = useUi();
  const route = useZachetStore((s) => s.route);
  const stops = useZachetStore((s) => s.stops);
  const saved = useZachetStore((s) => s.saved);
  const rewards = useZachetStore((s) => s.rewards);
  const phrase = useZachetStore((s) => s.phrase);
  const setPhrase = useZachetStore((s) => s.setPhrase);
  const startedAt = useZachetStore((s) => s.startedAt);
  const finishedAt = useZachetStore((s) => s.finishedAt);
  const go = useZachetStore((s) => s.go);
  const dir = textDir(route);

  const title = fill(ui.postcardTitle, { n: minutesSpent(startedAt, finishedAt || Date.now()) });
  const captions = route.stops.filter((s) => stops[s.id]?.stamped).map((s) => s.caption);
  const nextTime = saved.map((id) => (id === 'gallery' ? ui.moreGallery : exhibitName(getExhibit(id), uiLang)));
  const text = postcardText({ title, captions, phrase, nextTimeTitle: ui.nextTime, nextTime });

  return (
    <section className="zachet-screen">
      <article className="zachet__postcard">
        <h2 className="zachet__postcard-title">{title}</h2>
        <ul className="zachet__postcard-list" dir={dir}>
          {captions.map((c) => <li key={c}><Icon name="seen" filled /> {c}</li>)}
        </ul>
        {phrase.trim() && <p className="zachet__postcard-phrase" dir="auto">{phrase}</p>}
        <p className="zachet__postcard-place">ГМИИ им. А. С. Пушкина · Волхонка, 12</p>
      </article>

      <label className="zachet__field">
        <span className="zachet__label">{ui.postcardPhrase}</span>
        <input className="zachet__input" dir="auto" value={phrase} maxLength={200} placeholder={ui.postcardPhrasePlaceholder} onChange={(e) => setPhrase(e.target.value)} />
      </label>

      <div className="zachet__block">
        <span className="zachet__label">{ui.nextTime}</span>
        {nextTime.length ? (
          <ul className="zachet__same">{nextTime.map((n) => <li key={n} lang="ru">{n}</li>)}</ul>
        ) : (
          <p className="supporting-text">{ui.nothingSaved}</p>
        )}
      </div>

      <p className="supporting-text">{fill(ui.score, { n: totalPoints(stops) })}</p>
      {rewards.length > 0 && (
        <ul className="zachet__badges" aria-label={ui.rewards}>
          {REWARDS.filter((r) => rewards.includes(r.id)).map((r) => (
            <li key={r.id}><Icon name="trophy" filled /> {r.name[uiLang]}</li>
          ))}
        </ul>
      )}

      <CopyPostcard text={text} />
      <div className="buttons">
        <Button variant="text" onClick={() => go('book')}>{ui.toBook}</Button>
        <Button variant="text" icon="replay" onClick={() => go('params')}>{ui.restart}</Button>
      </div>
    </section>
  );
}
