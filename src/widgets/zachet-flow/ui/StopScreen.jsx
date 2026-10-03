import { useEffect, useRef } from 'react';
import { Button } from '@/shared/ui';
import { ExhibitPhoto } from '@/entities/exhibit';
import { useZachetStore, zachetHall, staffPhrase, Stamp } from '@/entities/zachet';
import { RouteHereButton } from '@/features/build-route';
import { DetailTask } from '@/features/zachet-detail';
import { VoiceHome } from '@/features/zachet-voice';
import { ReturnHereButton } from '@/features/zachet-save';
import { useUi, exhibitName, hallLine, getExhibit, textDir } from './common';

/* 5. A stop, top to bottom: the exhibit, the phrase for the attendant, why it is on the route,
   the story, «for you», then three steps: find the detail → voice home → passed. */
export function StopScreen() {
  const { uiLang, ui } = useUi();
  const route = useZachetStore((s) => s.route);
  const index = useZachetStore((s) => s.viewing);
  const stopState = useZachetStore((s) => s.stops[route.stops[index].id]) || {};
  const stamp = useZachetStore((s) => s.stamp);
  const openStop = useZachetStore((s) => s.openStop);
  const go = useZachetStore((s) => s.go);
  const stop = route.stops[index];
  const e = getExhibit(stop.id);
  const hall = zachetHall(e.museumHall);
  const dir = textDir(route);
  const isLast = index === route.stops.length - 1;
  const rootRef = useRef(null);

  // Step 3 comes when the voice step is done: the stamp is put at once.
  useEffect(() => {
    if (stopState.voice && !stopState.stamped) stamp(stop.id);
  }, [stopState.voice, stopState.stamped, stamp, stop.id]);

  // A new stop starts at the top.
  useEffect(() => {
    rootRef.current?.closest('.screen')?.scrollTo({ top: 0 });
  }, [index]);

  return (
    <section className="zachet-screen" ref={rootRef}>
      <ExhibitPhoto exhibit={e} fallbackText={ui.noPhoto} />
      <p className="zachet__hall">{hallLine(e, uiLang, ui)}</p>
      <h2 className="t-headline-s" lang="ru">{exhibitName(e, uiLang)}</h2>
      <dl className="zachet__facts">
        {e.author && <div><dt className="visually-hidden">Автор</dt><dd>{e.author}</dd></div>}
        {e.period && <div><dt className="visually-hidden">Дата</dt><dd>{e.period}</dd></div>}
        {e.material && <div><dt>{e.cast ? `${ui.cast} · ${ui.castMaterial}` : ui.material}</dt><dd>{e.material}</dd></div>}
        {e.size && <div><dt>{ui.size}</dt><dd>{e.size}</dd></div>}
      </dl>
      {e.hall && (
        <div className="buttons">
          <RouteHereButton hallId={e.hall} variant="text" icon="map">{ui.onMap}</RouteHereButton>
        </div>
      )}

      {hall && (
        <div className="zachet__staff">
          <span className="zachet__label">{ui.showStaff}</span>
          <p lang="ru" dir="ltr">{staffPhrase(hall.staff, e.name)}</p>
        </div>
      )}

      <div className="zachet__block">
        <span className="zachet__label">{ui.why}</span>
        <p dir={dir}>{stop.reason}</p>
      </div>
      <p className="zachet__story" dir={dir}>{stop.story}</p>
      <div className="zachet__block zachet__block--for-you">
        <span className="zachet__label">{ui.forYou}</span>
        <p dir={dir}>{stop.forYou}</p>
      </div>

      <h3 className="zachet__step">{ui.step1}</h3>
      <DetailTask stop={stop} dir={dir} />

      {stopState.answer && (
        <>
          <h3 className="zachet__step">{ui.step2}</h3>
          <VoiceHome stop={stop} dir={dir} />
        </>
      )}

      {stopState.stamped && (
        <>
          <h3 className="zachet__step">{ui.step3}</h3>
          <Stamp text={ui.stamp} />
          <div className="zachet__word">
            <span className="zachet__label">{ui.word}</span>
            <p><b lang="ru">{stop.word.ru}</b> <span>{stop.word.transcription}</span></p>
            <p dir={dir}>{stop.word.translation}</p>
          </div>
          {stop.sameHall.length > 0 && (
            <div className="zachet__block">
              <span className="zachet__label">{ui.sameHall}</span>
              <ul className="zachet__same">
                {stop.sameHall.map((id) => {
                  const other = getExhibit(id);
                  if (!other) return null;
                  return (
                    <li key={id}>
                      <span lang="ru">{exhibitName(other, uiLang)}{other.author ? ` · ${other.author}` : ''}</span>
                      <ReturnHereButton id={id} />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="buttons">
            {isLast ? (
              <Button variant="filled" icon="flag" onClick={() => go('book')}>{ui.toBook}</Button>
            ) : (
              <Button variant="filled" icon="next" onClick={() => openStop(index + 1)}>{ui.next}</Button>
            )}
          </div>
        </>
      )}

      {!stopState.stamped && (
        <Button variant="text" onClick={() => go('book')}>{ui.toBook}</Button>
      )}
    </section>
  );
}
