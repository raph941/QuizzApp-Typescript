// Questions 
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[]
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[] }

// to set difficulty level of the requested quesions from th API
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

//Question Card Props
export type QCProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
  gameOver: boolean;
  counter: number;
}