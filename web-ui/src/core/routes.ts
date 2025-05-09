import {
    ALL_MY_TICKETS_ROUTE,
    ALL_SERVICES_ROUTE,
    AUTH_PAGE_ROUTE,
    HOME_PAGE_ROUTE,
    MY_SHOP_ROUTE,
    MY_SINGLE_TICKET_ROUTE,
    OPEN_TICKETS_ROUTE
} from "../utils/consts";
import Home from "../pages/home";
import OpenTickets from "../pages/open-tickets";
import Services from "../pages/services";
import {RouteType} from "./types";
import MyTickets from "../pages/my-tickets";
import MySingleTicket from "../pages/my-single-ticket";
import AuthPage from "../pages/auth-form";
import Shop from "../pages/shop";


export const authCustomerRoutes: RouteType[] = [
    {
        path: ALL_MY_TICKETS_ROUTE,
        component: MyTickets
    },
    {
        path: MY_SINGLE_TICKET_ROUTE + "/:id",
        component: MySingleTicket
    },

    {
        path: MY_SHOP_ROUTE,
        component: Shop
    },

    // {
    //     path: MY_PROFILE_ROUTE,
    //     Component:
    // }

]

export const authTaskerRoutes: RouteType[] = [
    {
        path: MY_SHOP_ROUTE,
        component: Shop
    },
    // {
    //     path: ALL_MY_RESPONSES_ROUTE,
    //     Component:
    // },
    // {
    //     path: MY_PROFILE_ROUTE,
    //     Component:
    // }

]

export const publicRoutes: RouteType[] = [
    {
        path: HOME_PAGE_ROUTE,
        component: Home
    },
    {
        path: OPEN_TICKETS_ROUTE,
        component: OpenTickets
    },
    {
        path: ALL_SERVICES_ROUTE,
        component: Services
    },
    {
        path: AUTH_PAGE_ROUTE,
        component: AuthPage
    }
]