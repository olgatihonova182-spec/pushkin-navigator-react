import { getBuilding } from '@/entities/building/@x/hall';
import { HALLS, VOIDS } from '../model/halls';

const BY_ID = Object.fromEntries(HALLS.map((h) => [h.id, h]));

/* Node types that hold art and have crowd levels. */
const EXHIBIT_TYPES = ['hall', 'courtyard', 'exhibition'];

export function getHall(id) {
  return BY_ID[id];
}

export function hallsOnFloor(building, floor) {
  return HALLS.filter((h) => h.building === building && h.floor === floor);
}

export function voidsOnFloor(building, floor) {
  return VOIDS.filter((v) => v.building === building && v.floor === floor);
}

export function hallCenter(h) {
  return [h.x + h.w / 2, h.y + h.h / 2];
}

/* Label for people: «Зал 14 · Греческий дворик» or just the name. */
export function hallLabel(h) {
  if (h.number && h.name.indexOf(`Зал ${h.number}`) !== 0) return `Зал ${h.number} · ${h.name}`;
  return h.name;
}

/* «Главное, 1 этаж» */
export function hallLocation(h) {
  return `${getBuilding(h.building).shortName}, ${h.floor} этаж`;
}

/* Stairs and lifts are drawn on the plan but cannot be opened. */
export function isSelectable(h) {
  return h.type !== 'stairs' && h.type !== 'lift';
}

export function isExhibitSpace(h) {
  return EXHIBIT_TYPES.includes(h.type);
}
