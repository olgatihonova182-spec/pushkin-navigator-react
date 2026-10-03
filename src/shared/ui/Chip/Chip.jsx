import { Icon } from '../Icon/Icon';
import './Chip.css';

/* M3 filter chip: selected one gets a check mark. */
export function Chip({ selected = false, onClick, children }) {
  return (
    <button type="button" className="chip state-layer" aria-pressed={selected} onClick={onClick}>
      {selected && <Icon name="selected" />}
      {children}
    </button>
  );
}

export function ChipGroup({ label, children }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {children}
    </div>
  );
}
