export enum QuestionTypes {
  TEST = "test",
  MULTI = "multitest",
  FULL = "full",
}
export interface AnswerProps {
  body: string;
  id: string;
  isCorrect: boolean;
}
export interface QuiestionProps {
  id: string;
  type: QuestionTypes;
  questionBody: string;
  answers: AnswerProps[];
}

export interface QuizProps {
  title: string;
  quizDescription: string;
  questions: QuiestionProps[];
}
