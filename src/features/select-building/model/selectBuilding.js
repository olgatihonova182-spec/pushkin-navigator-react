import { useUiStore } from '@/shared/model';
import { TAB, CAMPUS_VIEW } from '@/shared/config';
import { getBuilding } from '@/entities/building';
import { getHall } from '@/entities/hall';
import { useVisitorStore } from '@/entities/visitor';
import { useRouteStore, routeFloors } from '@/entities/route';

/* Which floor to show first: where the visitor is, else where the route goes, else the lowest. */
function firstFloor(buildingId) {
  const { me } = useVisitorStore.getState();
  if (me && getHall(me).building === buildingId) return getHall(me).floor;
  const floors = routeFloors(useRouteStore.getState().route, buildingId);
  return floors.length ? floors[0] : getBuilding(buildingId).floors[0];
}

export function selectBuilding(id) {
  const patch = { building: id, sheet: null, tab: TAB.map };
  if (id !== CAMPUS_VIEW) patch.floor = firstFloor(id);
  useUiStore.setState(patch);
}
