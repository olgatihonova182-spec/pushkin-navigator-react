import { ButtonRow, Illustration } from '@/shared/ui';
import { getBuilding } from '@/entities/building';
import { OpenPlanButton } from '@/features/select-building';
import { RouteHereButton } from '@/features/build-route';
import { SheetHeader } from './SheetHeader';

export function BuildingSheet({ id }) {
  const building = getBuilding(id);
  return (
    <>
      <SheetHeader title={building.name} subtitle={building.address} />
      {id === 'main' && (
        <div className="sheet__picture">
          <Illustration name="facade" />
        </div>
      )}
      <p className="sheet__about">{building.about}</p>
      {building.floors ? (
        <ButtonRow>
          <OpenPlanButton buildingId={id} />
          <RouteHereButton hallId={building.entrance} variant="outlined" icon={null}>
            Маршрут ко входу
          </RouteHereButton>
        </ButtonRow>
      ) : (
        <p className="supporting-text">Плана залов этого здания в приложении пока нет.</p>
      )}
    </>
  );
}
