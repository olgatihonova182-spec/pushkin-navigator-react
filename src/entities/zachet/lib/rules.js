/* Game rules of the «Zachet» quest — pure functions, no state.
   Points: full for the first try, half after a mistake, +5 if answered before the timer ends.
   After the timer the answer still counts: no penalties, no losing. */
import { difficulty, IN_TIME_BONUS } from '../model/config.js';

export function pointsFor(difficultyId, { firstTry, inTime }) {
  const base = difficulty(difficultyId).points;
  return (firstTry ? base : Math.floor(base / 2)) + (inTime ? IN_TIME_BONUS : 0);
}

/* Badges, in the order they can be earned. name — in the three interface languages. */
export const REWARDS = [
  { id: 'first', name: { ru: 'Первый зачёт', en: 'First pass', zh: '第一次通过' } },
  { id: 'eagle', name: { ru: 'Зоркий глаз', en: 'Eagle eye', zh: '火眼金睛' } },
  { id: 'voice', name: { ru: 'Голос дома', en: 'Voice at home', zh: '声音到家' } },
  { id: 'russian', name: { ru: 'Говорю по-русски', en: 'I speak Russian', zh: '我会说俄语' } },
  { id: 'plan', name: { ru: 'Есть план', en: 'I have a plan', zh: '有计划了' } },
  { id: 'honors', name: { ru: 'Отличник', en: 'Top student', zh: '优等生' } },
  { id: 'own', name: { ru: 'Свой в Пушкинском', en: 'At home in the Pushkin', zh: '普希金博物馆的自己人' } },
];

/* Which badges the progress has earned.
   progress: { route, stops: { [id]: { answer: { firstTry, inTime }, voice, stamped } }, saved: [] } */
export function earnedRewards({ route, stops, saved }) {
  if (!route) return [];
  const list = route.stops.map((s) => stops[s.id] || {});
  const stamped = list.filter((s) => s.stamped).length;
  const answered = list.filter((s) => s.answer);
  const earned = [];
  if (stamped >= 1) earned.push('first');
  if (answered.filter((s) => s.answer.firstTry && s.answer.inTime).length >= 2) earned.push('eagle');
  if (list.filter((s) => s.voice === 'sent').length >= 2) earned.push('voice');
  if (stamped >= 3) earned.push('russian'); // every stamp teaches one Russian word
  if ((saved || []).length >= 2) earned.push('plan');
  if (stamped === route.stops.length && answered.length === route.stops.length && answered.every((s) => s.answer.firstTry)) earned.push('honors');
  if (stamped === route.stops.length) earned.push('own');
  return earned;
}

export function totalPoints(stops) {
  return Object.values(stops).reduce((sum, s) => sum + (s.answer ? s.answer.points : 0), 0);
}

/* Minutes left of the chosen time, never below zero. */
export function minutesLeft(minutes, startedAt, now) {
  if (!startedAt) return minutes;
  return Math.max(0, minutes - Math.floor((now - startedAt) / 60000));
}

/* Minutes actually spent, at least 1 — for the postcard title. */
export function minutesSpent(startedAt, finishedAt) {
  if (!startedAt) return 0;
  return Math.max(1, Math.round(((finishedAt || startedAt) - startedAt) / 60000));
}
