import { Button, Chip, ChipGroup } from '@/shared/ui';
import {
  useZachetStore, SPECIALTIES, LEVELS, DURATIONS, INTERESTS, STORY_LANGUAGES, DIFFICULTIES, NOTE_MAX, difficulty,
} from '@/entities/zachet';
import { requestRoute } from '@/features/zachet-route';
import { useUi, stopsLabel } from './common';

/* 2. Parameters: country, field of study, Russian level, time, interests, free text,
   story language, task difficulty. */
export function ParamsScreen() {
  const { uiLang, ui } = useUi();
  const profile = useZachetStore((s) => s.profile);
  const setProfile = useZachetStore((s) => s.setProfile);
  const toggleInterest = (id) =>
    setProfile({ interests: profile.interests.includes(id) ? profile.interests.filter((x) => x !== id) : [...profile.interests, id] });
  const canBuild = profile.interests.length > 0;

  return (
    <section className="zachet-screen">
      <h2 className="t-headline-s">{ui.paramsTitle}</h2>

      <label className="zachet__field">
        <span className="zachet__label">{ui.country}</span>
        <input
          className="zachet__input"
          value={profile.country}
          maxLength={60}
          placeholder={ui.countryPlaceholder}
          onChange={(e) => setProfile({ country: e.target.value })}
        />
      </label>

      <Group title={ui.specialty}>
        {SPECIALTIES.map((x) => (
          <Chip key={x.id} selected={profile.specialty === x.id} onClick={() => setProfile({ specialty: x.id })}>{x.label[uiLang]}</Chip>
        ))}
      </Group>

      <Group title={ui.level}>
        {LEVELS.map((x) => (
          <Chip key={x.id} selected={profile.level === x.id} onClick={() => setProfile({ level: x.id })}>{x.label[uiLang]}</Chip>
        ))}
      </Group>

      <Group title={ui.time}>
        {DURATIONS.map((d) => (
          <Chip key={d.minutes} selected={profile.minutes === d.minutes} onClick={() => setProfile({ minutes: d.minutes })}>
            {ui.minutes.replace('{n}', d.minutes)} · {stopsLabel(d.stops, uiLang, ui)}
          </Chip>
        ))}
      </Group>

      <Group title={ui.interests}>
        {INTERESTS.map((x) => (
          <Chip key={x.id} selected={profile.interests.includes(x.id)} onClick={() => toggleInterest(x.id)}>{x.label[uiLang]}</Chip>
        ))}
      </Group>

      <label className="zachet__field">
        <span className="zachet__label">{ui.note}</span>
        <textarea
          className="zachet__input zachet__textarea"
          rows={3}
          dir="auto"
          maxLength={NOTE_MAX}
          placeholder={ui.notePlaceholder}
          value={profile.note}
          onChange={(e) => setProfile({ note: e.target.value.slice(0, NOTE_MAX) })}
        />
        <span className="zachet__counter">{profile.note.length}/{NOTE_MAX}</span>
      </label>

      <label className="zachet__field">
        <span className="zachet__label">{ui.storyLang}</span>
        <select className="zachet__input" value={profile.storyLang} onChange={(e) => setProfile({ storyLang: e.target.value })}>
          {STORY_LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </label>

      <Group title={ui.difficulty}>
        {DIFFICULTIES.map((x) => (
          <Chip key={x.id} selected={profile.difficulty === x.id} onClick={() => setProfile({ difficulty: x.id })}>{x.label[uiLang]}</Chip>
        ))}
      </Group>
      <p className="supporting-text">{difficulty(profile.difficulty).about[uiLang]}</p>

      {!canBuild && <p className="supporting-text">{ui.needInterest}</p>}
      <Button variant="filled" icon="routes" disabled={!canBuild} onClick={() => requestRoute()}>{ui.build}</Button>
    </section>
  );
}

function Group({ title, children }) {
  return (
    <div className="zachet__field">
      <span className="zachet__label">{title}</span>
      <ChipGroup label={title}>{children}</ChipGroup>
    </div>
  );
}
