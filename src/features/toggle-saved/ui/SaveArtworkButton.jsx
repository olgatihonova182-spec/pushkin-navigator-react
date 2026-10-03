import { Button } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { useVisitorStore } from '@/entities/visitor';

export function SaveArtworkButton({ artworkId }) {
  const saved = useVisitorStore((s) => s.saved.includes(artworkId));
  const onClick = () => {
    const added = useVisitorStore.getState().toggleSaved(artworkId);
    useUiStore.getState().announce(added ? 'Добавлено в «Хочу увидеть»' : 'Убрано из «Хочу увидеть»');
  };
  return (
    <Button variant="outlined" icon="star" iconFilled={saved} aria-pressed={saved} onClick={onClick}>
      {saved ? 'В списке' : 'Хочу увидеть'}
    </Button>
  );
}
