import { Button, EmptyState, List, PageHeader, Subheading } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { TAB } from '@/shared/config';
import { ARTWORKS, getArtwork, ArtworkRow } from '@/entities/artwork';
import { getHall, hallLabel, hallLocation } from '@/entities/hall';
import { useVisitorStore } from '@/entities/visitor';
import { openArtwork } from '@/features/open-place';
import { BuildSavedRouteButton } from '@/features/build-route';
import { NoStairsSwitch } from '@/features/route-settings';
import './VisitPage.css';

/* "My visit": saved, seen, where I am. */
export function VisitPage() {
  const me = useVisitorStore((s) => s.me);
  const saved = useVisitorStore((s) => s.saved);
  const seen = useVisitorStore((s) => s.seen);
  const setTab = useUiStore((s) => s.setTab);
  const total = ARTWORKS.length;

  const row = (id) => {
    const a = getArtwork(id);
    return (
      <ArtworkRow key={id} artwork={a} saved={saved.includes(id)} seen={seen.includes(id)} onClick={() => openArtwork(id)} />
    );
  };

  return (
    <>
      <PageHeader title="Мой визит" />

      <section className="section-block">
        <Subheading>Хочу увидеть</Subheading>
        {saved.length === 0 ? (
          <EmptyState illustration="bookmark">
            <p>Пока пусто. В карточке работы нажмите «Хочу увидеть» — из сохранённого соберём маршрут.</p>
            <Button variant="tonal" icon="search" onClick={() => setTab(TAB.search)}>
              Найти работу
            </Button>
          </EmptyState>
        ) : (
          <>
            <List>{saved.map(row)}</List>
            <BuildSavedRouteButton />
          </>
        )}
      </section>

      <section className="section-block">
        <Subheading>Увидено</Subheading>
        <div className="counter">
          <span className="counter__value">{seen.length}</span> из {total} работ в приложении
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Увидено"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={seen.length}
        >
          {seen.length > 0 && <span style={{ width: `${Math.round((seen.length / total) * 100)}%` }} />}
          <i />
        </div>
        {seen.length > 0 && <List>{seen.map(row)}</List>}
      </section>

      <section className="section-block">
        <Subheading>Как вести</Subheading>
        <NoStairsSwitch>Без лестниц — только лифт</NoStairsSwitch>
        <p className="supporting-text">
          {me ? `Вы здесь: ${hallLabel(getHall(me))}, ${hallLocation(getHall(me))}` : 'Где вы, пока не отмечено.'}
        </p>
      </section>
    </>
  );
}
