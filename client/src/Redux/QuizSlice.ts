import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  QuiestionProps,
  QuizProps,
  QuestionTypes,
  AnswerProps,
} from "../types/quiztypes";
import { apiInterface } from "../api";
import { responseStatus } from "../types/responseSatus";
import { Sort } from "../types/sort";

interface State {
  Answers: string[];
  Result: number;
  CurrentQuiz: QuizProps;
  Quizes: {
    data: QuizProps[] | [];
    status: responseStatus;
  };
  SortProps: {
    tags: string;
    title: string;
    author: string;
  };
  Storage: QuizProps[];
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
export const fetchQuizCover = createAsyncThunk<string, FormData>(
  "quiz/fetchQuizCover",
  async (cover) => {
    try {
      const coverLink = await apiInterface.quiz.uploadPhoto(cover);
      return coverLink;
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
  SortProps: {
    tags: "",
    author: "",
    title: "",
  },
  CurrentQuiz: {
    _id: "",
    title: "",
    cover: "",
    description: "",
    questions: [],
    tags: [],
    Author: "",
  },
  Quizes: {
    data: [],
    status: responseStatus.DEFAULT,
  },
  Storage: [],
  CreatingQuiz: {
    _id: "",
    title: "",
    cover: "",
    description: "",
    questions: [],
    tags: [],
    Author: "",
  },
  CreatingQuestion: null,
};
const sortQuizes = (state: any) => {
  let data = [...state.Storage];
  let regex: any;
  if (state.SortProps.title) {
    regex = new RegExp(state.SortProps.title, "i");
    data = data.filter((item) => {
      return item.title.match(regex);
    });
  }
  if (state.SortProps.author) {
    regex = new RegExp(state.SortProps.author, "i");
    data = data.filter((item) => {
      return item.Author.username.match(regex);
    });
  }
  if (state.SortProps.tags) {
    const tags = state.SortProps.tags.replaceAll(",", "").split(" ");
    data = data.filter((item) => {
      for (let i = 0; i < tags.length; i++) {
        return item.tags.indexOf(tags[i]) !== -1;
      }
    });
  }

  state.Quizes.data = [...data];
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
    searchByTags(state, action: PayloadAction<string>) {
      state.SortProps.tags = action.payload;
      sortQuizes(state);
    },
    searchByName(state, action: PayloadAction<string>) {
      state.SortProps.title = action.payload;

      sortQuizes(state);
    },
    searchByAuthor(state, action: PayloadAction<string>) {
      state.SortProps.author = action.payload;
      sortQuizes(state);
    },
    clearSortProps(state) {
      state.SortProps = initialState.SortProps;
    },
    changeSortMethod(state, action: PayloadAction<Sort>) {
      if (action.payload === Sort.AZ)
        state.Quizes.data.sort((a, b) => (a.title > b.title ? 1 : -1));
      if (action.payload === Sort.AZR)
        state.Quizes.data.sort((a, b) => (a.title > b.title ? -1 : 1));
      if (action.payload === Sort.NEW) state.Quizes.data = state.Storage;
      if (action.payload === Sort.OLD) state.Quizes.data.reverse();
      if (action.payload === Sort.SHORT)
        state.Quizes.data.sort(
          (a, b) => a.questions.length - b.questions.length
        );
      if (action.payload === Sort.LONG)
        state.Quizes.data.sort(
          (a, b) => b.questions.length - a.questions.length
        );
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
    setCover(state, action: PayloadAction<string>) {
      state.CreatingQuiz.cover = action.payload;
    },
    removeCover(state) {
      state.CreatingQuiz.cover = "";
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
      state.Storage = action.payload;
    });

    builder.addCase(fetchQuizById.pending, (state) => {});
    builder.addCase(fetchQuizById.rejected, (state) => {});
    builder.addCase(fetchQuizById.fulfilled, (state, action) => {
      state.CurrentQuiz = action.payload;
    });

    builder.addCase(fetchCreateQuiz.pending, (state) => {});
    builder.addCase(fetchCreateQuiz.rejected, (state) => {});
    builder.addCase(fetchCreateQuiz.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const quizReducer = QuizSlice.reducer;
export const {
  changeQuestionType,
  changeQuestionBody,
  addAnswer,
  changeSortMethod,
  removeAnswerById,
  changeTestAnswer,
  changeAnswerBody,
  closeModal,
  editModal,
  clearSortProps,
  submitQuestion,
  searchByName,
  searchByAuthor,
  setCover,
  addQuestion,
  deleteQuestion,
  changeMultiTestAnswer,
  calculateResult,
  setAnswer,
  clearAnswers,
  removeCover,
  searchByTags,
  clearCreatingQuiz,
  clearResult,
} = QuizSlice.actions;
