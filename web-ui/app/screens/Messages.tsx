import {FC, useContext, useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View, Button, TouchableOpacity} from 'react-native';
import {TypeRootStackParamList} from "@/navigation/navigation.types";
import {IChat, IConnectToChat, ICreateChat} from "@/types/types";
import socketService from "@/services/socket.service";
import {AuthContext} from "@/providers/auth/AuthProvider";
import {AuthService} from "@/services/auth.service";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {NavigationProp, useNavigation} from "@react-navigation/native";


const Messages: FC = () => {
    const storedUser =  AuthService.getUserFromStorage();
    const authContext = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp<TypeRootStackParamList>>();


    if (!authContext) return null;

    const {chats} = authContext;

    const handleConnectToChat = (chatId: string, chat:IChat) => {
            socketService.connectToChat({chatId})
            console.log("📤 Отправлен connectToChat:", chatId)
            navigation.navigate('Chat', {chat})
    }


    const handleCreateChat = () => {
        const iCreateChat: ICreateChat = {
            taskerId: "00cc190c-9031-709c-e762-182d876ef2bc",
            customerId: "12345"
        }

        socketService.createChat(iCreateChat);
        console.log("📤 Отправлен createChat:", iCreateChat);
    };

    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Chats:</Text>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.chatId}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleConnectToChat(item.chatId, item)}>
                        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                            <Text style={{ fontWeight: 'bold' }}>Чат ID: {item.chatId}</Text>
                            <Text>Tasker: {item.taskerId}</Text>
                            <Text>Customer: {item.customerId}</Text>
                        </View>
                    </TouchableOpacity>

                )}
            />

            <View style={{ marginTop: 20 }}>
                <Button title="Создать чат" onPress={handleCreateChat}/>
            </View>
        </View>
    );
}

export default Messages;