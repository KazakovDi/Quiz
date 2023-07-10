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
  _id: string;
  title: string;
  cover: string;
  description: string;
  questions: QuiestionProps[];
  tags: string[];
  Author: string;
}
