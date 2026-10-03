/* App sections (bottom navigation). A new tab — one line here plus its page in app/ui/pages.js. */
export const TAB = {
  map: 'map',
  routes: 'routes',
  quests: 'quests',
  search: 'search',
  visit: 'visit',
};

export const TABS = [
  { id: TAB.map, label: 'Карта', icon: 'map' },
  { id: TAB.routes, label: 'Маршруты', icon: 'routes' },
  { id: TAB.quests, label: 'Квесты', icon: 'quests' },
  { id: TAB.search, label: 'Поиск', icon: 'search' },
  { id: TAB.visit, label: 'Мой визит', icon: 'visit' },
];
