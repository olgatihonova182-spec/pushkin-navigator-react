import { useQuestStore, getQuest } from '@/entities/quest';

export function nextTask(questId) {
  useQuestStore.getState().goNext(questId, getQuest(questId).tasks.length);
}

/* Progress is kept: the quest card offers to continue. */
export function exitQuest() {
  useQuestStore.getState().closeView();
}

/* Play again: back to the language choice, results are reset when the quest begins. */
export function restartQuest(questId) {
  useQuestStore.getState().openStart(questId);
}
