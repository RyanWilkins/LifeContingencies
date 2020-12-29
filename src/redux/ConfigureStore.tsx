import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import logger from "redux-logger";
import  questionReducer, {initialQuestionState}  from "./question";
import  userInputReducer, {initialUserInputState}  from "./userinputs"
import lifeTableReducer, {initialLifeTableState}  from "./lifetables"
import deathTableReducer, {initialDeathTableState}  from "./deathtable"

const initialTotalState = {
  questionlist: initialQuestionState,
  userInput: initialUserInputState,
  lifetables: initialLifeTableState,
  deathtables: initialDeathTableState 
}

// const persistedStateCheck = localStorage.getItem('reduxLifeConState') 
//                        ? localStorage.getItem('reduxLifeConState')
//                        : {}
// const persistedState = typeof persistedStateCheck === "string"
//                         ? JSON.parse(persistedStateCheck)
//                         : {}

export const store = configureStore({
  reducer:{
    questionlist: questionReducer,
    userInput: userInputReducer,
    lifetables: lifeTableReducer,
    deathtables: deathTableReducer
  },
  middleware: (process.env.NODE_ENV === "development"
                  ? [...getDefaultMiddleware(), logger]
                  : [...getDefaultMiddleware()]),
  preloadedState: initialTotalState
})

export type AppState = ReturnType<typeof store.getState>


store.subscribe(()=>{
  localStorage.setItem('reduxLifeConState', JSON.stringify(store.getState()))
})