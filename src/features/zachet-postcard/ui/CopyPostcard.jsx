import { useState } from 'react';
import { Button } from '@/shared/ui';
import { useZachetStore, ZACHET_UI } from '@/entities/zachet';

/* Copies the postcard text; if the browser does not allow it, says so. */
export function CopyPostcard({ text }) {
  const uiLang = useZachetStore((s) => s.uiLang);
  const ui = ZACHET_UI[uiLang];
  const [status, setStatus] = useState(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(ui.copied);
    } catch {
      setStatus(ui.copyFailed);
    }
  };
  return (
    <>
      <Button variant="filled" icon="check" onClick={copy}>{ui.copy}</Button>
      {status && <p className="supporting-text" role="status">{status}</p>}
    </>
  );
}
