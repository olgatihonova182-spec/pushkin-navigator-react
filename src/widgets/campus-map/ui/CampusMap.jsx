import { Fragment } from 'react';
import { MapSurface } from '@/shared/ui';
import { asButton } from '@/shared/lib';
import { useUiStore } from '@/shared/model';
import { BUILDINGS, STREETS, getBuilding } from '@/entities/building';
import { getHall } from '@/entities/hall';
import { useVisitorStore, MeMarker } from '@/entities/visitor';
import { useRouteStore, routeBuildings } from '@/entities/route';
import { openBuilding } from '@/features/open-place';
import { FACADES, TREES } from '../lib/facades';
import './CampusMap.css';

/* Campus map in the style of the route illustrations: "sky" background, white walls with a dark
   outline, trees, sun, dotted path. Each building is a small facade standing on its street. */
export function CampusMap() {
  const sheet = useUiStore((s) => s.sheet);
  const me = useVisitorStore((s) => s.me);
  const route = useRouteStore((s) => s.route);
  const onRoute = routeBuildings(route);

  return (
    <MapSurface
      viewBox="0 0 340 330"
      label="Схема музейного городка"
      className="campus"
      footnote="Схема условная. Время пешком между зданиями — оценка."
    >
      <rect className="il-sky" width="340" height="330" />
      <circle className="il-sun" cx="304" cy="44" r="20" />

      {/* Streets: a white band, outline along the edges, a dashed axis. */}
      {STREETS.map((st) => <Street key={st.name} street={st} />)}

      {TREES.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} className="il-green" cx={x} cy={y} r={r} aria-hidden="true" />
      ))}

      {BUILDINGS.map((b) => (
        <House
          key={b.id}
          building={b}
          onRoute={onRoute.includes(b.id)}
          selected={sheet?.kind === 'building' && sheet.id === b.id}
        />
      ))}

      <StreetPath route={route} />

      {STREETS.filter((st) => st.label).map((st) => (
        <text key={st.name} className="street-label" x={st.label[0]} y={st.label[1]}>{st.name}</text>
      ))}
      <text className="street-label" transform="translate(108 60) rotate(-90)">Колымажный пер.</text>

      {me && <MeInBuilding hallId={me} />}
    </MapSurface>
  );
}

function Street({ street: st }) {
  const vertical = st.h > st.w;
  return (
    <>
      <rect className="il-wall" x={st.x} y={st.y} width={st.w} height={st.h} />
      {vertical ? (
        <>
          <path className="il-line" d={`M${st.x} ${st.y}v${st.h}M${st.x + st.w} ${st.y}v${st.h}`} />
          <path className="street-axis" d={`M${st.x + st.w / 2} ${st.y}v${st.h}`} />
        </>
      ) : (
        <>
          <path className="il-line" d={`M${st.x} ${st.y}h${st.w}M${st.x} ${st.y + st.h}h${st.w}`} />
          <path className="street-axis" d={`M${st.x} ${st.y + st.h / 2}h${st.w}`} />
        </>
      )}
    </>
  );
}

function House({ building: b, onRoute, selected }) {
  const Facade = FACADES[b.id];
  const classes = ['house', b.floors && 'house--has-plan', onRoute && 'house--on-route', selected && 'house--selected']
    .filter(Boolean).join(' ');
  // Two-line label: name and house number (for buildings on Volkhonka) so it does not overflow.
  const houseNumber = b.address.indexOf('Волхонка') === 0 ? b.address.replace('Волхонка, ', 'д. ') : '';
  const cx = b.x + b.w / 2;
  return (
    <g className={classes} {...asButton(() => openBuilding(b.id), `${b.name}, ${b.address}`)}>
      <rect className="house__zone" x={b.x - 4} y={b.y - 4} width={b.w + 8} height={b.h + 30} rx="10" />
      <g transform={`translate(${b.x} ${b.y})`}>
        <Facade w={b.w} h={b.h} />
      </g>
      <text className="house__name" x={cx} y={b.y + b.h + 12}>{b.shortName}</text>
      {houseNumber && <text className="house__address" x={cx} y={b.y + b.h + 23}>{houseNumber}</text>}
    </g>
  );
}

/* Transitions along the street — dotted: from the label down to the street, along it, up to the other label. */
function StreetPath({ route }) {
  if (!route) return null;
  const nodes = route.nodes;
  const paths = [];
  for (let i = 1; i < nodes.length; i++) {
    const a = getHall(nodes[i - 1]);
    const b = getHall(nodes[i]);
    if (a.building === b.building) continue;
    const ba = getBuilding(a.building);
    const bb = getBuilding(b.building);
    const xa = ba.x + ba.w / 2;
    const xb = bb.x + bb.w / 2;
    paths.push(
      <path
        key={i}
        className="campus-path"
        d={`M${xa} ${ba.y + ba.h + 28} L${xa} 303 L${xb} 303 L${xb} ${bb.y + bb.h + 28}`}
      />,
    );
  }
  return <Fragment>{paths}</Fragment>;
}

function MeInBuilding({ hallId }) {
  const b = getBuilding(getHall(hallId).building);
  return <MeMarker x={b.x + b.w / 2} y={b.y + b.h - 14} />;
}
