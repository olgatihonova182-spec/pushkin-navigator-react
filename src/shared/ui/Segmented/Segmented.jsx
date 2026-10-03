import { Icon } from '../Icon/Icon';
import './Segmented.css';

/* M3 segmented buttons: 40 high, full rounding, shared outline. */
export function Segmented({ label, children }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {children}
    </div>
  );
}

export function SegmentedItem({ selected, onClick, children }) {
  return (
    <button type="button" className="segmented__item" aria-pressed={selected} onClick={onClick}>
      {selected && <Icon name="selected" />}
      {children}
    </button>
  );
}
