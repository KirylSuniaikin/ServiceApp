import {BaseState, initialBaseState} from "../reducers/base-slice";
import {ComponentType} from "react";
import {initialTicketState, TicketState} from "../reducers/ticket-slice";
import {initialMyTicketState, MyTicketState} from "../reducers/my-ticket-slice"
export type AppInfoTO = {
    services: ServiceTO[]
    subServices: SubServiceTO[]
    shopItems: PackageTO[]
}

export type PackageTO = {
    type: string;
    price: number;
    value: number;
    activePer: number;
}

export type PurchaseTO = {
    packageInfo: PackageTO;
    id: string;
}

export type ResponseTO = {
    taskerId: string;
    ticketId: string;
    finishDate: Date;
    budget: number;
    responseStatus: string;
}

export type ServiceTO = {
    id: number
    name: string
}

export type SubServiceTO = {
    id: number
    name: string
    serviceType: number
}

export type UserTO = {
    id: string
    name: string
    token?: string
    type: UserTypeEnum
    email: string
    totalScore: number
    revCount: number
    balance: number
    expireDate: string
}

export type TicketTO = {
    id: string
    subType: string
    description: string
    budget: number
    location: string
    creationDate: string
    finishDate: string
    author: UserTO
    tasker: UserTO
    ticketStatus: string
}


export type FilterTO = {
    maxBudget: number
    minBudget: number
    serviceType: Array<string>
}

export enum TicketStatusEnum {
    OPEN = 'O',
    IN_PROGRESS = 'P',
    CLOSED = 'C',
}




export enum ActionTypeStates {
    IN_PROGRESS = '_IN_PROGRESS',
    SUCCESS = '_SUCCESS',
    FAIL = '_FAIL',
}

export interface MyAction {
    type: ActionTypeStates;
}

export type RouteType = {
    path: string;
    component: ComponentType<any>;
}

export type Root = Readonly<{
    readonly base: BaseState
    readonly ticket: TicketState
    readonly myTicket: MyTicketState
}>

export const rootState: Root = {
    base: initialBaseState,
    ticket: initialTicketState,
    myTicket: initialMyTicketState
}


export enum ActionTypeKeys {
    APP_INFO_LOAD_IN_PROGRESS = 'APP_INFO_LOAD_IN_PROGRESS',
    APP_INFO_LOAD_SUCCESS = 'APP_INFO_LOAD_SUCCESS',
    APP_INFO_LOAD_FAIL = 'APP_INFO_LOAD_FAIL',
}

export enum UserTypeEnum {
    TASKER = 'TASKER',
    CUSTOMER = 'CUSTOMER',
    SIMPLE = 'SIMPLE'
}