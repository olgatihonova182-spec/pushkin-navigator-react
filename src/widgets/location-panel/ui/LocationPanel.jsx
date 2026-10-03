import { Icon, Panel } from '@/shared/ui';
import { getHall, hallLabel, hallLocation } from '@/entities/hall';
import { useVisitorStore } from '@/entities/visitor';
import { ResetLocationButton } from '@/features/mark-location';

/* Card under the map when there is no route: where the visitor is, or a hint. */
export function LocationPanel() {
  const me = useVisitorStore((s) => s.me);
  if (me) {
    const hall = getHall(me);
    return (
      <Panel>
        <div className="panel__row">
          <span className="icon-circle"><Icon name="me" /></span>
          <div className="panel__text">
            <div className="supporting-text">Вы здесь</div>
            <div className="panel__name">{hallLabel(hall)}</div>
            <div className="supporting-text">{hallLocation(hall)}</div>
          </div>
          <ResetLocationButton />
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <p className="panel__hint">
        <span className="icon-circle"><Icon name="compass" /></span>
        <span>
          Нажмите на зал: покажем, что в нём, и проложим путь. Чтобы путь шёл от вас, в зале, где вы стоите,
          выберите «Я здесь».
        </span>
      </p>
    </Panel>
  );
}
