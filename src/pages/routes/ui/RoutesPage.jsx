import { CardList, EmptyState, PageHeader } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { plural } from '@/shared/lib';
import { getBuilding } from '@/entities/building';
import { getHall } from '@/entities/hall';
import { toursForTime, TourCard, OwnRouteCard } from '@/entities/tour';
import { useVisitorStore } from '@/entities/visitor';
import { TimeFilterChips } from '@/features/filter-tours-by-time';
import { BuildSavedRouteButton, StartTourButton } from '@/features/build-route';

/* "Routes": ready-made routes with a time filter and a route from saved works. */
export function RoutesPage() {
  const timeFilter = useUiStore((s) => s.timeFilter);
  const savedCount = useVisitorStore((s) => s.saved.length);
  const tours = toursForTime(timeFilter);
  return (
    <>
      <PageHeader title="Маршруты">
        <div className="supporting-text">Сколько у вас времени?</div>
        <TimeFilterChips />
      </PageHeader>
      <CardList>
        {savedCount > 0 && (
          <OwnRouteCard
            tag="Ваш маршрут"
            title="Всё, что вы сохранили"
            text={`${savedCount} ${plural(savedCount, 'работа', 'работы', 'работ')} — соберём путь от ближайшей к дальней.`}
            action={<BuildSavedRouteButton />}
          />
        )}
        {tours.length === 0 && (
          <EmptyState illustration="bench">
            <p>На это время готовых маршрутов нет — посмотрите «До часа».</p>
          </EmptyState>
        )}
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            meta={`${tour.stops.length} остановок · ${tourBuildings(tour).join(' и ')}`}
            action={<StartTourButton tourId={tour.id} />}
          />
        ))}
      </CardList>
    </>
  );
}

function tourBuildings(tour) {
  const names = [];
  tour.stops.forEach((id) => {
    const name = getBuilding(getHall(id).building).shortName;
    if (!names.includes(name)) names.push(name);
  });
  return names;
}
