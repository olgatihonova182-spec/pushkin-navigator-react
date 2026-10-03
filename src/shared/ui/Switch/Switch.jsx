import './Switch.css';

/* M3 switch: track 52×32, thumb 16 → 24 when on. */
export function Switch({ checked, onChange, children }) {
  return (
    <button type="button" className="switch" role="switch" aria-checked={checked} onClick={onChange}>
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      <span>{children}</span>
    </button>
  );
}
