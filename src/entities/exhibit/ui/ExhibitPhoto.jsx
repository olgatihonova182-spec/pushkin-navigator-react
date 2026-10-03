import { useState } from 'react';
import { photoUrl } from '../lib/exhibit';
import './ExhibitPhoto.css';

/* Photo from the museum website. If it does not load (offline, site unavailable), a quiet
   placeholder with the caption instead of a broken image. */
export function ExhibitPhoto({ exhibit, fallbackText }) {
  const [failed, setFailed] = useState(false);
  const url = photoUrl(exhibit);
  if (!url || failed) {
    return (
      <div className="exhibit-photo exhibit-photo--empty" role="img" aria-label={exhibit.name}>
        <span>{fallbackText}</span>
      </div>
    );
  }
  return (
    <img className="exhibit-photo" src={url} alt={exhibit.name} loading="lazy" onError={() => setFailed(true)} />
  );
}
