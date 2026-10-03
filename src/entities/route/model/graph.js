/* Movement graph: halls are nodes; doors, stairs, lifts and the street are edges.
   Built once on module load. */
import { HALLS, PASSAGES, FLOOR_LINKS, getHall, hallCenter } from '@/entities/hall/@x/route';
import { BUILDINGS, walkingMinutes } from '@/entities/building/@x/route';

const METERS_PER_UNIT = 0.4; // a building is ~130 m in 320 plan units
const WALK_METERS_PER_SECOND = 0.7; // museum pace, slower than in the street

/* id → [{ to, seconds, kind }], kind: door | stairs | lift | street */
export const NEIGHBORS = {};

function secondsBetween(a, b) {
  const [ax, ay] = hallCenter(a);
  const [bx, by] = hallCenter(b);
  const distance = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
  return Math.round((distance * METERS_PER_UNIT) / WALK_METERS_PER_SECOND);
}

function link(a, b, seconds, kind) {
  NEIGHBORS[a].push({ to: b, seconds, kind });
  NEIGHBORS[b].push({ to: a, seconds, kind });
}

function buildGraph() {
  HALLS.forEach((h) => {
    NEIGHBORS[h.id] = [];
  });
  PASSAGES.forEach(([a, b]) => {
    if (!getHall(a) || !getHall(b)) throw new Error(`passage to a missing hall: ${a} — ${b}`);
    link(a, b, secondsBetween(getHall(a), getHall(b)), 'door');
  });
  FLOOR_LINKS.forEach((l) => link(l.from, l.to, l.seconds, l.kind));
  // Street: entrances of buildings with a plan are connected to each other.
  const withPlan = BUILDINGS.filter((b) => b.entrance);
  withPlan.forEach((a, i) => {
    withPlan.slice(i + 1).forEach((b) => {
      const minutes = walkingMinutes(a.id, b.id);
      if (minutes) link(a.entrance, b.entrance, minutes * 60, 'street');
    });
  });
}

buildGraph();

export function edgeBetween(a, b) {
  return NEIGHBORS[a].find((e) => e.to === b);
}
