import { EXHIBITS } from '../model/exhibits';

const BY_ID = Object.fromEntries(EXHIBITS.map((e) => [e.id, e]));

export function getExhibit(id) {
  return BY_ID[id];
}

/* «Анри Матисс · 1912» — what the museum label says under the title. */
export function exhibitCaption(e) {
  const year = e.period || (e.year > 0 ? String(e.year) : e.year < 0 ? `${-e.year} до н. э.` : '');
  return [e.author, year].filter(Boolean).join(' · ');
}

/* Photos are paths on the museum website (field `gallery` of the export). Check on site that
   the base address still serves them. */
export const PHOTO_BASE = 'https://arts-museum.ru';

export function photoUrl(e) {
  return e && e.photo ? PHOTO_BASE + e.photo : null;
}
