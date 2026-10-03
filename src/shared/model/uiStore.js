import { create } from 'zustand';
import { TAB } from '../config/tabs';
import { CAMPUS_VIEW } from '../config/views';

/* Interface state: which tab, which map view, which sheet, what to announce.
   Domain state lives in entities (visitor, route). */
let announcementId = 0;

export const useUiStore = create((set) => ({
  tab: TAB.map,
  building: CAMPUS_VIEW, // CAMPUS_VIEW | building id with a floor plan
  floor: 1,
  sheet: null, // { kind: 'hall' | 'artwork' | 'building', id }
  crowdLayer: false,
  query: '',
  timeFilter: 'all',
  announcement: null, // { id, text } — for screen readers
  scrollToMapRequest: 0, // bump to scroll the screen to the map after the next render

  setTab: (tab) => set({ tab, sheet: null }),
  setFloor: (floor) => set({ floor }),
  toggleCrowdLayer: () => set((s) => ({ crowdLayer: !s.crowdLayer })),
  setQuery: (query) => set({ query }),
  setTimeFilter: (timeFilter) => set({ timeFilter }),
  openSheet: (kind, id) => set({ sheet: { kind, id } }),
  closeSheet: () => set({ sheet: null }),
  announce: (text) => set({ announcement: { id: ++announcementId, text } }),
  requestScrollToMap: () => set((s) => ({ scrollToMapRequest: s.scrollToMapRequest + 1 })),
}));
