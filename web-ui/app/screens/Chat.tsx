import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {View, Text, TouchableOpacity, FlatList, TextInput} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {TypeRootStackParamList} from "@/navigation/navigation.types";
import socketService from "@/services/socket.service";
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import { StyleSheet } from 'react-native';
import {IMessage} from "@/types/types";
import AuthProvider, {AuthContext} from "@/providers/auth/AuthProvider";
import { MaterialIcons } from '@expo/vector-icons';
import {IconButton} from "react-native-paper";



type ChatScreenRouteProp = RouteProp<TypeRootStackParamList, 'Chat'>;

const Chat = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { chat } = route.params
    const userId = socketService.userId
    const interviewee = chat.customerId != userId ? chat.customerId : chat.taskerId;
    const {navigate} = useNavigation<TypeRootStackParamList>();
    const authContext = useContext(AuthContext);
    const chatMessages = authContext?.allMessages[chat.chatId] ?? []
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const flatListRef = useRef<FlatList<IMessage>>(null);

    const styles = StyleSheet.create({
        myMessage: {
            alignSelf: 'flex-end',
            backgroundColor: '#DCF8C5',
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
            marginVertical: 6,
            marginRight: 10,
            marginLeft: 40,
            maxWidth: '75%',
        },
        intervieweeMessage: {
            alignSelf: 'flex-start',
            backgroundColor: '#E5E5EA',
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
            marginVertical: 6,
            marginLeft: 10,
            marginRight: 40,
            maxWidth: '75%',
        },
        messageText: {
            fontSize: 16,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderColor: '#ddd',
            height: 60,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            zIndex: 10,
        },
        centeredTextWrapper: {
            position: 'absolute',
            left: 0,
            right: 0,
            alignItems: 'center',
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        listContainer: {
            flex: 1,
            paddingTop: 60 + 10, // чтобы отступ был ниже шапки
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderTopWidth: 1,
            borderColor: '#ddd',
            backgroundColor: '#fff',
        },

        input: {
            flex: 1,
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            marginRight: 10,
        },

        sendButtonText: {
            fontSize: 16,
            color: '#007AFF',
        }

    });

    const handleSendMessage = () => {
        const newMessage: IMessage = {
            messageText: message,
            chatId: chat.chatId,
            senderId: socketService.userId,
            receiverId: interviewee,
        };
        if(newMessage.messageText.length != 0){
            socketService.sendMessage(newMessage);
            setMessage('');
            console.log("📤 Отправлено сообщение:", newMessage);
        }
    };

    const formatedTime = (message: IMessage): string => {
        if (!message.sendTime) return "";

        return new Date(message.sendTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
    })
    };

    useEffect(() => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);

    }, [chatMessages.length]);

    return(
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.centeredTextWrapper}>
                    <Text style={styles.title}>{interviewee}</Text>
                </View>
            </View>

            {/* Messages */}
            <View style={styles.listContainer}>
                <FlatList
                    ref={flatListRef}
                    data={chatMessages}
                    keyExtractor={(message: IMessage, index: number) => message.messageId || `temp-${index}`}
                    renderItem={({ item }: { item: IMessage }) => {
                        const isMyMessage = item.senderId === socketService.userId;
                        return (
                            <View style={isMyMessage ? styles.myMessage : styles.intervieweeMessage}>
                                <Text>{item.messageText}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, color: '#888' }}>{formatedTime(item)}</Text>
                                        <IconButton
                                        icon={item.seen ? 'check-all' : item.delivered ? 'check' : ''}
                                        size={14}
                                        iconColor={item.seen ? '#007AFF' : '#888'}
                                         />
                                </View>
                            </View>
                        );
                    }}>
                </FlatList>
            </View>

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    placeholder="Message"
                    onChangeText={setMessage}
                />
                <TouchableOpacity
                    onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>


        </View>

    );

};

export default Chat;