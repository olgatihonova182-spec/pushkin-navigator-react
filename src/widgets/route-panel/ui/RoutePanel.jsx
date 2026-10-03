import { Icon, Panel, TimeChip, ButtonRow } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { plural } from '@/shared/lib';
import { getBuilding } from '@/entities/building';
import { getHall, hallLabel } from '@/entities/hall';
import { getTour } from '@/entities/tour';
import { useRouteStore, toMinutes } from '@/entities/route';
import { AvoidCrowdSwitch, NoStairsSwitch } from '@/features/route-settings';
import { ArriveButton, FinishRouteButton, NextStopButton, showStep } from '@/features/route-progress';
import './RoutePanel.css';

/* Card under the map with an active route: summary, current stop, settings, steps. */
export function RoutePanel() {
  const route = useRouteStore((s) => s.route);
  const building = useUiStore((s) => s.building);
  const floor = useUiStore((s) => s.floor);

  const tour = route.tourId && getTour(route.tourId);
  const many = route.targets.length > 1;
  const start = getHall(route.from);
  const fromText = route.fromEntrance
    ? `вход, ${getBuilding(start.building).shortName}`
    : start.shortName + (start.number ? `, зал ${start.number}` : '');
  const title = tour ? tour.name : many ? 'Ваш маршрут' : `До «${getHall(route.targets[route.targets.length - 1]).shortName}»`;
  const count = route.targets.length;

  return (
    <Panel className="panel--route" label="Маршрут">
      <div className="panel__row">
        <div className="panel__text">
          <div className="supporting-text">
            {many ? `Маршрут · ${count} ${plural(count, 'остановка', 'остановки', 'остановок')}` : 'Маршрут'}
          </div>
          <h2 className="panel__title">{title}</h2>
          <div className="supporting-text">От: {fromText}</div>
          {route.fromEntrance && (
            <div className="supporting-text">Уже внутри? Нажмите на свой зал и выберите «Я здесь».</div>
          )}
        </div>
        <TimeChip>≈ {toMinutes(route.seconds)} мин пешком</TimeChip>
      </div>

      {many && route.step < count && <CurrentStop route={route} tour={tour} />}
      {many && route.step >= count && (
        <div className="stop">
          <div className="panel__name"><Icon name="flag" /> Маршрут пройден</div>
        </div>
      )}

      <div className="settings-row">
        <NoStairsSwitch />
        <AvoidCrowdSwitch />
      </div>

      {route.steps.length > 0 && (
        <ol className="steps">
          {route.steps.map((step, i) => (
            <li key={i}>
              <button
                type="button"
                className={`step state-layer${step.building === building && step.floor === floor ? ' step--here' : ''}`}
                onClick={() => showStep(i)}
              >
                <span className="step__icon"><Icon name={step.type} /></span>
                <span>{step.text}</span>
              </button>
            </li>
          ))}
        </ol>
      )}

      <ButtonRow>
        {!many && <ArriveButton />}
        <FinishRouteButton />
      </ButtonRow>
    </Panel>
  );
}

function CurrentStop({ route, tour }) {
  const { targets, step } = route;
  const current = getHall(targets[step]);
  const riddle = tour?.riddles?.[current.id];
  const isLast = step === targets.length - 1;
  return (
    <div className="stop">
      <div className="stop__progress" aria-hidden="true">
        {targets.map((id, i) => (
          <span key={`${id}-${i}`} className={i < step ? 'is-passed' : i === step ? 'is-current' : ''} />
        ))}
      </div>
      <div className="supporting-text">Остановка {step + 1} из {targets.length}</div>
      <div className="panel__name">{hallLabel(current)}</div>
      {riddle && (
        <p className="riddle">
          <Icon name="search" />
          <span>{riddle}</span>
        </p>
      )}
      {!isLast && (
        <div className="supporting-text">
          Потом: {targets.slice(step + 1).map((id) => getHall(id).shortName).join(' → ')}
        </div>
      )}
      <NextStopButton isLast={isLast} />
    </div>
  );
}
