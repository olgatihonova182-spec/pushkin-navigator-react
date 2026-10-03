import { Illustration } from '../Illustration/Illustration';
import './EmptyState.css';

export function EmptyState({ illustration, children }) {
  return (
    <div className="empty-state">
      <Illustration name={illustration} />
      {children}
    </div>
  );
}
