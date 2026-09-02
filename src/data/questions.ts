import { RawQuestion, SkillType, ExamQuestion, PreparedOption } from '../types';

export const READING_PASSAGE = {
  title: 'MY SCHOOL',
  paragraphs: [
    'My name is Minh and I am twelve years old. I study at Nguyen Du Secondary School in Da Nang. My school is not very big, but it is beautiful. There are twenty classrooms, a library and a small playground.',
    'Classes start at seven o\'clock in the morning and finish at half past eleven. My favourite subject is English because my teacher, Ms Lan, is very funny. I do not like Maths very much because it is difficult for me.',
    'At break time, my friends and I often play badminton on the playground. Sometimes we go to the library to read comic books. On Saturday morning, our school has a football club. I am not good at football, but I love watching my friends play.'
  ]
};

export const SKILL_METADATA: Record<SkillType, { name: string; shortName: string; total: number; color: string; badgeBg: string; badgeText: string }> = {
  PHATAM: {
    name: 'Phát âm & trọng âm',
    shortName: 'Phát âm',
    total: 6,
    color: 'emerald',
    badgeBg: 'bg-emerald-100 border-emerald-300',
    badgeText: 'text-emerald-800'
  },
  TUVUNG: {
    name: 'Từ vựng',
    shortName: 'Từ vựng',
    total: 8,
    color: 'sky',
    badgeBg: 'bg-sky-100 border-sky-300',
    badgeText: 'text-sky-800'
  },
  THI: {
    name: 'Thì của động từ',
    shortName: 'Thì động từ',
    total: 8,
    color: 'indigo',
    badgeBg: 'bg-indigo-100 border-indigo-300',
    badgeText: 'text-indigo-800'
  },
  GIOITU: {
    name: 'Giới từ - mạo từ - lượng từ',
    shortName: 'Giới từ & Mạo từ',
    total: 6,
    color: 'amber',
    badgeBg: 'bg-amber-100 border-amber-300',
    badgeText: 'text-amber-800'
  },
  GIAOTIEP: {
    name: 'Giao tiếp & sắp xếp câu',
    shortName: 'Giao tiếp',
    total: 6,
    color: 'purple',
    badgeBg: 'bg-purple-100 border-purple-300',
    badgeText: 'text-purple-800'
  },
  DOC: {
    name: 'Đọc hiểu',
    shortName: 'Đọc hiểu',
    total: 6,
    color: 'rose',
    badgeBg: 'bg-rose-100 border-rose-300',
    badgeText: 'text-rose-800'
  }
};

export const RAW_QUESTIONS: RawQuestion[] = [
  {"cau":1,"kyNang":"PHATAM","hoi":"Choose the word with a DIFFERENT pronunciation of the final -s:","A":"books","B":"maps","C":"dogs","D":"cats","dapAn":"C"},
  {"cau":2,"kyNang":"PHATAM","hoi":"Choose the word with a DIFFERENT pronunciation of the final -ed:","A":"watched","B":"opened","C":"played","D":"lived","dapAn":"A"},
  {"cau":3,"kyNang":"PHATAM","hoi":"Choose the word with a DIFFERENT sound for the letters 'ea':","A":"bread","B":"teacher","C":"head","D":"ready","dapAn":"B"},
  {"cau":4,"kyNang":"PHATAM","hoi":"Choose the word with a DIFFERENT sound for the letter 'o':","A":"come","B":"love","C":"son","D":"hot","dapAn":"D"},
  {"cau":5,"kyNang":"PHATAM","hoi":"Choose the word with a DIFFERENT stress pattern:","A":"teacher","B":"children","C":"around","D":"homework","dapAn":"C"},
  {"cau":6,"kyNang":"PHATAM","hoi":"Choose the word with a DIFFERENT stress pattern:","A":"beautiful","B":"important","C":"difficult","D":"interesting","dapAn":"B"},
  {"cau":7,"kyNang":"TUVUNG","hoi":"We study Maths, English and Science at ____.","A":"kitchen","B":"garden","C":"school","D":"market","dapAn":"C"},
  {"cau":8,"kyNang":"TUVUNG","hoi":"My father cooks dinner in the ____.","A":"kitchen","B":"bathroom","C":"bedroom","D":"living room","dapAn":"A"},
  {"cau":9,"kyNang":"TUVUNG","hoi":"Ha Long Bay is a natural ____ of Viet Nam.","A":"building","B":"wonder","C":"city","D":"village","dapAn":"B"},
  {"cau":10,"kyNang":"TUVUNG","hoi":"At Tet, Vietnamese children receive ____ money from their parents.","A":"lucky","B":"happy","C":"funny","D":"angry","dapAn":"A"},
  {"cau":11,"kyNang":"TUVUNG","hoi":"There is a ____ near my house where I can borrow books.","A":"museum","B":"stadium","C":"library","D":"restaurant","dapAn":"C"},
  {"cau":12,"kyNang":"TUVUNG","hoi":"I brush my ____ twice a day.","A":"teeth","B":"hair","C":"hands","D":"face","dapAn":"A"},
  {"cau":13,"kyNang":"TUVUNG","hoi":"My new school has a large ____ where we play sports.","A":"kitchen","B":"bedroom","C":"wardrobe","D":"playground","dapAn":"D"},
  {"cau":14,"kyNang":"TUVUNG","hoi":"Be careful! The soup is very ____.","A":"hot","B":"cold","C":"cool","D":"wet","dapAn":"A"},
  {"cau":15,"kyNang":"THI","hoi":"She ____ TV every evening after dinner.","A":"watch","B":"watches","C":"watching","D":"is watch","dapAn":"B"},
  {"cau":16,"kyNang":"THI","hoi":"Listen! The birds ____ in the garden.","A":"sing","B":"sings","C":"are singing","D":"sang","dapAn":"C"},
  {"cau":17,"kyNang":"THI","hoi":"We ____ to Da Nang last summer.","A":"go","B":"goes","C":"went","D":"going","dapAn":"C"},
  {"cau":18,"kyNang":"THI","hoi":"They ____ their homework yesterday evening.","A":"do","B":"does","C":"did","D":"doing","dapAn":"C"},
  {"cau":19,"kyNang":"THI","hoi":"Tomorrow I ____ my grandparents in the countryside.","A":"visit","B":"visited","C":"will visit","D":"was visiting","dapAn":"C"},
  {"cau":20,"kyNang":"THI","hoi":"My mother ____ not like coffee.","A":"do","B":"does","C":"is","D":"are","dapAn":"B"},
  {"cau":21,"kyNang":"THI","hoi":"____ your sister go to school by bike every day?","A":"Does","B":"Do","C":"Is","D":"Are","dapAn":"A"},
  {"cau":22,"kyNang":"THI","hoi":"Last night, we ____ a very interesting film on television.","A":"see","B":"sees","C":"saw","D":"seeing","dapAn":"C"},
  {"cau":23,"kyNang":"GIOITU","hoi":"My birthday is ____ May.","A":"on","B":"in","C":"at","D":"of","dapAn":"B"},
  {"cau":24,"kyNang":"GIOITU","hoi":"She lives ____ 25 Le Loi Street.","A":"in","B":"on","C":"at","D":"to","dapAn":"C"},
  {"cau":25,"kyNang":"GIOITU","hoi":"There are ____ apples on the table.","A":"a","B":"an","C":"some","D":"much","dapAn":"C"},
  {"cau":26,"kyNang":"GIOITU","hoi":"There is ____ old man at the door.","A":"an","B":"a","C":"the","D":"some","dapAn":"A"},
  {"cau":27,"kyNang":"GIOITU","hoi":"How ____ students are there in your class?","A":"much","B":"many","C":"some","D":"any","dapAn":"B"},
  {"cau":28,"kyNang":"GIOITU","hoi":"The cat is sleeping ____ the table.","A":"in","B":"under","C":"of","D":"from","dapAn":"B"},
  {"cau":29,"kyNang":"GIAOTIEP","hoi":"\"Thank you for your help.\" - \"____\"","A":"I'm fine.","B":"Yes, please.","C":"See you later.","D":"You're welcome.","dapAn":"D"},
  {"cau":30,"kyNang":"GIAOTIEP","hoi":"\"How are you today?\" - \"____\"","A":"I'm fine, thank you.","B":"I'm twelve.","C":"It's Monday.","D":"I'm from Hue.","dapAn":"A"},
  {"cau":31,"kyNang":"GIAOTIEP","hoi":"\"Would you like some tea?\" - \"____\"","A":"Yes, I would like.","B":"No, I don't.","C":"Yes, please.","D":"I like tea very much.","dapAn":"C"},
  {"cau":32,"kyNang":"GIAOTIEP","hoi":"Arrange the words to make a correct sentence: school / to / I / walk / every / morning","A":"I to school walk every morning.","B":"Walk I to school every morning.","C":"Every morning school I walk to.","D":"I walk to school every morning.","dapAn":"D"},
  {"cau":33,"kyNang":"GIAOTIEP","hoi":"Arrange the words to make a correct sentence: is / there / a / near / park / my house","A":"There is a park near my house.","B":"A park there is near my house.","C":"Near my house there a park is.","D":"There a park is near my house.","dapAn":"A"},
  {"cau":34,"kyNang":"GIAOTIEP","hoi":"\"What's your favourite subject?\" - \"____\"","A":"It's English.","B":"He's a teacher.","C":"At eight o'clock.","D":"In my school.","dapAn":"A"},
  {"cau":35,"kyNang":"DOC","hoi":"How old is Minh?","A":"ten","B":"eleven","C":"thirteen","D":"twelve","dapAn":"D"},
  {"cau":36,"kyNang":"DOC","hoi":"Where is Minh's school?","A":"Ha Noi","B":"Da Nang","C":"Hue","D":"Can Tho","dapAn":"B"},
  {"cau":37,"kyNang":"DOC","hoi":"What time do the classes finish?","A":"seven o'clock","B":"eleven o'clock","C":"twelve o'clock","D":"half past eleven","dapAn":"D"},
  {"cau":38,"kyNang":"DOC","hoi":"Why does Minh like English?","A":"It is very easy","B":"His teacher is funny","C":"The lessons are short","D":"His friends like it too","dapAn":"B"},
  {"cau":39,"kyNang":"DOC","hoi":"What do Minh and his friends often do at break time?","A":"They play badminton","B":"They watch television","C":"They do their homework","D":"They go home early","dapAn":"A"},
  {"cau":40,"kyNang":"DOC","hoi":"What does Minh do on Saturday morning?","A":"He stays at home","B":"He watches his friends play football","C":"He plays football very well","D":"He reads books in the library","dapAn":"B"}
];

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Creates a randomized exam following the exact anti-memorization rules:
 * 1. Shuffles questions ONLY WITHIN each kyNang group (preserving skill order).
 * 2. For each question, shuffles the 4 options and preserves the correct content text.
 */
export function generateShuffledExam(): ExamQuestion[] {
  const skillOrder: SkillType[] = ['PHATAM', 'TUVUNG', 'THI', 'GIOITU', 'GIAOTIEP', 'DOC'];
  const examQuestions: ExamQuestion[] = [];

  const keyLabels = ['A', 'B', 'C', 'D'];

  for (const skill of skillOrder) {
    const questionsInSkill = RAW_QUESTIONS.filter((q) => q.kyNang === skill);
    const shuffledQuestions = shuffleArray(questionsInSkill);

    for (const q of shuffledQuestions) {
      // Find the exact correct text based on original key
      const correctText = q[q.dapAn];

      // Extract all 4 option texts
      const rawOptions = [q.A, q.B, q.C, q.D];
      const shuffledOptionsText = shuffleArray(rawOptions);

      const options: PreparedOption[] = shuffledOptionsText.map((text, idx) => ({
        key: keyLabels[idx],
        text
      }));

      examQuestions.push({
        originalCau: q.cau,
        kyNang: q.kyNang,
        hoi: q.hoi,
        options,
        correctAnswerText: correctText
      });
    }
  }

  return examQuestions;
}
