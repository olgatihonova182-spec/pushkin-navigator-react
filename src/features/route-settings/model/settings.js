import { useVisitorStore } from '@/entities/visitor';
import { useRouteStore } from '@/entities/route';

function recalculate() {
  const { me, noStairs } = useVisitorStore.getState();
  useRouteStore.getState().recalculate({ me, noStairs });
}

export function toggleNoStairs() {
  const visitor = useVisitorStore.getState();
  visitor.setNoStairs(!visitor.noStairs);
  recalculate();
}

export function toggleAvoidCrowd() {
  const route = useRouteStore.getState();
  route.setAvoidCrowd(!route.avoidCrowd);
  recalculate();
}
