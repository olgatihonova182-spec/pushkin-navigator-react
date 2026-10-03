import { EXHIBITS, getExhibit } from '@/entities/exhibit';
import { useZachetStore, buildDemoRoute, stopsFor, ZACHET_UI } from '@/entities/zachet';

const TIMEOUT_MS = 120000;

/* Exhibits of the same museum hall that are not on the route — «in the same hall».
   The server sends this list; the demo built in the browser gets it here. */
function withSameHall(route) {
  const onRoute = new Set(route.stops.map((s) => s.id));
  return {
    ...route,
    stops: route.stops.map((s) => {
      if (s.sameHall && s.sameHall.length) return s;
      const hall = getExhibit(s.id)?.museumHall;
      const same = EXHIBITS.filter((e) => e.building === 'main' && e.museumHall === hall && !onRoute.has(e.id)).map((e) => e.id);
      return { ...s, sameHall: same };
    }),
  };
}

/* Only stops the app knows (the server checks too; this guards against an old server). */
function known(route) {
  return { ...route, stops: route.stops.filter((s) => getExhibit(s.id)) };
}

let inFlight = null;

/* Ask the server to build the route (YandexGPT behind it). Errors are shown with «Try again».
   One request at a time: a second call while waiting gets the same request. */
export function requestRoute() {
  if (!inFlight) inFlight = doRequest().finally(() => { inFlight = null; });
  return inFlight;
}

async function doRequest() {
  const store = useZachetStore.getState();
  const ui = ZACHET_UI[store.uiLang];
  store.startBuilding();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch('/api/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(store.profile),
      signal: controller.signal,
    });
    const body = await res.json().catch(() => null);
    if (!res.ok || !body || !Array.isArray(body.stops)) {
      throw new Error((body && body.error) || ui.noServer);
    }
    const route = known(body);
    if (!route.stops.length) throw new Error(ui.errorTitle);
    useZachetStore.getState().setRoute(withSameHall(route));
  } catch (e) {
    const message = e.name === 'AbortError' || e instanceof TypeError ? ui.noServer : e.message;
    useZachetStore.getState().setError(message);
  } finally {
    clearTimeout(timer);
  }
}

/* The ready-made demo, built right here — works without the server. */
export function showDemo() {
  const { profile, setRoute } = useZachetStore.getState();
  setRoute(withSameHall(buildDemoRoute(profile, stopsFor(profile.minutes))));
}
