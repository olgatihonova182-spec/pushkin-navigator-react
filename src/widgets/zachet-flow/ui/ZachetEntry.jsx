import { Button, Card } from '@/shared/ui';
import { useZachetStore } from '@/entities/zachet';
import { useUi } from './common';

/* Entry to the «Zachet» on the Quests tab, above the other quests. */
export function ZachetEntry() {
  const { ui } = useUi();
  const hasRoute = useZachetStore((s) => Boolean(s.route));
  const openFlow = useZachetStore((s) => s.openFlow);
  return (
    <div className="zachet-entry">
      <Card className="card--own">
        <span className="card__tag">ИИ · YandexGPT</span>
        <h2 className="card__title">{ui.title}</h2>
        <p className="card__text">{ui.entryText}</p>
        <Button variant="filled" icon="next" onClick={openFlow}>{hasRoute ? ui.entryContinue : ui.entryOpen}</Button>
      </Card>
    </div>
  );
}
