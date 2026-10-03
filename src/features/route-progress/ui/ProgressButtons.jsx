import { Button } from '@/shared/ui';
import { goToNextStop, arrive, finishRoute } from '../model/progress';

export function NextStopButton({ isLast }) {
  return (
    <Button variant="filled" onClick={goToNextStop}>
      {isLast ? 'Я на месте' : 'Я на месте, дальше'}
    </Button>
  );
}

export function ArriveButton() {
  return (
    <Button variant="filled" onClick={arrive}>
      Я на месте
    </Button>
  );
}

export function FinishRouteButton() {
  return (
    <Button variant="outlined" onClick={finishRoute}>
      Завершить маршрут
    </Button>
  );
}
