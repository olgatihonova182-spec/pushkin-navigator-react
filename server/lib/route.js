/* Building a route: plan (request 1) → materials of every stop in parallel (request 2),
   every answer checked, fallbacks where the model failed. Without a key — the demo route.
   `complete` is passed in, so this runs (and is tested) without the network. */
import { stopsFor } from '../../src/entities/zachet/model/config.js';
import { buildDemoRoute } from '../../src/entities/zachet/model/demoRoute.js';
import { sameHall } from './catalog.js';
import { planMessages, stopMessages } from './prompts.js';
import { cleanPlan, cleanStop } from './validate.js';
import { pickByInterests, fallbackPlan, fallbackStop } from './fallback.js';

const STOP_ATTEMPTS = 2;

function withSameHall(route, catalog) {
  const ids = route.stops.map((s) => s.id);
  return { ...route, stops: route.stops.map((s) => ({ ...s, sameHall: sameHall(catalog, s.id, ids) })) };
}

export async function buildRoute(profile, catalog, { complete } = {}) {
  const n = stopsFor(profile.minutes);
  if (!complete) return withSameHall(buildDemoRoute(profile, n), catalog);

  let partial = false;
  let plan;
  try {
    plan = cleanPlan(await complete(planMessages(profile, catalog, n), { temperature: 0.4, maxTokens: 2500 }), catalog, n);
    if (plan.stops.length < n) {
      // Not enough valid stops: top up by interests, keep the walking order.
      partial = true;
      const extra = pickByInterests(profile, catalog, n, plan.stops.map((s) => s.id));
      const known = new Map(plan.stops.map((s) => [s.id, s.reason]));
      const fill = fallbackPlan(profile, catalog, n).stops[0]?.reason || '';
      plan.stops = extra.map((id) => ({ id, reason: known.get(id) || fill }));
    }
  } catch {
    partial = true;
    plan = fallbackPlan(profile, catalog, n);
  }
  if (!plan.title || !plan.intro) {
    const f = fallbackPlan(profile, catalog, n);
    plan.title = plan.title || f.title;
    plan.intro = plan.intro || f.intro;
  }

  const stops = await Promise.all(plan.stops.map(async ({ id, reason }) => {
    const e = catalog.find((x) => x.id === id);
    for (let attempt = 0; attempt < STOP_ATTEMPTS; attempt += 1) {
      try {
        const m = cleanStop(await complete(stopMessages(profile, e, reason), { temperature: 0.5, maxTokens: 1500 }));
        if (m) return { id, reason, ...m };
      } catch {
        // next attempt
      }
    }
    partial = true;
    return fallbackStop(e, reason, profile, catalog);
  }));

  return withSameHall({
    source: partial ? 'partial' : 'ai',
    lang: profile.storyLang,
    langFallback: false,
    minutes: profile.minutes,
    title: plan.title,
    intro: plan.intro,
    understanding: plan.understanding,
    interests: plan.interests,
    mood: plan.mood,
    stops,
  }, catalog);
}
