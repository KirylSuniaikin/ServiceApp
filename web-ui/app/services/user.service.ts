import {IFilter, ITicket} from "@/types/types";
import {request} from "@/api/request.api";
import {API_URL, SERVER_REQUEST} from "@/api/url.api";

export const UserService = {

    async createUser(user: any) {
        return request({
            url: API_URL + SERVER_REQUEST.createUser.url,
            method: SERVER_REQUEST.createUser.method,
            data: user
        })
    },
}