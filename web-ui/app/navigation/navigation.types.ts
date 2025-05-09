import {ComponentType} from "react";
import {IChat} from "@/types/types";

export type TypeRootStackParamList = {
    Auth: undefined;
    Home: undefined;
    OpenTickets: undefined;
    Talent: undefined;
    // Catalog: undefined;
    Messages: undefined;
    Account: undefined;
    MyTickets: undefined;
    ToDo: undefined;
    CreateTicket: undefined;
    Chat: {chat: IChat};
}

export interface IRoute {
    name: keyof TypeRootStackParamList;
    component: ComponentType;
}