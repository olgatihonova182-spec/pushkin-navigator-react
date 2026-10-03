import { useUiStore } from '@/shared/model';
import { getHall, hallLabel } from '@/entities/hall';
import { getBuilding } from '@/entities/building';
import { useVisitorStore } from '@/entities/visitor';
import { useRouteStore } from '@/entities/route';

function showOnMap(building, floor, announcement) {
  useUiStore.setState({ building, floor });
  const ui = useUiStore.getState();
  ui.requestScrollToMap();
  ui.announce(announcement);
}

/* "I'm there, next": the visitor is at the current stop; guide to the next one from here. */
export function goToNextStop() {
  const { route } = useRouteStore.getState();
  const here = route.targets[route.step];
  const visitor = useVisitorStore.getState();
  visitor.setMe(here);
  const store = useRouteStore.getState();
  store.setRoute({ ...route, step: route.step + 1 });
  store.recalculate({ me: here, noStairs: visitor.noStairs });
  const { targets, step } = useRouteStore.getState().route;
  const hall = getHall(here);
  showOnMap(
    hall.building,
    hall.floor,
    step < targets.length ? `Остановка ${step + 1} из ${targets.length}: ${hallLabel(getHall(targets[step]))}` : 'Маршрут пройден',
  );
}

/* Single-target route: the visitor arrived. */
export function arrive() {
  const { route, clearRoute } = useRouteStore.getState();
  useVisitorStore.getState().setMe(route.targets[route.targets.length - 1]);
  clearRoute();
}

export function finishRoute() {
  useRouteStore.getState().clearRoute();
}

/* Show the floor of a step on the map. */
export function showStep(index) {
  const step = useRouteStore.getState().route.steps[index];
  showOnMap(step.building, step.floor, `Схема: ${getBuilding(step.building).shortName}, ${step.floor} этаж`);
}
