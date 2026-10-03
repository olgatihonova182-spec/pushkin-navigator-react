import { langProps } from '@/shared/config';
import { pick } from '@/shared/lib';
import './LocalizedText.css';

/* Text in the quest language; with `translateTo` — the translation right under it. */
export function LocalizedText({ text, lang, translateTo, as: Tag = 'p', className = '' }) {
  if (text == null) return null;
  const main = pick(text, lang);
  const translation = translateTo && translateTo !== lang ? pick(text, translateTo) : null;
  return (
    <>
      <Tag className={className} {...langProps(lang)}>
        {main}
      </Tag>
      {translation && translation !== main && (
        <p className="translation" {...langProps(translateTo)}>
          {translation}
        </p>
      )}
    </>
  );
}
