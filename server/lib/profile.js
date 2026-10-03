/* The visitor's profile from the request body: every field checked against the allowed values.
   Unknown values fall back to defaults; text is cut to its limit. */
import {
  DEFAULT_PROFILE, DURATIONS, SPECIALTIES, LEVELS, INTERESTS, STORY_LANGUAGES, DIFFICULTIES, NOTE_MAX,
} from '../../src/entities/zachet/model/config.js';

const ids = (list) => list.map((x) => x.id);
const oneOf = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);

export function sanitizeProfile(body) {
  const b = body && typeof body === 'object' ? body : {};
  const interests = Array.isArray(b.interests) ? [...new Set(b.interests.filter((i) => ids(INTERESTS).includes(i)))] : [];
  return {
    country: String(b.country || '').replace(/\s+/g, ' ').trim().slice(0, 60),
    specialty: oneOf(b.specialty, ids(SPECIALTIES), DEFAULT_PROFILE.specialty),
    level: oneOf(b.level, ids(LEVELS), DEFAULT_PROFILE.level),
    minutes: oneOf(Number(b.minutes), DURATIONS.map((d) => d.minutes), DEFAULT_PROFILE.minutes),
    interests,
    note: String(b.note || '').slice(0, NOTE_MAX),
    storyLang: oneOf(b.storyLang, ids(STORY_LANGUAGES), DEFAULT_PROFILE.storyLang),
    difficulty: oneOf(b.difficulty, ids(DIFFICULTIES), DEFAULT_PROFILE.difficulty),
  };
}

/* The profile as the model reads it: labels instead of ids. */
export function describeProfile(p) {
  const label = (list, id) => (list.find((x) => x.id === id)?.label.ru) || id;
  return {
    country: p.country || 'не указана',
    specialty: label(SPECIALTIES, p.specialty),
    russian: label(LEVELS, p.level),
    minutes: p.minutes,
    interests: p.interests.map((i) => label(INTERESTS, i)),
    difficulty: label(DIFFICULTIES, p.difficulty),
    storyLanguage: STORY_LANGUAGES.find((l) => l.id === p.storyLang)?.name || 'Русский',
    note: p.note,
  };
}
