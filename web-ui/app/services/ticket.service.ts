import {request} from "@/api/request.api";
import {IAppInfo, IFilter, ITicket} from "@/types/types";
import {API_URL, SERVER_REQUEST} from "@/api/url.api";

export const TicketService = {

    async getOpenTickets(filter?: IFilter) {
        return request<ITicket[]>({
            url: API_URL + SERVER_REQUEST.getOpenTickets.url,
            method: SERVER_REQUEST.getOpenTickets.method,
            data: filter
        })
    },

    async getMyTickets(userId: number) {
        return request<ITicket[]>({
            url: API_URL + SERVER_REQUEST.getMyTickets.url +`/${userId}`,
            method: SERVER_REQUEST.getMyTickets.method,
        })
    },

    async createTicket(ticket: any) {
        return request({
            url: API_URL + SERVER_REQUEST.createTicket.url,
            method: SERVER_REQUEST.createTicket.method,
            data: ticket
        })
    },
}