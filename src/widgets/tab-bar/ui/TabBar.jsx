import { Icon } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { TABS, TAB } from '@/shared/config';
import { useVisitorStore } from '@/entities/visitor';
import './TabBar.css';

/* M3 navigation bar: 80 high, active indicator 56×32, the icon fills in. */
export function TabBar({ inert }) {
  const current = useUiStore((s) => s.tab);
  const setTab = useUiStore((s) => s.setTab);
  const savedCount = useVisitorStore((s) => s.saved.length);
  return (
    <nav className="tab-bar" aria-label="Разделы" inert={inert}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className="tab"
          aria-current={tab.id === current ? 'page' : undefined}
          onClick={() => setTab(tab.id)}
        >
          <span className="tab__indicator">
            <Icon name={tab.icon} />
            {tab.id === TAB.visit && savedCount > 0 && (
              <span className="tab__badge" aria-label={`сохранено ${savedCount}`}>{savedCount}</span>
            )}
          </span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
