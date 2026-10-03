/* Current crowd level per hall: 0 — free, 1 — some people, 2 — crowded.
   Demo data. A real app would use the museum's visitor counters; the museum had a project
   "Space of attention" (heatmap.arts-museum.ru) — a heat map of the halls. */
export const CROWD = {
  'main-1': 2, 'main-3': 1, 'main-14': 1, 'main-15': 2, 'main-holland': 2, 'main-italy-1': 1,
  'main-exhibition-17': 2, 'main-exhibition-20': 2, 'main-30': 1,
  'gallery-14': 2, 'gallery-16': 2, 'gallery-21': 1, 'gallery-20': 1, 'gallery-10': 1,
};

export const CROWD_LEVELS = [0, 1, 2];
export const CROWD_LABELS = ['Свободно', 'Есть люди', 'Людно'];

export function getCrowdLevel(hallId) {
  return CROWD[hallId] || 0;
}
