import { useLayoutEffect, useRef } from 'react';
import { useUiStore } from '@/shared/model';

function jumpTo(el, top) {
  el.style.scrollBehavior = 'auto';
  el.scrollTop = top;
  el.style.scrollBehavior = '';
}

/* Scrollable screen. A new tab opens at the top; the same tab keeps its place,
   unless an action asked to show the map (route built, step shown). */
export function Screen({ inert, children }) {
  const ref = useRef(null);
  const tab = useUiStore((s) => s.tab);
  const scrollToMapRequest = useUiStore((s) => s.scrollToMapRequest);
  const prev = useRef({ tab, scrollToMapRequest });

  useLayoutEffect(() => {
    const el = ref.current;
    const p = prev.current;
    prev.current = { tab, scrollToMapRequest };
    if (scrollToMapRequest !== p.scrollToMapRequest) {
      const field = el.querySelector('.map-field');
      jumpTo(el, field ? Math.max(0, field.offsetTop - 8) : 0);
    } else if (tab !== p.tab) {
      jumpTo(el, 0);
    }
  }, [tab, scrollToMapRequest]);

  return (
    <main ref={ref} className="screen" tabIndex={-1} inert={inert}>
      {children}
    </main>
  );
}
