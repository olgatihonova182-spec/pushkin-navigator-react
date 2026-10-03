import { QUESTS } from '../model/catalog';
import { QUEST_UI } from '../model/strings';

export function getQuest(id) {
  return QUESTS.find((q) => q.id === id);
}

/* Interface strings for a language. */
export function questUi(lang) {
  return QUEST_UI[lang] || QUEST_UI.ru;
}

/* The student's language for this quest: a country quest is fixed to its country's language. */
export function questNativeLang(quest, nativeLang) {
  return quest.lang || nativeLang;
}

/* Language the quest is shown in: Russian, or the student's own. */
export function questLanguage(session, nativeLang) {
  return session.mode === 'native' && nativeLang ? nativeLang : 'ru';
}

/* Tasks with a right answer: they count towards the score. */
export function isCheckable(task) {
  return task.answer.kind !== 'free';
}

/* The task is answered (a result may also exist only because a hint was opened). */
export function isSettled(result) {
  return !!result && ['correct', 'revealed', 'done'].includes(result.status);
}

export function questScore(quest, session) {
  const checkable = quest.tasks.filter(isCheckable);
  const firstTry = checkable.filter((t) => session.results[t.id]?.firstTry).length;
  return { firstTry, total: checkable.length };
}
