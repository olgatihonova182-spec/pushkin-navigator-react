import { Button } from '@/shared/ui';
import { useZachetStore, ZACHET_UI } from '@/entities/zachet';

/* «I'll come back»: the place goes to the postcard's «next time» list. Tap again to remove. */
export function ReturnHereButton({ id }) {
  const uiLang = useZachetStore((s) => s.uiLang);
  const saved = useZachetStore((s) => s.saved.includes(id));
  const toggleSaved = useZachetStore((s) => s.toggleSaved);
  const ui = ZACHET_UI[uiLang];
  return (
    <Button variant={saved ? 'tonal' : 'outlined'} icon={saved ? 'check' : 'visit'} aria-pressed={saved} onClick={() => toggleSaved(id)}>
      {saved ? ui.saved : ui.returnHere}
    </Button>
  );
}
