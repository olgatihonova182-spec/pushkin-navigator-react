import { Icon } from '../Icon/Icon';
import './List.css';

export function List({ children }) {
  return <div className="list">{children}</div>;
}

export function Subheading({ as: Tag = 'h2', children }) {
  return <Tag className="subheading">{children}</Tag>;
}

/* M3 list item: leading badge, text block, trailing marks and a chevron. */
export function ListRow({ badge, badgeVariant, overline, title, subtitle, marks, onClick }) {
  const badgeClass = badgeVariant ? `list-row__badge list-row__badge--${badgeVariant}` : 'list-row__badge';
  return (
    <button type="button" className="list-row state-layer" onClick={onClick}>
      <span className={badgeClass} aria-hidden="true">
        {badge}
      </span>
      <span className="list-row__text">
        {overline && <span className="list-row__subtitle">{overline}</span>}
        <span className="list-row__title">{title}</span>
        {subtitle && <span className="list-row__subtitle">{subtitle}</span>}
      </span>
      <span className="list-row__marks">
        {marks}
        <Icon name="chevron" />
      </span>
    </button>
  );
}
