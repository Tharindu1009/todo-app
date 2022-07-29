import { createSlice } from "@reduxjs/toolkit";

import { TodoData } from "../../data/TodoData";

export const todoSlice = createSlice({
    name: "todos",
    initialState: { list: TodoData, errorMessage: "", loading: false },
    reducers: {
        addTodo: (state, action) => {
            state.list.unshift(action.payload);
        },
        updateTodo: (state, action) => {
            state.list.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.isCompleted = action.payload.status;
                }
            })
        },
        clearErrorMessage: (state, action) => {
            state.errorMessage = "";
        },
    },
});

export const { addTodo, updateTodo,clearErrorMessage } = todoSlice.actions;
export default todoSlice.reducer;