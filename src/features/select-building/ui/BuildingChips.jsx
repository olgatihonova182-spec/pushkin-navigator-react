import { Chip, ChipGroup } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { CAMPUS_VIEW } from '@/shared/config';
import { buildingsWithPlan } from '@/entities/building';
import { selectBuilding } from '../model/selectBuilding';

export function BuildingChips() {
  const current = useUiStore((s) => s.building);
  return (
    <ChipGroup label="Здание">
      <Chip selected={current === CAMPUS_VIEW} onClick={() => selectBuilding(CAMPUS_VIEW)}>
        Городок
      </Chip>
      {buildingsWithPlan().map((b) => (
        <Chip key={b.id} selected={current === b.id} onClick={() => selectBuilding(b.id)}>
          {b.shortName}
        </Chip>
      ))}
    </ChipGroup>
  );
}
