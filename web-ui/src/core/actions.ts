import {AppInfoTO, FilterTO, PackageTO, PurchaseTO, ResponseTO} from "./types";
import {baseSlice} from "../reducers/base-slice"
import {TicketTO} from "../core/types";
import {ticketSlice} from "../reducers/ticket-slice"
import {myTicketSlice} from "../reducers/my-ticket-slice"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import axiosInstance, {SERVER_REQUEST} from "./api";
import {AppDispatch} from "./store";





export const loadAppInfo = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(baseSlice.actions.appInfoFetching())
        const response = await axiosInstance.get<AppInfoTO>(SERVER_REQUEST.getApplicationInfo.url)
        dispatch(baseSlice.actions.appInfoFetchingSuccess(response.data))
    } catch (e: unknown) {
        if (typeof e === "object" && e !== null && "message" in e) {
            dispatch(baseSlice.actions.appInfoFetchingError((e as { message: string }).message))
        } else {
            dispatch(baseSlice.actions.appInfoFetchingError("An unexpected error occurred"))
        }
    }
}



export const loadTicketInfo = (filterTO?: FilterTO) => async (dispatch: AppDispatch) => {
    try {
        dispatch(ticketSlice.actions.ticketInfoFetching());


        const response = await axiosInstance.post<TicketTO[]>(
            SERVER_REQUEST.getOpenTickets.url,
            filterTO ? filterTO : undefined // Если filterTO не указан, отправляем запрос без тела
        );

        console.log(response.data);
        dispatch(ticketSlice.actions.ticketInfoFetchingSuccess(response.data));
    } catch (e: unknown) {
        if (typeof e === "object" && e !== null && "message" in e) {
            dispatch(ticketSlice.actions.ticketInfoFetchingError((e as { message: string }).message));
        } else {
            dispatch(ticketSlice.actions.ticketInfoFetchingError("An unexpected error occurred"));
        }
    }
};

export const loadMyTicketInfo = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(myTicketSlice.actions.ticketInfoFetching())
        const response = await axiosInstance.get<TicketTO[]>(SERVER_REQUEST.getMyTickets.url)
        console.log(response.data)
        dispatch(myTicketSlice.actions.ticketInfoFetchingSuccess(response.data))
    } catch (e: unknown) {
        if (typeof e === "object" && e !== null && "message" in e) {
            dispatch(myTicketSlice.actions.ticketInfoFetchingError((e as { message: string }).message))
        } else {
            dispatch(myTicketSlice.actions.ticketInfoFetchingError("An unexpected error occurred"))
        }
    }
}




export const packagePurchase = (purchaseTO: PurchaseTO) => {
    return async (dispatch: AppDispatch) => {
        try {
            // Updated URL to match your Spring Boot endpoint
            await axiosInstance.post(`${SERVER_REQUEST.packagePurchase.url}`, purchaseTO)
            console.log(purchaseTO)
        }catch (e: unknown) {
            if (typeof e === "object" && e !== null && "message" in e) {

            } else {
            }
        }
    };
};


// export const markTicketAsDone = (ticketId: string) => async (dispatch: AppDispatch) => {
// //     try {
// //         await axiosInstance.put(`${SERVER_REQUEST.getMyTickets.url}/${ticketId}/resolve`)
// //         dispatch(myTicketSlice.actions.ticketResolveSuccess(ticketId))
// //     } catch (e: unknown) {
// //         if (typeof e === "object" && e !== null && "message" in e) {
// //             dispatch(myTicketSlice.actions.ticketResolveError((e as { message: string }).message))
// //         } else {
// //             dispatch(myTicketSlice.actions.ticketResolveError("An unexpected error occurred"))
// //         }
// //     }
// }

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8084' }),
    endpoints: (builder) => ({
        submitResponse: builder.mutation<ResponseTO, Partial<ResponseTO>>({
            query: (body) => ({
                url: '/responses/createResponse',
                method: 'POST',
                body,
            }),
        }),

    }),
})


export const { useSubmitResponseMutation } = api;