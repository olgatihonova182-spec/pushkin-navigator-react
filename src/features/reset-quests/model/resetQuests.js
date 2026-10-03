import { useUiStore } from '@/shared/model';
import { TAB } from '@/shared/config';
import { useQuestStore } from '@/entities/quest';
import { useZachetStore } from '@/entities/zachet';

/* Is there anything to reset: a country picked, a quest started or finished, a «Zachet» route. */
export function hasQuestProgress(state, zachet) {
  const quests = Boolean(state.country || state.nativeLang || state.mode || state.view || Object.keys(state.sessions).length);
  return quests || Boolean(zachet && (zachet.route || zachet.screen !== 'welcome' || zachet.open));
}

/* Moderator: quests back to the start, as for a new student — no progress, no country,
   no language, no choice between Russian and native. "My visit" and the route on the map are not quests and stay as they are. */
export function resetQuests() {
  useQuestStore.getState().resetAll();
  useZachetStore.getState().resetAll();
  const ui = useUiStore.getState();
  ui.setTab(TAB.quests);
  ui.announce('Квесты сброшены к началу');
}
