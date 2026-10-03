import { useEffect, useState } from 'react';
import { Button, Icon } from '@/shared/ui';
import { useZachetStore } from '@/entities/zachet';
import { requestRoute, showDemo } from '@/features/zachet-route';
import { useUi } from './common';

const STEP_MS = 1800;

/* 3. Building the route: four steps while the server and the model work. On an error —
   a plain message, «Try again» and the demo without AI. */
export function BuildingScreen() {
  const { ui } = useUi();
  const error = useZachetStore((s) => s.error);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (error) return undefined;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, ui.buildingSteps.length - 1)), STEP_MS);
    return () => clearInterval(t);
  }, [error, ui.buildingSteps.length]);

  if (error) {
    return (
      <section className="zachet-screen" role="alert">
        <h2 className="t-headline-s">{ui.errorTitle}</h2>
        <p className="supporting-text">{error}</p>
        <div className="buttons">
          <Button variant="filled" icon="replay" onClick={() => { setStep(0); requestRoute(); }}>{ui.retry}</Button>
          <Button variant="outlined" onClick={showDemo}>{ui.showDemo}</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="zachet-screen" aria-busy="true">
      <h2 className="t-headline-s">{ui.buildingTitle}</h2>
      <ol className="zachet__steps">
        {ui.buildingSteps.map((text, i) => (
          <li key={text} className={i < step ? 'is-done' : i === step ? 'is-current' : ''}>
            <span className="zachet__step-icon"><Icon name={i < step ? 'check' : i === step ? 'clock' : 'next'} /></span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
