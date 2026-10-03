import { ButtonRow, List, Subheading } from '@/shared/ui';
import { getHall, hallLabel, hallLocation, isExhibitSpace } from '@/entities/hall';
import { artworksInHall, ArtworkRow } from '@/entities/artwork';
import { CrowdBadge, getCrowdLevel } from '@/entities/crowd';
import { useVisitorStore } from '@/entities/visitor';
import { openArtwork } from '@/features/open-place';
import { RouteHereButton } from '@/features/build-route';
import { MarkHereButton } from '@/features/mark-location';
import { SheetHeader } from './SheetHeader';

export function HallSheet({ id }) {
  const hall = getHall(id);
  const works = artworksInHall(id);
  const saved = useVisitorStore((s) => s.saved);
  const seen = useVisitorStore((s) => s.seen);
  return (
    <>
      <SheetHeader
        title={hallLabel(hall)}
        subtitle={hallLocation(hall) + (hall.type === 'exhibition' ? ' · программа — в афише музея' : '')}
      />
      {isExhibitSpace(hall) && (
        <div className="sheet__row">
          <CrowdBadge level={getCrowdLevel(id)} suffix=" сейчас" />
        </div>
      )}
      {works.length > 0 && (
        <>
          <Subheading as="h3">В этом зале</Subheading>
          <List>
            {works.map((a) => (
              <ArtworkRow
                key={a.id}
                artwork={a}
                saved={saved.includes(a.id)}
                seen={seen.includes(a.id)}
                onClick={() => openArtwork(a.id)}
              />
            ))}
          </List>
        </>
      )}
      <ButtonRow>
        <RouteHereButton hallId={id} />
        <MarkHereButton hallId={id} />
      </ButtonRow>
    </>
  );
}
