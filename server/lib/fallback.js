/* Without the model: exhibits chosen by interests, and a stop made from the catalogue with a
   task about the museum label. Texts in Russian, English or Chinese; other story languages get
   English (the record book says the route was partly built without AI). */
import { INTERESTS } from '../../src/entities/zachet/model/config.js';
import { description } from './catalog.js';

const TESTS = {
  ancient: (e) => e.year < 500 || /Египет|Греция|Древн|Визант/.test(e.country),
  painting: (e) => /Живопись/.test(e.type),
  sculpture: (e) => /Скульптура|Слепки/.test(e.type),
  faces: (e) => /портрет|Портрет|Статуя царя|Статуэтки|Мадонна|леди|графиня/i.test(e.name),
  myths: (e) => /миф|бог[аи]? |Вакх|Геркулес|Европ|Сатир|Сципион|Эсфир|Дионис|Анубис|Осирис/i.test(`${e.name} ${description(e).slice(0, 400)}`),
  life: (e) => /крестьян|катани|быт|ложечк|часы|пелен|повседнев/i.test(`${e.name} ${description(e).slice(0, 400)}`),
};

const score = (e, interests) => interests.filter((i) => TESTS[i] && TESTS[i](e)).length;

/* n exhibits: those matching the interests first, at most two per hall, kinds of art mixed,
   then in walking order. */
export function pickByInterests(profile, catalog, n, already = []) {
  const chosen = catalog.filter((e) => already.includes(e.id));
  const perHall = {};
  chosen.forEach((e) => { perHall[e.hall] = (perHall[e.hall] || 0) + 1; });
  const ranked = catalog
    .filter((e) => !already.includes(e.id))
    .map((e, i) => ({ e, s: score(e, profile.interests), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i);
  while (chosen.length < n && ranked.length) {
    const types = new Set(chosen.map((e) => e.type));
    let k = ranked.findIndex(({ e }) => (perHall[e.hall] || 0) < 2 && !types.has(e.type));
    if (k === -1) k = ranked.findIndex(({ e }) => (perHall[e.hall] || 0) < 2);
    if (k === -1) break;
    const [{ e }] = ranked.splice(k, 1);
    chosen.push(e);
    perHall[e.hall] = (perHall[e.hall] || 0) + 1;
  }
  return chosen.sort((a, b) => a.zone - b.zone).map((e) => e.id);
}

const T = {
  ru: {
    title: 'Зачёт у профессора Цветаева',
    intro: 'Профессор Цветаев создал этот музей для студентов. Пройди остановки по порядку и собери штампы «зачтено».',
    understanding: 'Маршрут собран без ИИ: экспонаты подобраны по твоим интересам.',
    reason: (names) => (names ? `Подходит к твоим интересам: ${names}.` : 'Один из шедевров Главного здания.'),
    story: (e) => `Перед тобой «${e.name}»${e.author ? `, автор — ${e.author}` : ''}. ${e.period ? `Время: ${e.period}.` : ''}`,
    forYou: 'Профессор Цветаев учил студентов смотреть внимательно — начни с этикетки.',
    lead: 'Музей создавался как учебный, для студентов. Этикетка — твой конспект.',
    qMaterial: 'Найди этикетку. Какой материал на ней указан?',
    qDate: 'Найди этикетку. Какая дата на ней указана?',
    hint: 'Этикетка висит рядом с экспонатом.',
    explain: (v) => `На этикетке: ${v}.`,
    voice: 'Расскажи семье, что тебя здесь удивило.',
    word: 'экспонат — то, что выставлено в музее',
  },
  en: {
    title: 'Exam at Professor Tsvetaev’s',
    intro: 'Professor Tsvetaev created this museum for students. Walk the stops in order and collect “passed” stamps.',
    understanding: 'This route was built without AI: the exhibits were chosen by your interests.',
    reason: (names) => (names ? `It matches your interests: ${names}.` : 'One of the masterpieces of the Main Building.'),
    story: (e) => `In front of you is “${e.nameEn || e.name}”${e.author ? ` by ${e.author}` : ''}. ${e.period ? `Date: ${e.period}.` : ''}`,
    forYou: 'Professor Tsvetaev taught students to look closely — start with the label.',
    lead: 'The museum was made for students. The label is your lecture notes.',
    qMaterial: 'Find the label. What material does it name?',
    qDate: 'Find the label. What date does it give?',
    hint: 'The label hangs next to the exhibit.',
    explain: (v) => `The label says: ${v}.`,
    voice: 'Tell your family what surprised you here.',
    word: 'exhibit',
  },
  zh: {
    title: '茨维塔耶夫教授的考试',
    intro: '茨维塔耶夫教授为学生创建了这座博物馆。按顺序走完各站，收集“通过”印章。',
    understanding: '这条路线没有使用人工智能：展品是按你的兴趣挑选的。',
    reason: (names) => (names ? `它符合你的兴趣：${names}。` : '主楼的杰作之一。'),
    story: (e) => `你面前是《${e.name}》${e.author ? `，作者：${e.author}` : ''}。${e.period ? `年代：${e.period}。` : ''}`,
    forYou: '茨维塔耶夫教授教学生仔细观察——从说明牌开始。',
    lead: '这座博物馆是为学生建的。说明牌就是你的笔记。',
    qMaterial: '找到说明牌。上面写的是什么材料？',
    qDate: '找到说明牌。上面写的是什么年代？',
    hint: '说明牌就在展品旁边。',
    explain: (v) => `说明牌上写着：${v}。`,
    voice: '告诉家人这里什么让你惊讶。',
    word: '展品',
  },
};

export function texts(lang) {
  return T[lang] || T.en;
}

export function fallbackPlan(profile, catalog, n) {
  const t = texts(profile.storyLang);
  const names = profile.interests.map((i) => INTERESTS.find((x) => x.id === i)?.label[T[profile.storyLang] ? profile.storyLang : 'en']).filter(Boolean).join(', ');
  return {
    understanding: t.understanding,
    interests: [],
    mood: '',
    title: t.title,
    intro: t.intro,
    stops: pickByInterests(profile, catalog, n).map((id) => ({ id, reason: t.reason(names) })),
  };
}

/* A stop from the catalogue: plain story and a task by the museum label (material or date),
   the right answer taken from the exhibit itself, two others from other exhibits. */
export function fallbackStop(e, reason, profile, catalog) {
  const t = texts(profile.storyLang);
  const byMaterial = Boolean(e.material);
  const value = byMaterial ? e.material : e.period;
  const others = [...new Set(catalog.map((x) => (byMaterial ? x.material : x.period)).filter((v) => v && v !== value))];
  const start = Number(e.id) % Math.max(1, others.length - 1);
  const wrong = others.slice(start, start + 2);
  while (wrong.length < 2) wrong.push(byMaterial ? ['бронза', 'стекло'][wrong.length] : ['XIX век', 'XV век'][wrong.length]);
  const correct = Number(e.id) % 3;
  const options = [...wrong];
  options.splice(correct, 0, value);
  const russianStory = profile.storyLang === 'ru' && description(e)
    ? description(e).split(/(?<=[.!?])\s+/).slice(0, 3).join(' ')
    : t.story(e);
  return {
    id: e.id,
    reason,
    caption: e.name,
    story: russianStory,
    forYou: t.forYou,
    task: { lead: t.lead, question: byMaterial ? t.qMaterial : t.qDate, options, correct, hint: t.hint, explain: t.explain(value) },
    voiceTopic: t.voice,
    word: { ru: 'экспонат', transcription: '[ekspanát]', translation: t.word },
    fallback: true,
  };
}
