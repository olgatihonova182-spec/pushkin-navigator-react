import { Button, Chip, ChipGroup, Icon } from '@/shared/ui';
import { useZachetStore, UI_LANGS } from '@/entities/zachet';
import { useUi } from './common';

const PROMISE_ICONS = ['translate', 'communication', 'clock'];

/* 1. Welcome: the plot in two sentences, the pain, three promises, the interface language. */
export function WelcomeScreen() {
  const { uiLang, ui } = useUi();
  const setUiLang = useZachetStore((s) => s.setUiLang);
  const go = useZachetStore((s) => s.go);
  return (
    <section className="zachet-screen">
      <p className="zachet__lead">{ui.plot}</p>
      <p className="supporting-text">{ui.pain}</p>
      <ul className="zachet__promises">
        {ui.promises.map((p, i) => (
          <li key={p}>
            <span className="icon-circle"><Icon name={PROMISE_ICONS[i]} /></span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="zachet__field">
        <span className="zachet__label">{ui.uiLang}</span>
        <ChipGroup label={ui.uiLang}>
          {UI_LANGS.map((l) => (
            <Chip key={l.id} selected={uiLang === l.id} onClick={() => setUiLang(l.id)}>
              <span lang={l.id}>{l.name}</span>
            </Chip>
          ))}
        </ChipGroup>
      </div>
      <Button variant="filled" icon="next" onClick={() => go('params')}>{ui.start}</Button>
    </section>
  );
}
