import { ICONS } from '../../config/icons';

/* Material Symbols icon. Decorative: hidden from screen readers. */
export function Icon({ name, filled = false, className = '' }) {
  const classes = ['ms', filled && 'ms-fill', className].filter(Boolean).join(' ');
  return (
    <span className={classes} aria-hidden="true">
      {ICONS[name]}
    </span>
  );
}

export function IconButton({ icon, label, className = '', ...rest }) {
  return (
    <button type="button" className={`icon-btn state-layer ${className}`.trim()} aria-label={label} {...rest}>
      <Icon name={icon} />
    </button>
  );
}
