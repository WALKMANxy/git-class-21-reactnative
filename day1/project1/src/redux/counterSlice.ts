import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({ 
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        set: (state, action) => {
            state += action.payload;
        }
    }

})

export const { increment, decrement, set } = counterSlice.actions;
export const counterReducer = counterSlice.reducer