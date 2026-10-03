import { RANKS, BADGES } from '../model/summary';
import { isCheckable } from './quest';

/* How a task went: firstTry | retry | revealed | done. */
export function taskOutcome(task, result) {
  if (!result) return 'done';
  if (!isCheckable(task)) return 'done';
  if (result.status === 'revealed') return 'revealed';
  return result.firstTry ? 'firstTry' : 'retry';
}

/* Everything the final screen shows. Pure: quest and session in, numbers and lists out. */
export function questSummary(quest, session) {
  const results = session.results;
  const checkable = quest.tasks.filter(isCheckable);
  const firstTry = checkable.filter((t) => results[t.id]?.firstTry).length;
  const share = checkable.length ? firstTry / checkable.length : 1;
  const rank = RANKS.find((r) => share >= r.from) || RANKS[RANKS.length - 1];
  const hintsUsed = quest.tasks.filter((t) => results[t.id]?.hintUsed).length;

  const typesInQuest = [...new Set(quest.tasks.map((t) => t.type))];
  const badges = typesInQuest
    .filter((type) => BADGES[type])
    .map((type) => {
      const tasks = quest.tasks.filter((t) => t.type === type);
      // Checkable types — every task on the first try; creative and talking — every task done.
      const earned = tasks.every((t) => (isCheckable(t) ? results[t.id]?.firstTry : results[t.id]?.status === 'done'));
      return { id: type, ...BADGES[type], earned };
    });
  badges.push({ id: 'noHints', ...BADGES.noHints, earned: hintsUsed === 0 });

  return {
    rank,
    firstTry,
    total: checkable.length,
    tasksDone: quest.tasks.length,
    hintsUsed,
    halls: new Set(quest.tasks.map((t) => t.hall)).size,
    badges,
    quotes: quest.tasks.filter((t) => results[t.id]?.text).map((t) => ({ task: t, text: results[t.id].text })),
    path: quest.tasks.map((t) => ({ task: t, outcome: taskOutcome(t, results[t.id]) })),
  };
}
