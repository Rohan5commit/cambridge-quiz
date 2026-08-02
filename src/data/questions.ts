export type QuestionType = 'true-false' | 'multiple-choice' | 'short-answer';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const subjects: Subject[] = [
  { id: 'math', name: 'Mathematics', icon: '📐', color: '#3B82F6' },
  { id: 'english', name: 'English', icon: '📚', color: '#10B981' },
  { id: 'science', name: 'Science', icon: '🔬', color: '#F59E0B' },
];

export const questions: Record<string, Question[]> = {
  math: [
    { id: 1, type: 'multiple-choice', question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correctAnswer: '30' },
    { id: 2, type: 'true-false', question: 'The sum of angles in a triangle is 180 degrees.', correctAnswer: 'true' },
    { id: 3, type: 'short-answer', question: 'What is the square root of 144?', correctAnswer: ['12', 'twelve'] },
    { id: 4, type: 'multiple-choice', question: 'Which fraction is equivalent to 0.75?', options: ['1/2', '2/3', '3/4', '4/5'], correctAnswer: '3/4' },
    { id: 5, type: 'true-false', question: 'A prime number has exactly two factors.', correctAnswer: 'true' },
    { id: 6, type: 'multiple-choice', question: 'What is the area of a rectangle with length 8cm and width 5cm?', options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'], correctAnswer: '40 cm²' },
    { id: 7, type: 'short-answer', question: 'Solve for x: 2x + 5 = 15', correctAnswer: ['5', 'x=5'] },
    { id: 8, type: 'true-false', question: '0.5 is greater than 0.50.', correctAnswer: 'false' },
    { id: 9, type: 'multiple-choice', question: 'What is 3 to the power of 4?', options: ['12', '27', '64', '81'], correctAnswer: '81' },
    { id: 10, type: 'short-answer', question: 'What is the perimeter of a square with side length 6cm?', correctAnswer: ['24', '24cm', '24 cm'] },
  ],
  english: [
    { id: 1, type: 'multiple-choice', question: 'Which word is a synonym for happy?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correctAnswer: 'Joyful' },
    { id: 2, type: 'true-false', question: 'A noun is a word that describes an action.', correctAnswer: 'false' },
    { id: 3, type: 'multiple-choice', question: 'What is the past tense of run?', options: ['Runned', 'Ran', 'Running', 'Runs'], correctAnswer: 'Ran' },
    { id: 4, type: 'short-answer', question: 'What is the plural of child?', correctAnswer: ['children'] },
    { id: 5, type: 'true-false', question: 'Their, there, and they are all sound the same.', correctAnswer: 'true' },
    { id: 6, type: 'multiple-choice', question: 'Which sentence uses correct punctuation?', options: ['Where are you going?', 'Where are you going.', 'Where are you going!', 'Where are you going,'], correctAnswer: 'Where are you going?' },
    { id: 7, type: 'short-answer', question: 'What is the opposite of brave?', correctAnswer: ['cowardly', 'timid', 'fearful', 'afraid'] },
    { id: 8, type: 'multiple-choice', question: 'Which word is an adjective?', options: ['Quickly', 'Beautiful', 'Running', 'Under'], correctAnswer: 'Beautiful' },
    { id: 9, type: 'true-false', question: 'A paragraph is a group of sentences about one main idea.', correctAnswer: 'true' },
    { id: 10, type: 'short-answer', question: 'Name one type of figurative language (e.g., simile, metaphor).', correctAnswer: ['simile', 'metaphor', 'alliteration', 'personification', 'hyperbole', 'onomatopoeia'] },
  ],
  science: [
    { id: 1, type: 'multiple-choice', question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Mars' },
    { id: 2, type: 'true-false', question: 'Water boils at 100 degrees Celsius at sea level.', correctAnswer: 'true' },
    { id: 3, type: 'multiple-choice', question: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'], correctAnswer: 'H2O' },
    { id: 4, type: 'short-answer', question: 'What gas do plants absorb from the air during photosynthesis?', correctAnswer: ['carbon dioxide', 'CO2', 'co2'] },
    { id: 5, type: 'true-false', question: 'The Earth revolves around the Sun.', correctAnswer: 'true' },
    { id: 6, type: 'multiple-choice', question: 'Which layer of the atmosphere do we live in?', options: ['Stratosphere', 'Troposphere', 'Mesosphere', 'Thermosphere'], correctAnswer: 'Troposphere' },
    { id: 7, type: 'short-answer', question: 'What is the powerhouse of the cell?', correctAnswer: ['mitochondria', 'the mitochondria'] },
    { id: 8, type: 'true-false', question: 'Sound travels faster in water than in air.', correctAnswer: 'true' },
    { id: 9, type: 'multiple-choice', question: 'What type of rock is formed by volcanic activity?', options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Limestone'], correctAnswer: 'Igneous' },
    { id: 10, type: 'short-answer', question: 'What is the process of water changing from liquid to gas called?', correctAnswer: ['evaporation', 'vaporization'] },
  ],
};
