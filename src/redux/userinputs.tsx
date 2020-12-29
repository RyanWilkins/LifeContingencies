import { UserInputs } from "../types";
import { createSlice } from "@reduxjs/toolkit";

export const initialUserInputState: UserInputs = {
    gender: "other",
    age: 30, 
    ethnicity: "All",
    country: "US",
    smoking: "all"
}

const userInputSlice = createSlice({
  name: "userInput",
  initialState: initialUserInputState,
  reducers:{
    updateUserInput: (state, action) => {
      return action.payload
    }
  }
})

export const {updateUserInput} = userInputSlice.actions
export default userInputSlice.reducer
