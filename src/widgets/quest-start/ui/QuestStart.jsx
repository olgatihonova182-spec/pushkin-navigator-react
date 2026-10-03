import { Button, IconButton, Illustration } from '@/shared/ui';
import { COUNTRIES, langProps } from '@/shared/config';
import { pick } from '@/shared/lib';
import { getQuest, questUi, questNativeLang, useQuestStore } from '@/entities/quest';
import { NativeLanguagePicker, QuestModePicker } from '@/features/choose-quest-language';
import { exitQuest } from '@/features/navigate-quest';
import './QuestStart.css';

/* Before the quest: native language (if the country does not set it), then Russian or native,
   then «Start». The same settings as on the quest list. Bilingual throughout:
   the student may not read Russian yet. */
export function QuestStart({ questId }) {
  const quest = getQuest(questId);
  const country = useQuestStore((s) => s.country);
  const nativeLang = questNativeLang(quest, useQuestStore((s) => s.nativeLang));
  const mode = useQuestStore((s) => s.mode);
  const begin = useQuestStore((s) => s.begin);
  const ru = questUi('ru');
  const nat = nativeLang && questUi(nativeLang);
  // A listed country (or a country quest) already gives the language; otherwise the student picks it.
  const languageFromCountry = quest.lang || COUNTRIES.some((c) => c.id === country);

  return (
    <div className="quest-start">
      <div className="quest-start__top">
        <IconButton icon="close" label="К списку квестов" onClick={exitQuest} />
      </div>
      <div className="quest-start__picture">
        <Illustration name={quest.drawing} />
      </div>
      <h1 className="t-headline-s">{quest.title.ru}</h1>
      {nativeLang && <p className="supporting-text" {...langProps(nativeLang)}>{pick(quest.title, nativeLang)} · {pick(quest.about, nativeLang)}</p>}
      <p className="supporting-text">{quest.about.ru}</p>

      {!languageFromCountry && (
        <section className="quest-start__step">
          <h2 className="quest-start__label">
            <span lang="ru">{ru.nativeLanguage}</span>
            {nat && <span {...langProps(nativeLang)}> · {nat.nativeLanguage}</span>}
          </h2>
          <NativeLanguagePicker label={ru.nativeLanguage} />
        </section>
      )}

      <section className="quest-start__step">
        <QuestModePicker fixedLang={quest.lang} />
      </section>

      <Button variant="filled" icon="next" disabled={!nativeLang || !mode} onClick={() => begin(questId, mode)}>
        <span lang="ru">{ru.start}</span>
        {nat && <span {...langProps(nativeLang)}> · {nat.start}</span>}
      </Button>
    </div>
  );
}
