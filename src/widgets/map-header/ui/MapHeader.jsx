import { Icon, PageHeader } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { TAB, CAMPUS_VIEW } from '@/shared/config';
import { getBuilding } from '@/entities/building';
import { BuildingChips } from '@/features/select-building';
import { FloorSwitcher } from '@/features/select-floor';
import { CrowdLayerSwitch, CrowdLegend } from '@/features/toggle-crowd-layer';

export function MapHeader() {
  const building = useUiStore((s) => s.building);
  const crowdLayer = useUiStore((s) => s.crowdLayer);
  const setTab = useUiStore((s) => s.setTab);
  const isCampus = building === CAMPUS_VIEW;
  return (
    <PageHeader title={isCampus ? 'Музейный городок' : getBuilding(building).planTitle} className="page-header--map">
      <button type="button" className="search-bar state-layer" onClick={() => setTab(TAB.search)}>
        <Icon name="search" />
        <span>Зал, картина или автор</span>
      </button>
      <BuildingChips />
      <div className="page-header__row page-header__row--bottom">
        {!isCampus && <FloorSwitcher />}
        <CrowdLayerSwitch />
      </div>
      {crowdLayer && <CrowdLegend />}
    </PageHeader>
  );
}
