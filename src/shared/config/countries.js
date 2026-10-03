/* Countries a student can pick before the quests. `lang` — the native language the quest is
   translated into; `native` — the country's name in that language. A country has its own quest
   only if the museum's exhibits really connect to it (entities/quest/model/countryQuests.js).
   Anyone else picks OTHER_COUNTRY and chooses a language for the general quests. */
export const COUNTRIES = [
  { id: 'egypt', name: 'Египет', native: 'مصر', lang: 'ar' },
  { id: 'china', name: 'Китай', native: '中国', lang: 'zh' },
  { id: 'spain', name: 'Испания', native: 'España', lang: 'es' },
  { id: 'latin-america', name: 'Латинская Америка', native: 'América Latina', lang: 'es' },
  { id: 'france', name: 'Франция', native: 'France', lang: 'fr' },
  { id: 'belgium', name: 'Бельгия', native: 'Belgique', lang: 'fr' },
  { id: 'uk', name: 'Великобритания', native: 'United Kingdom', lang: 'en' },
];

export const OTHER_COUNTRY = 'other';

export function getCountry(id) {
  return COUNTRIES.find((c) => c.id === id);
}
