import './Stamp.css';

/* The «passed» stamp, as in a student record book. Decorative; the word is read out by its text. */
export function Stamp({ text, small = false }) {
  return <span className={small ? 'stamp stamp--small' : 'stamp'}>{text}</span>;
}
