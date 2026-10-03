import { useUiStore } from '@/shared/model';
import { TAB } from '@/shared/config';
import { getHall } from '@/entities/hall';

/* Open the bottom sheet of a hall. On the map tab the plan also moves to the hall's floor. */
export function openHall(id) {
  const hall = getHall(id);
  const patch = { sheet: { kind: 'hall', id } };
  if (useUiStore.getState().tab === TAB.map) {
    patch.building = hall.building;
    patch.floor = hall.floor;
  }
  useUiStore.setState(patch);
}

export function openArtwork(id) {
  useUiStore.getState().openSheet('artwork', id);
}

export function openBuilding(id) {
  useUiStore.getState().openSheet('building', id);
}
