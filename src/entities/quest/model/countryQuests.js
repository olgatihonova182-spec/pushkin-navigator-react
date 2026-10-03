/* Quests for each country a student can pick (shared/config/countries.js). Every question connects
   an exhibit with that country: where it was made, who brought it there, what it means there.
   Texts exist in Russian and in the country's language (`languages`), the quest is fixed to `lang`.

   Facts come from the museum's catalogue descriptions (exhibit ids in `exhibit`,
   data/pushkin-collection.json). Where a task adds common knowledge that the catalogue does not
   state (goldfish from China, frost fairs on the Thames), it says so in `note`.
   `culture` explains what was taken into account. Halls are schematic (README); exhibits with
   hallSource 'guess' must be checked on site. */
export const COUNTRY_QUESTS = [
  {
    id: 'egypt-pharaohs',
    country: 'egypt',
    lang: 'ar',
    languages: ['ru', 'ar'],
    building: 'main',
    drawing: 'column',
    minutes: 45,
    level: 'A2–B1',
    culture: 'Студенты из Египта: египетский зал музея — их собственная история; каждый вопрос называет место в сегодняшнем Египте (Саккара, Луксор, Фаюм). Нет экспонатов с обнажённой натурой; творческое задание без фото людей.',
    title: { ru: 'По следам фараонов', ar: 'على خطى الفراعنة' },
    about: {
      ru: 'Египет в Москве: фараоны, жрецы и портреты из Фаюма — и египетский фараон, которого каталог музея увидел у Пикассо.',
      ar: 'مصر في موسكو: الفراعنة والكهنة وبورتريهات الفيوم، والفرعون المصري الذي رآه كتالوج المتحف في لوحة بيكاسو.',
    },
    tasks: [
      {
        id: 'amenemhat-dynasty',
        type: 'search',
        hall: 'main-1',
        exhibit: '3716',
        answer: { kind: 'number', value: 12 },
        prompt: {
          ru: 'Найдите статую царя Аменемхета III. Прочитайте табличку: при какой по счёту династии он правил Египтом? Впишите число.',
          ar: 'ابحث عن تمثال الملك أمنمحات الثالث. اقرأ البطاقة: في أي أسرة حكم مصر؟ اكتب رقمها.',
        },
        hint: { ru: 'На табличке рядом со словом «династия» стоит число.', ar: 'على البطاقة رقم بجانب كلمة «династия» (الأسرة).' },
        explain: {
          ru: '12-я династия, Среднее царство. Аменемхет III построил две пирамиды — в Дахшуре и в Хаваре, недалеко от Фаюма.',
          ar: 'الأسرة الثانية عشرة، الدولة الوسطى. بنى أمنمحات الثالث هرمين: في دهشور وفي هوارة قرب الفيوم.',
        },
      },
      {
        id: 'mourners-count',
        type: 'attention',
        hall: 'main-1',
        exhibit: '3706',
        note: 'Что Саккара — у сегодняшнего Каира, — общеизвестно; остальное из каталога.',
        answer: { kind: 'choice', correct: 2, options: ['12', '14', '16', '18'] },
        prompt: {
          ru: 'Рельеф из гробницы в Саккаре — некрополе древней столицы Мемфиса, недалеко от сегодняшнего Каира. Мужчины оплакивают умершего. Сколько их?',
          ar: 'نقش من مقبرة في سقارة، جبّانة العاصمة القديمة منف قرب القاهرة اليوم. رجال يبكون الميت. كم عددهم؟',
        },
        hint: { ru: 'Считайте по группам, слева направо.', ar: 'عُدّ المجموعات واحدة واحدة من اليسار إلى اليمين.' },
        explain: {
          ru: 'Шестнадцать. Соседний кусок этой же гробницы, вероятно, хранится в Детройте (США): камни Саккары разошлись по музеям мира.',
          ar: 'ستة عشر رجلًا. ومن المرجح أن قطعة مجاورة من المقبرة نفسها محفوظة في ديترويت بالولايات المتحدة: تفرّقت أحجار سقارة على متاحف العالم.',
        },
      },
      {
        id: 'hatshepsut',
        type: 'logic',
        hall: 'main-1',
        exhibit: '3675',
        note: 'Что Фивы — сегодняшний Луксор, — общеизвестно; остальное из каталога.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Хатшепсут', ar: 'حتشبسوت' },
            { ru: 'Клеопатра', ar: 'كليوباترا' },
            { ru: 'Нефертити', ar: 'نفرتيتي' },
            { ru: 'Рамсес II', ar: 'رمسيس الثاني' },
          ],
        },
        prompt: {
          ru: 'Статуэтки жреца Аменхотепа и его жены Раннаи — из гробницы на западном берегу Фив, сегодня это Луксор. Их сделали, когда Египтом правила женщина-фараон. Кто она?',
          ar: 'تمثالا الكاهن أمنحتب وزوجته رناي من مقبرة على الضفة الغربية لطيبة، أي الأقصر اليوم. صُنعا حين كانت امرأةٌ فرعونًا تحكم مصر. من هي؟',
        },
        hint: {
          ru: 'Клеопатра жила на 1400 лет позже, Рамсес II — мужчина, а Нефертити была женой фараона.',
          ar: 'عاشت كليوباترا بعد ذلك بنحو 1400 عام، ورمسيس الثاني رجل، ونفرتيتي كانت زوجة فرعون.',
        },
        explain: {
          ru: 'Хатшепсут. Статуэтки из эбенового дерева заказал сын этой пары; украшения Раннаи — из золотой фольги, глаза — из стекла.',
          ar: 'حتشبسوت. طلب صنعَ التمثالين ابنُ الزوجين، وهما من خشب الأبنوس؛ حُليّ رناي من رقائق الذهب، والعيون من الزجاج.',
        },
      },
      {
        id: 'anubis',
        type: 'attention',
        hall: 'main-1',
        exhibit: '3708',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Анубис', ar: 'أنوبيس' },
            { ru: 'Осирис', ar: 'أوزيريس' },
            { ru: 'Гор', ar: 'حورس' },
            { ru: 'Ра', ar: 'رع' },
          ],
        },
        prompt: {
          ru: 'Погребальная пелена из римского Египта: рядом с молодым человеком два египетских бога. Один — с головой шакала. Как его зовут?',
          ar: 'كفن من مصر في العصر الروماني: بجانب الشاب إلهان مصريان. أحدهما برأس ابن آوى. ما اسمه؟',
        },
        hint: { ru: 'Этот бог бальзамировал умерших и провожал их в загробный мир.', ar: 'هذا الإله كان يحنّط الموتى ويرافقهم إلى العالم الآخر.' },
        explain: {
          ru: 'Анубис. Второй бог — Осирис. Боги написаны по-египетски плоско, а юноша — объёмно, по правилам античного искусства: две традиции на одной ткани.',
          ar: 'أنوبيس. والإله الثاني أوزيريس. رُسم الإلهان بالأسلوب المصري المسطّح، والشاب بأسلوب مجسّم وفق قواعد الفن الكلاسيكي: تقليدان على قماش واحد.',
        },
      },
      {
        id: 'fayum-youth',
        type: 'creative',
        hall: 'main-1',
        exhibit: '3687',
        note: 'Что Фаюм — оазис к юго-западу от Каира, — общеизвестно.',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Портрет юноши в золотом венке написан в Египте во II веке; такие портреты называют фаюмскими — по оазису к юго-западу от Каира. Придумайте, кем он был и о чём мечтал, — одна фраза.',
          ar: 'رُسم بورتريه الشاب ذي الإكليل الذهبي في مصر في القرن الثاني؛ وتُسمّى هذه البورتريهات بورتريهات الفيوم نسبةً إلى الواحة الواقعة جنوب غرب القاهرة. تخيّل من كان وبماذا كان يحلم، في جملة واحدة.',
        },
        hint: { ru: 'Посмотрите на венок и на глаза — что они говорят о нём?', ar: 'انظر إلى الإكليل وإلى العينين: ماذا يقولان عنه؟' },
        explain: {
          ru: 'Правильного ответа нет. Портрет написан на дереве восковыми красками (энкаустика) — поэтому он такой яркий.',
          ar: 'لا توجد إجابة صحيحة. رُسم البورتريه على الخشب بألوان شمعية (الإنكاوستيك)، ولهذا هو زاهٍ إلى هذا الحد.',
        },
      },
      {
        id: 'ask-about-egypt',
        type: 'communication',
        hall: 'main-1',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Спросите смотрителя, какой египетский экспонат в этом зале он считает самым важным. Запишите ответ — и расскажите ему, из какого вы города Египта.',
          ar: 'اسأل المراقب: ما القطعة المصرية التي يراها الأهم في هذه القاعة؟ اكتب الإجابة، وأخبره من أي مدينة مصرية أنت.',
        },
        phrase: {
          ru: 'Скажите, пожалуйста, какой египетский экспонат здесь самый важный? Я из Египта.',
          ar: 'من فضلك، ما القطعة المصرية الأهم هنا؟ أنا من مصر.',
        },
        hint: { ru: 'Если смотритель занят, спросите другую команду.', ar: 'إن كان المراقب مشغولًا، اسأل فريقًا آخر.' },
        explain: {
          ru: 'Спасибо! Около 60 статуй Аменемхета III хранятся в музеях мира — от Каира до Санкт-Петербурга, а портрет из этого зала египтолог О. Д. Берлев назвал «едва ли не самым насыщенным внутренним содержанием».',
          ar: 'شكرًا! تُحفظ نحو 60 تمثالًا لأمنمحات الثالث في متاحف العالم، من القاهرة إلى سانت بطرسبورغ، ووصف عالم المصريات أ. د. بيرليف تمثال هذه القاعة بأنه «يكاد يكون الأغنى بالمضمون الداخلي».',
        },
      },
      {
        id: 'picasso-pharaoh',
        type: 'attention',
        hall: 'gallery-21',
        exhibit: '6586',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'На фараона на троне', ar: 'فرعون على عرشه' },
            { ru: 'На писца за работой', ar: 'كاتب منهمك في عمله' },
            { ru: 'На лодочника на Ниле', ar: 'مراكبي على النيل' },
            { ru: 'На танцовщицу', ar: 'راقصة' },
          ],
        },
        prompt: {
          ru: 'Перейдите в Галерею, к «Девочке на шаре» Пикассо. Посмотрите на силача на кубе: прямая спина, полная неподвижность. На кого из Древнего Египта он похож, по словам каталога музея?',
          ar: 'انتقل إلى الغاليري، إلى لوحة بيكاسو «الفتاة على الكرة». انظر إلى الرجل القوي الجالس على المكعّب: ظهر مستقيم وسكون تام. بمن يشبه من مصر القديمة بحسب كتالوج المتحف؟',
        },
        hint: { ru: 'Вспомните сидящую статую Аменемхета III.', ar: 'تذكّر تمثال أمنمحات الثالث الجالس.' },
        explain: {
          ru: 'На фараона: каталог пишет, что атлет «подобно египетскому фараону царственно восседает на кубе». Египет вдохновлял художников и через 3500 лет.',
          ar: 'على فرعون: يقول الكتالوج إن الرياضي «يجلس على المكعّب جلسة ملكية مثل فرعون مصري». ظلّت مصر تُلهم الفنانين بعد 3500 عام.',
        },
      },
    ],
  },

  {
    id: 'china-symbols-of-luck',
    country: 'china',
    lang: 'zh',
    languages: ['ru', 'zh'],
    building: 'gallery',
    drawing: 'sunrise',
    minutes: 40,
    level: 'A2–B1',
    culture: 'Студенты из Китая: в каталоге нет китайских экспонатов в экспозиции, поэтому связь — через знакомую с детства символику (рыба — изобилие, персик и сосна — долголетие), живопись свитков и стихи «гор и вод»; это помечено в note. Число 4 не обыгрывается; задания удобно делать группой.',
    title: { ru: 'Символы удачи и долголетия', zh: '幸运与长寿的象征' },
    about: {
      ru: 'Галерея глазами китайского зрителя: рыбки, персики, сосна и горы — то, что в Китае считается добрыми знаками.',
      zh: '用中国人的眼光看画廊：金鱼、桃子、松树和山——在中国被视为吉祥的事物。',
    },
    tasks: [
      {
        id: 'goldfish-year',
        type: 'search',
        hall: 'gallery-20',
        exhibit: '4149',
        note: 'Происхождение золотых рыбок из Китая и игра слов 鱼/余 — общеизвестны, не из каталога.',
        answer: { kind: 'number', value: 1912 },
        prompt: {
          ru: 'Золотых рыбок вывели в Китае. Найдите картину Анри Матисса «Красные рыбы»: в каком году она написана?',
          zh: '金鱼最早是在中国培育的。找到亨利·马蒂斯的《红鱼》：这幅画是哪一年画的？',
        },
        hint: { ru: 'Год — на табличке рядом с картиной.', zh: '年份在画旁边的说明牌上。' },
        explain: {
          ru: 'В 1912 году. Слово «рыба» (鱼, юй) звучит как «изобилие» (余) — поэтому в Китае рыбки желают достатка. У Матисса красные рыбки — главное пятно картины.',
          zh: '1912年。“鱼”与“余”同音，象征年年有余。在马蒂斯的画里，红色的鱼是整幅画的视觉中心。',
        },
      },
      {
        id: 'matisse-viewpoints',
        type: 'attention',
        hall: 'gallery-20',
        exhibit: '4149',
        note: 'Сравнение с «подвижной перспективой» китайских свитков — наше; каталог говорит о персидских миниатюрах и иконах.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Аквариум — сбоку, стол — сверху', zh: '鱼缸从侧面看，桌面从上面看' },
            { ru: 'Оба — сбоку', zh: '都从侧面看' },
            { ru: 'Оба — сверху', zh: '都从上面看' },
            { ru: 'Аквариум — сверху, стол — сбоку', zh: '鱼缸从上面看，桌面从侧面看' },
          ],
        },
        prompt: {
          ru: 'В китайской живописи на свитках взгляд «путешествует» по картине. Матисс тоже смотрит на предметы с разных точек. Как он показал аквариум и столешницу?',
          zh: '在中国卷轴画里，视线在画中“游走”。马蒂斯也从不同的角度看物体。他是怎样画鱼缸和桌面的？',
        },
        hint: { ru: 'Посмотрите, видна ли круглая поверхность стола.', zh: '看看能不能看到圆形的桌面。' },
        explain: {
          ru: 'Аквариум — сбоку, столешница — сверху. Каталог связывает это с персидскими миниатюрами и иконами, а китайскому зрителю это напомнит «подвижную перспективу» свитков.',
          zh: '鱼缸从侧面看，桌面从上面看。博物馆目录把这与波斯细密画和圣像画联系起来；中国观众会想到卷轴画的“散点透视”。',
        },
      },
      {
        id: 'goldfish-from-china',
        type: 'communication',
        hall: 'gallery-20',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Расскажите смотрителю по-русски, что золотых рыбок вывели в Китае, и спросите, знал ли он об этом. Запишите, что он ответил.',
          zh: '用俄语告诉展厅管理员：金鱼最早是在中国培育的，再问问他以前知不知道。记下他的回答。',
        },
        phrase: { ru: 'Вы знали, что золотых рыбок вывели в Китае?', zh: '您知道金鱼最早是在中国培育的吗？' },
        hint: { ru: 'Смотрители говорят по-русски. Можно показать фразу на экране.', zh: '管理员说俄语。可以把屏幕上的句子给他们看。' },
        explain: { ru: 'Спасибо! Теперь в музее одним знатоком Китая больше.', zh: '谢谢！现在博物馆里又多了一个了解中国的人。' },
      },
      {
        id: 'peach-longevity',
        type: 'logic',
        hall: 'gallery-cezanne',
        exhibit: '4014',
        note: 'Персик как символ долголетия и обычай не делить грушу — общеизвестная китайская символика, не из каталога.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Персик', zh: '桃子' },
            { ru: 'Груша', zh: '梨' },
            { ru: 'Яблоко', zh: '苹果' },
            { ru: 'Виноград', zh: '葡萄' },
          ],
        },
        prompt: {
          ru: 'Поль Сезанн, «Персики и груши». Какой из этих фруктов в Китае — символ долголетия?',
          zh: '保罗·塞尚的《桃子和梨》。下面哪种水果在中国象征长寿？',
        },
        hint: { ru: 'Вспомните персиковый сад богини Сиванму.', zh: '想想西王母的蟠桃园。' },
        explain: {
          ru: 'Персик. А грушу (梨, ли) в Китае не принято делить: «делить грушу» звучит как «расставаться» (分离). Сезанн же просто любил эти фрукты и переносил их из картины в картину.',
          zh: '桃子。在中国，人们不爱分梨吃，因为“分梨”听起来像“分离”。塞尚则只是喜欢这些水果，常把它们从一幅画搬到另一幅画里。',
        },
      },
      {
        id: 'signac-pine',
        type: 'attention',
        hall: 'gallery-20th-century',
        exhibit: '4023',
        note: 'Сосна как символ долголетия в Китае — общеизвестно, не из каталога.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Отдельными мазками разной формы, как мозаика', zh: '用形状不同的分开笔触，像马赛克' },
            { ru: 'Ровной заливкой одного цвета', zh: '用一种颜色平涂' },
            { ru: 'Тонкими линиями тушью', zh: '用细细的墨线' },
            { ru: 'Одним широким мазком', zh: '用一笔宽宽的笔触' },
          ],
        },
        prompt: {
          ru: 'В Китае сосна — символ долголетия и стойкости. Поль Синьяк, «Сосна Берто. Сен-Тропе»: как написана крона сосны?',
          zh: '在中国，松树象征长寿和坚韧。保罗·西涅克的《圣特罗佩的贝尔托松树》：松树的树冠是怎么画的？',
        },
        hint: { ru: 'Подойдите ближе, а потом отойдите на несколько шагов.', zh: '先走近看，再后退几步看。' },
        explain: {
          ru: 'Отдельными мазками — поэтому направление называют дивизионизмом (от фр. diviser — разделять). Китайский мастер написал бы сосну тушью, живым движением кисти.',
          zh: '用分开的笔触——所以这一流派叫“分色主义”（法语 diviser，意为“分开”）。中国画家会用水墨，一气呵成地画松。',
        },
      },
      {
        id: 'mountain-poem',
        type: 'creative',
        hall: 'gallery-landscape',
        exhibit: '4338',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Гюстав Курбе, «Хижина в горах». Сочините к картине две строки в духе китайских стихов «гор и вод» (山水). Можно на китайском.',
          zh: '古斯塔夫·库尔贝的《山中小屋》。为这幅画写两句山水诗。',
        },
        hint: { ru: 'Например: что видно из окна хижины? Кто там живёт?', zh: '比如：从小屋的窗户能看到什么？谁住在那里？' },
        explain: {
          ru: 'Правильного ответа нет. Курбе написал картину в Швейцарии, где провёл последние годы жизни, — как китайский поэт-отшельник в горах.',
          zh: '没有标准答案。库尔贝在瑞士画了这幅画，他在那里度过了生命的最后几年——就像隐居山中的中国诗人。',
        },
      },
    ],
  },

  {
    id: 'spain-in-the-pushkin',
    country: 'spain',
    lang: 'es',
    languages: ['ru', 'es'],
    building: 'main',
    drawing: 'sunrise',
    minutes: 40,
    level: 'A2–B1',
    culture: 'Студенты из Испании: испанские мастера в двух зданиях — Сурбаран Золотого века, Пикассо из Барселоны и сравнение с Эль Греко из каталога; творческое задание об уличных артистах своего города.',
    title: { ru: 'Испания в Пушкинском', es: 'España en el Pushkin' },
    about: {
      ru: 'Испанские художники в Москве: от Сурбарана до Пикассо — и что в них узнает испанец.',
      es: 'Pintores españoles en Moscú: de Zurbarán a Picasso, y lo que un español reconoce en ellos.',
    },
    tasks: [
      {
        id: 'zurbaran-year',
        type: 'search',
        hall: 'main-spain',
        exhibit: '6564',
        answer: { kind: 'number', value: 1658 },
        prompt: {
          ru: 'В зале испанской живописи найдите «Мадонну с младенцем» Франсиско де Сурбарана. В каком году она написана?',
          es: 'En la sala de pintura española, busca la «Virgen con el Niño» de Francisco de Zurbarán. ¿En qué año fue pintada?',
        },
        hint: { ru: 'Год — на табличке рядом с картиной, четыре цифры.', es: 'El año está en la cartela junto al cuadro: cuatro cifras.' },
        explain: {
          ru: 'В 1658 году. Сурбаран — мастер «Золотого века» испанской живописи.',
          es: 'En 1658. Zurbarán es un maestro del Siglo de Oro de la pintura española.',
        },
      },
      {
        id: 'spanish-artists',
        type: 'communication',
        hall: 'main-spain',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Спросите смотрителя, где в музее ещё есть работы испанских художников. Запишите, куда вас направили.',
          es: 'Pregunta al vigilante dónde hay más obras de pintores españoles en el museo. Escribe adónde te enviaron.',
        },
        phrase: {
          ru: 'Извините, где в музее ещё есть картины испанских художников? Я из Испании.',
          es: 'Disculpe, ¿dónde hay más cuadros de pintores españoles en el museo? Soy de España.',
        },
        hint: {
          ru: 'Смотрители говорят по-русски. Покажите фразу на экране, если трудно сказать её вслух.',
          es: 'Los vigilantes hablan ruso. Enseña la frase en la pantalla si te cuesta decirla.',
        },
        explain: {
          ru: 'Спасибо! Испанская живопись есть и в Главном здании, и в Галерее — у Пикассо. Следующие задания там.',
          es: '¡Gracias! Hay pintura española tanto en el Edificio Principal como en la Galería, con Picasso. Las próximas tareas están allí.',
        },
      },
      {
        id: 'picasso-barcelona',
        type: 'logic',
        hall: 'gallery-21',
        exhibit: '6584',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'В Барселоне', es: 'En Barcelona' },
            { ru: 'В Мадриде', es: 'En Madrid' },
            { ru: 'В Севилье', es: 'En Sevilla' },
            { ru: 'В Малаге', es: 'En Málaga' },
          ],
        },
        prompt: {
          ru: 'Пикассо, «Старый еврей с мальчиком». Картина голубого периода написана в 1903 году в испанском городе, где тогда жил художник. В каком?',
          es: 'Picasso, «Viejo judío con un niño». Este cuadro del período azul se pintó en 1903 en la ciudad española donde vivía el pintor. ¿En cuál?',
        },
        hint: { ru: 'Это столица Каталонии.', es: 'Es la capital de Cataluña.' },
        explain: {
          ru: 'В Барселоне. Синий цвет здесь — не цвет предметов, а цвет печали.',
          es: 'En Barcelona. El azul aquí no es el color de las cosas, sino el de la tristeza.',
        },
      },
      {
        id: 'picasso-el-greco',
        type: 'attention',
        hall: 'gallery-21',
        exhibit: '6584',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Эль Греко', es: 'El Greco' },
            { ru: 'Франсиско Гойя', es: 'Francisco de Goya' },
            { ru: 'Диего Веласкес', es: 'Diego Velázquez' },
            { ru: 'Сальвадор Дали', es: 'Salvador Dalí' },
          ],
        },
        prompt: {
          ru: 'Посмотрите на вытянутые фигуры и «готические» руки старика. Каталог музея сравнивает картину с испанской живописью XVI века. С каким художником?',
          es: 'Mira las figuras alargadas y las manos «góticas» del anciano. El catálogo del museo compara el cuadro con la pintura española del siglo XVI. ¿Con qué pintor?',
        },
        hint: { ru: 'Нужен художник XVI века, а не XVII, XVIII или XX.', es: 'Buscamos un pintor del siglo XVI, no del XVII, el XVIII ni el XX.' },
        explain: {
          ru: 'Эль Греко — и ещё Луис де Моралес. Молодой Пикассо учился у испанских мастеров, а потом изменил всё искусство.',
          es: 'El Greco, y también Luis de Morales. El joven Picasso aprendió de los maestros españoles y después cambió todo el arte.',
        },
      },
      {
        id: 'street-artists',
        type: 'creative',
        hall: 'gallery-21',
        exhibit: '6586',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Пикассо, «Девочка на шаре»: бродячие акробаты, которых художник видел уже в Париже. Опишите одной фразой уличных артистов вашего города в Испании.',
          es: 'Picasso, «Niña sobre una bola»: acróbatas ambulantes que el pintor vio ya en París. Describe en una frase a los artistas callejeros de tu ciudad en España.',
        },
        hint: { ru: 'Кто выступает на улицах вашего города: музыканты, мимы, акробаты?', es: '¿Quién actúa en las calles de tu ciudad: músicos, mimos, acróbatas?' },
        explain: {
          ru: 'Правильного ответа нет. Картина 1905 года — розовый период: Пикассо только что переехал из Испании в Париж, на Монмартр.',
          es: 'No hay respuesta correcta. El cuadro es de 1905, el período rosa: Picasso acababa de mudarse de España a París, a Montmartre.',
        },
      },
    ],
  },

  {
    id: 'latin-america-in-the-pushkin',
    country: 'latin-america',
    lang: 'es',
    languages: ['ru', 'es'],
    building: 'main',
    drawing: 'sunrise',
    minutes: 40,
    level: 'A2–B1',
    culture: 'Студенты из Латинской Америки: латиноамериканских художников в каталоге нет, поэтому связь — через экспонаты, связанные с Америкой: ягуар и выдуманная Мексика Руссо, детство Гогена в Перу, картины мастерской Сурбарана для колоний; песня о родном крае.',
    title: { ru: 'Латинская Америка в Пушкинском', es: 'América Latina en el Pushkin' },
    about: {
      ru: 'Где в Пушкинском спряталась Латинская Америка: ягуар, Перу Гогена и испанский мастер, писавший для Лимы.',
      es: 'Dónde se esconde América Latina en el Pushkin: un jaguar, el Perú de Gauguin y un maestro español que pintaba para Lima.',
    },
    tasks: [
      {
        id: 'zurbaran-for-america',
        type: 'search',
        hall: 'main-spain',
        exhibit: '6564',
        note: 'Что мастерская Сурбарана отправляла картины в американские колонии, — общеизвестно, не из каталога.',
        answer: { kind: 'number', value: 1658 },
        prompt: {
          ru: 'Мастерская Франсиско де Сурбарана отправляла картины в испанские колонии в Америке — например, в Лиму. Найдите его «Мадонну с младенцем»: в каком году она написана?',
          es: 'El taller de Francisco de Zurbarán enviaba cuadros a las colonias españolas en América, por ejemplo a Lima. Busca su «Virgen con el Niño»: ¿en qué año fue pintada?',
        },
        hint: { ru: 'Год — на табличке рядом с картиной.', es: 'El año está en la cartela junto al cuadro.' },
        explain: {
          ru: 'В 1658 году. Картины Сурбарана и его учеников и сегодня можно увидеть в церквях и музеях Латинской Америки.',
          es: 'En 1658. Aún hoy se pueden ver cuadros de Zurbarán y de su taller en iglesias y museos de América Latina.',
        },
      },
      {
        id: 'rousseau-mexico',
        type: 'logic',
        hall: 'gallery-20th-century',
        exhibit: '4005',
        answer: {
          kind: 'choice',
          correct: 1,
          options: [
            { ru: 'В Мексике', es: 'En México' },
            { ru: 'В Ботаническом саду Парижа', es: 'En el Jardín Botánico de París' },
            { ru: 'В Бразилии', es: 'En Brasil' },
            { ru: 'На Кубе', es: 'En Cuba' },
          ],
        },
        prompt: {
          ru: 'Анри Руссо, «Нападение ягуара на лошадь». Руссо рассказывал друзьям, что побывал в Мексике и охотился в тропических лесах. Где на самом деле он видел тропические растения?',
          es: 'Henri Rousseau, «Jaguar atacando a un caballo». Rousseau contaba a sus amigos que había estado en México y había cazado en la selva. ¿Dónde vio en realidad las plantas tropicales?',
        },
        hint: { ru: 'В тропиках Руссо не бывал — только у себя в городе.', es: 'Rousseau nunca estuvo en el trópico, solo en su propia ciudad.' },
        explain: {
          ru: 'В Ботаническом саду и Зоологическом музее Парижа, а ещё по открыткам и маркам. Его Мексика — выдуманная.',
          es: 'En el Jardín Botánico y el Museo de Zoología de París, y también en postales y sellos. Su México es inventado.',
        },
      },
      {
        id: 'rousseau-jungle',
        type: 'attention',
        hall: 'gallery-20th-century',
        exhibit: '4005',
        note: 'Ареал ягуара (от Мексики до Аргентины) — общеизвестно.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Цветы и листья больше зверей', es: 'Las flores y hojas son más grandes que los animales' },
            { ru: 'Звери больше цветов', es: 'Los animales son más grandes que las flores' },
            { ru: 'Они одного размера', es: 'Son del mismo tamaño' },
            { ru: 'Цветов на картине нет', es: 'No hay flores en el cuadro' },
          ],
        },
        prompt: {
          ru: 'Ягуар живёт от Мексики до Аргентины — в настоящих джунглях Латинской Америки. Сравните его «джунгли» у Руссо с настоящими: что больше — звери или цветы?',
          es: 'El jaguar vive desde México hasta Argentina, en las selvas reales de América Latina. Compara la «selva» de Rousseau con la real: ¿qué es más grande, los animales o las flores?',
        },
        hint: { ru: 'Посмотрите на листья вокруг ягуара и лошади.', es: 'Mira las hojas alrededor del jaguar y el caballo.' },
        explain: {
          ru: 'Цветы и листья больше зверей — так не бывает, это сказка. А голова лошади похожа на герб.',
          es: 'Las flores y las hojas son más grandes que los animales; eso no pasa en la realidad, es un cuento. Y la cabeza del caballo parece un escudo heráldico.',
        },
      },
      {
        id: 'gauguin-peru',
        type: 'attention',
        hall: 'gallery-gauguin',
        exhibit: '4244',
        note: 'Детство Гогена в Лиме — общеизвестно, не из каталога; сцена в кафе — из каталога.',
        answer: { kind: 'choice', correct: 1, options: ['2', '3', '4', '5'] },
        prompt: {
          ru: 'Поль Гоген провёл детство в Лиме, в Перу. Потом он написал «Кафе в Арле» на юге Франции. Сколько арлезианок сидит за столом с почтальоном Руленом?',
          es: 'Paul Gauguin pasó su infancia en Lima, en Perú. Después pintó «Café en Arlés», en el sur de Francia. ¿Cuántas arlesianas están sentadas a la mesa con el cartero Roulin?',
        },
        hint: { ru: 'Почтальон — бородатый человек в фуражке за столом.', es: 'El cartero es el hombre con barba y gorra sentado a la mesa.' },
        explain: {
          ru: 'Три. Впереди — хозяйка кафе госпожа Жину. Гоген приехал в Арль к своему другу ван Гогу.',
          es: 'Tres. Delante está la dueña del café, madame Ginoux. Gauguin fue a Arlés para ver a su amigo Van Gogh.',
        },
      },
      {
        id: 'gauguin-song',
        type: 'creative',
        hall: 'gallery-gauguin',
        exhibit: '4255',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Гоген, «RUPERUPE»: это слово из таитянской песни «О, Таити, чудесный край!». Человек, выросший в Перу, всю жизнь искал свой рай. Напишите строчку песни о своём родном крае.',
          es: 'Gauguin, «RUPERUPE»: la palabra viene de una canción de Tahití, «¡Oh, Tahití, tierra maravillosa!». Un hombre que creció en Perú buscó su paraíso toda la vida. Escribe un verso de una canción sobre tu tierra natal.',
        },
        hint: { ru: 'Это может быть строчка настоящей песни вашей страны или ваша собственная.', es: 'Puede ser un verso de una canción real de tu país o uno tuyo.' },
        explain: {
          ru: 'Правильного ответа нет. На картине 1899 года слева — рай с цветами и плодами, справа — земная жизнь.',
          es: 'No hay respuesta correcta. En el cuadro de 1899, a la izquierda está el paraíso con flores y frutos; a la derecha, la vida en la tierra.',
        },
      },
      {
        id: 'latin-american-art',
        type: 'communication',
        hall: 'gallery-gauguin',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Спросите смотрителя, есть ли в музее работы латиноамериканских художников. Запишите ответ — и назовите ему по-русски свою страну.',
          es: 'Pregunta al vigilante si en el museo hay obras de artistas latinoamericanos. Escribe la respuesta y dile en ruso de qué país eres.',
        },
        phrase: {
          ru: 'Извините, есть ли в музее картины латиноамериканских художников? Я из…',
          es: 'Disculpe, ¿hay en el museo cuadros de artistas latinoamericanos? Soy de…',
        },
        hint: { ru: 'Свою страну по-русски: Мексика, Колумбия, Перу, Эквадор, Аргентина…', es: 'Tu país en ruso: Мексика, Колумбия, Перу, Эквадор, Аргентина…' },
        explain: {
          ru: 'Спасибо! Даже если таких картин нет, теперь смотритель знает, что их ждут.',
          es: '¡Gracias! Aunque no haya cuadros así, ahora el vigilante sabe que alguien los espera.',
        },
      },
    ],
  },

  {
    id: 'france-paris-and-masters',
    country: 'france',
    lang: 'fr',
    languages: ['ru', 'fr'],
    building: 'main',
    drawing: 'facade',
    minutes: 45,
    level: 'A2–B1',
    culture: 'Студенты из Франции: французские мастера и Париж в московском музее — от Пуссена и Мольера у Ватто до бульвара Капуцинок; задания на русский словарь и разговор с другой командой.',
    title: { ru: 'Париж и французские мастера', fr: 'Paris et les maîtres français' },
    about: {
      ru: 'Франция в Москве: от Пуссена и Ватто до Моне — и сам Париж на картинах.',
      fr: 'La France à Moscou : de Poussin et Watteau à Monet, et Paris lui-même sur les tableaux.',
    },
    tasks: [
      {
        id: 'poussin-year',
        type: 'search',
        hall: 'main-france',
        exhibit: '4543',
        answer: { kind: 'number', value: 1640 },
        prompt: {
          ru: 'Никола Пуссен — один из главных французских художников XVII века. Найдите его «Великодушие Сципиона»: в каком году оно написано?',
          fr: 'Nicolas Poussin est l’un des grands peintres français du XVIIe siècle. Trouvez sa « Continence de Scipion » : en quelle année a-t-elle été peinte ?',
        },
        hint: { ru: 'Год — на табличке рядом с картиной.', fr: 'L’année est sur le cartel à côté du tableau.' },
        explain: {
          ru: 'В 1640 году. Сципион отказался от прекрасной пленницы и вернул её жениху: «Гораздо проще разрушить город, чем победить самого себя».',
          fr: 'En 1640. Scipion renonce à la belle captive et la rend à son fiancé : « Il est bien plus facile de détruire une ville que de se vaincre soi-même. »',
        },
      },
      {
        id: 'watteau-moliere',
        type: 'attention',
        hall: 'main-france',
        exhibit: '4724',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Коровье ярмо', fr: 'Un joug de vache' },
            { ru: 'Стетоскоп', fr: 'Un stéthoscope' },
            { ru: 'Золотая цепь', fr: 'Une chaîne en or' },
            { ru: 'Шарф', fr: 'Une écharpe' },
          ],
        },
        prompt: {
          ru: 'Ватто, «Сатира на врачей» — возможно, сцена из комедии Мольера. Что надето на шею доктору медицины?',
          fr: 'Watteau, « Satire contre les médecins » — peut-être une scène de Molière. Qu’est-ce que le docteur en médecine porte au cou ?',
        },
        hint: { ru: 'Это предмет из деревни, совсем не медицинский.', fr: 'C’est un objet de la campagne, pas du tout médical.' },
        explain: {
          ru: 'Коровье ярмо. Каталог предполагает «Мнимого больного» или «Господина де Пурсоньяка» — комедии, которые во Франции знают со школы.',
          fr: 'Un joug de vache. Le catalogue évoque « Le Malade imaginaire » ou « Monsieur de Pourceaugnac », des comédies qu’on connaît en France depuis l’école.',
        },
      },
      {
        id: 'chardin-object',
        type: 'creative',
        hall: 'main-france',
        exhibit: '4421',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Шарден, «Натюрморт с атрибутами искусств»: книги, бумага, гипсовая скульптура. Какой предмет из вашей учёбы вы бы добавили на этот французский стол? Назовите его по-русски.',
          fr: 'Chardin, « Nature morte aux attributs des arts » : livres, papiers, sculpture en plâtre. Quel objet de vos études ajouteriez-vous sur cette table française ? Nommez-le en russe.',
        },
        hint: {
          ru: 'Например: «ноутбук», «словарь», «микроскоп».',
          fr: 'Par exemple : « ноутбук » (ordinateur portable), « словарь » (dictionnaire), « микроскоп » (microscope).',
        },
        explain: {
          ru: 'Отличный выбор! Шарден говорил: «Надо пользоваться красками, но писать чувством».',
          fr: 'Excellent choix ! Chardin disait : « On se sert des couleurs, mais on peint avec le sentiment. »',
        },
      },
      {
        id: 'which-is-paris',
        type: 'logic',
        hall: 'gallery-14',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Моне, «Бульвар Капуцинок»', fr: 'Monet, « Le Boulevard des Capucines »' },
            { ru: 'Лоррен, «Похищение Европы»', fr: 'Lorrain, « L’Enlèvement d’Europe »' },
            { ru: 'Дерен, «Просушка парусов»', fr: 'Derain, « Le Séchage des voiles »' },
            { ru: 'Курбе, «Хижина в горах»', fr: 'Courbet, « Chalet dans les montagnes »' },
          ],
        },
        prompt: { ru: 'Только одна из этих картин музея изображает Париж. Какая?', fr: 'Un seul de ces tableaux du musée représente Paris. Lequel ?' },
        hint: {
          ru: 'Дерен писал паруса в Коллиуре на Средиземном море, Курбе — горы Швейцарии, а Лоррен — воображаемый залив.',
          fr: 'Derain a peint les voiles à Collioure, sur la Méditerranée ; Courbet, les montagnes de Suisse ; Lorrain, une baie imaginaire.',
        },
        explain: {
          ru: '«Бульвар Капуцинок». Моне смотрел на него из окна ателье Надара, где в 1874 году прошла первая выставка импрессионистов.',
          fr: '« Le Boulevard des Capucines ». Monet l’a vu depuis une fenêtre de l’atelier de Nadar, où s’est tenue en 1874 la première exposition impressionniste.',
        },
      },
      {
        id: 'monet-balcony',
        type: 'attention',
        hall: 'gallery-14',
        exhibit: '4163',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'На балконе', fr: 'Sur un balcon' },
            { ru: 'В карете', fr: 'Dans une calèche' },
            { ru: 'На мосту', fr: 'Sur un pont' },
            { ru: 'У фонтана', fr: 'Près d’une fontaine' },
          ],
        },
        prompt: {
          ru: 'Моне, «Бульвар Капуцинок в Париже». Край картины обрезает фигуры парижан, как кадр фотографии. Где стоят эти люди?',
          fr: 'Monet, « Le Boulevard des Capucines ». Le bord du tableau coupe des Parisiens, comme un cadrage photo. Où se trouvent-ils ?',
        },
        hint: { ru: 'Посмотрите на края картины.', fr: 'Regardez les bords du tableau.' },
        explain: {
          ru: 'На балконе. Мелкий свободный мазок передаёт движение воздуха и ритм парижской улицы.',
          fr: 'Sur un balcon. La touche fine et libre rend le mouvement de l’air et le rythme de la rue parisienne.',
        },
      },
      {
        id: 'tell-another-team',
        type: 'communication',
        hall: 'gallery-14',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Найдите другую команду и расскажите по-русски одной фразой, какая французская картина понравилась вам больше всего. Запишите, что ответили они.',
          fr: 'Trouvez une autre équipe et dites en russe, en une phrase, quel tableau français vous a le plus plu. Notez ce qu’ils ont répondu.',
        },
        phrase: { ru: 'Мне больше всего понравилась картина… А вам?', fr: 'C’est le tableau… qui m’a le plus plu. Et à vous ?' },
        hint: { ru: 'Если рядом никого нет, спросите смотрителя.', fr: 'S’il n’y a personne, demandez au surveillant.' },
        explain: {
          ru: 'Merci! Рассказать о французской картине по-русски — уже маленькая победа.',
          fr: 'Merci ! Parler d’un tableau français en russe, c’est déjà une petite victoire.',
        },
      },
    ],
  },

  {
    id: 'belgium-flemish-masters',
    country: 'belgium',
    lang: 'fr',
    languages: ['ru', 'fr'],
    building: 'main',
    drawing: 'facade',
    minutes: 40,
    level: 'A2–B1',
    culture: 'Студенты из Бельгии: фламандский зал музея — это искусство сегодняшней Бельгии (Рубенс, Йорданс, ван Дейк работали в Антверпене); ван Гог, проданный бельгийской художнице в Брюсселе; бельгийская кухня в творческом задании.',
    title: { ru: 'Фламандцы и Бельгия', fr: 'Les Flamands et la Belgique' },
    about: {
      ru: 'Фландрия — это сегодняшняя Бельгия: Рубенс, Йорданс и ван Дейк — и картина ван Гога, купленная в Брюсселе.',
      fr: 'La Flandre, c’est aujourd’hui la Belgique : Rubens, Jordaens et Van Dyck, et un tableau de Van Gogh acheté à Bruxelles.',
    },
    tasks: [
      {
        id: 'rubens-year',
        type: 'search',
        hall: 'main-flanders',
        exhibit: '6226',
        note: 'Что Рубенс, Йорданс и ван Дейк работали в Антверпене, — общеизвестно; трактовка Вакха — из каталога.',
        answer: { kind: 'number', value: 1615 },
        prompt: {
          ru: 'Питер Пауль Рубенс — главный художник Антверпена. Найдите его «Вакханалию»: около какого года она написана?',
          fr: 'Pierre Paul Rubens est le grand peintre d’Anvers. Trouvez sa « Bacchanale » : vers quelle année a-t-elle été peinte ?',
        },
        hint: { ru: 'На табличке может стоять слово «около» перед годом.', fr: 'Sur le cartel, l’année peut être précédée de « около » (vers).' },
        explain: {
          ru: 'Около 1615 года. Рубенс показал праздник Вакха так, как его понимали во Фландрии: как осень и сбор урожая — в календарях Вакх был знаком октября.',
          fr: 'Vers 1615. Rubens a montré la fête de Bacchus comme on la comprenait en Flandre : l’automne et les récoltes — dans les calendriers, Bacchus était le signe d’octobre.',
        },
      },
      {
        id: 'jordaens-fable',
        type: 'attention',
        hall: 'main-flanders',
        exhibit: '6187',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'На горячую похлёбку', fr: 'Sur une soupe chaude' },
            { ru: 'На свечу', fr: 'Sur une bougie' },
            { ru: 'На огонь в очаге', fr: 'Sur le feu de la cheminée' },
            { ru: 'На кружку пива', fr: 'Sur une chope de bière' },
          ],
        },
        prompt: {
          ru: 'Якоб Йорданс из Антверпена, «Сатир в гостях у крестьянина»: за столом фламандские крестьяне. Человек дует на руки, чтобы согреть их. А на что он дует потом — и этим удивляет сатира?',
          fr: 'Jacob Jordaens, d’Anvers, « Le Satyre chez le paysan » : des paysans flamands à table. L’homme souffle sur ses mains pour les réchauffer. Et sur quoi souffle-t-il ensuite, à la surprise du satyre ?',
        },
        hint: { ru: 'Это басня Эзопа: тем же дыханием человек и греет, и остужает.', fr: 'C’est une fable d’Ésope : du même souffle, l’homme réchauffe et refroidit.' },
        explain: {
          ru: 'На горячую похлёбку, чтобы её остудить. Моделями для молодой крестьянки с девочкой были жена художника Катерина ван Норт и его дочь Елизавета.',
          fr: 'Sur une soupe chaude, pour la refroidir. La jeune paysanne et la fillette ont pour modèles la femme du peintre, Catharina van Noort, et sa fille Elisabeth.',
        },
      },
      {
        id: 'belgian-dish',
        type: 'creative',
        hall: 'main-flanders',
        exhibit: '6187',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Какое бельгийское блюдо вы бы поставили на стол крестьянам Йорданса? Напишите его название по-русски.',
          fr: 'Quel plat belge ajouteriez-vous sur la table des paysans de Jordaens ? Écrivez son nom en russe.',
        },
        hint: {
          ru: 'Например: «вафли», «картофель фри», «мидии».',
          fr: 'Par exemple : « вафли » (gaufres), « картофель фри » (frites), « мидии » (moules).',
        },
        explain: { ru: 'Приятного аппетита! Теперь фламандский стол стал по-настоящему бельгийским.', fr: 'Bon appétit ! La table flamande est maintenant vraiment belge.' },
      },
      {
        id: 'van-dyck-rose',
        type: 'attention',
        hall: 'main-flanders',
        exhibit: '7151',
        note: 'Что ван Дейк родом из Антверпена, — общеизвестно; остальное из каталога.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Розу', fr: 'Une rose' },
            { ru: 'Лилию', fr: 'Un lys' },
            { ru: 'Тюльпан', fr: 'Une tulipe' },
            { ru: 'Ромашку', fr: 'Une marguerite' },
          ],
        },
        prompt: {
          ru: 'Антонис ван Дейк родом из Антверпена, а прославился в Англии. На его двойном портрете графиня Портленд срывает цветок — знак дружбы. Какой?',
          fr: 'Antoine van Dyck est né à Anvers et s’est rendu célèbre en Angleterre. Sur son double portrait, la comtesse de Portland cueille une fleur, signe d’amitié. Laquelle ?',
        },
        hint: { ru: 'Посмотрите на руку графини слева.', fr: 'Regardez la main de la comtesse, à gauche.' },
        explain: {
          ru: 'Розу. С 1632 года ван Дейк был придворным художником английского короля — антверпенец при лондонском дворе.',
          fr: 'Une rose. À partir de 1632, Van Dyck fut peintre de la cour du roi d’Angleterre : un Anversois à la cour de Londres.',
        },
      },
      {
        id: 'flemish-elsewhere',
        type: 'communication',
        hall: 'main-flanders',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Расскажите смотрителю по-русски, что Фландрия — это сегодняшняя Бельгия, и спросите, где в музее ещё есть фламандские художники. Запишите ответ.',
          fr: 'Dites au surveillant en russe que la Flandre, c’est aujourd’hui la Belgique, et demandez où il y a d’autres peintres flamands dans le musée. Notez la réponse.',
        },
        phrase: {
          ru: 'Я из Бельгии. Где в музее ещё есть фламандские художники?',
          fr: 'Je viens de Belgique. Où y a-t-il d’autres peintres flamands dans le musée ?',
        },
        hint: { ru: 'Смотрители говорят по-русски. Можно показать фразу на экране.', fr: 'Les surveillants parlent russe. Vous pouvez montrer la phrase à l’écran.' },
        explain: { ru: 'Merci! Следующее задание — в Галерее, у ван Гога.', fr: 'Merci ! La prochaine épreuve est à la Galerie, chez Van Gogh.' },
      },
      {
        id: 'van-gogh-brussels',
        type: 'logic',
        hall: 'gallery-16',
        exhibit: '5347',
        answer: { kind: 'choice', correct: 0, options: ['350', '3 500', '35 000', '350 000'] },
        prompt: {
          ru: 'Ван Гог, «Красные виноградники в Арле». В 1890 году картину показали в Брюсселе, и её купила бельгийская художница Анна Бош. За сколько франков?',
          fr: 'Van Gogh, « La Vigne rouge à Arles ». En 1890, le tableau est exposé à Bruxelles et la peintre belge Anna Boch l’achète. Pour combien de francs ?',
        },
        hint: { ru: 'При жизни ван Гог почти ничего не продал — и недорого.', fr: 'De son vivant, Van Gogh n’a presque rien vendu, et pas cher.' },
        explain: {
          ru: 'За 350 франков. Это одна из немногих картин, проданных при жизни художника, — и купили её в Бельгии.',
          fr: 'Pour 350 francs. C’est l’un des rares tableaux vendus du vivant du peintre, et il a été acheté en Belgique.',
        },
      },
    ],
  },

  {
    id: 'uk-british-trail',
    country: 'uk',
    lang: 'en',
    languages: ['ru', 'en'],
    building: 'main',
    drawing: 'magnifier',
    minutes: 40,
    level: 'A2–B1',
    culture: 'Студенты из Великобритании: «британский след» в духе детектива — английский двор у ван Дейка, картина Пуссена из английского замка, Каналетто, который потом писал Лондон, и лондонские «морозные ярмарки» рядом с катком Аверкампа.',
    title: { ru: 'Британский след', en: 'The British Trail' },
    about: {
      ru: 'Детективное расследование: какие картины Главного здания связаны с Британией.',
      en: 'A detective case: which paintings in the Main Building lead back to Britain.',
    },
    tasks: [
      {
        id: 'poussin-houghton',
        type: 'search',
        hall: 'main-france',
        exhibit: '4543',
        note: 'Что коллекцию Уолпола в 1779 году купила Екатерина II, — общеизвестно; Хоутон-холл и 1779 год — из каталога.',
        answer: { kind: 'number', value: 1640 },
        prompt: {
          ru: 'Улика № 1. До 1779 года эта картина висела в Англии — в замке Хоутон-холл лорда Уолпола. Найдите «Великодушие Сципиона» Пуссена: в каком году она написана?',
          en: 'Clue No. 1. Until 1779 this painting hung in England, at Lord Walpole’s Houghton Hall. Find Poussin’s “The Continence of Scipio”: in what year was it painted?',
        },
        hint: { ru: 'Год — четыре цифры на табличке.', en: 'The year is the four digits on the label.' },
        explain: {
          ru: '1640. В 1779 году коллекцию Уолпола купила Екатерина II — так картина из английского замка попала в Россию.',
          en: '1640. In 1779 the Walpole collection was bought by Catherine the Great — that is how a painting from an English country house came to Russia.',
        },
      },
      {
        id: 'canaletto-ring',
        type: 'attention',
        hall: 'main-italy-3',
        exhibit: '6886',
        note: 'Что Каналетто около десяти лет работал в Лондоне, — общеизвестно; праздник Вознесения — из каталога.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Золотое кольцо', en: 'A gold ring' },
            { ru: 'Венок из цветов', en: 'A wreath of flowers' },
            { ru: 'Монету', en: 'A coin' },
            { ru: 'Ключ от города', en: 'The key to the city' },
          ],
        },
        prompt: {
          ru: 'Улика № 2. Каналетто позже около десяти лет работал в Лондоне и писал Темзу. А здесь — Венеция в праздник Вознесения. Что в этот день бросали в море у острова Лидо?',
          en: 'Clue No. 2. Canaletto later spent about ten years in London painting the Thames. Here, though, is Venice on Ascension Day. What was thrown into the sea off the Lido that day?',
        },
        hint: { ru: 'Это был знак «брака» Венеции с морем.', en: 'It was a sign of Venice’s “marriage” to the sea.' },
        explain: {
          ru: 'Золотое кольцо. На картине золотая галера дожа «Бучинторо» возвращается с этой церемонии к Дворцу дожей.',
          en: 'A gold ring. In the painting the Doge’s golden galley, the Bucentaur, is coming back from this ceremony to the Doge’s Palace.',
        },
      },
      {
        id: 'frost-fair-headline',
        type: 'creative',
        hall: 'main-holland',
        exhibit: '5798',
        note: '«Морозные ярмарки» на замёрзшей Темзе в XVII веке — общеизвестно, не из каталога.',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Улика № 3. В XVII веке на замёрзшей Темзе в Лондоне устраивали «морозные ярмарки». Перед вами голландский каток того же времени — «Катание на коньках» Аверкампа. Сочините заголовок лондонской газеты об этой сцене.',
          en: 'Clue No. 3. In the 17th century, “frost fairs” were held on the frozen Thames in London. Here is a Dutch skating scene of the same time — Avercamp’s “Skating”. Write a London newspaper headline about it.',
        },
        hint: {
          ru: 'Детали: кавалер поправляет даме конёк, кто-то играет в мяч, старушку везут на санках, страж порядка с ружьём.',
          en: 'Details: a gentleman fixes a lady’s skate, someone plays ball, an old woman rides a sledge, a watchman holds a gun.',
        },
        explain: {
          ru: 'Отличный заголовок! Хендрик Аверкамп был глухонемым от рождения — и видел мир особенно зорко.',
          en: 'Great headline! Hendrick Avercamp was deaf and mute from birth — and watched the world especially closely.',
        },
      },
      {
        id: 'ask-the-witness',
        type: 'communication',
        hall: 'main-holland',
        answer: { kind: 'free', requiresText: true },
        prompt: {
          ru: 'Улика № 4. Допросите свидетеля: спросите смотрителя, где висит портрет двух английских аристократок работы ван Дейка. Запишите, куда вас направили.',
          en: 'Clue No. 4. Question a witness: ask the attendant where Van Dyck’s portrait of two English noblewomen hangs. Write down where you were sent.',
        },
        phrase: {
          ru: 'Извините, где висит портрет английских дам работы ван Дейка?',
          en: 'Excuse me, where is Van Dyck’s portrait of the two English ladies?',
        },
        hint: { ru: 'Ван Дейк — фламандский художник: ищите во фламандском зале.', en: 'Van Dyck is a Flemish painter: look in the Flemish hall.' },
        explain: { ru: 'Свидетель указал путь. Идём во фламандский зал.', en: 'The witness has pointed the way. On to the Flemish hall.' },
      },
      {
        id: 'van-dyck-two-stages',
        type: 'logic',
        hall: 'main-flanders',
        exhibit: '7151',
        answer: {
          kind: 'choice',
          correct: 1,
          options: [
            { ru: 'Художник торопился', en: 'The artist was in a hurry' },
            { ru: 'Графиню дописали позже, когда семья помирилась', en: 'The Countess was added later, when the family made peace' },
            { ru: 'Картину писали два художника', en: 'Two artists painted it' },
            { ru: 'Половину переписали реставраторы', en: 'Restorers repainted half of it' },
          ],
        },
        prompt: {
          ru: 'Улика № 5. «Леди д’Обиньи и графиня Портленд» — портрет английского двора около 1638 года. Правая и левая части написаны по-разному. Почему?',
          en: 'Clue No. 5. “Lady d’Aubigny and the Countess of Portland” — a portrait from the English court, about 1638. The right and left halves are painted differently. Why?',
        },
        hint: {
          ru: 'Брат графини, родственник короля, тайно обвенчался с леди Катериной Говард, и король был недоволен.',
          en: 'The Countess’s brother, a relative of the King, secretly married Lady Catherine Howard, and the King was displeased.',
        },
        explain: {
          ru: 'Графиню Портленд дописали позже, когда семья Стюартов приняла этот брак. С 1632 года ван Дейк был придворным художником английского короля.',
          en: 'The Countess of Portland was painted in later, once the Stuart family accepted the marriage. From 1632 Van Dyck was court painter to the King of England.',
        },
      },
      {
        id: 'van-dyck-rose',
        type: 'attention',
        hall: 'main-flanders',
        exhibit: '7151',
        note: 'Роза как символ Англии — общеизвестно; жест графини — из каталога.',
        answer: {
          kind: 'choice',
          correct: 0,
          options: [
            { ru: 'Розу', en: 'A rose' },
            { ru: 'Лилию', en: 'A lily' },
            { ru: 'Тюльпан', en: 'A tulip' },
            { ru: 'Ромашку', en: 'A daisy' },
          ],
        },
        prompt: {
          ru: 'Улика № 6. Какой цветок — один из символов Англии — срывает графиня Портленд в знак дружбы к жене брата?',
          en: 'Clue No. 6. Which flower — one of the symbols of England — is the Countess of Portland picking as a sign of friendship towards her brother’s wife?',
        },
        hint: { ru: 'Посмотрите на руку графини слева.', en: 'Look at the Countess’s hand on the left.' },
        explain: {
          ru: 'Розу. Дело закрыто: графиня дружески приняла невестку — леди Катерину Говард, справа на портрете.',
          en: 'A rose. Case closed: the Countess warmly welcomed her sister-in-law, Lady Catherine Howard, on the right of the portrait.',
        },
      },
    ],
  },
];
