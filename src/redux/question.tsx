import { QUESTIONS } from "../shared/questions";
import { QuestionType } from "../types";
import { createSlice } from "@reduxjs/toolkit";

interface QuestionState {
  myotherprop?: boolean;
  questions: QuestionType[];
}

export const initialQuestionState: QuestionState = {
  myotherprop: true,
  questions: QUESTIONS,
};

const questionSlice = createSlice({
  name: "question",
  initialState: initialQuestionState,
  reducers: {
    activateQuestion: (state, action) => {
      const clicked_question = action.payload;
      const newlist = state.questions.map((x: QuestionType) => ({
        ...x,
        expanded: x.index === clicked_question.index,
      }));
      return { ...state, questions: newlist };
    },
    deactivateQuestion: (state, action) => {
      const newlist = state.questions.map((x: QuestionType) => ({
        ...x,
        expanded: false,
      }));
      return { ...state, questions: newlist };
    }
  },
});

export const { activateQuestion, deactivateQuestion } = questionSlice.actions;
export default questionSlice.reducer;
