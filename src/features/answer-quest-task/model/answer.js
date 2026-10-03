import { useUiStore } from '@/shared/model';
import { useQuestStore, questUi } from '@/entities/quest';

/* Pure check. number — digits only ("1 873", "1873 г." count); choice — option index. */
export function checkAnswer(task, value) {
  const { answer } = task;
  if (answer.kind === 'number') return parseInt(String(value).replace(/\D/g, ''), 10) === answer.value;
  if (answer.kind === 'choice') return value === answer.correct;
  return true;
}

export function submitAnswer(questId, task, value, lang) {
  const store = useQuestStore.getState();
  const attempts = (store.sessions[questId].results[task.id]?.attempts || 0) + 1;
  const ok = checkAnswer(task, value);
  store.updateResult(questId, task.id, { attempts, status: ok ? 'correct' : 'wrong', firstTry: ok && attempts === 1 });
  useUiStore.getState().announce(ok ? questUi(lang).correct : questUi(lang).wrong);
  return ok;
}

export function revealAnswer(questId, task) {
  useQuestStore.getState().updateResult(questId, task.id, { status: 'revealed', firstTry: false });
}

/* Creative and communication tasks: any answer counts. */
export function completeTask(questId, task, text) {
  useQuestStore.getState().updateResult(questId, task.id, { status: 'done', text: text || '' });
}

/* Opened hints are remembered: the summary counts them, and the hint stays open after a reload. */
export function openHint(questId, task) {
  useQuestStore.getState().updateResult(questId, task.id, { hintUsed: true });
}
