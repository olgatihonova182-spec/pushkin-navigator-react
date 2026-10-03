import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/shared/ui';
import { LANGUAGES, OTHER_COUNTRY, getCountry } from '@/shared/config';
import { QUESTS, useQuestStore } from '@/entities/quest';
import { useZachetStore } from '@/entities/zachet';
import { resetQuests, hasQuestProgress } from '@/features/reset-quests';
import './ModeratorPanel.css';

/* Moderator's bug: a demo tool, not part of the app. As in the participant and moderator
   prototypes, it lives behind a button in the corner and slides out on tap.
   Unavailable actions are not hidden: they say why. */
export function ModeratorPanel() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const titleRef = useRef(null);
  const country = useQuestStore((s) => s.country);
  const nativeLang = useQuestStore((s) => s.nativeLang);
  const sessions = useQuestStore((s) => s.sessions);
  const zachet = useZachetStore((s) => s);
  const canReset = useQuestStore((s) => hasQuestProgress(s, zachet));
  const zachetPassed = zachet.route ? zachet.route.stops.filter((x) => zachet.stops[x.id]?.stamped).length : 0;

  useEffect(() => {
    if (!open) return undefined;
    titleRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const finished = Object.values(sessions).filter((s) => s.finished).length;
  const inProgress = Object.values(sessions).filter((s) => !s.finished).length;
  const countryName = country === OTHER_COUNTRY ? 'другая' : getCountry(country)?.name || 'не выбрана';
  const langName = nativeLang ? LANGUAGES[nativeLang].name.toLowerCase() : 'не выбран';

  const onReset = () => {
    resetQuests();
    setDone(true);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="mod-fab"
        aria-label={open ? 'Закрыть панель модератора' : 'Панель модератора'}
        aria-expanded={open}
        aria-controls="moderator-panel"
        onClick={() => {
          setOpen((v) => !v);
          setDone(false);
        }}
      >
        <Icon name={open ? 'close' : 'bug'} />
      </button>

      <section id="moderator-panel" className="mod-panel" aria-label="Панель модератора" hidden={!open}>
        <h2 className="mod-panel__title" tabIndex={-1} ref={titleRef}>Панель модератора</h2>
        <p className="mod-panel__hint">Демо-инструмент: в приложение для студентов не входит.</p>

        <h3 className="mod-panel__group">Квесты</h3>
        <dl className="mod-panel__state">
          <div><dt>Страна</dt><dd>{countryName}</dd></div>
          <div><dt>Язык</dt><dd>{langName}</dd></div>
          <div><dt>Пройдено</dt><dd>{finished} из {QUESTS.length}</dd></div>
          <div><dt>В процессе</dt><dd>{inProgress}</dd></div>
          <div><dt>Зачёт Цветаева</dt><dd>{zachet.route ? `${zachetPassed} из ${zachet.route.stops.length}` : 'не начат'}</dd></div>
        </dl>

        <button type="button" className="mod-panel__btn" data-tone="danger" disabled={!canReset} onClick={onReset}>
          Сбросить квесты к началу
          <span>
            {canReset
              ? 'Как у нового студента: без прогресса, без выбранной страны, родного языка и языка прохождения, без зачётки Цветаева. «Мой визит» и маршрут не трогаются.'
              : 'Сбрасывать нечего: квесты ещё не начаты и страна не выбрана.'}
          </span>
        </button>
        {done && <p className="mod-panel__done" role="status">Сброшено. Открыт список квестов.</p>}
      </section>
    </>
  );
}
