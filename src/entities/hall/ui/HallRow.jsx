import { Icon, ListRow } from '@/shared/ui';
import { hallLocation } from '../lib/hall';

/* Hall in a list (search results). */
export function HallRow({ hall, onClick }) {
  const title = hall.number ? hall.name.replace(/^Зал \d+ · /, '') : hall.name;
  return (
    <ListRow
      badge={hall.number ? hall.number : <Icon name="hall" />}
      badgeVariant="hall"
      title={title}
      subtitle={(hall.number ? `Зал ${hall.number} · ` : '') + hallLocation(hall)}
      onClick={onClick}
    />
  );
}
