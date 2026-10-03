import './Panel.css';

/* Filled M3 card under the map. */
export function Panel({ className = '', label, children }) {
  return (
    <section className={`panel ${className}`.trim()} aria-label={label}>
      {children}
    </section>
  );
}
