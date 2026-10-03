import { Button } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { useVisitorStore } from '@/entities/visitor';

export function SeenArtworkButton({ artworkId }) {
  const seen = useVisitorStore((s) => s.seen.includes(artworkId));
  const onClick = () => {
    const added = useVisitorStore.getState().toggleSeen(artworkId);
    useUiStore.getState().announce(added ? 'Отмечено увиденным' : 'Отметка снята');
  };
  return (
    <Button variant="outlined" icon="seen" iconFilled={seen} aria-pressed={seen} onClick={onClick}>
      {seen ? 'Увидено' : 'Отметить увиденным'}
    </Button>
  );
}
