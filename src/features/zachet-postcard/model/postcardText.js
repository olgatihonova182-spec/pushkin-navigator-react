/* The postcard as plain text — what «Copy the postcard» puts on the clipboard. Pure. */
export function postcardText({ title, captions, phrase, nextTimeTitle, nextTime }) {
  const lines = [title, '', ...captions.map((c) => `✓ ${c}`)];
  if (phrase && phrase.trim()) lines.push('', phrase.trim());
  if (nextTime.length) lines.push('', `${nextTimeTitle}:`, ...nextTime.map((n) => `• ${n}`));
  lines.push('', 'ГМИИ им. А. С. Пушкина · Волхонка, 12');
  return lines.join('\n');
}
