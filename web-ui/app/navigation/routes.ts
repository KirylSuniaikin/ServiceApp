import {IRoute} from "@/navigation/navigation.types";
import Home from "@/screens/Home";
import Auth from "@/screens/auth/Auth";
import OpenTickets from "@/screens/OpenTickets";
import Talent from "@/screens/Talent";
import MyTickets from "@/screens/MyTickets";
import Messages from "@/screens/Messages";
import Account from "@/screens/Account";
import ToDo from "@/screens/ToDo";
import CreateTicket from "@/screens/CreateTicket";
import Chat from "@/screens/Chat";

export const generalRoutes: IRoute[] = [
    {
        name: 'Home',
        component: Home,
    },
    {
        name: 'Talent',
        component: Talent
    },
    {
         name: 'MyTickets',
        component: MyTickets
    },
    {
        name: 'Messages',
        component: Messages
    },
    {
        name: 'Account',
        component: Account
    },
    {
        name: 'Auth',
        component: Auth,
    },
    {
        name: 'CreateTicket',
        component: CreateTicket,
    },
    {
        name: 'Chat',
        component: Chat,
    },
];

export const taskerRoutes: IRoute[] = [
    {
        name: 'OpenTickets',
        component: OpenTickets,
    },
    {
        name: 'ToDo',
        component: ToDo
    },
    {
        name: 'Messages',
        component: Messages
    },
    {
        name: 'Account',
        component: Account
    },
];