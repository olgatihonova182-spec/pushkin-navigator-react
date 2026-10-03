/* Checks of the model's answers. Nothing from the model reaches the visitor unchecked. */

const str = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');

/* Plan: drop ids that are not in the catalogue and repeats, at most two per hall,
   in walking order (up the zones, never back), exactly n at most. */
export function cleanPlan(raw, catalog, n) {
  const byId = new Map(catalog.map((e) => [e.id, e]));
  const seen = new Set();
  const perHall = {};
  const stops = [];
  for (const s of Array.isArray(raw && raw.stops) ? raw.stops : []) {
    const id = String(s && s.id != null ? s.id : '').trim();
    const e = byId.get(id);
    if (!e || seen.has(id)) continue;
    if ((perHall[e.hall] || 0) >= 2) continue;
    seen.add(id);
    perHall[e.hall] = (perHall[e.hall] || 0) + 1;
    stops.push({ id, reason: str(s.reason, 300) });
    if (stops.length === n) break;
  }
  stops.sort((a, b) => byId.get(a.id).zone - byId.get(b.id).zone);
  return {
    understanding: str(raw && raw.understanding, 400),
    interests: Array.isArray(raw && raw.interests) ? raw.interests.map((x) => str(x, 60)).filter(Boolean).slice(0, 8) : [],
    mood: str(raw && raw.mood, 160),
    title: str(raw && raw.title, 120),
    intro: str(raw && raw.intro, 600),
    stops,
  };
}

/* Walking order holds: zones never go down. */
export function isWalkingOrder(stops, catalog) {
  const zone = (id) => catalog.find((e) => e.id === id).zone;
  return stops.every((s, i) => i === 0 || zone(stops[i - 1].id) <= zone(s.id));
}

/* Materials of one stop: every text present, exactly three options, the right one from 0 to 2.
   Returns the cleaned materials or null. */
export function cleanStop(raw) {
  if (!raw || typeof raw !== 'object' || !raw.task || !raw.word) return null;
  const t = raw.task;
  const options = Array.isArray(t.options) ? t.options.map((o) => str(o, 120)) : [];
  const correct = Number(t.correct);
  const m = {
    caption: str(raw.caption, 80),
    story: str(raw.story, 700),
    forYou: str(raw.forYou, 300),
    task: {
      lead: str(t.lead, 300),
      question: str(t.question, 240),
      options,
      correct,
      hint: str(t.hint, 240),
      explain: str(t.explain, 400),
    },
    voiceTopic: str(raw.voiceTopic, 240),
    word: { ru: str(raw.word.ru, 40), transcription: str(raw.word.transcription, 60), translation: str(raw.word.translation, 80) },
  };
  const ok = m.caption && m.story && m.forYou && m.voiceTopic && m.task.question && m.task.explain
    && options.length === 3 && options.every(Boolean) && new Set(options).size === 3
    && Number.isInteger(correct) && correct >= 0 && correct <= 2
    && m.word.ru && m.word.translation;
  return ok ? m : null;
}
