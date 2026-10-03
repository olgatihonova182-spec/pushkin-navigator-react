/* Text normalisation for search: lower case, ё → е, punctuation → spaces. */
export function normalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[«»"().,·—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
