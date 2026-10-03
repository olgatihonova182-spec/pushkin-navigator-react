import { Icon } from '../Icon/Icon';
import './Button.css';

/* M3 button. variant: filled | tonal | outlined | text. */
export function Button({ variant = 'outlined', icon, iconFilled = false, className = '', children, ...rest }) {
  return (
    <button type="button" className={`btn state-layer btn--${variant} ${className}`.trim()} {...rest}>
      {icon && <Icon name={icon} filled={iconFilled} />}
      {children}
    </button>
  );
}

export function ButtonRow({ children }) {
  return <div className="buttons">{children}</div>;
}
