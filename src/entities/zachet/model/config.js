/* «Zachet at Professor Tsvetaev's»: the visitor's profile options and the game rules.
   Shared by the browser and the server: no imports. Labels in the three interface languages. */

export const UI_LANGS = [
  { id: 'ru', name: 'Русский' },
  { id: 'en', name: 'English' },
  { id: 'zh', name: '中文' },
];

/* Minutes → number of stops (the plan request asks the model for exactly this many). */
export const DURATIONS = [
  { minutes: 30, stops: 3 },
  { minutes: 45, stops: 4 },
  { minutes: 60, stops: 5 },
  { minutes: 90, stops: 7 },
];

export function stopsFor(minutes) {
  return (DURATIONS.find((d) => d.minutes === minutes) || DURATIONS[1]).stops;
}

export const SPECIALTIES = [
  { id: 'tech', label: { ru: 'Техника и IT', en: 'Engineering and IT', zh: '工程与IT' } },
  { id: 'medicine', label: { ru: 'Медицина', en: 'Medicine', zh: '医学' } },
  { id: 'humanities', label: { ru: 'Экономика и гуманитарные', en: 'Economics and humanities', zh: '经济与人文' } },
  { id: 'art', label: { ru: 'Искусство и дизайн', en: 'Art and design', zh: '艺术与设计' } },
];

export const LEVELS = [
  { id: 'beginner', label: { ru: 'Начинаю', en: 'Just starting', zh: '刚开始学' } },
  { id: 'simple', label: { ru: 'Понимаю простое', en: 'I understand simple things', zh: '能听懂简单的' } },
  { id: 'fluent', label: { ru: 'Свободно', en: 'Fluent', zh: '流利' } },
];

export const INTERESTS = [
  { id: 'ancient', label: { ru: 'Древний мир', en: 'The ancient world', zh: '古代世界' } },
  { id: 'painting', label: { ru: 'Живопись', en: 'Painting', zh: '绘画' } },
  { id: 'sculpture', label: { ru: 'Скульптура', en: 'Sculpture', zh: '雕塑' } },
  { id: 'faces', label: { ru: 'Люди и лица', en: 'People and faces', zh: '人物与面孔' } },
  { id: 'myths', label: { ru: 'Мифы и легенды', en: 'Myths and legends', zh: '神话与传说' } },
  { id: 'life', label: { ru: 'Как жили люди', en: 'How people lived', zh: '人们怎样生活' } },
];

/* Language of the stories (the model writes in it). dir — for right-to-left scripts. */
export const STORY_LANGUAGES = [
  { id: 'ru', name: 'Русский' },
  { id: 'en', name: 'English' },
  { id: 'zh', name: '中文' },
  { id: 'hi', name: 'हिन्दी' },
  { id: 'uz', name: 'Oʻzbekcha' },
  { id: 'kk', name: 'Қазақша' },
  { id: 'tg', name: 'Тоҷикӣ' },
  { id: 'ky', name: 'Кыргызча' },
  { id: 'tk', name: 'Türkmençe' },
  { id: 'ar', name: 'العربية', dir: 'rtl' },
  { id: 'fa', name: 'فارسی', dir: 'rtl' },
  { id: 'vi', name: 'Tiếng Việt' },
  { id: 'tr', name: 'Türkçe' },
  { id: 'es', name: 'Español' },
  { id: 'fr', name: 'Français' },
  { id: 'id', name: 'Bahasa Indonesia' },
];

export function storyLanguage(id) {
  return STORY_LANGUAGES.find((l) => l.id === id) || STORY_LANGUAGES[0];
}

/* Difficulty: seconds to find the detail, how the hint is shown, full points. */
export const DIFFICULTIES = [
  {
    id: 'fresher', seconds: 90, hint: 'always', points: 10,
    label: { ru: 'Первокурсник', en: 'First-year', zh: '大一新生' },
    about: { ru: '90 секунд, подсказка видна сразу', en: '90 seconds, the hint is shown', zh: '90秒，提示直接可见' },
  },
  {
    id: 'senior', seconds: 60, hint: 'button', points: 15,
    label: { ru: 'Старшекурсник', en: 'Senior student', zh: '高年级学生' },
    about: { ru: '60 секунд, подсказка по кнопке', en: '60 seconds, hint on request', zh: '60秒，按按钮看提示' },
  },
  {
    id: 'postgrad', seconds: 45, hint: 'none', points: 20,
    label: { ru: 'Аспирант', en: 'Postgraduate', zh: '研究生' },
    about: { ru: '45 секунд, без подсказок', en: '45 seconds, no hints', zh: '45秒，没有提示' },
  },
];

export function difficulty(id) {
  return DIFFICULTIES.find((d) => d.id === id) || DIFFICULTIES[0];
}

/* Answering before the timer ends adds this; after the timer the answer still counts. */
export const IN_TIME_BONUS = 5;

export const VOICE_SECONDS = 20;

export const DEFAULT_PROFILE = {
  country: '',
  specialty: 'humanities',
  level: 'simple',
  minutes: 45,
  interests: [],
  note: '',
  storyLang: 'ru',
  difficulty: 'fresher',
};

export const NOTE_MAX = 300;
