import './MeMarker.css';

/* "You are here" dot with a pulsing halo, for SVG maps. */
export function MeMarker({ x, y }) {
  return (
    <g className="me-marker" transform={`translate(${x} ${y})`}>
      <circle r="11" className="me-marker__halo" />
      <circle r="5.5" className="me-marker__dot" />
    </g>
  );
}
