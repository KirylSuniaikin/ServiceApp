// export const SERVER_URL = process.env.SERVER_URL
export const API_URL = 'http://192.168.0.89:8085'


export const SERVER_REQUEST = {
    getTestText: {
        url: '/test/text',
        method: "GET",
    },
    getApplicationInfo: {
        url: '/appInfo/base',
        method: "GET",
    },
    getOpenTickets: {
        url: '/tickets/openTickets',
        method: "POST",
    },
    getMyTickets: {
        url: '/tickets/myTickets',
        method: "GET",

    },
    packagePurchase: {
        url: '/shop/purchase',
        method: "POST",

    },
    createTicket: {
        url: '/tickets/createTicket',
        method: "POST",

    },
    createUser: {
        url: '/user/create',
        method: "POST",

    }
}