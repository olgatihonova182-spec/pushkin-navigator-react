import { IconButton } from '@/shared/ui';
import { useUiStore } from '@/shared/model';

export function SheetHeader({ title, subtitle }) {
  const closeSheet = useUiStore((s) => s.closeSheet);
  return (
    <>
      <div className="sheet__handle" aria-hidden="true" />
      <div className="sheet__header">
        <div>
          <h2 className="sheet__title" id="sheet-title">{title}</h2>
          {subtitle && <div className="supporting-text">{subtitle}</div>}
        </div>
        <IconButton icon="close" label="Закрыть" data-sheet-close onClick={closeSheet} />
      </div>
    </>
  );
}
