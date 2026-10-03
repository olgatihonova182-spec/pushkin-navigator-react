import { TAB } from '@/shared/config';
import { MapPage } from '@/pages/map';
import { RoutesPage } from '@/pages/routes';
import { QuestsPage } from '@/pages/quests';
import { SearchPage } from '@/pages/search';
import { VisitPage } from '@/pages/visit';

/* Tab → page. A new tab — one line here and in shared/config/tabs.js. */
export const PAGES = {
  [TAB.map]: MapPage,
  [TAB.routes]: RoutesPage,
  [TAB.quests]: QuestsPage,
  [TAB.search]: SearchPage,
  [TAB.visit]: VisitPage,
};
