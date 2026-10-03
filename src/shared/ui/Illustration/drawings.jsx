/* Own SVG illustrations, decorative. Colours are classes from Illustration.css, i.e. M3 roles,
   so drawings follow the light and dark scheme. A new drawing — one entry in DRAWINGS. */

function Columns({ x0, step, count, y1, y2 }) {
  return Array.from({ length: count }, (_, i) => {
    const x = x0 + i * step;
    return (
      <g key={i}>
        <rect className="il-wall" x={x} y={y1} width="9" height={y2 - y1} />
        <path
          className="il-line"
          d={`M${x} ${y1}v${y2 - y1}M${x + 9} ${y1}v${y2 - y1}M${x - 2} ${y1}h13M${x - 2} ${y2}h13`}
        />
      </g>
    );
  });
}

function Windows({ x0, step, count, y }) {
  return Array.from({ length: count }, (_, i) => (
    <path key={i} className="il-thin" d={`M${x0 + i * step} ${y + 22}v-14a6 6 0 0 1 12 0v14Z`} />
  ));
}

function Ripples({ y0, count }) {
  return Array.from({ length: count }, (_, i) => {
    const x = ((i * 53) % 340) + 10;
    const y = y0 + ((i * 17) % 60);
    return <path key={i} className="il-thin" d={`M${x} ${y}h${14 + (i % 3) * 8}`} />;
  });
}

export const DRAWINGS = {
  /* Main building: portico with columns, wings, trees; a dotted route leads to the doors. */
  facade: () => (
    <>
      <rect className="il-sky" width="360" height="150" />
      <circle className="il-sun" cx="300" cy="40" r="22" />
      <circle className="il-green" cx="26" cy="112" r="20" />
      <circle className="il-green" cx="338" cy="114" r="18" />
      <rect className="il-wall" x="40" y="72" width="280" height="58" />
      <path className="il-line" d="M40 130V72h280v58" />
      <Windows x0={52} step={20} count={3} y={88} />
      <Windows x0={256} step={20} count={3} y={88} />
      <path className="il-wall" d="M108 62 180 28l72 34Z" />
      <path className="il-line" d="M108 62 180 28l72 34Z" />
      <path className="il-thin" d="M128 58 180 36l52 22" />
      <rect className="il-wall" x="106" y="62" width="148" height="10" />
      <path className="il-line" d="M106 62h148v10H106Z" />
      <Columns x0={116} step={25} count={6} y1={72} y2={120} />
      <rect className="il-accent" x="168" y="76" width="24" height="30" rx="2" />
      <path className="il-line" d="M98 120h164M90 126h180M82 132h196" />
      <path className="il-line" d="M0 134h360" />
      <path className="il-path" d="M14 148c60-10 120 4 166-14" />
    </>
  ),
  /* Impressionists: sunrise over water, ripples, a boat. */
  sunrise: () => (
    <>
      <rect className="il-sky" width="360" height="150" />
      <rect className="il-water" y="84" width="360" height="66" />
      <path className="il-thin" d="M30 84V40M44 84V52M30 48h14M300 84V30M318 84V44M300 38h18" />
      <circle className="il-accent" cx="236" cy="62" r="16" />
      <path className="il-accent-line" d="M222 96h28M228 106h18M232 116h10" />
      <Ripples y0={92} count={16} />
      <path className="il-line" d="M120 118h44l-6 8h-32Z" />
      <path className="il-line" d="M140 118V98" />
      <path className="il-line" d="M0 84h360" />
    </>
  ),
  /* Casts: a Greek column, a Roman arch, a dotted journey between them. */
  column: () => (
    <>
      <rect className="il-sky" width="360" height="150" />
      <circle className="il-sun" cx="60" cy="40" r="18" />
      <path className="il-wall" d="M210 132V60h100v72h-28V96a22 22 0 0 0-44 0v36Z" />
      <path className="il-line" d="M210 132V60h100v72h-28V96a22 22 0 0 0-44 0v36ZM204 60h112M210 72h100" />
      <rect className="il-wall" x="112" y="34" width="34" height="98" />
      <path className="il-line" d="M112 34v98M146 34v98M122 38v90M129 38v90M136 38v90M104 34h50M106 26h46l-4 8h-38ZM104 132h50" />
      <path className="il-path" d="M160 50c20-24 50-24 66-2" />
      <path className="il-accent" d="M232 52c0-6 4-10 9-10s9 4 9 10c0 7-9 14-9 14s-9-7-9-14Z" />
      <path className="il-line" d="M0 132h360" />
    </>
  ),
  /* Quiet route: wall, painting, bench, plant. */
  bench: () => (
    <>
      <rect className="il-sky" width="360" height="150" />
      <rect className="il-wall" x="120" y="22" width="120" height="76" rx="2" />
      <path className="il-line" d="M120 22h120v76H120Z" />
      <path className="il-thin" d="M128 30h104v60H128Z" />
      <circle className="il-sun" cx="200" cy="50" r="10" />
      <path className="il-accent-line" d="M132 84c20-14 34-10 48-2 16-12 32-14 48 0" />
      <path className="il-line" d="M130 118h100M138 118v16M222 118v16M134 112h92" />
      <path className="il-green" d="M300 134c-12-20-8-46 4-56 10 14 12 38-4 56Z" />
      <path className="il-line" d="M290 134h24l-4-14h-16Z" />
      <path className="il-line" d="M0 134h360" />
    </>
  ),
  /* Find the detail: a painting and a big magnifier. */
  magnifier: () => (
    <>
      <rect className="il-sky" width="360" height="150" />
      <rect className="il-wall" x="70" y="20" width="150" height="104" rx="3" />
      <path className="il-line" d="M70 20h150v104H70Z" />
      <path className="il-thin" d="M80 30h130v84H80Z" />
      <path className="il-green" d="M82 112c24-30 44-34 62-16 18-20 40-22 64 16Z" />
      <circle className="il-sun" cx="110" cy="54" r="12" />
      <circle className="il-wall" cx="216" cy="86" r="32" />
      <circle className="il-accent-line" cx="216" cy="86" r="32" />
      <path className="il-accent-line" d="M240 110l30 30" style={{ strokeWidth: 7 }} />
      <path className="il-line" d="M206 80l6 6 12-12" />
      <path className="il-accent" d="M296 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />
      <path className="il-accent" d="M318 64l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
    </>
  ),
  /* Empty “My visit”: a frame with a star. */
  bookmark: () => (
    <>
      <rect className="il-sky" width="360" height="150" rx="24" />
      <rect className="il-wall" x="120" y="24" width="120" height="96" rx="3" />
      <path className="il-line" d="M120 24h120v96H120Z" />
      <path className="il-accent" d="m180 46 9 18 20 3-14 14 3 20-18-9-18 9 3-20-14-14 20-3Z" />
      <path className="il-line" d="M90 132h180" />
    </>
  ),
  /* Nothing found: a magnifier with a question mark. */
  notFound: () => (
    <>
      <rect className="il-sky" width="360" height="150" rx="24" />
      <circle className="il-wall" cx="170" cy="70" r="40" />
      <circle className="il-line" cx="170" cy="70" r="40" />
      <path className="il-accent-line" d="M200 100l34 34" style={{ strokeWidth: 8 }} />
      <path className="il-accent-line" d="M158 60a12 12 0 1 1 18 10c-5 3-6 6-6 11" />
      <circle className="il-accent" cx="170" cy="92" r="3" />
    </>
  ),
};
