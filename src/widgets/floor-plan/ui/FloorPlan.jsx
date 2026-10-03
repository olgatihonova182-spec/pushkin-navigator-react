import { Fragment } from 'react';
import { ICONS } from '@/shared/config';
import { MapSurface } from '@/shared/ui';
import { useUiStore } from '@/shared/model';
import { getBuilding } from '@/entities/building';
import {
  getHall, hallsOnFloor, voidsOnFloor, hallCenter, hallLabel, isSelectable, isExhibitSpace,
} from '@/entities/hall';
import { CROWD_LABELS, CrowdDots, getCrowdLevel } from '@/entities/crowd';
import { useVisitorStore, MeMarker } from '@/entities/visitor';
import { useRouteStore } from '@/entities/route';
import { openHall } from '@/features/open-place';
import { TwoLineText } from '../lib/TwoLineText';
import { asButton } from '@/shared/lib';
import './FloorPlan.css';

/* Floor plan: halls, "you are here", crowd layer, route line and stop markers. */
export function FloorPlan() {
  const building = useUiStore((s) => s.building);
  const floor = useUiStore((s) => s.floor);
  const crowdLayer = useUiStore((s) => s.crowdLayer);
  const sheet = useUiStore((s) => s.sheet);
  const me = useVisitorStore((s) => s.me);
  const route = useRouteStore((s) => s.route);
  const onThisFloor = (h) => h.building === building && h.floor === floor;
  const meHall = me && getHall(me);

  return (
    <MapSurface
      viewBox="0 0 340 400"
      label={`Схема: ${getBuilding(building).shortName}, ${floor} этаж`}
      footnote="Схема условная: расположение залов — для прототипа, не план музея."
    >
        <rect className="plan__outline" x="10" y="10" width="320" height="370" rx="14" />
        {voidsOnFloor(building, floor).map((v) => (
          <Fragment key={v.name}>
            <rect className="plan__void" x={v.x} y={v.y} width={v.w} height={v.h} rx="3" />
            <text className="plan__void-label" x={v.x + v.w / 2} y={v.y + v.h / 2}>
              <TwoLineText text={`${v.name} (внизу)`} x={v.x + v.w / 2} />
            </text>
          </Fragment>
        ))}
        {hallsOnFloor(building, floor).map((h) => (
          <PlanNode
            key={h.id}
            hall={h}
            crowdLayer={crowdLayer}
            selected={sheet?.kind === 'hall' && sheet.id === h.id}
            isMe={me === h.id}
            isTarget={!!route && route.targets.includes(h.id)}
          />
        ))}
        <RouteLines route={route} onThisFloor={onThisFloor} />
        <TargetMarkers route={route} onThisFloor={onThisFloor} />
        {meHall && onThisFloor(meHall) && <MeMarker x={hallCenter(meHall)[0]} y={hallCenter(meHall)[1] + 12} />}
        <text className="plan__street" x="170" y="394">↓ ул. Волхонка</text>
    </MapSurface>
  );
}

function PlanNode({ hall: h, crowdLayer, selected, isMe, isTarget }) {
  const showCrowd = crowdLayer && isExhibitSpace(h);
  const level = getCrowdLevel(h.id);
  const classes = ['node', `node--${h.type}`, showCrowd && `node--crowd-${level}`, selected && 'node--selected']
    .filter(Boolean).join(' ');
  const label = hallLabel(h) + (showCrowd ? `, ${CROWD_LABELS[level].toLowerCase()}` : '')
    + (isMe ? ', вы здесь' : '') + (isTarget ? ', цель маршрута' : '');
  const interactive = isSelectable(h) ? asButton(() => openHall(h.id), label) : { 'aria-hidden': true };
  const cx = h.x + h.w / 2;

  return (
    <g className={classes} {...interactive}>
      <rect x={h.x} y={h.y} width={h.w} height={h.h} rx="8" />
      {h.type === 'stairs' || h.type === 'lift' ? (
        <text className="node__icon" x={cx} y={h.y + h.h / 2}>{ICONS[h.type]}</text>
      ) : (
        <>
          {h.number && <text className="node__number" x={h.x + 7} y={h.y + 15}>{h.number}</text>}
          <text className="node__name" x={cx} y={h.y + h.h / 2 + 3}>
            <TwoLineText text={h.shortName} x={cx} />
          </text>
        </>
      )}
      {showCrowd && <CrowdDots level={level} x={h.x + h.w - 8} y={h.y + h.h - 8} />}
    </g>
  );
}

/* Route on this floor: the segment to the nearest stop is bright, the rest is faint. */
function RouteLines({ route, onThisFloor }) {
  if (!route || !route.segments) return null;
  const lines = [];
  const segments = route.segments.slice().reverse();
  segments.forEach((segment, k) => {
    const nearest = k === segments.length - 1;
    let points = [];
    const flush = () => {
      if (points.length > 1) {
        const p = points.join(' ');
        const key = `${k}-${lines.length}`;
        lines.push(
          nearest ? (
            <Fragment key={key}>
              <polyline className="path-casing" points={p} />
              <polyline className="path-line" points={p} />
              <polyline className="path-flow" points={p} />
            </Fragment>
          ) : (
            <polyline key={key} className="path-later" points={p} />
          ),
        );
      }
      points = [];
    };
    segment.nodes.forEach((id) => {
      const h = getHall(id);
      if (onThisFloor(h)) points.push(hallCenter(h).join(','));
      else flush();
    });
    flush();
  });
  return lines;
}

/* Pin in the top right corner of a target hall so it does not cover the name. */
function TargetMarkers({ route, onThisFloor }) {
  if (!route) return null;
  const many = route.targets.length > 1;
  return route.targets.map((id, i) => {
    const h = getHall(id);
    if (!onThisFloor(h)) return null;
    const passed = many && i < route.step;
    return (
      <g key={`${id}-${i}`} className={`target${passed ? ' target--passed' : ''}`} transform={`translate(${h.x + h.w - 13} ${h.y + 15})`}>
        <path d="M0 13-9.5-1a11 11 0 1 1 19 0Z" />
        <text y="-1">{many ? i + 1 : ''}</text>
      </g>
    );
  });
}
