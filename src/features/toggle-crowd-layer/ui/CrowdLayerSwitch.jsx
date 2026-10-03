import { Switch } from '@/shared/ui';
import { useUiStore } from '@/shared/model';

export function CrowdLayerSwitch() {
  const on = useUiStore((s) => s.crowdLayer);
  const toggle = useUiStore((s) => s.toggleCrowdLayer);
  return (
    <Switch checked={on} onChange={toggle}>
      Людно сейчас
    </Switch>
  );
}
