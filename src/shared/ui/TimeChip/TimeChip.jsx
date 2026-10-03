import { Icon } from '../Icon/Icon';
import './TimeChip.css';

/* M3 assist chip with a clock. */
export function TimeChip({ children }) {
  return (
    <span className="time-chip">
      <Icon name="clock" />
      <span>{children}</span>
    </span>
  );
}
