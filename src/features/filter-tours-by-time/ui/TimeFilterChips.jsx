import { Chip, ChipGroup } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { TIME_FILTERS } from '@/entities/tour';

export function TimeFilterChips() {
  const current = useUiStore((s) => s.timeFilter);
  const setTimeFilter = useUiStore((s) => s.setTimeFilter);
  return (
    <ChipGroup label="Сколько у вас времени">
      {TIME_FILTERS.map((f) => (
        <Chip key={f.id} selected={current === f.id} onClick={() => setTimeFilter(f.id)}>
          {f.label}
        </Chip>
      ))}
    </ChipGroup>
  );
}
