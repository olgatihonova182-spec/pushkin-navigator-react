import { getHall } from '@/entities/hall/@x/route';

/* Floors of a building the route passes through, in order of passing. */
export function routeFloors(route, building) {
  if (!route) return [];
  const floors = [];
  route.nodes.forEach((id) => {
    const h = getHall(id);
    if (h.building === building && !floors.includes(h.floor)) floors.push(h.floor);
  });
  return floors;
}

/* Buildings the route passes through. */
export function routeBuildings(route) {
  if (!route) return [];
  const buildings = [];
  route.nodes.forEach((id) => {
    const b = getHall(id).building;
    if (!buildings.includes(b)) buildings.push(b);
  });
  return buildings;
}

export function toMinutes(seconds) {
  return Math.max(1, Math.round(seconds / 60));
}
