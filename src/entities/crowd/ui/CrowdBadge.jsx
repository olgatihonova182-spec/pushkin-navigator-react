import { CROWD_LABELS } from '../model/crowd';
import './CrowdBadge.css';

/* Crowd level not by colour only: the legend variant adds dots (0 — ring, 1 — one, 2 — two). */
export function CrowdBadge({ level, withDots = false, suffix = '' }) {
  const classes = ['crowd-badge', `crowd-badge--${level}`, withDots && `crowd-badge--dots-${level}`].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {CROWD_LABELS[level]}
      {suffix}
    </span>
  );
}

/* Same marks inside the SVG plan, in the corner of a hall. */
export function CrowdDots({ level, x, y }) {
  if (level === 0) return <circle className="crowd-dot crowd-dot--empty" cx={x} cy={y} r="3" />;
  return Array.from({ length: level }, (_, i) => <circle key={i} className="crowd-dot" cx={x - i * 8} cy={y} r="3" />);
}
