/* Search by artwork, author, hall name and number ("14", "зал 18"). Pure calculation. */
import { normalize } from '@/shared/lib';
import { ARTWORKS } from '@/entities/artwork';
import { HALLS, isSelectable } from '@/entities/hall';

export function searchCollection(query) {
  const q = normalize(query);
  if (!q) return { artworks: [], halls: [] };
  const words = q.split(' ');
  const matches = (text) => {
    const t = ` ${normalize(text)} `;
    return words.every((w) => t.indexOf(w) !== -1);
  };
  const number = q.replace(/^зал\s*/, '');
  const artworks = ARTWORKS.filter((a) => matches(`${a.name} ${a.author}`));
  const halls = HALLS.filter((h) => {
    if (!isSelectable(h)) return false;
    if (/^\d+$/.test(number)) {
      const range = h.name.match(/^Залы (\d+)–(\d+)/);
      if (range) return +number >= +range[1] && +number <= +range[2];
      return String(h.number) === number;
    }
    return matches(`${h.name} ${h.shortName}`);
  });
  return { artworks, halls };
}
