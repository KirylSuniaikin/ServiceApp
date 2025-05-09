import {Control, FieldPath, FieldValues, RegisterOptions} from "react-hook-form";
import {TextInputProps} from "react-native";
import {Dispatch, SetStateAction} from "react";
import {Feather} from "@expo/vector-icons";

export interface IUser {
    id: string
    name: string
    type: UserTypeEnum
    email: string
    totalScore: number
    revCount: number
    balance: number
}

export const isIUser = (obj: any): obj is IUser => {
    return (
        obj &&
        typeof obj === "object" &&
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        typeof obj.type === "string" &&
        Object.values(UserTypeEnum).includes(obj.type) &&
        typeof obj.email === "string" &&
        typeof obj.totalScore === "number" &&
        typeof obj.revCount === "number" &&
        typeof obj.balance === "number"
    );
};

export enum UserTypeEnum {
    TASKER = 'TASKER',
    CUSTOMER = 'CUSTOMER',
    SIMPLE = 'SIMPLE'
}

export type IAppInfo = {
    services: IService[]
    subServices: ISubService[]
    shopItems: IPackage[]
}

export type IPackage = {
    type: string;
    price: number;
    value: number;
    activePer: number;
}


export type IService = {
    id: number
    name: string
}

export type ISubService = {
    id: number
    name: string
    serviceType: number
}

export type IFilter = {
    maxBudget: number
    minBudget: number
    serviceType: Array<string>
}

export type ITicket = {
    id: string
    subType: string
    description: string
    budget: number
    location: string
    creationDate: string
    finishDate: string
    author: IUser
    tasker: IUser
    ticketStatus: string
}

export enum TicketStatusEnum {
    OPEN = 'O',
    IN_PROGRESS = 'P',
    CLOSED = 'C',
}

//export interface IAuthFormData extends Pick<IUser, "email" |  "password"> {}

export interface IField<T extends FieldValues>
    extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value'> {
    control: Control<T>
    name: FieldPath<T>
    rules?: Omit<
        RegisterOptions<T, FieldPath<T>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >
}

export type  TypeUserState = IUser | null;

export interface IContext {
    user: TypeUserState
    setUser: Dispatch<SetStateAction<TypeUserState>>
}

export enum EnumAsyncStorage {
    USER = 'user'
}

export type IMessage = {
    messageId?: string,
    senderId: string,
    messageText: string,
    chatId: string,
    receiverId: string,
    sendTime?: string;
    seen?: boolean;
    delivered?: boolean;
}

export type ICreateChat = {
    customerId: string,
    taskerId: string,
}

export type IConnectToChat = {
    chatId: string
}

export type IChat = {
    chatId: string,
    taskerId: string,
    customerId: string
}

declare global {
    namespace SocketIOClient {
        interface ConnectOpts {
            extraHeaders?: { [key: string]: string };
        }
    }
}


export type TypeFeatherIconNames = keyof typeof Feather.glyphMap;