import { useEffect, useState } from 'react';
import { IconButton, Icon } from '@/shared/ui';
import { fill } from '@/shared/lib';
import { useZachetStore, REWARDS, minutesLeft } from '@/entities/zachet';
import { WelcomeScreen } from './WelcomeScreen';
import { ParamsScreen } from './ParamsScreen';
import { BuildingScreen } from './BuildingScreen';
import { BookScreen } from './BookScreen';
import { StopScreen } from './StopScreen';
import { MoreScreen } from './MoreScreen';
import { PostcardScreen } from './PostcardScreen';
import { useUi } from './common';
import './ZachetFlow.css';

const SCREENS = {
  welcome: WelcomeScreen,
  params: ParamsScreen,
  building: BuildingScreen,
  book: BookScreen,
  stop: StopScreen,
  more: MoreScreen,
  postcard: PostcardScreen,
};

const WITH_PROGRESS = ['book', 'stop', 'more', 'postcard'];

/* «Zachet at Professor Tsvetaev's»: its own flow on the Quests tab. The other quests and
   their logic are not touched. */
export function ZachetFlow() {
  const { uiLang, ui } = useUi();
  const screen = useZachetStore((s) => s.screen);
  const route = useZachetStore((s) => s.route);
  const closeFlow = useZachetStore((s) => s.closeFlow);
  const go = useZachetStore((s) => s.go);
  const Screen = (screen !== 'welcome' && screen !== 'params' && screen !== 'building' && !route) ? WelcomeScreen : SCREENS[screen];
  const canGoBack = screen === 'params' || (screen === 'stop' || screen === 'more' || screen === 'postcard');

  return (
    <div className="zachet" lang={uiLang}>
      <div className="zachet__top">
        {canGoBack ? (
          <IconButton icon="back" label={ui.back} onClick={() => go(screen === 'params' ? 'welcome' : 'book')} />
        ) : <span />}
        <span className="zachet__title">{ui.title}</span>
        <IconButton icon="close" label={ui.exit} onClick={closeFlow} />
      </div>
      {route && WITH_PROGRESS.includes(screen) && <ProgressStrip />}
      <Screen />
      <RewardToast />
    </div>
  );
}

/* Pinned strip: how many stops are passed and how many minutes are left. */
function ProgressStrip() {
  const { ui } = useUi();
  const route = useZachetStore((s) => s.route);
  const stops = useZachetStore((s) => s.stops);
  const startedAt = useZachetStore((s) => s.startedAt);
  const minutes = useZachetStore((s) => s.profile.minutes);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);
  const passed = route.stops.filter((s) => stops[s.id]?.stamped).length;
  const left = minutesLeft(minutes, startedAt, now);
  return (
    <div className="zachet__progress">
      <div className="zachet__progress-text">
        <span>{fill(ui.progress, { a: passed, b: route.stops.length })}</span>
        <span>{left ? fill(ui.timeLeft, { m: left }) : ui.timeOver}</span>
      </div>
      <div className="zachet__progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={route.stops.length} aria-valuenow={passed} aria-label={ui.book}>
        <span style={{ width: `${(passed / route.stops.length) * 100}%` }} />
      </div>
    </div>
  );
}

/* A new badge pops up for a few seconds. */
function RewardToast() {
  const { uiLang, ui } = useUi();
  const toast = useZachetStore((s) => s.toast);
  const clearToast = useZachetStore((s) => s.clearToast);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(clearToast, 3500);
    return () => clearTimeout(t);
  }, [toast, clearToast]);
  const reward = REWARDS.find((r) => r.id === toast);
  return (
    <div className="zachet__toast-slot" role="status" aria-live="polite">
      {reward && (
        <div className="zachet__toast">
          <Icon name="trophy" filled />
          <span>{fill(ui.newReward, { name: reward.name[uiLang] })}</span>
        </div>
      )}
    </div>
  );
}
