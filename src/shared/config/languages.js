/* Languages of the quests. `name` — in Russian (for the app UI), `native` — the language's own name.
   A new language — one line here, then its texts in entities/quest (strings and quest data). */
export const LANGUAGES = {
  ru: { id: 'ru', name: 'Русский', native: 'Русский', dir: 'ltr' },
  en: { id: 'en', name: 'Английский', native: 'English', dir: 'ltr' },
  zh: { id: 'zh', name: 'Китайский', native: '中文', dir: 'ltr' },
  ar: { id: 'ar', name: 'Арабский', native: 'العربية', dir: 'rtl' },
  es: { id: 'es', name: 'Испанский', native: 'Español', dir: 'ltr' },
  fr: { id: 'fr', name: 'Французский', native: 'Français', dir: 'ltr' },
};

/* Native languages a student can pick (Russian is the language they are learning). */
export const NATIVE_LANGUAGES = ['en', 'zh', 'ar', 'es', 'fr'];

/* lang and dir attributes for an element with text in this language. */
export function langProps(lang) {
  return { lang, dir: LANGUAGES[lang].dir };
}
