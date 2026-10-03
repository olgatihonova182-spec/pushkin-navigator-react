import { useEffect, useMemo } from 'react';
import { EmptyState, List, Subheading } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { featuredArtworks, ArtworkRow } from '@/entities/artwork';
import { HallRow } from '@/entities/hall';
import { useVisitorStore } from '@/entities/visitor';
import { openArtwork, openHall } from '@/features/open-place';
import { searchCollection } from '@/features/search-collection';

const ANNOUNCE_DELAY_MS = 700; // do not interrupt typing

export function SearchResults() {
  const query = useUiStore((s) => s.query);
  const announce = useUiStore((s) => s.announce);
  const saved = useVisitorStore((s) => s.saved);
  const seen = useVisitorStore((s) => s.seen);
  const result = useMemo(() => searchCollection(query), [query]);
  const found = result.artworks.length + result.halls.length;

  // The number found — to the screen reader, with a pause.
  useEffect(() => {
    if (!query.trim()) return undefined;
    const t = setTimeout(() => announce(found ? `Найдено: ${found}` : 'Ничего не найдено'), ANNOUNCE_DELAY_MS);
    return () => clearTimeout(t);
  }, [query, found, announce]);

  const artworkRow = (a) => (
    <ArtworkRow key={a.id} artwork={a} saved={saved.includes(a.id)} seen={seen.includes(a.id)} onClick={() => openArtwork(a.id)} />
  );

  if (!query.trim()) {
    return (
      <>
        <Subheading>Самое известное</Subheading>
        <List>{featuredArtworks().map(artworkRow)}</List>
      </>
    );
  }
  if (!found) {
    return (
      <EmptyState illustration="notFound">
        <p>Ничего не нашли по запросу «{query}». Попробуйте фамилию автора или номер зала.</p>
      </EmptyState>
    );
  }
  return (
    <>
      {result.artworks.length > 0 && (
        <>
          <Subheading>Произведения</Subheading>
          <List>{result.artworks.map(artworkRow)}</List>
        </>
      )}
      {result.halls.length > 0 && (
        <>
          <Subheading>Залы</Subheading>
          <List>
            {result.halls.map((h) => (
              <HallRow key={h.id} hall={h} onClick={() => openHall(h.id)} />
            ))}
          </List>
        </>
      )}
    </>
  );
}
