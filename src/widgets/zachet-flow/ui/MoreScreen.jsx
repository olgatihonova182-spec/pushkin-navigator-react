import { Button } from '@/shared/ui';
import { useZachetStore } from '@/entities/zachet';
import { ReturnHereButton } from '@/features/zachet-save';
import { useUi } from './common';

/* 6. «What else is here»: the two buildings on Volkhonka. The Gallery is only shown — the route
   does not lead there. «I'll come back» puts it on the postcard's «next time» list. */
export function MoreScreen() {
  const { ui } = useUi();
  const go = useZachetStore((s) => s.go);
  return (
    <section className="zachet-screen">
      <h2 className="t-headline-s">{ui.moreTitle}</h2>
      <svg className="zachet__scheme" viewBox="0 0 340 170" role="img" aria-label={`${ui.moreHere}. ${ui.moreGallery}.`}>
        <rect className="il-sky" width="340" height="170" />
        <rect className="il-wall" x="0" y="128" width="340" height="22" />
        <path className="il-line" d="M0 128h340M0 150h340" />
        <text className="zachet__scheme-street" x="170" y="143">ул. Волхонка</text>
        <g>
          <rect className="il-wall" x="24" y="44" width="150" height="84" />
          <path className="il-line" d="M24 128V44h150v84M60 44l39-22 39 22" />
          <rect className="il-accent" x="92" y="98" width="14" height="30" rx="2" />
          <text className="zachet__scheme-label" x="99" y="70">12</text>
          <circle className="zachet__scheme-me" cx="99" cy="86" r="6" />
        </g>
        <g>
          <rect className="il-wall" x="210" y="62" width="104" height="66" />
          <path className="il-line" d="M210 128V62h104v66M236 62l26-14 26 14" />
          <text className="zachet__scheme-label" x="262" y="96">14</text>
        </g>
      </svg>
      <div className="zachet__block">
        <span className="zachet__label">{ui.moreHere}</span>
        <p>{ui.moreHereText}</p>
      </div>
      <div className="zachet__block">
        <span className="zachet__label">{ui.moreGallery}</span>
        <p>{ui.moreGalleryText}</p>
        <p className="supporting-text">{ui.moreNote}</p>
        <ReturnHereButton id="gallery" />
      </div>
      <Button variant="filled" onClick={() => go('book')}>{ui.toBook}</Button>
    </section>
  );
}
