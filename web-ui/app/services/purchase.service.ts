import {IFilter, ITicket} from "@/types/types";
import {request} from "@/api/request.api";
import {API_URL, SERVER_REQUEST} from "@/api/url.api";

export const PurchaseService = {

    async packagePurchase(filter?: IFilter) {
        return request<ITicket[]>({
            url: API_URL + SERVER_REQUEST.getOpenTickets.url,
            method: SERVER_REQUEST.getOpenTickets.method,
            data: filter
        })
    },
}