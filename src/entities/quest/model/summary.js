/* Texts of the final summary, in every quest language. Same shape as quest data: { ru, en, zh, ar, es, fr }.
   A rank is chosen by the share of checkable tasks solved on the first try (`from` — lower bound). */
export const RANKS = [
  {
    id: 'master',
    from: 1,
    name: { ru: 'Магистр музейных тайн', en: 'Master of Museum Secrets', zh: '博物馆秘密大师', ar: 'سيّد أسرار المتحف', es: 'Maestro de los secretos del museo', fr: 'Maître des secrets du musée' },
    comment: {
      ru: 'Ни одна деталь не ускользнула. Смотрители уже думают, не взять ли вас на работу.',
      en: 'Not a single detail escaped you. The attendants are thinking of hiring you.',
      zh: '没有一个细节能逃过你的眼睛。管理员们都在考虑聘请你了。',
      ar: 'لم تفُتك أي تفصيلة. يفكر المراقبون في توظيفك.',
      es: 'No se te escapó ni un detalle. Los vigilantes ya piensan en contratarte.',
      fr: 'Aucun détail ne vous a échappé. Les surveillants pensent à vous embaucher.',
    },
  },
  {
    id: 'explorer',
    from: 0.6,
    name: { ru: 'Зоркий исследователь', en: 'Sharp-eyed Explorer', zh: '目光敏锐的探索者', ar: 'مستكشف حادّ البصر', es: 'Explorador de vista aguda', fr: 'Explorateur à l’œil vif' },
    comment: {
      ru: 'Почти всё с первого раза. Ещё пара визитов — и вы гид.',
      en: 'Almost everything on the first try. A couple more visits and you’ll be a guide.',
      zh: '几乎全部一次答对。再来几次，你就能当导游了。',
      ar: 'كل شيء تقريبًا من المحاولة الأولى. زيارتان أخريان وتصبح مرشدًا.',
      es: 'Casi todo a la primera. Un par de visitas más y serás guía.',
      fr: 'Presque tout du premier coup. Encore deux visites et vous serez guide.',
    },
  },
  {
    id: 'traveller',
    from: 0.3,
    name: { ru: 'Отважный путешественник', en: 'Brave Traveller', zh: '勇敢的旅行者', ar: 'رحّالة شجاع', es: 'Viajero valiente', fr: 'Voyageur intrépide' },
    comment: {
      ru: 'Вы не сдавались — а это главное в любом путешествии.',
      en: 'You didn’t give up — and that’s what matters on any journey.',
      zh: '你没有放弃——这才是旅途中最重要的。',
      ar: 'لم تستسلم، وهذا هو الأهم في أي رحلة.',
      es: 'No te rendiste, y eso es lo que importa en cualquier viaje.',
      fr: 'Vous n’avez pas abandonné : c’est l’essentiel de tout voyage.',
    },
  },
  {
    id: 'adventurer',
    from: 0,
    name: { ru: 'Начинающий искатель приключений', en: 'Budding Adventurer', zh: '初出茅庐的冒险家', ar: 'مغامر مبتدئ', es: 'Aventurero principiante', fr: 'Aventurier en herbe' },
    comment: {
      ru: 'Музей полон тайн — у вас есть отличный повод вернуться.',
      en: 'The museum is full of secrets — a perfect reason to come back.',
      zh: '博物馆充满秘密——这正是你再来的好理由。',
      ar: 'المتحف مليء بالأسرار، وهذا سبب رائع للعودة.',
      es: 'El museo está lleno de secretos: un motivo perfecto para volver.',
      fr: 'Le musée regorge de secrets : une excellente raison de revenir.',
    },
  },
];

/* Badges: one per task type present in the quest, plus "no hints". */
export const BADGES = {
  search: { icon: 'search', name: { ru: 'Охотник за датами', en: 'Date Hunter', zh: '年份猎人', ar: 'صائد التواريخ', es: 'Cazador de fechas', fr: 'Chasseur de dates' } },
  attention: { icon: 'attention', name: { ru: 'Зоркий глаз', en: 'Eagle Eye', zh: '火眼金睛', ar: 'عين الصقر', es: 'Ojo de águila', fr: 'Œil de lynx' } },
  logic: { icon: 'logic', name: { ru: 'Мастер логики', en: 'Logic Master', zh: '逻辑大师', ar: 'سيّد المنطق', es: 'Maestro de la lógica', fr: 'As de la logique' } },
  creative: { icon: 'creative', name: { ru: 'Творец', en: 'Creator', zh: '创作者', ar: 'المبدع', es: 'Creador', fr: 'Créateur' } },
  communication: { icon: 'communication', name: { ru: 'Душа компании', en: 'Life of the Party', zh: '社交达人', ar: 'روح المجموعة', es: 'Alma de la fiesta', fr: 'Boute-en-train' } },
  noHints: { icon: 'hint', name: { ru: 'Без подсказок', en: 'No Hints Needed', zh: '无需提示', ar: 'بلا تلميحات', es: 'Sin pistas', fr: 'Sans indice' } },
};

export const SUMMARY_TEXT = {
  rankTitle: { ru: 'Ваше звание', en: 'Your title', zh: '你的称号', ar: 'لقبك', es: 'Tu título', fr: 'Votre titre' },
  tasksDone: { ru: 'Заданий пройдено: {n}', en: 'Tasks completed: {n}', zh: '完成任务：{n}', ar: 'المهام المنجزة: {n}', es: 'Tareas completadas: {n}', fr: 'Épreuves réussies : {n}' },
  hintsUsed: { ru: 'Подсказок взято: {n}', en: 'Hints used: {n}', zh: '使用提示：{n}次', ar: 'التلميحات المستخدمة: {n}', es: 'Pistas usadas: {n}', fr: 'Indices utilisés : {n}' },
  hallsVisited: { ru: 'Залов посещено: {n}', en: 'Halls visited: {n}', zh: '参观展厅：{n}个', ar: 'القاعات التي زرتها: {n}', es: 'Salas visitadas: {n}', fr: 'Salles visitées : {n}' },
  badgesTitle: { ru: 'Награды', en: 'Badges', zh: '徽章', ar: 'الأوسمة', es: 'Insignias', fr: 'Badges' },
  earned: { ru: 'получено', en: 'earned', zh: '已获得', ar: 'حصلت عليه', es: 'conseguido', fr: 'obtenu' },
  notEarned: { ru: 'не в этот раз', en: 'not this time', zh: '这次没有', ar: 'ليس هذه المرة', es: 'esta vez no', fr: 'pas cette fois' },
  quotesTitle: { ru: 'Ваши слова', en: 'Your words', zh: '你写的话', ar: 'كلماتك', es: 'Tus palabras', fr: 'Vos mots' },
  pathTitle: { ru: 'Ваш путь', en: 'Your path', zh: '你的路线', ar: 'مسارك', es: 'Tu recorrido', fr: 'Votre parcours' },
  outcomes: {
    firstTry: { ru: 'С первого раза', en: 'First try', zh: '一次答对', ar: 'من أول مرة', es: 'A la primera', fr: 'Du premier coup' },
    retry: { ru: 'Не с первого раза', en: 'After a few tries', zh: '多试了几次', ar: 'بعد عدة محاولات', es: 'Tras varios intentos', fr: 'Après quelques essais' },
    revealed: { ru: 'Ответ подсмотрен', en: 'Peeked at the answer', zh: '偷看了答案', ar: 'اختلست النظر إلى الإجابة', es: 'Miraste la respuesta', fr: 'Réponse dévoilée' },
    done: { ru: 'Выполнено', en: 'Done', zh: '已完成', ar: 'أُنجزت', es: 'Hecho', fr: 'Fait' },
  },
};
