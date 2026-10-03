import { Icon } from '@/shared/ui';
import { exhibitCaption } from '../lib/exhibit';
import './ExhibitCard.css';

/* The exhibit a task is about, as on the museum label (Russian, like the labels in the halls). */
export function ExhibitCard({ exhibit }) {
  return (
    <div className="exhibit-card" lang="ru" dir="auto">
      <span className="exhibit-card__icon" aria-hidden="true"><Icon name="star" /></span>
      <span className="exhibit-card__text">
        <span className="exhibit-card__name">{exhibit.name}</span>
        <span className="exhibit-card__meta">{exhibitCaption(exhibit)}</span>
        {exhibit.material && <span className="exhibit-card__meta">{exhibit.material}</span>}
      </span>
    </div>
  );
}
