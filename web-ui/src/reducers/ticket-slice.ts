import {TicketTO} from "../core/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TicketState {
    openTickets: TicketTO[]
    isLoading: boolean
    error: string
}

export const initialTicketState: TicketState = {
    openTickets: [],
    isLoading: false,
    error: ''
}

export const ticketSlice = createSlice({
    name: 'tickets',
    initialState: initialTicketState,
    reducers: {
        ticketInfoFetching(state){
            state.isLoading = true
            state.error = ''
        },
        ticketInfoFetchingSuccess(state, action: PayloadAction<TicketTO[]>){
            state.isLoading = false
            state.error = ''
            state.openTickets = action.payload
        },
        ticketInfoFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default ticketSlice.reducer