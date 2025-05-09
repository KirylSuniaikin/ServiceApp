import {AppInfoTO, PackageTO} from "../core/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface BaseState {
    appInfo: AppInfoTO
    isLoading: boolean
    error: string
}

export const initialBaseState: BaseState = {
    appInfo: {
        services: [],
        subServices: [],
        shopItems: []
    },
    isLoading: false,
    error: ''
}

export const baseSlice = createSlice({
    name: 'base',
    initialState: initialBaseState,
    reducers: {
        appInfoFetching(state){
            state.isLoading = true
            state.error = ''
        },
        appInfoFetchingSuccess(state, action: PayloadAction<AppInfoTO>){
            state.isLoading = false
            state.error = ''
            state.appInfo = action.payload
        },
        appInfoFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default baseSlice.reducer