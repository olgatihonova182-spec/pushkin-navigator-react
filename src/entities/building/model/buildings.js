/* Buildings of the museum campus. A new building — one line.
   Addresses are from the museum website ("Buildings" page). Walking times are estimates,
   not measured on site. Only buildings with `floors` have a floor plan.
   x, y, w, h — position on the campus map (viewBox 340×330), the map is schematic. */
export const BUILDINGS = [
  {
    id: 'main', name: 'Главное здание', shortName: 'Главное', planTitle: 'Главное здание', address: 'Волхонка, 12',
    about: 'Древний Египет, Троя, античность, слепки, старые мастера',
    floors: [1, 2], entrance: 'main-entrance', x: 112, y: 150, w: 130, h: 110,
  },
  {
    id: 'gallery', name: 'Галерея искусства стран Европы и Америки XIX–XX веков', shortName: 'Галерея', planTitle: 'Галерея', address: 'Волхонка, 14',
    about: 'Импрессионисты, постимпрессионисты, искусство XX века',
    floors: [1, 2], entrance: 'gallery-entrance', x: 16, y: 170, w: 84, h: 90,
  },
  {
    id: 'private-collections', name: 'Музей личных коллекций', shortName: 'Личные коллекции', address: 'Волхонка, 10',
    about: 'Собрания, переданные музею дарителями',
    floors: null, x: 254, y: 170, w: 70, h: 90,
  },
  {
    id: 'mouseion', name: 'Мусейон', shortName: 'Мусейон', address: 'Колымажный пер., 6, стр. 2',
    about: 'Центр эстетического воспитания для детей и подростков',
    floors: null, x: 16, y: 40, w: 80, h: 70,
  },
  {
    id: 'lopukhin-estate', name: 'Усадьба Лопухиных', shortName: 'Усадьба Лопухиных', address: 'Малый Знаменский пер., 3/5, стр. 4',
    about: 'Пушкинский.youth — молодёжное направление музея',
    floors: null, x: 140, y: 40, w: 100, h: 50,
  },
];

/* Minutes on foot along the street between entrances, both directions. */
export const WALKING_MINUTES = [
  ['gallery', 'main', 3],
  ['main', 'private-collections', 2],
  ['main', 'lopukhin-estate', 5],
  ['main', 'mouseion', 4],
  ['gallery', 'private-collections', 4],
  ['gallery', 'lopukhin-estate', 4],
  ['gallery', 'mouseion', 3],
  ['lopukhin-estate', 'private-collections', 5],
  ['private-collections', 'mouseion', 6],
  ['lopukhin-estate', 'mouseion', 3],
];

/* Streets on the campus map: bands and label positions. */
export const STREETS = [
  { name: 'ул. Волхонка', x: 0, y: 290, w: 340, h: 26, label: [170, 323] },
  { name: 'Малый Знаменский пер.', x: 112, y: 120, w: 228, h: 14, label: [250, 127] },
  { name: 'Колымажный пер.', x: 102, y: 0, w: 12, h: 290, label: null },
];
