import { useUiStore } from '@/shared/model';
import { PlaceSheet } from '@/widgets/place-sheet';
import { TabBar } from '@/widgets/tab-bar';
import { ModeratorPanel } from '@/widgets/moderator-panel';
import { PAGES } from './ui/pages';
import { Screen } from './ui/Screen';
import { Announcer } from './ui/Announcer';

/* Phone frame: screen of the current tab, bottom sheet, navigation bar, live region.
   The moderator's bug sits outside the frame: it is a demo tool, not part of the app. */
export function App() {
  const tab = useUiStore((s) => s.tab);
  const sheetOpen = useUiStore((s) => !!s.sheet);
  const Page = PAGES[tab];
  return (
    <>
      <div className="phone">
        {/* Modal sheet: everything behind it is unreachable by finger, keyboard and screen reader. */}
        <Screen inert={sheetOpen}>
          <Page />
        </Screen>
        <PlaceSheet />
        <TabBar inert={sheetOpen} />
        <Announcer />
      </div>
      <ModeratorPanel />
    </>
  );
}
