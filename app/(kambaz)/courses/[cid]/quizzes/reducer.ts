/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
}

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, { payload }) => {
            state.quizzes = payload;
        },
        addQuiz: (state, { payload }) => {
            state.quizzes = [...state.quizzes, payload] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId) as any;
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
              q._id === quiz._id ? quiz : q
            ) as any;
          },
        },
      });

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;