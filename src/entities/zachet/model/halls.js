/* Halls of the Main Building for the «Zachet» route, by the museum's internal hall code
   (field `hall` in data/pushkin-collection.json). Shared by the browser and the server: no imports.

   zone   — order of the walk (the route goes up the zones, never back). The order is our
            reading of the building and must be checked on site.
   number — the public hall number, only where it is confirmed: hall 1 (Egypt) and hall 15
            (Italian Courtyard). Everywhere else null — numbers are not invented.
   staff  — how to name the hall in the Russian phrase for the attendant: «Подскажите, где …?» */
export const ZACHET_HALLS = {
  186: {
    zone: 1, number: 1, staff: 'зал Древнего Египта',
    name: { ru: 'Искусство Древнего Египта', en: 'Art of Ancient Egypt', zh: '古埃及艺术' },
  },
  191: {
    zone: 2, number: null, staff: 'зал с фаюмскими портретами',
    name: { ru: 'Египет римского времени: фаюмские портреты', en: 'Roman Egypt: Fayum portraits', zh: '罗马时期的埃及：法尤姆肖像' },
  },
  192: {
    zone: 3, number: null, staff: 'зал Византии и итальянского Возрождения',
    name: { ru: 'Византия и Италия XIII–XVI веков', en: 'Byzantium and Italy, 13th–16th centuries', zh: '拜占庭与13—16世纪意大利' },
  },
  198: {
    zone: 4, number: 15, staff: 'Итальянский дворик',
    name: { ru: 'Итальянский дворик', en: 'Italian Courtyard', zh: '意大利庭院' },
  },
  193: {
    zone: 5, number: null, staff: 'зал немецкой живописи',
    name: { ru: 'Германия и Нидерланды XV–XVI веков', en: 'Germany and the Netherlands, 15th–16th centuries', zh: '15—16世纪德国与尼德兰' },
  },
  194: {
    zone: 6, number: null, staff: 'зал фламандской живописи',
    name: { ru: 'Фландрия XVII века', en: 'Flanders, 17th century', zh: '17世纪佛兰德斯' },
  },
  195: {
    zone: 7, number: null, staff: 'зал Рембрандта',
    name: { ru: 'Голландия XVII века: Рембрандт', en: 'Holland, 17th century: Rembrandt', zh: '17世纪荷兰：伦勃朗' },
  },
  196: {
    zone: 8, number: null, staff: 'зал голландской живописи',
    name: { ru: 'Голландия XVII века', en: 'Holland, 17th century', zh: '17世纪荷兰' },
  },
  201: {
    zone: 9, number: null, staff: 'зал итальянской живописи XVIII века',
    name: { ru: 'Италия XVII–XVIII веков', en: 'Italy, 17th–18th centuries', zh: '17—18世纪意大利' },
  },
  202: {
    zone: 10, number: null, staff: 'зал испанской живописи',
    name: { ru: 'Испания и Италия XVII века', en: 'Spain and Italy, 17th century', zh: '17世纪西班牙与意大利' },
  },
  205: {
    zone: 11, number: null, staff: 'зал французской живописи XVII века',
    name: { ru: 'Франция XVII века', en: 'France, 17th century', zh: '17世纪法国' },
  },
  206: {
    zone: 12, number: null, staff: 'зал французской живописи XVIII века',
    name: { ru: 'Франция XVIII века', en: 'France, 18th century', zh: '18世纪法国' },
  },
  207: {
    zone: 13, number: null, staff: 'зал французского искусства XVIII–XIX веков',
    name: { ru: 'Франция XVIII — начала XIX века', en: 'France, 18th – early 19th century', zh: '18—19世纪初法国' },
  },
};

export function zachetHall(code) {
  return ZACHET_HALLS[code] || null;
}
