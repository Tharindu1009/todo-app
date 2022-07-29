import { createSlice } from "@reduxjs/toolkit";

import { TodoData } from "../../data/TodoData";

export const todoSlice = createSlice({
    name: "todos",
    initialState: { list: TodoData, successMessage: "", loading: false },
    reducers: {
        addTodo: (state, action) => {
            state.list.unshift(action.payload);
            state.successMessage = "Task added successfully."
        },
        updateTodo: (state, action) => {
            state.list.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.isCompleted = action.payload.status;
                }
            })
        },
        clearMessages: (state, action) => {
            state.successMessage = "";
        },
    },
});

export const { addTodo, updateTodo,clearMessages } = todoSlice.actions;
export default todoSlice.reducer;