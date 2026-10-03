import { Button } from '@/shared/ui';
import { selectBuilding } from '../model/selectBuilding';

export function OpenPlanButton({ buildingId }) {
  return (
    <Button variant="filled" icon="map" onClick={() => selectBuilding(buildingId)}>
      Открыть план
    </Button>
  );
}
