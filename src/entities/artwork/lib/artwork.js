import { ARTWORKS } from '../model/artworks';

const BY_ID = Object.fromEntries(ARTWORKS.map((a) => [a.id, a]));

export function getArtwork(id) {
  return BY_ID[id];
}

export function artworksInHall(hallId) {
  return ARTWORKS.filter((a) => a.hall === hallId);
}

/* Shown on an empty search: the best known works. */
export function featuredArtworks() {
  return ARTWORKS.filter((a) => a.featured);
}

/* Badge letter: first letter of the author's last word. */
export function authorInitial(author) {
  const words = author.trim().split(' ');
  return (words[words.length - 1] || '?').charAt(0).toUpperCase();
}
