import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import searchReducer from './searchSlice';
import gameReducer from "./gameSlice";


/* const counterReducer = (state, action) => {
    
} */



/* const counterReducer = createReducer({


}) */



export const store = configureStore({
    reducer: {
        counter: counterReducer,
        search : searchReducer,
        game: gameReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;