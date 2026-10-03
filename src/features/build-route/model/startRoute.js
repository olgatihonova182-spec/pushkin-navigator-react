import { useUiStore } from '@/shared/model';
import { TAB } from '@/shared/config';
import { getHall } from '@/entities/hall';
import { getArtwork } from '@/entities/artwork';
import { getTour } from '@/entities/tour';
import { useVisitorStore } from '@/entities/visitor';
import { useRouteStore, createRoute, entranceOf, nearestFirstOrder, toMinutes } from '@/entities/route';

function settings() {
  return { noStairs: useVisitorStore.getState().noStairs, avoidCrowd: useRouteStore.getState().avoidCrowd };
}

/* Build a route and show it on the map, starting where the visitor is (or at the entrance). */
function startRoute(targets, tourId = null) {
  if (!targets.length) return;
  const { me } = useVisitorStore.getState();
  const route = createRoute({ targets, tourId, me, settings: settings() });
  useRouteStore.getState().setRoute(route);
  const start = getHall(route.from);
  useUiStore.setState({ sheet: null, tab: TAB.map, building: start.building, floor: start.floor });
  const ui = useUiStore.getState();
  ui.requestScrollToMap();
  ui.announce(`Маршрут построен, около ${toMinutes(route.seconds)} мин пешком. ${route.steps[0] ? route.steps[0].text : ''}`);
}

export function routeTo(hallId) {
  startRoute([hallId]);
}

export function startTour(tourId) {
  startRoute(getTour(tourId).stops.slice(), tourId);
}

/* Route through everything saved, nearest first. */
export function routeFromSaved() {
  const { me, saved } = useVisitorStore.getState();
  const halls = saved.map((id) => getArtwork(id).hall);
  if (!halls.length) return;
  const from = me || entranceOf(halls[0]);
  startRoute(nearestFirstOrder(from, halls, settings()));
}
