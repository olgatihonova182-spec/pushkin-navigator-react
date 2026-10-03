import { DRAWINGS } from './drawings';
import './Illustration.css';

export function Illustration({ name, className }) {
  const Drawing = DRAWINGS[name];
  return (
    <svg className={className} viewBox="0 0 360 150" aria-hidden="true" focusable="false">
      <Drawing />
    </svg>
  );
}
