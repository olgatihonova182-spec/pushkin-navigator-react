import './MapSurface.css';

/* SVG map card with a footnote under it: floor plans and the campus map. */
export function MapSurface({ viewBox, label, className = '', footnote, children }) {
  return (
    <>
      <svg className={`map-surface ${className}`.trim()} viewBox={viewBox} role="group" aria-label={label}>
        {children}
      </svg>
      {footnote && <p className="footnote">{footnote}</p>}
    </>
  );
}
