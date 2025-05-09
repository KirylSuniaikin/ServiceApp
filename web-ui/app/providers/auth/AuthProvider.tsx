import React, {createContext, useState, useEffect, useContext, SetStateAction, Dispatch} from "react";
import { AuthService } from "@/services/auth.service";
import { Text } from "react-native";
import io from "socket.io-client";
import {IChat, IMessage} from "@/types/types";
import socketService from "@/services/socket.service";

interface IAuthContext {
    user: any | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    chats: IChat[];
    setChats: Dispatch<SetStateAction<IChat[]>>;
    allMessages: Record<string, IMessage[]>;
    setAllMessages: Dispatch<SetStateAction<Record<string, IMessage[]>>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState<IChat[]>([]);
    const [allMessages, setAllMessages] = useState<Record<string, IMessage[]>>({});


    console.log("✅ Пользователь загружен из AsyncStorage:");

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            const storedUser = await AuthService.getUserFromStorage();
            if (storedUser) {
                setUser(storedUser);
                console.log("User loaded from AsyncStorage:", storedUser);
            }
            const resolvedUserId = "516234";
        // ?.id ?? "516234"
            //storedUser

            socketService.init({
                userId: resolvedUserId,
                onChatsReceived: (receivedChats) => {
                    console.log("📥 Чаты получены в AuthProvider:", receivedChats);
                    setChats(receivedChats);
                },
                onChatCreated: (newChat) => {
                    console.log("🔥 Новый чат получен от сервера:", newChat);
                    setChats(prev => [newChat, ...prev]);
                },
                onAllMessages: (messageMap) => {
                    setAllMessages(messageMap);
                },
                onNewMessage: (newMessage) => {
                    setAllMessages(prev => ({
                        ...prev,
                        [newMessage.chatId]: [...(prev[newMessage.chatId] || []), newMessage]
                    }));
                }
            });
            setLoading(false);
        };

        loadUser();



    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, chats, setChats, allMessages, setAllMessages }}>
            {loading ? <Text>Loading...</Text> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;