import { useUiStore } from '@/shared/model';
import { getHall } from '@/entities/hall';
import { useVisitorStore } from '@/entities/visitor';
import { useRouteStore } from '@/entities/route';

/* "I'm here": the route, if any, now starts from this hall. */
export function markHere(hallId) {
  const visitor = useVisitorStore.getState();
  visitor.setMe(hallId);
  useRouteStore.getState().recalculate({ me: hallId, noStairs: visitor.noStairs });
  const ui = useUiStore.getState();
  ui.closeSheet();
  ui.announce(`Отмечено: вы в «${getHall(hallId).shortName}»`);
}

export function resetLocation() {
  useVisitorStore.getState().setMe(null);
}
