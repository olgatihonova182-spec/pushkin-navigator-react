import { Icon } from '@/shared/ui';
import { useUiStore } from '@/shared/model';

export function SearchField() {
  const query = useUiStore((s) => s.query);
  const setQuery = useUiStore((s) => s.setQuery);
  return (
    <label className="search-bar">
      <Icon name="search" />
      <input
        type="search"
        autoComplete="off"
        placeholder="Картина, автор или номер зала"
        aria-label="Картина, автор или номер зала"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </label>
  );
}
