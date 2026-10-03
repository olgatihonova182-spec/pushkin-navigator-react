import { Card, Illustration, TimeChip } from '@/shared/ui';

/* Ready-made route card. `meta` — stops and buildings line, `action` — the start button. */
export function TourCard({ tour, meta, action }) {
  return (
    <Card image={<Illustration name={tour.drawing} className="card__image" />}>
      <div className="card__top">
        <span className="card__tag">{tour.tag}</span>
        <TimeChip>{tour.minutes} мин</TimeChip>
      </div>
      <h2 className="card__title">{tour.name}</h2>
      <p className="card__text">{tour.about}</p>
      <p className="card__meta">{meta}</p>
      {action}
    </Card>
  );
}

/* Highlighted card on the primary container, e.g. "your own route". */
export function OwnRouteCard({ tag, title, text, action }) {
  return (
    <Card className="card--own">
      <span className="card__tag">{tag}</span>
      <h2 className="card__title">{title}</h2>
      <p className="card__text">{text}</p>
      {action}
    </Card>
  );
}
