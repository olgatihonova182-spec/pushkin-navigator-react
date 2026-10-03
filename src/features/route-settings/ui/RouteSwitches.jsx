import { Switch } from '@/shared/ui';
import { useVisitorStore } from '@/entities/visitor';
import { useRouteStore } from '@/entities/route';
import { toggleNoStairs, toggleAvoidCrowd } from '../model/settings';

export function NoStairsSwitch({ children = 'Без лестниц' }) {
  const on = useVisitorStore((s) => s.noStairs);
  return (
    <Switch checked={on} onChange={toggleNoStairs}>
      {children}
    </Switch>
  );
}

export function AvoidCrowdSwitch() {
  const on = useRouteStore((s) => s.avoidCrowd);
  return (
    <Switch checked={on} onChange={toggleAvoidCrowd}>
      В обход толпы
    </Switch>
  );
}
