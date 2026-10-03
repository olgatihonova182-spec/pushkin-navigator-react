import { getHall } from '@/entities/hall';
import { getArtwork } from '@/entities/artwork';
import { useVisitorStore } from '@/entities/visitor';

/* Saved data may refer to halls or works that are no longer in the reference data. */
export function initVisitor() {
  useVisitorStore.getState().sanitize({
    isHall: (id) => !!getHall(id),
    isArtwork: (id) => !!getArtwork(id),
  });
}
