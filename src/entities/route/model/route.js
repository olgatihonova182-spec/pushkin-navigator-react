/* Route as data. Pure functions: a new route object is returned, the old one is not changed.
   route: { targets, tourId, step, fromEntrance, from, nodes, seconds, segments, steps } */
import { getHall } from '@/entities/hall/@x/route';
import { getBuilding } from '@/entities/building/@x/route';
import { pathThrough } from './pathfinding';
import { routeSteps } from './steps';

export function entranceOf(hallId) {
  return getBuilding(getHall(hallId).building).entrance;
}

/* From the visitor's own mark or, if there is none, from the entrance of the first target's building. */
export function createRoute({ targets, tourId = null, me, settings }) {
  const route = { targets, tourId, step: 0, fromEntrance: !me, from: me || entranceOf(targets[0]) };
  return recalculateRoute(route, me, settings);
}

/* After "me" or settings change. For a tour — from the current point through the remaining stops. */
export function recalculateRoute(route, me, settings) {
  if (!route) return route;
  const r = { ...route };
  if (me) {
    r.from = me;
    r.fromEntrance = false;
  }
  const rest = r.targets.slice(r.step);
  const path = rest.length ? pathThrough(r.from, rest, settings) : { nodes: [r.from], seconds: 0, segments: [] };
  if (!path) {
    const start = getHall(r.from);
    return {
      ...r, nodes: [r.from], seconds: 0, segments: [],
      steps: [{ type: 'hall', text: 'Без лестниц сюда не пройти', building: start.building, floor: start.floor }],
    };
  }
  // Steps only up to the nearest stop: further guidance starts when the visitor taps "I'm here".
  return {
    ...r,
    nodes: path.nodes,
    seconds: path.seconds,
    segments: path.segments,
    steps: path.segments.length ? routeSteps(path.segments[0].nodes) : [],
  };
}
