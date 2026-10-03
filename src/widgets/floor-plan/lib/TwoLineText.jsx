/* Long SVG label — in two lines at the space nearest to the middle. */
export function TwoLineText({ text, x }) {
  if (text.length <= 11 || !text.includes(' ')) return text;
  const mid = Math.floor(text.length / 2);
  let best = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ' && (best === -1 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  }
  return (
    <>
      <tspan x={x} dy="-0.55em">{text.slice(0, best)}</tspan>
      <tspan x={x} dy="1.15em">{text.slice(best + 1)}</tspan>
    </>
  );
}
