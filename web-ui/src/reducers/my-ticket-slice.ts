import {TicketTO} from "../core/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface MyTicketState {
    myTickets: TicketTO[]
    isLoading: boolean
    error: string
}

export const initialMyTicketState: MyTicketState = {
    myTickets: [],
    isLoading: false,
    error: ''
}

export const myTicketSlice = createSlice({
    name: 'my',
    initialState: initialMyTicketState,
    reducers: {
        ticketInfoFetching(state){
            state.isLoading = true
            state.error = ''
        },
        ticketInfoFetchingSuccess(state, action: PayloadAction<TicketTO[]>){
            state.isLoading = false
            state.error = ''
            state.myTickets = action.payload
        },
        ticketInfoFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default myTicketSlice.reducer