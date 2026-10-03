import { GENERAL_QUESTS } from './quests';
import { COUNTRY_QUESTS } from './countryQuests';

/* All quests: general ones (every language) first, then one per native language. */
export const QUESTS = [...GENERAL_QUESTS, ...COUNTRY_QUESTS];

/* Quests a student sees: general ones plus the one for their country. */
export function questsFor(country) {
  return QUESTS.filter((q) => !q.country || q.country === country);
}
