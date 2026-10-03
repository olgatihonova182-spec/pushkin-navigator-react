import { Chip, ChipGroup } from '@/shared/ui';
import { LANGUAGES, langProps } from '@/shared/config';
import { useQuestStore, questUi } from '@/entities/quest';
import './QuestModePicker.css';

/* In which language to play: Russian (with translation on demand) or the native language.
   One remembered setting: the same chips on the quest list and on the start screen.
   Written in Russian and in the student's language — they may not read Russian yet. */
export function QuestModePicker({ fixedLang }) {
  const storedLang = useQuestStore((s) => s.nativeLang);
  const nativeLang = fixedLang || storedLang;
  const mode = useQuestStore((s) => s.mode);
  const setMode = useQuestStore((s) => s.setMode);
  const ru = questUi('ru');
  const nat = nativeLang && questUi(nativeLang);

  if (!nativeLang) {
    return <p className="supporting-text">Сначала выберите страну или родной язык — тогда можно будет выбрать, на каком языке проходить квест.</p>;
  }
  return (
    <div className="mode-picker">
      <p className="mode-picker__question">
        <span lang="ru">{ru.chooseMode}</span>
        <span {...langProps(nativeLang)}> · {nat.chooseMode}</span>
      </p>
      <ChipGroup label={ru.chooseMode}>
        <Chip selected={mode === 'ru'} onClick={() => setMode('ru')}>
          <span lang="ru">{ru.modeRu}</span>
        </Chip>
        <Chip selected={mode === 'native'} onClick={() => setMode('native')}>
          <span {...langProps(nativeLang)}>{LANGUAGES[nativeLang].native}</span>
        </Chip>
      </ChipGroup>
      {mode === 'ru' && (
        <p className="mode-picker__about">
          <span lang="ru">{ru.modeRuAbout}</span>
          <span {...langProps(nativeLang)}>{nat.modeRuAbout}</span>
        </p>
      )}
      {mode === 'native' && (
        <p className="mode-picker__about">
          <span {...langProps(nativeLang)}>{nat.modeNativeAbout}</span>
          <span lang="ru">{ru.modeNativeAbout}</span>
        </p>
      )}
    </div>
  );
}
