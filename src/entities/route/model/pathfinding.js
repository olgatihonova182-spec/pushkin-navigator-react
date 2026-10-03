/* Path search. Pure calculations: ids and settings in, data out. */
import { HALLS } from '@/entities/hall/@x/route';
import { getCrowdLevel } from '@/entities/crowd/@x/route';
import { NEIGHBORS, edgeBetween } from './graph';

/* Shortest path (Dijkstra). Settings:
   noStairs — stairs are unavailable, lift only;
   avoidCrowd — crowded halls cost more, the path tries to go around them. */
export function findPath(from, to, settings = {}) {
  if (from === to) return { nodes: [from], seconds: 0 };
  const dist = {};
  const prev = {};
  const done = {};
  HALLS.forEach((h) => {
    dist[h.id] = Infinity;
  });
  dist[from] = 0;
  for (;;) {
    let u = null;
    let best = Infinity;
    for (const id in dist) {
      if (!done[id] && dist[id] < best) {
        best = dist[id];
        u = id;
      }
    }
    if (u === null || u === to) break;
    done[u] = true;
    NEIGHBORS[u].forEach((e) => {
      if (settings.noStairs && e.kind === 'stairs') return;
      let cost = e.seconds;
      if (settings.avoidCrowd && e.to !== to) cost += getCrowdLevel(e.to) * 60;
      if (dist[u] + cost < dist[e.to]) {
        dist[e.to] = dist[u] + cost;
        prev[e.to] = u;
      }
    });
  }
  if (dist[to] === Infinity) return null;
  const nodes = [to];
  while (nodes[0] !== from) nodes.unshift(prev[nodes[0]]);
  return { nodes, seconds: pathSeconds(nodes) };
}

/* Time along real edges, without the crowd penalty. */
export function pathSeconds(nodes) {
  let seconds = 0;
  for (let i = 1; i < nodes.length; i++) {
    const e = edgeBetween(nodes[i - 1], nodes[i]);
    seconds += e ? e.seconds : 0;
  }
  return seconds;
}

/* Path through several stops in order: whole, and in segments up to each stop. */
export function pathThrough(from, stops, settings) {
  let nodes = [from];
  let seconds = 0;
  let current = from;
  const segments = [];
  for (const stop of stops) {
    const part = findPath(current, stop, settings);
    if (!part) return null;
    segments.push({ nodes: part.nodes, seconds: part.seconds, target: stop });
    nodes = nodes.concat(part.nodes.slice(1));
    seconds += part.seconds;
    current = stop;
  }
  return { nodes, seconds, segments };
}

/* Visiting order for saved halls: each time the nearest of the remaining. */
export function nearestFirstOrder(from, targets, settings) {
  const left = targets.filter((t, i) => targets.indexOf(t) === i && t !== from);
  const order = [];
  let current = from;
  while (left.length) {
    let bestTarget = null;
    let best = Infinity;
    left.forEach((t) => {
      const p = findPath(current, t, settings);
      if (p && p.seconds < best) {
        best = p.seconds;
        bestTarget = t;
      }
    });
    if (bestTarget === null) break;
    order.push(bestTarget);
    left.splice(left.indexOf(bestTarget), 1);
    current = bestTarget;
  }
  return order;
}
