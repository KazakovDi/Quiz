import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  QuiestionProps,
  QuizProps,
  QuestionTypes,
  AnswerProps,
} from "../types/quiztypes";
import { apiInterface } from "../api";
import { responseStatus } from "../types/responseSatus";

interface State {
  Answers: string[];
  Result: number;
  CurrentQuiz: QuizProps;
  Quizes: {
    data: QuizProps[] | [];
    status: responseStatus;
  };
  CreatingQuiz: QuizProps;
  CreatingQuestion: QuiestionProps | null;
}

export const fetchQuizes = createAsyncThunk<QuizProps[]>(
  "quiz/fetchQuizes",
  async () => {
    try {
      const quizes = await apiInterface.quiz.getQuizes();
      if (!quizes) return [];
      return quizes;
    } catch (err: any) {
      console.log(err);
    }
  }
);

export const fetchQuizById = createAsyncThunk<QuizProps, string>(
  "quiz/fetchQuizById",
  async (id) => {
    try {
      const quiz = await apiInterface.quiz.getQuizById(id);
      return quiz;
    } catch (err: any) {
      console.log(err);
    }
  }
);

export const fetchCreateQuiz = createAsyncThunk<any, QuizProps>(
  "quiz/fetchCreateQuiz",
  async (quiz) => {
    try {
      const response = await apiInterface.quiz.createQuiz(quiz);
      return response;
    } catch (err: any) {
      console.log(err);
    }
  }
);

const initialState: State = {
  Answers: [],
  Result: 0,
  CurrentQuiz: {
    _id: "",
    title: "",
    cover: "",
    description: "",
    questions: [],
  },
  Quizes: {
    data: [],
    status: responseStatus.DEFAULT,
  },
  CreatingQuiz: {
    _id: "",
    title: "",
    cover: "",
    description: "",
    questions: [],
  },
  CreatingQuestion: null,
};
const QuizSlice = createSlice({
  initialState,
  name: "quiz",
  reducers: {
    changeQuestionType(state, action: PayloadAction<QuestionTypes>) {
      if (state.CreatingQuestion) state.CreatingQuestion.type = action.payload;
    },
    changeQuestionBody(state, action: PayloadAction<string>) {
      if (state.CreatingQuestion)
        state.CreatingQuestion.questionBody = action.payload;
    },
    changeAnswerBody(state, action: PayloadAction<any>) {
      if (state.CreatingQuestion)
        state.CreatingQuestion.answers = [
          ...state.CreatingQuestion.answers.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, body: action.payload.body };
            } else return item;
          }),
        ];
    },
    addAnswer(state, action: any) {
      if (state.CreatingQuestion) {
        if (action.payload) {
          state.CreatingQuestion.answers[0] = {
            id: action.payload.id,
            body: action.payload.body,
            isCorrect: true,
          };
        } else {
          state.CreatingQuestion.answers.push({
            id: "" + Math.random(),
            body: "",
            isCorrect: false,
          });
        }
      }
    },
    changeTestAnswer(state, action: PayloadAction<string>) {
      if (state.CreatingQuestion)
        state.CreatingQuestion.answers = [
          ...state.CreatingQuestion.answers.map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                isCorrect: !item.isCorrect,
              };
            } else return { ...item, isCorrect: false };
          }),
        ];
    },
    changeMultiTestAnswer(state, action: PayloadAction<string>) {
      if (state.CreatingQuestion) {
        state.CreatingQuestion.answers = state.CreatingQuestion?.answers.map(
          (item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                isCorrect: !item.isCorrect,
              };
            } else return item;
          }
        );
      }
    },
    removeAnswerById(state, action: PayloadAction<string>) {
      if (state.CreatingQuestion)
        state.CreatingQuestion.answers = state.CreatingQuestion.answers.filter(
          (item) => item.id !== action.payload
        );
    },
    closeModal(state) {
      state.CreatingQuestion = null;
    },
    editModal(state, action: PayloadAction<QuiestionProps>) {
      state.CreatingQuestion = action.payload;
    },
    addQuestion(state) {
      state.CreatingQuiz.questions.push({
        id: "" + Math.random(),
        type: QuestionTypes.TEST,
        questionBody: "",
        answers: [],
      });
    },
    deleteQuestion(state, action: PayloadAction<string>) {
      state.CreatingQuiz.questions = state.CreatingQuiz.questions.filter(
        (item) => item.id !== action.payload
      );
    },
    submitQuestion(state, action: PayloadAction<QuiestionProps>) {
      state.CreatingQuiz.questions = state.CreatingQuiz.questions.map(
        (item) => {
          if (item.id === action.payload.id) return action.payload;
          else return item;
        }
      );
    },
    clearCreatingQuiz(state) {
      state.CreatingQuiz = initialState.CreatingQuiz;
      state.CreatingQuestion = null;
    },
    setAnswer(state, action: PayloadAction<string[]>) {
      state.Answers.push(...action.payload);
    },
    calculateResult(state) {
      let res = 0;
      state.CurrentQuiz.questions.forEach((question, questionIndex) => {
        question.answers.forEach((answer) => {
          if (answer.isCorrect) {
            if (
              state.Answers.findIndex((value) => value === answer.body) > -1
            ) {
              res = res + 1;
            }
          }
        });
      });
      state.Result = res;
    },
    clearAnswers(state) {
      state.Answers = [];
    },
    clearResult(state) {
      state.Result = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuizes.pending, (state) => {
      state.Quizes = {
        data: [],
        status: responseStatus.PENDING,
      };
    });
    builder.addCase(fetchQuizes.rejected, (state) => {
      state.Quizes = {
        data: [],
        status: responseStatus.REJECTED,
      };
    });
    builder.addCase(fetchQuizes.fulfilled, (state, action) => {
      state.Quizes = {
        data: action.payload,
        status: responseStatus.FULLFILLED,
      };
    });

    builder.addCase(fetchQuizById.pending, (state) => {});
    builder.addCase(fetchQuizById.rejected, (state) => {});
    builder.addCase(fetchQuizById.fulfilled, (state, action) => {
      state.CurrentQuiz = action.payload;
    });

    builder.addCase(fetchCreateQuiz.pending, (state) => {});
    builder.addCase(fetchCreateQuiz.rejected, (state) => {});
    builder.addCase(fetchCreateQuiz.fulfilled, (state, action) => {});
  },
});

export const quizReducer = QuizSlice.reducer;
export const {
  changeQuestionType,
  changeQuestionBody,
  addAnswer,
  removeAnswerById,
  changeTestAnswer,
  changeAnswerBody,
  closeModal,
  editModal,
  submitQuestion,
  addQuestion,
  deleteQuestion,
  changeMultiTestAnswer,
  calculateResult,
  setAnswer,
  clearAnswers,
  clearCreatingQuiz,
  clearResult,
} = QuizSlice.actions;
