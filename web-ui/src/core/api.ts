import axios from 'axios';
import {fetchAuthSession} from "@aws-amplify/auth";

export const BASE_URL = "http://localhost:8084"



const axiosInstance = axios.create({
    baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(async (config) => {
    const session = await fetchAuthSession();
    const accessToken = session.tokens?.accessToken.toString();
    console.log('token iz chranil: ' + accessToken);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export enum METHOD_TYPE {
    POST,
    GET,
    PUT,
    DELETE,
    HEAD,
}

export default axiosInstance;

export const SERVER_REQUEST = {
    getTestText: {
        url: '/test/text',
        method: METHOD_TYPE.GET,
    },
    getApplicationInfo: {
        url: '/appInfo/base',
        method: METHOD_TYPE.GET,
    },
    getOpenTickets: {
        url: '/tickets/openTickets',
        method: METHOD_TYPE.GET,
    },
    getMyTickets: {
        url: '/tickets/myTickets/3a6c665b-861e-488d-a611-b4e1f4713c67',
        method: METHOD_TYPE.GET,

    },
    packagePurchase: {
        url: '/shop/purchase',
        method: METHOD_TYPE.POST,

    }
}


