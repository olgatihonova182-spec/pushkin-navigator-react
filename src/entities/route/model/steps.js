/* Steps for people: consecutive halls of one floor become one step "through …". */
import { getHall, hallLabel } from '@/entities/hall/@x/route';
import { getBuilding } from '@/entities/building/@x/route';
import { edgeBetween } from './graph';

const isStairsOrLift = (type) => type === 'stairs' || type === 'lift';

/* "через Египет, фойе, лестницу": service places — lower case and in the accusative. */
const SERVICE_PLACE_ACCUSATIVE = { stairs: 'лестницу', lift: 'лифт', foyer: 'фойе', entrance: 'вестибюль' };
function throughName(id) {
  const h = getHall(id);
  return SERVICE_PLACE_ACCUSATIVE[h.type] || h.shortName;
}

/* step: { type: 'hall' | 'street' | 'stairs' | 'lift', text, building, floor, node, through? } */
export function routeSteps(nodes) {
  const steps = [];
  for (let i = 1; i < nodes.length; i++) {
    const a = getHall(nodes[i - 1]);
    const b = getHall(nodes[i]);
    const edge = edgeBetween(a.id, b.id);
    if (edge.kind === 'street') {
      const minutes = Math.round(edge.seconds / 60);
      const building = getBuilding(b.building);
      steps.push({
        type: 'street',
        text: `Выйдите на улицу и пройдите к зданию «${building.shortName}», ${building.address} — около ${minutes} мин`,
        building: b.building, floor: b.floor, node: b.id,
      });
    } else if (edge.kind === 'stairs' || edge.kind === 'lift') {
      const direction = b.floor > a.floor ? ' поднимитесь на ' : ' спуститесь на ';
      steps.push({
        type: edge.kind,
        text: `${edge.kind === 'lift' ? 'На лифте' : 'По лестнице'}${direction}${b.floor} этаж`,
        building: b.building, floor: b.floor, node: b.id,
      });
    } else if (isStairsOrLift(b.type) && nodes[i + 1] && getHall(nodes[i + 1]).floor !== b.floor) {
      // Walking up to the stairs before changing floors is not a step of its own: it is part of the next one.
    } else {
      const last = steps[steps.length - 1];
      if (last && last.type === 'hall' && last.floor === b.floor && last.building === b.building && i < nodes.length - 1) {
        last.through.push(last.node);
        last.node = b.id;
      } else {
        steps.push({ type: 'hall', building: b.building, floor: b.floor, node: b.id, through: [] });
      }
    }
  }
  // Stairs or lift passed on the same floor go into "through" of the next step, not a step of their own.
  for (let k = steps.length - 2; k >= 0; k--) {
    const s0 = steps[k];
    const s1 = steps[k + 1];
    const type = getHall(s0.node).type;
    if (s0.type === 'hall' && !s0.text && isStairsOrLift(type) && s1.type === 'hall' && s1.floor === s0.floor && s1.building === s0.building) {
      s1.through = s0.through.concat([s0.node], s1.through);
      steps.splice(k, 1);
    }
  }
  steps.forEach((s, k) => {
    if (s.type !== 'hall' || s.text) return;
    const target = getHall(s.node);
    const next = steps[k + 1];
    const where =
      target.type === 'entrance' && next && next.type === 'street' ? 'Пройдите к выходу'
        : target.type === 'entrance' ? 'Пройдите в вестибюль'
          : `Пройдите в «${hallLabel(target)}»`;
    s.text = where + (s.through.length ? ` через ${s.through.map(throughName).join(', ')}` : '');
  });
  return steps;
}
