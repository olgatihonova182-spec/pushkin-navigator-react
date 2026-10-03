/* Building facades for the campus map, in the style of the route illustrations.
   A facade draws in its own coordinates 0…w × 0…h, the bottom is the ground line.
   A new building — one entry in FACADES. */

/* Main building: wings with arched windows, portico with a pediment and six columns, exhibition banner. */
function MainFacade({ w, h }) {
  const cx = w / 2;
  return (
    <>
      <rect className="il-wall" x="2" y="44" width={w - 4} height={h - 44} />
      <path className="il-line" d={`M2 ${h}V44h${w - 4}V${h}`} />
      {[10, 22, 34, w - 42, w - 30, w - 18].map((x, i) => (
        <path key={i} className="il-thin" d={`M${x} 74v-12a4 4 0 0 1 8 0v12Z`} />
      ))}
      <path className="il-wall" d={`M${cx - 33} 30 ${cx} 8l33 22Z`} />
      <path className="il-line" d={`M${cx - 33} 30 ${cx} 8l33 22Z`} />
      <path className="il-thin" d={`M${cx - 24} 28 ${cx} 14l24 14`} />
      <rect className="il-wall" x={cx - 35} y="30" width="70" height="7" />
      <path className="il-line" d={`M${cx - 35} 30h70v7h-70Z`} />
      {Array.from({ length: 6 }, (_, i) => {
        const x = cx - 30 + i * 12;
        return (
          <g key={i}>
            <rect className="il-wall" x={x} y="37" width="5" height={h - 49} />
            <path className="il-line" d={`M${x} 37v${h - 49}M${x + 5} 37v${h - 49}`} />
          </g>
        );
      })}
      <rect className="il-accent" x={cx - 4} y="42" width="8" height="16" rx="1" />
      <path className="il-line" d={`M${cx - 38} ${h - 12}h76M${cx - 44} ${h - 6}h88`} />
    </>
  );
}

/* Gallery: a mansion with a pediment, two rows of windows, an arched entrance in colour. */
function GalleryFacade({ w, h }) {
  return (
    <>
      <rect className="il-wall" x="4" y="34" width={w - 8} height={h - 34} />
      <path className="il-line" d={`M4 ${h}V34h${w - 8}V${h}M2 34h${w - 4}`} />
      <path className="il-wall" d={`M${w / 2 - 16} 34 ${w / 2} 20l16 14Z`} />
      <path className="il-line" d={`M${w / 2 - 16} 34 ${w / 2} 20l16 14`} />
      {[12, 26, w - 32, w - 18].map((x, i) => (
        <g key={i}>
          <rect className="il-thin" x={x} y="44" width="6" height="10" rx="1" />
          <rect className="il-thin" x={x} y="64" width="6" height="10" rx="1" />
        </g>
      ))}
      <path className="il-accent" d={`M${w / 2 - 6} ${h}v-14a6 6 0 0 1 12 0v14Z`} />
    </>
  );
}

/* Museum of Private Collections: a house with a cornice and a grid of windows. */
function PrivateCollectionsFacade({ w, h }) {
  const windows = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      windows.push(<rect key={`${r}-${c}`} className="il-thin" x={12 + c * 18} y={36 + r * 16} width="7" height="9" rx="1" />);
    }
  }
  return (
    <>
      <rect className="il-wall" x="3" y="22" width={w - 6} height={h - 22} />
      <path className="il-line" d={`M3 ${h}V22h${w - 6}V${h}M1 22h${w - 2}M1 28h${w - 2}`} />
      {windows}
    </>
  );
}

/* Mouseion: a low house under a pitched roof. */
function MouseionFacade({ w, h }) {
  return (
    <>
      <rect className="il-wall" x="8" y="30" width={w - 16} height={h - 30} />
      <path className="il-wall" d={`M4 30 ${w / 2} 10 ${w - 4} 30Z`} />
      <path className="il-line" d={`M8 ${h}V30M${w - 8} 30V${h}M4 30 ${w / 2} 10 ${w - 4} 30Z`} />
      {[18, w - 26].map((x, i) => (
        <path key={i} className="il-thin" d={`M${x} 52v-10a4 4 0 0 1 8 0v10Z`} />
      ))}
      <path className="il-thin" d={`M${w / 2 - 5} ${h}v-14h10v14`} />
    </>
  );
}

/* Lopukhin Estate: a long house with a mezzanine. */
function LopukhinFacade({ w, h }) {
  return (
    <>
      <rect className="il-wall" x="2" y="18" width={w - 4} height={h - 18} />
      <rect className="il-wall" x={w / 2 - 16} y="5" width="32" height="13" />
      <path className="il-line" d={`M2 ${h}V18h${w - 4}V${h}M${w / 2 - 16} 18V5h32v13M0 18h${w}`} />
      {[8, 22, 36, w - 42, w - 28, w - 14].map((x, i) => (
        <rect key={i} className="il-thin" x={x} y="26" width="6" height="10" rx="1" />
      ))}
      <rect className="il-thin" x={w / 2 - 4} y="8" width="8" height="7" rx="1" />
    </>
  );
}

export const FACADES = {
  main: MainFacade,
  gallery: GalleryFacade,
  'private-collections': PrivateCollectionsFacade,
  mouseion: MouseionFacade,
  'lopukhin-estate': LopukhinFacade,
};

/* Trees — for recognisability, not landmarks. [x, y, r] */
export const TREES = [[258, 98, 8], [272, 90, 6], [330, 166, 10], [318, 178, 7], [12, 150, 9], [26, 141, 6]];
