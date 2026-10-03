/* Multilingual text is an object { ru, en, zh, … } or a plain string (same in every language). */
export function pick(text, lang) {
  if (text == null || typeof text === 'string' || typeof text === 'number') return text;
  return text[lang] ?? text.ru;
}

/* fill('Задание {n} из {m}', { n: 1, m: 7 }) → 'Задание 1 из 7' */
export function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? vars[key] : `{${key}}`));
}
