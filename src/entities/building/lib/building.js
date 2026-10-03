import { BUILDINGS, WALKING_MINUTES } from '../model/buildings';

const BY_ID = Object.fromEntries(BUILDINGS.map((b) => [b.id, b]));

export function getBuilding(id) {
  return BY_ID[id];
}

export function buildingsWithPlan() {
  return BUILDINGS.filter((b) => b.floors);
}

export function walkingMinutes(a, b) {
  const pair = WALKING_MINUTES.find(([x, y]) => (x === a && y === b) || (x === b && y === a));
  return pair ? pair[2] : null;
}
