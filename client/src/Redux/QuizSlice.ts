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

const initialState: State = {
  Quizes: {
    data: [],
    status: responseStatus.DEFAULT,
  },
  CreatingQuiz: {
    _id: "",
    title: "",
    cover: "",
    quizDescription: "",
    questions: [],
  },
  CreatingQuestion: null,
};
const QuizSlice = createSlice({
  initialState: initialState,
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
    addAnswer(state) {
      if (state.CreatingQuestion)
        state.CreatingQuestion.answers.push({
          id: "" + Math.random(),
          body: "",
          isCorrect: false,
        });
    },
    changeAnswerIsCorrect(state, action: PayloadAction<string>) {
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
  },
});

export const quizReducer = QuizSlice.reducer;
export const {
  changeQuestionType,
  changeQuestionBody,
  addAnswer,
  removeAnswerById,
  changeAnswerIsCorrect,
  changeAnswerBody,
  closeModal,
  editModal,
  submitQuestion,
  addQuestion,
  deleteQuestion,
} = QuizSlice.actions;