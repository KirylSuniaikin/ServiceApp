import {IChat, IConnectToChat, ICreateChat, IMessage} from "@/types/types";

import io, {Socket} from 'socket.io-client'; // ❗️ использовать require, не import


interface SocketServiceOptions {
    userId: string;
    onChatsReceived?: (chats: IChat[]) => void;
    onChatCreated?: (chat: ICreateChat) => void;
    onAllMessages?:(messagesMap: Record<string, IMessage[]>) => void;
    onNewMessage?:(message: IMessage) => void;
}

class SocketService {
    private static instance: SocketService;
    private socket: Socket | null = null;
    public userId: string = '';


    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public init(options: SocketServiceOptions) {
        if (this.socket) {
            console.log('Socket already initialized');
            return;
        }

        this.userId = options.userId;

        this.socket = io("ws://localhost:8088", {
            path: '/socket.io',
            transports: ['websocket'],
            extraHeaders: {
                'x_userId': options.userId,
            },
        });

        this.socket.on('connect', () => {
            console.log('Connected Socket: ', this.socket?.id);
        });

        this.socket.on('disconnect', (reason: any) => {
            console.log('Connection Closed: ', reason);
        })

        this.socket.on('connect_error', (err: Error) => {
            console.log('Socket Connection Error: ', err);
        })

        this.socket.on('newMessage', (message: IMessage) => {
            console.log("📩 New Message:", message);
            options.onNewMessage?.(message);
        })

        this.socket.on('chatCreated', (iCreateChat: ICreateChat) => {
            console.log('New Chat is : ' + iCreateChat);
            options?.onChatCreated?.(iCreateChat);
        })

        this.socket.on('connectToChat', (iConnectToChat: IConnectToChat) => {
            console.log('Connected To Chat: ' + iConnectToChat);
        })

        this.socket.on('userChats', (chats: IChat[]) => {
            console.log('📥 Получены чаты от сервера:', chats);
            // Тут нужно прокинуть их в стор/состояние
            options.onChatsReceived?.(chats); // передаём вверх
        });

        this.socket.on('userMessages', (messagesMap: Record<string, IMessage[]>) => {
            console.log('User Messages: ', messagesMap);
            options.onAllMessages?.(messagesMap);
        });
    }

    public createChat(createChatTO: ICreateChat) {
        if(!this.socket) {
            console.error('Socket is not initialized');
            return;
        }
        this.socket.emit('createChat', createChatTO);
        console.log(createChatTO);
    }

    public connectToChat(connectToChatTO: IConnectToChat) {
        if(!this.socket) return;
        this.socket.emit('connectToChat', connectToChatTO);
    }

    public sendMessage(messageTO: IMessage) {
        if(!this.socket) return;
        this.socket.emit('sendMessage', messageTO);
    }

    public disconnect() {
        if(this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default SocketService.getInstance();