import {combineReducers, configureStore} from "@reduxjs/toolkit";
import baseReducer from "../reducers/base-slice";
import ticketReducer from "../reducers/ticket-slice";
import userReducer from "../reducers/user-slice";
import myTicketReducer from "../reducers/my-ticket-slice"
import {api} from "./actions";


const rootReducer = combineReducers({
    baseReducer,
    ticketReducer,
    userReducer,
    myTicketReducer,
    [api.reducerPath]: api.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']