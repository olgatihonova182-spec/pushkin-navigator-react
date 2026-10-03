import { Icon, ListRow } from '@/shared/ui';
import { getHall, hallLocation } from '@/entities/hall/@x/artwork';
import { authorInitial } from '../lib/artwork';

/* Artwork in a list. Saved/seen marks come from the caller. */
export function ArtworkRow({ artwork, saved = false, seen = false, onClick }) {
  return (
    <ListRow
      badge={authorInitial(artwork.author)}
      title={artwork.name}
      subtitle={`${artwork.author} · ${hallLocation(getHall(artwork.hall))}`}
      marks={
        <>
          {saved && <Icon name="star" filled className="ms-star" />}
          {seen && <Icon name="seen" filled className="ms-seen" />}
        </>
      }
      onClick={onClick}
    />
  );
}
