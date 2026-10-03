import { Chip, ChipGroup } from '@/shared/ui';
import { LANGUAGES, NATIVE_LANGUAGES, langProps } from '@/shared/config';
import { useQuestStore } from '@/entities/quest';

/* The student's native language: chosen once, remembered for every quest. */
export function NativeLanguagePicker({ label }) {
  const nativeLang = useQuestStore((s) => s.nativeLang);
  const setNativeLang = useQuestStore((s) => s.setNativeLang);
  return (
    <ChipGroup label={label}>
      {NATIVE_LANGUAGES.map((id) => (
        <Chip key={id} selected={nativeLang === id} onClick={() => setNativeLang(id)}>
          <span {...langProps(id)}>{LANGUAGES[id].native}</span>
        </Chip>
      ))}
    </ChipGroup>
  );
}
