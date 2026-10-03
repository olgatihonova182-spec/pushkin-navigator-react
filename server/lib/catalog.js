/* The museum catalogue for the route: only the Main Building (building 116) with a hall code
   from the hall table — 30 exhibits in data/pushkin-collection.json. Pure parsing, no I/O:
   the file is read in server/index.js. */
import { ZACHET_HALLS } from '../../src/entities/zachet/model/halls.js';

const ENTITIES = { nbsp: ' ', ndash: '–', mdash: '—', laquo: '«', raquo: '»', quot: '"', amp: '&', hellip: '…', rsquo: '’', lsquo: '‘', shy: '' };

export function cleanText(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#\d+|[a-z]+);/gi, (m, name) => (name[0] === '#' ? String.fromCharCode(Number(name.slice(1))) : ENTITIES[name.toLowerCase()] ?? m))
    .replace(/\s+/g, ' ')
    .trim();
}

const ru = (v) => cleanText(v && typeof v === 'object' ? v.ru : v);
const en = (v) => cleanText(v && typeof v === 'object' ? v.en : '');

function authors(r) {
  return r.authors && typeof r.authors === 'object'
    ? Object.values(r.authors).map((a) => cleanText(a.ru)).filter(Boolean).join('; ')
    : '';
}

export function parseCatalog(raw) {
  return Object.entries(raw)
    .filter(([, r]) => String(r.building) === '116' && r.hall && ZACHET_HALLS[r.hall])
    .map(([id, r]) => ({
      id,
      hall: String(r.hall),
      zone: ZACHET_HALLS[r.hall].zone,
      name: ru(r.name),
      nameEn: en(r.name),
      author: authors(r),
      period: ru(r.period && r.period.text) || String(r.year || ''),
      year: Number(r.year) || 0,
      country: ru(r.country),
      type: ru(r.type),
      material: ru(r.material),
      size: ru(r.size),
      cast: String(r.cast) === '1',
      text: ru(r.text),
      annotation: ru(r.annotation),
    }))
    .sort((a, b) => a.zone - b.zone || Number(a.id) - Number(b.id));
}

export function description(e) {
  return [e.text, e.annotation].filter(Boolean).join(' ');
}

/* One line per exhibit for the plan request: id, zone, name, author, date, country, type,
   material, the beginning of the description. */
export function catalogLine(e) {
  const start = description(e).slice(0, 180);
  return [e.id, `зона ${e.zone}`, e.name, e.author || '—', e.period, e.country, e.type, e.material || '—', start].join(' | ');
}

/* «In the same hall»: exhibits of the same hall not on the route. */
export function sameHall(catalog, id, routeIds) {
  const e = catalog.find((x) => x.id === id);
  if (!e) return [];
  return catalog.filter((x) => x.hall === e.hall && !routeIds.includes(x.id)).map((x) => x.id);
}
