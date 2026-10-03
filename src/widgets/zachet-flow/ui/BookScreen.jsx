import { Button, Icon } from '@/shared/ui';
import { fill } from '@/shared/lib';
import { useZachetStore, Stamp, REWARDS, totalPoints } from '@/entities/zachet';
import { useUi, exhibitName, hallLine, getExhibit, textDir } from './common';

/* 4. The record book: title and intro from the AI, «how the AI understood you», who built the
   route, the stops (passed — stamped, current — highlighted, next — locked), «What else is here». */
export function BookScreen() {
  const { uiLang, ui } = useUi();
  const route = useZachetStore((s) => s.route);
  const stops = useZachetStore((s) => s.stops);
  const rewards = useZachetStore((s) => s.rewards);
  const openStop = useZachetStore((s) => s.openStop);
  const go = useZachetStore((s) => s.go);
  const dir = textDir(route);
  const current = route.stops.findIndex((s) => !stops[s.id]?.stamped);
  const closed = current === -1;

  return (
    <section className="zachet-screen">
      <p className={`zachet__source zachet__source--${route.source}`}>{ui.source[route.source]}</p>
      {route.langFallback && <p className="supporting-text">{ui.demoLangNote}</p>}
      <h2 className="t-headline-s" dir={dir}>{route.title}</h2>
      <p dir={dir}>{route.intro}</p>
      {route.understanding && (
        <details className="zachet__details">
          <summary>{ui.understood}</summary>
          <p dir={dir}>{route.understanding}</p>
          {route.mood && <p className="supporting-text" dir={dir}>{route.mood}</p>}
        </details>
      )}

      <h3 className="zachet__label">{ui.book}</h3>
      <ol className="zachet__book">
        {route.stops.map((s, i) => {
          const e = getExhibit(s.id);
          const state = i === current ? 'current' : stops[s.id]?.stamped ? 'passed' : 'locked';
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`zachet__row zachet__row--${state} state-layer`}
                disabled={state === 'locked'}
                onClick={() => openStop(i)}
              >
                <span className="zachet__row-n">{i + 1}</span>
                <span className="zachet__row-text">
                  <span className="zachet__row-name" lang="ru">{exhibitName(e, uiLang)}</span>
                  <span className="zachet__row-hall">{hallLine(e, uiLang, ui)}</span>
                </span>
                {state === 'passed' && <Stamp text={ui.stamp} small />}
                {state === 'current' && <span className="zachet__row-now">{ui.current}</span>}
                {state === 'locked' && <Icon name="close" />}
              </button>
            </li>
          );
        })}
        <li>
          <button type="button" className="zachet__row zachet__row--more state-layer" onClick={() => go('more')}>
            <span className="zachet__row-n"><Icon name="map" /></span>
            <span className="zachet__row-text"><span className="zachet__row-name">{ui.more}</span></span>
            <Icon name="chevron" />
          </button>
        </li>
      </ol>

      <p className="supporting-text">{fill(ui.score, { n: totalPoints(stops) })}</p>
      {rewards.length > 0 && (
        <ul className="zachet__badges" aria-label={ui.rewards}>
          {REWARDS.filter((r) => rewards.includes(r.id)).map((r) => (
            <li key={r.id}><Icon name="trophy" filled /> {r.name[uiLang]}</li>
          ))}
        </ul>
      )}

      {closed ? (
        <Button variant="filled" icon="flag" onClick={() => go('postcard')}>{ui.toPostcard}</Button>
      ) : (
        <Button variant="filled" icon="next" onClick={() => openStop(current)}>{ui.continue}</Button>
      )}
    </section>
  );
}
