import { ButtonRow, Icon, ListRow } from '@/shared/ui';
import { getArtwork } from '@/entities/artwork';
import { getHall, hallLabel, hallLocation } from '@/entities/hall';
import { openHall } from '@/features/open-place';
import { RouteHereButton } from '@/features/build-route';
import { SaveArtworkButton } from '@/features/toggle-saved';
import { SeenArtworkButton } from '@/features/toggle-seen';
import { SheetHeader } from './SheetHeader';

export function ArtworkSheet({ id }) {
  const artwork = getArtwork(id);
  const hall = getHall(artwork.hall);
  return (
    <>
      <SheetHeader title={artwork.name} subtitle={`${artwork.author} · ${artwork.year}`} />
      <ListRow
        badge={hall.number ? hall.number : <Icon name="place" />}
        badgeVariant="hall"
        overline="Где"
        title={hallLabel(hall)}
        subtitle={hallLocation(hall)}
        onClick={() => openHall(hall.id)}
      />
      <ButtonRow>
        <RouteHereButton hallId={hall.id} />
        <SaveArtworkButton artworkId={id} />
        <SeenArtworkButton artworkId={id} />
      </ButtonRow>
    </>
  );
}
