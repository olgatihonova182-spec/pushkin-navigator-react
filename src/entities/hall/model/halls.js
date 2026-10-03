/* Halls and plan nodes. A new hall — one line; a new door — a pair in PASSAGES.
   Fields: id, building, floor, number (only if verified against open sources, otherwise null),
   name, shortName (label on the plan), type (hall | courtyard | entrance | stairs | lift | foyer | exhibition),
   x, y, w, h — rectangle on the floor plan (viewBox 340×400).

   Verified: Main building halls 1 (Egypt), 2 (Ancient Near East), 3 (Troy), 14 (Greek Courtyard),
   15 (Italian Courtyard), 17–23 and 30 (temporary exhibitions); Gallery halls 10, 14, 16, 20, 21
   from guidebooks. The rest are exhibition sections without a number; their placement and the lifts
   are an assumption of the prototype — the museum floor plan has not been used yet (see README). */
export const HALLS = [
  /* ---- Main building, floor 1 ---- */
  { id: 'main-entrance', building: 'main', floor: 1, number: null, name: 'Вход, кассы и гардероб', shortName: 'Вход', type: 'entrance', x: 135, y: 315, w: 70, h: 55 },
  { id: 'main-stairs-1', building: 'main', floor: 1, number: null, name: 'Парадная лестница', shortName: 'Лестница', type: 'stairs', x: 140, y: 268, w: 60, h: 40 },
  { id: 'main-lift-1', building: 'main', floor: 1, number: null, name: 'Лифт', shortName: 'Лифт', type: 'lift', x: 210, y: 268, w: 30, h: 26 },
  { id: 'main-1', building: 'main', floor: 1, number: 1, name: 'Искусство Древнего Египта', shortName: 'Египет', type: 'hall', x: 20, y: 300, w: 110, h: 70 },
  { id: 'main-2', building: 'main', floor: 1, number: 2, name: 'Искусство Древнего Ближнего Востока', shortName: 'Бл. Восток', type: 'hall', x: 20, y: 210, w: 60, h: 80 },
  { id: 'main-3', building: 'main', floor: 1, number: 3, name: 'Троя. Раскопки Генриха Шлимана', shortName: 'Троя', type: 'hall', x: 20, y: 110, w: 60, h: 90 },
  { id: 'main-antiquity', building: 'main', floor: 1, number: null, name: 'Античное искусство', shortName: 'Античность', type: 'hall', x: 20, y: 20, w: 70, h: 80 },
  { id: 'main-italy-1', building: 'main', floor: 1, number: null, name: 'Италия XIII–XV веков', shortName: 'Италия XIII–XV', type: 'hall', x: 95, y: 20, w: 70, h: 80 },
  { id: 'main-italy-2', building: 'main', floor: 1, number: null, name: 'Италия XVI века', shortName: 'Италия XVI', type: 'hall', x: 170, y: 20, w: 70, h: 80 },
  { id: 'main-germany', building: 'main', floor: 1, number: null, name: 'Германия и Нидерланды XV–XVI веков', shortName: 'Германия', type: 'hall', x: 245, y: 20, w: 75, h: 80 },
  { id: 'main-holland', building: 'main', floor: 1, number: null, name: 'Голландия XVII века', shortName: 'Голландия', type: 'hall', x: 260, y: 110, w: 60, h: 80 },
  { id: 'main-flanders', building: 'main', floor: 1, number: null, name: 'Фландрия XVII века', shortName: 'Фландрия', type: 'hall', x: 260, y: 200, w: 60, h: 90 },
  { id: 'main-14', building: 'main', floor: 1, number: 14, name: 'Греческий дворик', shortName: 'Греческий дворик', type: 'courtyard', x: 90, y: 110, w: 75, h: 150 },
  { id: 'main-15', building: 'main', floor: 1, number: 15, name: 'Итальянский дворик', shortName: 'Итальянский дворик', type: 'courtyard', x: 175, y: 110, w: 75, h: 150 },

  /* ---- Main building, floor 2 ---- */
  { id: 'main-stairs-2', building: 'main', floor: 2, number: null, name: 'Парадная лестница', shortName: 'Лестница', type: 'stairs', x: 140, y: 268, w: 60, h: 40 },
  { id: 'main-lift-2', building: 'main', floor: 2, number: null, name: 'Лифт', shortName: 'Лифт', type: 'lift', x: 210, y: 268, w: 30, h: 26 },
  { id: 'main-foyer-2', building: 'main', floor: 2, number: null, name: 'Фойе второго этажа', shortName: 'Фойе', type: 'foyer', x: 135, y: 315, w: 70, h: 55 },
  { id: 'main-casts-greece', building: 'main', floor: 2, number: null, name: 'Слепки: Древняя Греция', shortName: 'Слепки: Греция', type: 'hall', x: 20, y: 20, w: 70, h: 80 },
  { id: 'main-casts-rome', building: 'main', floor: 2, number: null, name: 'Слепки: эллинизм и Древний Рим', shortName: 'Слепки: Рим', type: 'hall', x: 95, y: 20, w: 70, h: 80 },
  { id: 'main-casts-medieval', building: 'main', floor: 2, number: null, name: 'Слепки: Средние века', shortName: 'Слепки: Ср. века', type: 'hall', x: 170, y: 20, w: 70, h: 80 },
  { id: 'main-casts-renaissance', building: 'main', floor: 2, number: null, name: 'Слепки: Возрождение', shortName: 'Слепки: Возрожд.', type: 'hall', x: 245, y: 20, w: 75, h: 80 },
  { id: 'main-italy-3', building: 'main', floor: 2, number: null, name: 'Италия XVII–XVIII веков', shortName: 'Италия XVII–XVIII', type: 'hall', x: 260, y: 110, w: 60, h: 80 },
  { id: 'main-spain', building: 'main', floor: 2, number: null, name: 'Испания XVII века', shortName: 'Испания', type: 'hall', x: 260, y: 200, w: 60, h: 90 },
  { id: 'main-france', building: 'main', floor: 2, number: null, name: 'Франция XVII–XIX веков', shortName: 'Франция', type: 'hall', x: 210, y: 300, w: 110, h: 70 },
  { id: 'main-exhibition-17', building: 'main', floor: 2, number: null, name: 'Залы 17–19 · временная выставка', shortName: 'Залы 17–19', type: 'exhibition', x: 20, y: 110, w: 60, h: 90 },
  { id: 'main-exhibition-20', building: 'main', floor: 2, number: null, name: 'Залы 20–23 · временная выставка', shortName: 'Залы 20–23', type: 'exhibition', x: 20, y: 210, w: 60, h: 80 },
  { id: 'main-30', building: 'main', floor: 2, number: 30, name: 'Зал 30 · временная выставка', shortName: 'Выставка', type: 'exhibition', x: 20, y: 300, w: 110, h: 70 },

  /* ---- Gallery, floor 1 ---- */
  { id: 'gallery-entrance', building: 'gallery', floor: 1, number: null, name: 'Вход, кассы и гардероб', shortName: 'Вход', type: 'entrance', x: 135, y: 315, w: 70, h: 55 },
  { id: 'gallery-stairs-1', building: 'gallery', floor: 1, number: null, name: 'Лестница', shortName: 'Лестница', type: 'stairs', x: 140, y: 268, w: 60, h: 40 },
  { id: 'gallery-lift-1', building: 'gallery', floor: 1, number: null, name: 'Лифт', shortName: 'Лифт', type: 'lift', x: 210, y: 268, w: 30, h: 26 },
  { id: 'gallery-romanticism', building: 'gallery', floor: 1, number: null, name: 'Европа XIX века: романтизм и реализм', shortName: 'Романтизм', type: 'hall', x: 20, y: 200, w: 110, h: 100 },
  { id: 'gallery-landscape', building: 'gallery', floor: 1, number: null, name: 'Европа XIX века: пейзаж', shortName: 'Пейзаж XIX', type: 'hall', x: 20, y: 80, w: 110, h: 110 },
  { id: 'gallery-salon', building: 'gallery', floor: 1, number: null, name: 'Европа и Америка XIX века: салон', shortName: 'Салон XIX', type: 'hall', x: 140, y: 80, w: 180, h: 110 },

  /* ---- Gallery, floor 2 ---- */
  { id: 'gallery-stairs-2', building: 'gallery', floor: 2, number: null, name: 'Лестница', shortName: 'Лестница', type: 'stairs', x: 140, y: 268, w: 60, h: 40 },
  { id: 'gallery-lift-2', building: 'gallery', floor: 2, number: null, name: 'Лифт', shortName: 'Лифт', type: 'lift', x: 210, y: 268, w: 30, h: 26 },
  { id: 'gallery-foyer-2', building: 'gallery', floor: 2, number: null, name: 'Фойе второго этажа', shortName: 'Фойе', type: 'foyer', x: 135, y: 315, w: 70, h: 55 },
  { id: 'gallery-10', building: 'gallery', floor: 2, number: 10, name: 'Эдгар Дега', shortName: 'Дега', type: 'hall', x: 20, y: 300, w: 110, h: 70 },
  { id: 'gallery-renoir', building: 'gallery', floor: 2, number: null, name: 'Ренуар и Писсарро', shortName: 'Ренуар', type: 'hall', x: 20, y: 210, w: 110, h: 80 },
  { id: 'gallery-14', building: 'gallery', floor: 2, number: 14, name: 'Клод Моне', shortName: 'Моне', type: 'hall', x: 20, y: 110, w: 110, h: 90 },
  { id: 'gallery-cezanne', building: 'gallery', floor: 2, number: null, name: 'Поль Сезанн', shortName: 'Сезанн', type: 'hall', x: 20, y: 20, w: 110, h: 80 },
  { id: 'gallery-16', building: 'gallery', floor: 2, number: 16, name: 'Винсент ван Гог', shortName: 'Ван Гог', type: 'hall', x: 140, y: 20, w: 85, h: 80 },
  { id: 'gallery-gauguin', building: 'gallery', floor: 2, number: null, name: 'Поль Гоген', shortName: 'Гоген', type: 'hall', x: 235, y: 20, w: 85, h: 80 },
  { id: 'gallery-20', building: 'gallery', floor: 2, number: 20, name: 'Анри Матисс', shortName: 'Матисс', type: 'hall', x: 235, y: 110, w: 85, h: 90 },
  { id: 'gallery-21', building: 'gallery', floor: 2, number: 21, name: 'Пабло Пикассо', shortName: 'Пикассо', type: 'hall', x: 235, y: 210, w: 85, h: 80 },
  { id: 'gallery-20th-century', building: 'gallery', floor: 2, number: null, name: 'Искусство XX века', shortName: 'XX век', type: 'hall', x: 210, y: 300, w: 110, h: 70 },
];

/* Doors between nodes of one floor. A pair is a passage both ways. */
export const PASSAGES = [
  ['main-entrance', 'main-stairs-1'], ['main-entrance', 'main-lift-1'], ['main-entrance', 'main-1'],
  ['main-stairs-1', 'main-14'], ['main-stairs-1', 'main-15'],
  ['main-1', 'main-2'], ['main-2', 'main-3'], ['main-2', 'main-14'], ['main-3', 'main-14'], ['main-3', 'main-antiquity'],
  ['main-antiquity', 'main-italy-1'], ['main-italy-1', 'main-14'], ['main-italy-1', 'main-italy-2'], ['main-italy-2', 'main-15'], ['main-italy-2', 'main-germany'],
  ['main-germany', 'main-holland'], ['main-holland', 'main-15'], ['main-holland', 'main-flanders'], ['main-flanders', 'main-15'],

  ['main-stairs-2', 'main-foyer-2'], ['main-lift-2', 'main-foyer-2'], ['main-foyer-2', 'main-30'], ['main-foyer-2', 'main-france'],
  ['main-30', 'main-exhibition-20'], ['main-exhibition-20', 'main-exhibition-17'], ['main-exhibition-17', 'main-casts-greece'], ['main-casts-greece', 'main-casts-rome'],
  ['main-casts-rome', 'main-casts-medieval'], ['main-casts-medieval', 'main-casts-renaissance'], ['main-casts-renaissance', 'main-italy-3'], ['main-italy-3', 'main-spain'], ['main-spain', 'main-france'],

  ['gallery-entrance', 'gallery-stairs-1'], ['gallery-entrance', 'gallery-lift-1'], ['gallery-entrance', 'gallery-romanticism'],
  ['gallery-romanticism', 'gallery-landscape'], ['gallery-landscape', 'gallery-salon'], ['gallery-salon', 'gallery-stairs-1'],

  ['gallery-stairs-2', 'gallery-foyer-2'], ['gallery-lift-2', 'gallery-foyer-2'], ['gallery-foyer-2', 'gallery-10'], ['gallery-foyer-2', 'gallery-20th-century'],
  ['gallery-10', 'gallery-renoir'], ['gallery-renoir', 'gallery-14'], ['gallery-14', 'gallery-cezanne'], ['gallery-cezanne', 'gallery-16'],
  ['gallery-16', 'gallery-gauguin'], ['gallery-gauguin', 'gallery-20'], ['gallery-20', 'gallery-21'], ['gallery-21', 'gallery-20th-century'],
];

/* Links between floors: stairs or lift. Seconds are an estimate. */
export const FLOOR_LINKS = [
  { from: 'main-stairs-1', to: 'main-stairs-2', kind: 'stairs', seconds: 40 },
  { from: 'main-lift-1', to: 'main-lift-2', kind: 'lift', seconds: 90 },
  { from: 'gallery-stairs-1', to: 'gallery-stairs-2', kind: 'stairs', seconds: 35 },
  { from: 'gallery-lift-1', to: 'gallery-lift-2', kind: 'lift', seconds: 90 },
];

/* Voids on the plan: courtyards seen from above on floor 2. Not clickable. */
export const VOIDS = [
  { building: 'main', floor: 2, name: 'Греческий дворик', x: 90, y: 110, w: 75, h: 150 },
  { building: 'main', floor: 2, name: 'Итальянский дворик', x: 175, y: 110, w: 75, h: 150 },
];
