import { UserTO, UserTypeEnum } from "../core/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UserState {

    user: UserTO
    isAuth: boolean
    userIsLoading: boolean
    userError: string

}

export const initialUserState: UserState = {
    user: {
        id: '6704a795-7c2b-4484-977f-f183c332b4a9git',
        name: 'dadfa',
        email: 'adsfadfs',
        type: UserTypeEnum.CUSTOMER,
        totalScore: 0,
        revCount: 0,
        balance: 100,
        expireDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
    },
    isAuth: true,
    userIsLoading: false,
    userError: ''
};




export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        authSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
            state.userIsLoading = false;
            state.userError = '';
        },
        authFailure: (state, action) => {
            state.isAuth = false;
            state.userError = action.payload;
            state.userIsLoading = false;
        },
        signOut: (state) => {
            state.isAuth = false;
            state.user = initialUserState.user;
        }
    }
});
export default userSlice.reducer;