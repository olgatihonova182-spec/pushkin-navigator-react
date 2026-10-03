import { create } from 'zustand';
import { recalculateRoute } from './route';

/* The active route and the "avoid crowds" setting (not persisted, as in the prototype). */
export const useRouteStore = create((set) => ({
  route: null,
  avoidCrowd: false,

  setRoute: (route) => set({ route }),
  clearRoute: () => set({ route: null }),
  setAvoidCrowd: (avoidCrowd) => set({ avoidCrowd }),
  recalculate: ({ me, noStairs }) =>
    set((s) => ({ route: recalculateRoute(s.route, me, { noStairs, avoidCrowd: s.avoidCrowd }) })),
}));
