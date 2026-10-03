/* Ready-made demo route — shown when there is no AI key or no server. It says so on screen.
   Shared by the browser and the server: no imports from the app.

   Four stops of the Main Building in walking order. Texts exist in Russian, English and
   Chinese; for any other story language the demo is shown in English (the screen says so).
   The «find the detail» task depends on the visitor's region: the leads and answers for China,
   India and Central Asia are the examples from the brief, every answer is in the museum
   catalogue description of the exhibit. Without a region the lead is about student life. */

/* Region from the free-text country: china | india | centralAsia | null. */
export function regionOf(country) {
  const c = String(country || '').toLowerCase();
  if (/кита|china|chine|中国|中國/.test(c)) return 'china';
  if (/инди|india|inde|भारत/.test(c)) return 'india';
  if (/узбек|uzbek|oʻzbek|o'zbek|казах|kazakh|qazaq|қазақ|таджик|tajik|тоҷик|кыргыз|киргиз|kyrgyz|туркмен|turkmen/.test(c)) return 'centralAsia';
  return null;
}

const DEMO_LANGS = ['ru', 'en', 'zh'];

const STOPS = [
  {
    id: '3675',
    reason: {
      ru: 'Им около 3500 лет, и их заказал сын — для своих родителей.',
      en: 'They are about 3,500 years old, and a son ordered them for his parents.',
      zh: '它们大约有3500年历史，是一个儿子为父母定制的。',
    },
    caption: {
      ru: 'Жрец и певица из Фив — вместе 3500 лет',
      en: 'A priest and a singer from Thebes — together for 3,500 years',
      zh: '来自底比斯的祭司和女歌手——相伴3500年',
    },
    story: {
      ru: 'Перед тобой две фигурки из чёрного дерева. Это жрец Аменхотеп и его жена Раннаи, певица бога Амона. Их нашли в гробнице на западном берегу Фив. Фигурки заказал их сын.',
      en: 'In front of you are two figures of black wood. They are the priest Amenhotep and his wife Rannai, a singer of the god Amun. They were found in a tomb on the west bank of Thebes. Their son ordered them.',
      zh: '你面前是两尊黑色木雕。他们是祭司阿蒙霍特普和他的妻子拉奈——阿蒙神的女歌手。它们出土于底比斯西岸的一座墓中，是他们的儿子定制的。',
    },
    forYou: {
      ru: 'Эбеновое дерево в Египте не росло: его везли издалека, с юга, как дорогой привозной материал.',
      en: 'Ebony did not grow in Egypt: it was brought from far away in the south, as a precious import.',
      zh: '埃及不产乌木：它是从遥远的南方运来的珍贵进口材料。',
    },
    tasks: {
      china: {
        lead: { ru: 'В китайской культуре есть сяо — почтение к родителям. Эти статуэтки заказал сын.', en: 'Chinese culture has xiao, respect for one’s parents. A son ordered these statuettes.', zh: '中国文化讲“孝”，即孝敬父母。这两尊雕像是儿子定制的。' },
        question: { ru: 'Сравни две фигурки. Кто выше?', en: 'Compare the two figures. Who is taller?', zh: '比较两尊雕像。谁更高？' },
        options: { ru: ['Аменхотеп', 'Раннаи', 'Они одного роста'], en: ['Amenhotep', 'Rannai', 'They are the same height'], zh: ['阿蒙霍特普', '拉奈', '一样高'] },
        correct: 0,
        hint: { ru: 'Размеры есть на этикетке.', en: 'The sizes are on the label.', zh: '尺寸写在说明牌上。' },
        explain: { ru: 'Аменхотеп: 44 см против 33.', en: 'Amenhotep: 44 cm against 33.', zh: '阿蒙霍特普：44厘米，拉奈33厘米。' },
      },
      india: {
        lead: { ru: 'Лотос — национальный цветок Индии.', en: 'The lotus is the national flower of India.', zh: '莲花是印度的国花。' },
        question: { ru: 'Найди лотос на фигурке Раннаи. Где он?', en: 'Find the lotus on the figure of Rannai. Where is it?', zh: '在拉奈像上找到莲花。它在哪里？' },
        options: { ru: ['В колье из золотых лепестков', 'В руке', 'На голове'], en: ['In the necklace of golden petals', 'In her hand', 'On her head'], zh: ['在金色花瓣项链里', '在手里', '在头上'] },
        correct: 0,
        hint: { ru: 'Посмотри на грудь фигурки.', en: 'Look at the figure’s chest.', zh: '看看雕像的胸前。' },
        explain: { ru: 'Многоярусное колье из золотых лепестков лотоса.', en: 'A many-tiered necklace of golden lotus petals.', zh: '一条多层的金色莲花瓣项链。' },
      },
      centralAsia: {
        lead: { ru: 'Эбеновое дерево везли в Египет издалека — как шёлк через Самарканд и Бухару.', en: 'Ebony was brought to Egypt from afar — like silk through Samarkand and Bukhara.', zh: '乌木从远方运到埃及——就像丝绸经过撒马尔罕和布哈拉。' },
        question: { ru: 'Найди на фигурках то, что сделано из золота. Что это?', en: 'Find what is made of gold on the figures. What is it?', zh: '找出雕像上用金子做的东西。是什么？' },
        options: { ru: ['Колье и браслеты', 'Глаза', 'Сандалии'], en: ['The necklace and bracelets', 'The eyes', 'The sandals'], zh: ['项链和手镯', '眼睛', '凉鞋'] },
        correct: 0,
        hint: { ru: 'Золото блестит на шее и руках Раннаи.', en: 'Gold shines on Rannai’s neck and arms.', zh: '金子在拉奈的脖子和手臂上闪光。' },
        explain: { ru: 'Колье и браслеты из золотой фольги; глаза — из стекла.', en: 'The necklace and bracelets are gold foil; the eyes are glass.', zh: '项链和手镯是金箔做的；眼睛是玻璃的。' },
      },
      default: {
        lead: { ru: 'Музей задумал профессор Цветаев как учебный, для студентов. Сегодня ты на его занятии.', en: 'Professor Tsvetaev planned the museum as a place of study, for students. Today you are at his class.', zh: '茨维塔耶夫教授把博物馆设想为给学生上课的地方。今天你在上他的课。' },
        question: { ru: 'Найди на фигурках то, что сделано из золота. Что это?', en: 'Find what is made of gold on the figures. What is it?', zh: '找出雕像上用金子做的东西。是什么？' },
        options: { ru: ['Колье и браслеты', 'Глаза', 'Сандалии'], en: ['The necklace and bracelets', 'The eyes', 'The sandals'], zh: ['项链和手镯', '眼睛', '凉鞋'] },
        correct: 0,
        hint: { ru: 'Золото блестит на шее и руках Раннаи.', en: 'Gold shines on Rannai’s neck and arms.', zh: '金子在拉奈的脖子和手臂上闪光。' },
        explain: { ru: 'Колье и браслеты из золотой фольги; глаза — из стекла.', en: 'The necklace and bracelets are gold foil; the eyes are glass.', zh: '项链和手镯是金箔做的；眼睛是玻璃的。' },
      },
    },
    voiceTopic: {
      ru: 'Расскажи семье, что сын заказал для родителей 3500 лет назад — и что ты привёз бы своим.',
      en: 'Tell your family what a son ordered for his parents 3,500 years ago — and what you would bring to yours.',
      zh: '告诉家人：3500年前一个儿子为父母定制了什么——你又会给自己的父母带什么。',
    },
    word: { ru: 'статуэтка', transcription: '[statuétka]', translation: { ru: 'небольшая скульптура', en: 'statuette', zh: '小雕像' } },
  },
  {
    id: '3716',
    reason: {
      ru: 'Это признанный шедевр: лицо царя здесь живое и немолодое — для Египта это редкость.',
      en: 'It is a recognised masterpiece: the king’s face is alive and no longer young — rare for Egypt.',
      zh: '这是公认的杰作：国王的脸生动而不再年轻——这在埃及很少见。',
    },
    caption: {
      ru: 'Царь Аменемхет III — лицо, которое узнали без надписи',
      en: 'King Amenemhat III — a face recognised without an inscription',
      zh: '阿蒙涅姆赫特三世——没有铭文也能认出的面孔',
    },
    story: {
      ru: 'Перед тобой обломок каменной статуи царя Аменемхета III. Он правил Египтом почти 4000 лет назад. У него узкие глаза, впалые щёки и большие уши. Обычно египетских царей делали вечно молодыми, а этот выглядит усталым.',
      en: 'In front of you is a fragment of a stone statue of King Amenemhat III. He ruled Egypt almost 4,000 years ago. He has narrow eyes, hollow cheeks and big ears. Egyptian kings were usually shown forever young, but this one looks tired.',
      zh: '你面前是阿蒙涅姆赫特三世石像的一部分。他在将近4000年前统治埃及。他眼睛细长、脸颊凹陷、耳朵很大。埃及国王通常被塑造成永远年轻，而这一位看起来很疲惫。',
    },
    forYou: {
      ru: 'В 1893 году учёный Голенищев первым в Европе узнал царя по чертам лица, а не по надписи.',
      en: 'In 1893 the scholar Golenishchev was the first in Europe to recognise a king by his face, not by an inscription.',
      zh: '1893年，学者戈列尼谢夫在欧洲第一个凭面容而不是铭文认出了这位国王。',
    },
    tasks: {
      default: {
        lead: { ru: 'Египтологи учатся узнавать царей по лицу — как ты однокурсников в первый день.', en: 'Egyptologists learn to recognise kings by their faces — like you learn your classmates on the first day.', zh: '埃及学家学习凭面容认出国王——就像你第一天认识同学一样。' },
        question: { ru: 'Что у царя несоразмерно большое?', en: 'What is out of proportion — too big — on the king?', zh: '国王身上什么大得不成比例？' },
        options: { ru: ['Уши', 'Нос', 'Глаза'], en: ['The ears', 'The nose', 'The eyes'], zh: ['耳朵', '鼻子', '眼睛'] },
        correct: 0,
        hint: { ru: 'Посмотри на голову сбоку.', en: 'Look at the head from the side.', zh: '从侧面看看头部。' },
        explain: { ru: 'Уши. А ещё узкие глаза, впалые щёки и сжатый рот — лицо немолодого человека.', en: 'The ears. And narrow eyes, hollow cheeks and a tight mouth — the face of a man no longer young.', zh: '耳朵。还有细长的眼睛、凹陷的脸颊和紧闭的嘴——一张不再年轻的脸。' },
      },
    },
    voiceTopic: {
      ru: 'Опиши семье лицо царя тремя словами — и скажи, на кого из родных он похож.',
      en: 'Describe the king’s face to your family in three words — and say which relative he looks like.',
      zh: '用三个词向家人描述国王的脸——再说说他像家里的谁。',
    },
    word: { ru: 'царь', transcription: '[tsar’]', translation: { ru: 'правитель страны', en: 'king, tsar', zh: '国王' } },
  },
  {
    id: '5591',
    reason: {
      ru: 'Здесь всего три человека, а за столом решается судьба целого народа.',
      en: 'There are only three people here, yet the fate of a whole people is decided at this table.',
      zh: '画中只有三个人，餐桌上却决定着整个民族的命运。',
    },
    caption: {
      ru: 'Рембрандт: свет на стороне Эсфири',
      en: 'Rembrandt: the light is on Esther’s side',
      zh: '伦勃朗：光站在以斯帖一边',
    },
    story: {
      ru: 'Перед тобой пир, но людей всего трое. Царь Артаксеркс и царица Эсфирь сидят рядом, а придворный Аман — в тени, отдельно. Эсфирь только что рассказала царю о злом плане Амана. Свет падает на неё, а Аман уходит в темноту.',
      en: 'In front of you is a feast, but there are only three people. King Artaxerxes and Queen Esther sit together, while the courtier Haman is apart, in the shadow. Esther has just told the king about Haman’s wicked plan. The light falls on her, and Haman sinks into the dark.',
      zh: '你面前是一场宴会，但只有三个人。国王亚达薛西和王后以斯帖坐在一起，朝臣哈曼独自坐在阴影里。以斯帖刚刚向国王揭发了哈曼的阴谋。光照在她身上，而哈曼隐入黑暗。',
    },
    forYou: {
      ru: 'Это поздняя работа Рембрандта: картина написана в 1660 году, художнику было за пятьдесят.',
      en: 'This is a late work by Rembrandt: it was painted in 1660, when the artist was over fifty.',
      zh: '这是伦勃朗的晚期作品：画于1660年，那时画家已年过五十。',
    },
    tasks: {
      china: {
        lead: { ru: 'В Китае слово «яблоко» (苹果, пинго) созвучно слову «покой» (平安, пинъань): яблоко дарят как пожелание мира.', en: 'In China the word for apple (苹果, píngguǒ) sounds like “peace” (平安, píng’ān): an apple is given as a wish for peace.', zh: '在中国，“苹果”与“平安”谐音，人们送苹果表示祝愿平安。' },
        question: { ru: 'Найди яблоко на столе. На чём оно лежит?', en: 'Find the apple on the table. What is it lying on?', zh: '在桌上找到苹果。它放在什么上面？' },
        options: { ru: ['На круглом блюде', 'В руке царя', 'На полу'], en: ['On a round dish', 'In the king’s hand', 'On the floor'], zh: ['在圆盘上', '在国王手里', '在地上'] },
        correct: 0,
        hint: { ru: 'Посмотри на середину стола.', en: 'Look at the middle of the table.', zh: '看看桌子中间。' },
        explain: { ru: 'На круглом блюде. Каталог музея видит в блюде колесо Фортуны, а в яблоке и винограде — символы греха и искупления.', en: 'On a round dish. The museum catalogue sees the wheel of Fortune in the dish, and sin and redemption in the apple and grapes.', zh: '在圆盘上。博物馆目录认为圆盘象征命运之轮，苹果和葡萄象征罪与救赎。' },
      },
      india: {
        lead: { ru: 'В Книге Есфири сказано, что этот царь правил «от Индии до Эфиопии».', en: 'The Book of Esther says this king ruled “from India unto Ethiopia”.', zh: '《以斯帖记》说，这位国王统治“从印度直到古实”。' },
        question: { ru: 'Найди того, кто сидит отдельно от остальных. Кто это?', en: 'Find the one who sits apart from the others. Who is it?', zh: '找到和其他人分开坐的那个人。他是谁？' },
        options: { ru: ['Аман', 'Эсфирь', 'Царь'], en: ['Haman', 'Esther', 'The king'], zh: ['哈曼', '以斯帖', '国王'] },
        correct: 0,
        hint: { ru: 'Царь и царица — одна группа.', en: 'The king and queen form one group.', zh: '国王和王后是一组。' },
        explain: { ru: 'Аман. Расстояние между ним и царём кажется огромным, а царь и царица — единая группа.', en: 'Haman. The distance between him and the king seems huge, while the king and queen form one group.', zh: '哈曼。他和国王之间的距离显得很大，而国王和王后是一个整体。' },
      },
      centralAsia: {
        lead: { ru: 'Артаксеркс — персидский царь. В его державу входили Согдиана и Бактрия, земли нынешних Узбекистана и Таджикистана.', en: 'Artaxerxes was a Persian king. His empire included Sogdiana and Bactria, the lands of today’s Uzbekistan and Tajikistan.', zh: '亚达薛西是波斯国王。他的帝国包括粟特和巴克特里亚，也就是今天乌兹别克斯坦和塔吉克斯坦的土地。' },
        question: { ru: 'Найди самое светлое место картины. Кто там?', en: 'Find the brightest place in the painting. Who is there?', zh: '找到画中最亮的地方。谁在那里？' },
        options: { ru: ['Эсфирь', 'Аман', 'Царь'], en: ['Esther', 'Haman', 'The king'], zh: ['以斯帖', '哈曼', '国王'] },
        correct: 0,
        hint: { ru: 'Свет выделяет того, кто прав.', en: 'The light picks out the one who is right.', zh: '光照亮了有理的一方。' },
        explain: { ru: 'Эсфирь: её озаряет яркий луч, а Аман погружён в тень.', en: 'Esther: a bright ray lights her, while Haman is sunk in shadow.', zh: '以斯帖：一道明亮的光照在她身上，而哈曼隐在阴影中。' },
      },
      default: {
        lead: { ru: 'На экзамене важно найти главное. На этой картине главное подсвечено.', en: 'In an exam the key is to find what matters most. In this painting it is lit up.', zh: '考试时最重要的是找到重点。这幅画里，重点被光照亮了。' },
        question: { ru: 'Найди самое светлое место картины. Кто там?', en: 'Find the brightest place in the painting. Who is there?', zh: '找到画中最亮的地方。谁在那里？' },
        options: { ru: ['Эсфирь', 'Аман', 'Царь'], en: ['Esther', 'Haman', 'The king'], zh: ['以斯帖', '哈曼', '国王'] },
        correct: 0,
        hint: { ru: 'Свет выделяет того, кто прав.', en: 'The light picks out the one who is right.', zh: '光照亮了有理的一方。' },
        explain: { ru: 'Эсфирь: её озаряет яркий луч, а Аман погружён в тень.', en: 'Esther: a bright ray lights her, while Haman is sunk in shadow.', zh: '以斯帖：一道明亮的光照在她身上，而哈曼隐在阴影中。' },
      },
    },
    voiceTopic: {
      ru: 'Расскажи семье, кто на этой картине прав и как художник показал это без слов.',
      en: 'Tell your family who is right in this painting and how the artist shows it without words.',
      zh: '告诉家人：这幅画里谁有理，画家是怎样不用文字表现出来的。',
    },
    word: { ru: 'яблоко', transcription: '[yábloko]', translation: { ru: 'фрукт', en: 'apple', zh: '苹果' } },
  },
  {
    id: '5798',
    reason: {
      ru: 'Это зима, как в Москве: весь город вышел на лёд, и каждый занят своим делом.',
      en: 'It is winter, like in Moscow: the whole town is out on the ice, everyone busy with something.',
      zh: '这是像莫斯科一样的冬天：全城的人都来到冰上，各忙各的。',
    },
    caption: {
      ru: 'Каток жизни у Аверкампа',
      en: 'Avercamp’s ice of life',
      zh: '阿维坎普的“人生冰场”',
    },
    story: {
      ru: 'Перед тобой замёрзшая река у стен голландского города Кампена. На льду конькобежцы, рыбаки и крестьяне с санями. Кавалер поправляет даме конёк, рядом застыл любопытный мальчишка. Художник Хендрик Аверкамп был глухонемым от рождения и замечал всё.',
      en: 'In front of you is a frozen river by the walls of the Dutch town of Kampen. On the ice are skaters, fishermen and peasants with sledges. A gentleman fixes a lady’s skate, a curious boy stands still next to them. The painter Hendrick Avercamp was deaf and mute from birth and noticed everything.',
      zh: '你面前是荷兰小城坎彭城墙边结冰的河。冰上有滑冰的人、钓鱼的人和拉雪橇的农民。一位绅士在帮女士整理冰鞋，旁边站着一个好奇的男孩。画家亨德里克·阿维坎普天生聋哑，却什么都看在眼里。',
    },
    forYou: {
      ru: 'В Голландии того времени катание называли «катком жизни» — скольжением за удачей. Московская зима — хороший повод попробовать.',
      en: 'In Holland at that time skating was called the “ice of life” — gliding after good fortune. A Moscow winter is a good reason to try.',
      zh: '在当时的荷兰，滑冰被称为“人生冰场”——追逐好运的滑行。莫斯科的冬天正是试一试的好机会。',
    },
    tasks: {
      china: {
        lead: { ru: 'В «Дао дэ цзин» сказано: «Три рождает все вещи».', en: 'The Tao Te Ching says: “Three gives birth to all things.”', zh: '《道德经》说：“三生万物。”' },
        question: { ru: 'Найди на льду троих: собаку, стража с ружьём и санки. Кого везут на санках?', en: 'Find three on the ice: a dog, a watchman with a gun and a sledge. Who is riding on the sledge?', zh: '在冰上找到三样：一只狗、一个拿枪的守卫和一架雪橇。雪橇上拉的是谁？' },
        options: { ru: ['Старушку', 'Ребёнка', 'Рыбу'], en: ['An old woman', 'A child', 'Fish'], zh: ['一位老太太', '一个孩子', '鱼'] },
        correct: 0,
        hint: { ru: 'Санки везут по льду, ищи людей, а не грузы.', en: 'Sledges are pulled across the ice: look for people, not cargo.', zh: '雪橇在冰上被拉着走：找人，不是找货物。' },
        explain: { ru: 'Старушку. А собаку прогуливают, и страж порядка стоит с ружьём.', en: 'An old woman. The dog is being walked, and the watchman stands with his gun.', zh: '一位老太太。狗在被人遛，守卫拿着枪站着。' },
      },
      default: {
        lead: { ru: 'Первая московская зима — у многих студентов это первый лёд под ногами.', en: 'For many students, the first Moscow winter is their first ice underfoot.', zh: '对很多学生来说，第一个莫斯科冬天就是第一次踩在冰上。' },
        question: { ru: 'Кого везут на санках?', en: 'Who is riding on the sledge?', zh: '雪橇上拉的是谁？' },
        options: { ru: ['Старушку', 'Ребёнка', 'Рыбу'], en: ['An old woman', 'A child', 'Fish'], zh: ['一位老太太', '一个孩子', '鱼'] },
        correct: 0,
        hint: { ru: 'Санки везут по льду, ищи людей, а не грузы.', en: 'Sledges are pulled across the ice: look for people, not cargo.', zh: '雪橇在冰上被拉着走：找人，不是找货物。' },
        explain: { ru: 'Старушку. А ещё здесь прогуливают собаку и играют в мяч.', en: 'An old woman. People also walk a dog and play ball here.', zh: '一位老太太。这里还有人遛狗、打球。' },
      },
    },
    voiceTopic: {
      ru: 'Расскажи семье, бывает ли у вас дома зима и лёд — и что бы ты делал на этом катке.',
      en: 'Tell your family whether you have winter and ice at home — and what you would do on this rink.',
      zh: '告诉家人：家乡有没有冬天和冰——你会在这个冰场上做什么。',
    },
    word: { ru: 'коньки', transcription: '[kan’kí]', translation: { ru: 'обувь для льда', en: 'skates', zh: '冰鞋' } },
  },
];

const TEXTS = {
  title: { ru: 'Зачёт у профессора Цветаева: демо-маршрут', en: 'Exam at Professor Tsvetaev’s: demo route', zh: '茨维塔耶夫教授的考试：演示路线' },
  intro: {
    ru: 'Профессор Цветаев создал этот музей для студентов. Пройди четыре остановки — от Египта до голландской зимы — и закрой зачётку.',
    en: 'Professor Tsvetaev created this museum for students. Walk four stops — from Egypt to a Dutch winter — and close your record book.',
    zh: '茨维塔耶夫教授为学生创建了这座博物馆。走完四站——从埃及到荷兰的冬天——合上你的记分册。',
  },
  understanding: {
    ru: 'Это демо: маршрут собран заранее, без ИИ, и одинаков для всех. Задания «найди деталь» подстроены под регион, если ты указал Китай, Индию или страну Центральной Азии.',
    en: 'This is a demo: the route was prepared in advance, without AI, and is the same for everyone. The “find the detail” tasks adapt to your region if you named China, India or a Central Asian country.',
    zh: '这是演示：路线是事先准备的，没有使用人工智能，对每个人都一样。如果你填写了中国、印度或中亚国家，“找细节”任务会根据地区调整。',
  },
};

function pick(text, lang) {
  return text[lang] ?? text.en;
}

/* The demo route in the shape the server returns. sameHall is filled by the caller. */
export function buildDemoRoute(profile, stopCount) {
  const lang = DEMO_LANGS.includes(profile.storyLang) ? profile.storyLang : 'en';
  const region = regionOf(profile.country);
  const n = Math.min(stopCount || STOPS.length, STOPS.length);
  return {
    source: 'demo',
    lang,
    langFallback: lang !== profile.storyLang,
    minutes: profile.minutes,
    title: pick(TEXTS.title, lang),
    intro: pick(TEXTS.intro, lang),
    understanding: pick(TEXTS.understanding, lang),
    interests: profile.interests,
    mood: '',
    stops: STOPS.slice(0, n).map((s) => {
      const t = s.tasks[region] || s.tasks.default;
      return {
        id: s.id,
        reason: pick(s.reason, lang),
        caption: pick(s.caption, lang),
        story: pick(s.story, lang),
        forYou: pick(s.forYou, lang),
        task: {
          lead: pick(t.lead, lang),
          question: pick(t.question, lang),
          options: pick(t.options, lang),
          correct: t.correct,
          hint: pick(t.hint, lang),
          explain: pick(t.explain, lang),
        },
        voiceTopic: pick(s.voiceTopic, lang),
        word: { ru: s.word.ru, transcription: s.word.transcription, translation: pick(s.word.translation, lang) },
        sameHall: [],
      };
    }),
  };
}
