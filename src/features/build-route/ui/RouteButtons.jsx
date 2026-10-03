import { Button } from '@/shared/ui';
import { routeTo, startTour, routeFromSaved } from '../model/startRoute';

export function RouteHereButton({ hallId, variant = 'filled', icon = 'routes', children = 'Маршрут сюда' }) {
  return (
    <Button variant={variant} icon={icon} onClick={() => routeTo(hallId)}>
      {children}
    </Button>
  );
}

export function StartTourButton({ tourId }) {
  return (
    <Button variant="filled" icon="next" onClick={() => startTour(tourId)}>
      Начать
    </Button>
  );
}

export function BuildSavedRouteButton() {
  return (
    <Button variant="filled" icon="routes" onClick={routeFromSaved}>
      Собрать маршрут
    </Button>
  );
}
