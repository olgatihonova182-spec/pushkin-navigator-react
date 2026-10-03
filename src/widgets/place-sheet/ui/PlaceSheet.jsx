import { useEffect, useLayoutEffect, useRef } from 'react';
import { useUiStore } from '@/shared/model';
import { HallSheet } from './HallSheet';
import { ArtworkSheet } from './ArtworkSheet';
import { BuildingSheet } from './BuildingSheet';
import './PlaceSheet.css';

const CONTENT = {
  hall: HallSheet,
  artwork: ArtworkSheet,
  building: BuildingSheet,
};

const DRAG_CLOSE_DISTANCE = 90;

/* Modal M3 bottom sheet. Focus goes to "Close" when it opens or changes content, and back to
   whatever opened it when it closes. Esc, the scrim and dragging down by the handle close it. */
export function PlaceSheet() {
  const sheet = useUiStore((s) => s.sheet);
  const closeSheet = useUiStore((s) => s.closeSheet);
  const sheetRef = useRef(null);
  const openerRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const prevSheetRef = useRef(null);
  const dragRef = useRef(null);

  // Remember what had focus outside the sheet: that is what opened it.
  useEffect(() => {
    const onFocusIn = (e) => {
      if (!sheetRef.current || !sheetRef.current.contains(e.target)) lastFocusedRef.current = e.target;
    };
    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, []);

  useLayoutEffect(() => {
    const prev = prevSheetRef.current;
    prevSheetRef.current = sheet;
    const focusClose = () => sheetRef.current?.querySelector('[data-sheet-close]')?.focus({ preventScroll: true });
    if (sheet && !prev) {
      openerRef.current = lastFocusedRef.current;
      focusClose();
    } else if (sheet && prev && (prev.kind !== sheet.kind || prev.id !== sheet.id)) {
      focusClose();
    } else if (!sheet && prev) {
      const opener = openerRef.current;
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    }
  }, [sheet]);

  useEffect(() => {
    if (!sheet) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeSheet();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [sheet, closeSheet]);

  // Dragging by the handle or header: further than 90 px — close, otherwise snap back.
  const onPointerDown = (e) => {
    if (!e.target.closest('.sheet__handle, .sheet__header') || e.target.closest('button')) return;
    const el = sheetRef.current;
    dragRef.current = { y: e.clientY, el };
    el.style.transition = 'none';
    const onMove = (ev) => {
      const dy = Math.max(0, ev.clientY - dragRef.current.y);
      el.style.transform = `translateY(${dy}px)`;
    };
    const onUp = (ev) => {
      const dy = ev.clientY - dragRef.current.y;
      dragRef.current = null;
      el.style.transition = 'transform .2s';
      el.style.transform = '';
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      if (dy > DRAG_CLOSE_DISTANCE) closeSheet();
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  };

  if (!sheet) return null;
  const Content = CONTENT[sheet.kind];
  return (
    <>
      <div className="sheet-scrim" onClick={closeSheet} />
      <section
        ref={sheetRef}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onPointerDown={onPointerDown}
      >
        <Content id={sheet.id} />
      </section>
    </>
  );
}
