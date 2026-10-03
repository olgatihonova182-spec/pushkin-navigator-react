import { Segmented, SegmentedItem } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { getBuilding } from '@/entities/building';
import { useRouteStore, routeFloors } from '@/entities/route';

/* Floor segments; a dot marks floors the route passes through. */
export function FloorSwitcher() {
  const building = useUiStore((s) => s.building);
  const floor = useUiStore((s) => s.floor);
  const setFloor = useUiStore((s) => s.setFloor);
  const route = useRouteStore((s) => s.route);
  const onRoute = routeFloors(route, building);
  return (
    <Segmented label="Этаж">
      {getBuilding(building).floors.map((f) => (
        <SegmentedItem key={f} selected={floor === f} onClick={() => setFloor(f)}>
          {f} этаж
          {onRoute.includes(f) && <span className="segmented__dot" role="img" aria-label="здесь проходит маршрут" />}
        </SegmentedItem>
      ))}
    </Segmented>
  );
}
