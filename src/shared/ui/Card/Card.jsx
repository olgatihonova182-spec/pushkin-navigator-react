import './Card.css';

export function CardList({ children }) {
  return <div className="card-list">{children}</div>;
}

/* Filled M3 card: optional picture on top, body below. */
export function Card({ image, className = '', children }) {
  return (
    <article className={`card ${className}`.trim()}>
      {image}
      <div className="card__body">{children}</div>
    </article>
  );
}
