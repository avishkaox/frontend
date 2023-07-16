import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
    isLoggedIn: false,
    Test: false,
    name: name ? name : "",
    user: {
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        registerid: "",
        image: null,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state, action) {
            localStorage.setItem("name", JSON.stringify(action.payload));
            state.name = action.payload;
        },
        SET_USER(state, action) {
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phone = profile.phone;
            state.user.role = profile.role;
            state.user.registerid = profile.registerid;
            state.user.image = profile.image;
        },
        SET_ALL_USERS(state, action) {
            state.allUsers = action.payload;
        },
    },
});





export const { SET_LOGIN, SET_NAME, SET_USER , SET_ALL_USERS } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectAllUsers = (state) => state.auth.allUsers;

export default authSlice.reducer;
