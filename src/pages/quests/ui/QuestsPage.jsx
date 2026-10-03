import { PageHeader } from '@/shared/ui';
import { useQuestStore } from '@/entities/quest';
import { OTHER_COUNTRY } from '@/shared/config';
import { CountryPicker, NativeLanguagePicker, QuestModePicker } from '@/features/choose-quest-language';
import { QuestList } from '@/widgets/quest-list';
import { QuestStart } from '@/widgets/quest-start';
import { QuestPlayer } from '@/widgets/quest-player';
import { ZachetEntry, ZachetFlow } from '@/widgets/zachet-flow';
import { useZachetStore } from '@/entities/zachet';

/* "Quests" for international students: country (and language) → Russian or native → the quest. */
export function QuestsPage() {
  const view = useQuestStore((s) => s.view);
  const hasSession = useQuestStore((s) => !!(s.view && s.sessions[s.view.questId]));
  const country = useQuestStore((s) => s.country);
  const zachetOpen = useZachetStore((s) => s.open);

  // «Zachet» is its own flow; the other quests below work as before.
  if (zachetOpen) return <ZachetFlow />;
  if (view?.screen === 'start') return <QuestStart questId={view.questId} />;
  if (view?.screen === 'play' && hasSession) return <QuestPlayer questId={view.questId} />;
  return (
    <>
      <PageHeader title="Квесты">
        <p className="supporting-text">
          Для иностранных студентов: задания по залам музея. Выберите свою страну — появится квест, где каждый вопрос связывает экспонат с вашей страной.
        </p>
        <CountryPicker />
        {country === OTHER_COUNTRY && (
          <>
            <p className="supporting-text">Квеста для вашей страны пока нет. Выберите родной язык — на него переводятся общие квесты.</p>
            <NativeLanguagePicker label="Родной язык · Native language" />
          </>
        )}
        {country && <QuestModePicker />}
      </PageHeader>
      <ZachetEntry />
      <QuestList />
    </>
  );
}
