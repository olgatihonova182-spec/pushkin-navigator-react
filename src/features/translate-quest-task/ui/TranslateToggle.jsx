import { Button } from '@/shared/ui';
import { questUi } from '@/entities/quest';

/* In the Russian mode: show the task in the native language as well. The label is bilingual,
   so a student who does not understand the Russian word still finds the button. */
export function TranslateToggle({ on, onToggle, nativeLang }) {
  const ru = questUi('ru');
  const nat = questUi(nativeLang);
  const label = on ? `${ru.hideTranslation} · ${nat.hideTranslation}` : `${ru.translate} · ${nat.translate}`;
  return (
    <Button variant="tonal" icon="translate" aria-pressed={on} onClick={onToggle}>
      {label}
    </Button>
  );
}
