/* Ready-made routes. A new one — one line.
   stops — hall ids in order; minutes — including viewing, an estimate; drawing — from shared DRAWINGS.
   tag — who the route is for. "Express" and "Impressionists" follow guidebook routes,
   the rest are ideas from the research (research/ideas). */
export const TOURS = [
  {
    id: 'express', drawing: 'facade', name: 'Главное за полтора часа', tag: 'Впервые в музее', minutes: 90,
    about: 'Египет, Троя, оба дворика, Рембрандт — и через улицу к Моне и Пикассо.',
    stops: ['main-1', 'main-3', 'main-14', 'main-15', 'main-holland', 'gallery-14', 'gallery-21'],
  },
  {
    id: 'impressionists', drawing: 'sunrise', name: 'Импрессионисты за час', tag: 'Галерея', minutes: 60,
    about: 'От Дега до Пикассо по порядку: как живопись уходила от натуры.',
    stops: ['gallery-10', 'gallery-renoir', 'gallery-14', 'gallery-16', 'gallery-20', 'gallery-21'],
  },
  {
    id: 'casts', drawing: 'column', name: 'Европа без виз', tag: 'Слепки', minutes: 45,
    about: 'Парфенон, Флоренция и Фрайберг в одном здании: где стоят оригиналы и как их увидеть здесь.',
    stops: ['main-14', 'main-15', 'main-casts-greece', 'main-casts-rome', 'main-casts-medieval', 'main-casts-renaissance'],
  },
  {
    id: 'quiet', drawing: 'bench', name: 'Тихий маршрут', tag: 'Меньше людей', minutes: 40,
    about: 'Залы, где обычно свободно: можно постоять у картины столько, сколько хочется.',
    stops: ['main-antiquity', 'main-germany', 'main-flanders', 'main-italy-3', 'main-spain'],
  },
  {
    id: 'family', drawing: 'magnifier', name: 'Найди деталь', tag: 'С детьми', minutes: 30,
    about: 'Пять залов, в каждом — загадка: найти на картине или скульптуре деталь с фотографии.',
    stops: ['main-1', 'main-3', 'main-15', 'gallery-10', 'gallery-20'],
    riddles: {
      'main-1': 'Найдите портрет, на котором у человека золотой венок.',
      'main-3': 'Сколько украшений вы насчитаете в одной витрине?',
      'main-15': 'Кто здесь выше всех? Посмотрите снизу вверх.',
      'gallery-10': 'Найдите танцовщицу, которая поправляет платье.',
      'gallery-20': 'Сколько рыбок плавает в банке?',
    },
  },
];

/* "How much time do you have" filter: show routes up to this many minutes. */
export const TIME_FILTERS = [
  { id: 'all', label: 'Все', upTo: 9999 },
  { id: '30', label: 'До 30 мин', upTo: 30 },
  { id: '60', label: 'До часа', upTo: 60 },
  { id: '90', label: 'До 1,5 ч', upTo: 90 },
];
