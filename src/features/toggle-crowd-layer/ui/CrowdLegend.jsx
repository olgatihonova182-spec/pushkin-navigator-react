import { CROWD_LEVELS, CrowdBadge } from '@/entities/crowd';

export function CrowdLegend() {
  return (
    <div className="crowd-legend" aria-label="Обозначения">
      {CROWD_LEVELS.map((level) => (
        <CrowdBadge key={level} level={level} withDots />
      ))}
    </div>
  );
}
