import { Button, ButtonRow, CardList } from '@/shared/ui';
import { getBuilding } from '@/entities/building';
import { questsFor, QuestCard, useQuestStore, questScore } from '@/entities/quest';
import { restartQuest } from '@/features/navigate-quest';

/* Quest cards with their state: new, in progress, finished. */
export function QuestList() {
  const country = useQuestStore((s) => s.country);
  const nativeLang = useQuestStore((s) => s.nativeLang);
  const sessions = useQuestStore((s) => s.sessions);
  const openStart = useQuestStore((s) => s.openStart);
  const resume = useQuestStore((s) => s.resume);
  return (
    <CardList>
      {questsFor(country).map((quest) => {
        const session = sessions[quest.id];
        const meta = `${quest.tasks.length} заданий · ${getBuilding(quest.building).shortName}`;
        let status = null;
        let actions = (
          <Button variant="filled" icon="next" onClick={() => openStart(quest.id)}>
            Начать
          </Button>
        );
        if (session?.finished) {
          const score = questScore(quest, session);
          status = `Пройден · с первой попытки ${score.firstTry} из ${score.total}`;
          actions = (
            <Button variant="outlined" icon="replay" onClick={() => restartQuest(quest.id)}>
              Пройти ещё раз
            </Button>
          );
        } else if (session) {
          status = `В процессе · задание ${session.step + 1} из ${quest.tasks.length}`;
          actions = (
            <ButtonRow>
              <Button variant="filled" icon="next" onClick={() => resume(quest.id)}>
                Продолжить
              </Button>
              <Button variant="text" onClick={() => restartQuest(quest.id)}>
                Начать заново
              </Button>
            </ButtonRow>
          );
        }
        return (
          <QuestCard
            key={quest.id}
            quest={quest}
            nativeLang={quest.lang || nativeLang}
            meta={meta}
            status={status}
            actions={actions}
            forYou={!!quest.country}
          />
        );
      })}
    </CardList>
  );
}
