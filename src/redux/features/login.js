import { createSlice } from "@reduxjs/toolkit";

import { UserData } from "../../data/UserData";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
        authorizedUsers: UserData,
        authorizedStatus: false,
        errorMessage: "",
    },
    reducers: {
        login: (state, action) => {
            state.loading = true;
            let user = state.authorizedUsers.filter(function (el) {
                return el.username == action.payload.username
            });

            if (user.length > 0 && user[0].username == action.payload.username && user[0].password == action.payload.password) {
                
                //setup localstorage loggedIn attribute
                localStorage.setItem('loggedIn', 1);
                
                state.authorizedStatus = true;

            } else {
                state.errorMessage = "Invalid login credentials.";
                state.authorizedStatus = false;
            }
            state.loading = false;
        },
        clearErrorMessage: (state, action) => {
            state.errorMessage = "";
        },
    },
});

export const { login,clearErrorMessage } = loginSlice.actions;
export default loginSlice.reducer;