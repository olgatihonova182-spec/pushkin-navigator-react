import { plural } from '@/shared/lib';
import { getExhibit } from '@/entities/exhibit';
import { zachetHall, storyLanguage, ZACHET_UI, useZachetStore } from '@/entities/zachet';

/* Small helpers shared by the screens of the flow. */

export function useUi() {
  const uiLang = useZachetStore((s) => s.uiLang);
  return { uiLang, ui: ZACHET_UI[uiLang] };
}

/* Exhibit name for the interface language: English when the catalogue has it, else Russian
   (as on the museum labels). */
export function exhibitName(exhibit, uiLang) {
  return uiLang === 'en' && exhibit.nameEn ? exhibit.nameEn : exhibit.name;
}

/* «Зал 1 · Искусство Древнего Египта» — the number only where it is confirmed. */
export function hallLine(exhibit, uiLang, ui) {
  const hall = zachetHall(exhibit.museumHall);
  if (!hall) return '';
  const name = hall.name[uiLang] || hall.name.ru;
  return hall.number ? `${ui.hall.replace('{n}', hall.number)} · ${name}` : name;
}

export function stopsLabel(n, uiLang, ui) {
  return uiLang === 'ru' ? `${n} ${plural(n, 'остановка', 'остановки', 'остановок')}` : ui.stopsCount.replace('{n}', n);
}

export function textDir(route) {
  return route ? storyLanguage(route.lang).dir || 'auto' : 'auto';
}

export { getExhibit };
