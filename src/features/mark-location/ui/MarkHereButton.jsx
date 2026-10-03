import { Button, Icon } from '@/shared/ui';
import { useVisitorStore } from '@/entities/visitor';
import { markHere, resetLocation } from '../model/markLocation';
import './MarkHereButton.css';

/* In the hall sheet: "I'm here" button, or a badge if the visitor is already marked here. */
export function MarkHereButton({ hallId }) {
  const me = useVisitorStore((s) => s.me);
  if (me === hallId) {
    return (
      <span className="me-badge">
        <Icon name="me" />
        Вы здесь
      </span>
    );
  }
  return (
    <Button variant="outlined" icon="me" onClick={() => markHere(hallId)}>
      Я здесь
    </Button>
  );
}

export function ResetLocationButton() {
  return (
    <Button variant="text" onClick={resetLocation}>
      Сбросить
    </Button>
  );
}
