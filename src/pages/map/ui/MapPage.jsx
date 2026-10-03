import { useUiStore } from '@/shared/model';
import { CAMPUS_VIEW } from '@/shared/config';
import { useRouteStore } from '@/entities/route';
import { MapHeader } from '@/widgets/map-header';
import { CampusMap } from '@/widgets/campus-map';
import { FloorPlan } from '@/widgets/floor-plan';
import { RoutePanel } from '@/widgets/route-panel';
import { LocationPanel } from '@/widgets/location-panel';
import './MapPage.css';

/* "Map": campus or floor plan, "you are here", crowd layer, route and its panel. */
export function MapPage() {
  const building = useUiStore((s) => s.building);
  const hasRoute = useRouteStore((s) => !!s.route);
  return (
    <>
      <MapHeader />
      <div className="map-field">{building === CAMPUS_VIEW ? <CampusMap /> : <FloorPlan />}</div>
      {hasRoute ? <RoutePanel /> : <LocationPanel />}
    </>
  );
}
