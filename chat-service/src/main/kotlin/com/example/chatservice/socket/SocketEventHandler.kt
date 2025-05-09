package com.example.chatservice.socket

import com.corundumstudio.socketio.SocketIOClient
import com.corundumstudio.socketio.SocketIOServer
import com.corundumstudio.socketio.annotation.OnConnect
import com.corundumstudio.socketio.annotation.OnDisconnect
import com.corundumstudio.socketio.annotation.OnEvent
import com.example.chatservice.models.*
import com.example.chatservice.repository.OnlineUsersRepository
import com.example.chatservice.service.ChatService
import com.example.chatservice.service.MessageService
import java.time.LocalDateTime

class SocketEventHandler(
    private val socketIOServer: SocketIOServer,
    private val chatService: ChatService,
    private val messageService: MessageService,
    private val onlineUsersRepository: OnlineUsersRepository
) {
    private val onlineUsers = mutableMapOf<String, String>()


    @OnConnect
    fun onConnect(client: SocketIOClient) {
        val userId = client.handshakeData.getSingleUrlParam("userId")
        if (userId.isNullOrEmpty()){
         client.disconnect()}
        val onlineUser = OnlineUsersModel(
            userId = userId,
            sessionId = client.sessionId.toString(),
            lastSeen = LocalDateTime.now().toString()
        )
        onlineUsersRepository.save(onlineUser)
        messageService.markMessagesAsDelivered(userId)
        println("user is connected with id ${userId}")
    }

    @OnEvent("createChat")
    fun handleCreateChat(client: SocketIOClient, createChatTO: CreateChatTO) {
        val chatRoom = chatService.createChat(createChatTO)
        client.sendEvent("chatCreated", chatRoom.chatId)
    }

    @OnEvent("connectToChat")
    fun handleConnectToChat(client: SocketIOClient, connectToChatTO: ConnectToChatTO){
        client.joinRoom(connectToChatTO.chatId)
        val getMessagesTO = GetMessagesTO(chatId = connectToChatTO.chatId)
        val history = messageService.getMessages(getMessagesTO)
        client.sendEvent("chatHistory", history)
        println("User connected to chat room: $connectToChatTO.chatId")
        messageService.markMessagesAsSeen(connectToChatTO.chatId)
    }

    @OnEvent("sendMessage")
    fun handleSendMessage(messageTO: MessageTO) {
        messageService.saveMessage(messageTO)

        // Получаем ID второго участника
        val chat = chatService.findChat(FindChatTO(messageTO.senderId, messageTO.chatId))
        val receiverId = if (chat?.customerId == messageTO.senderId) chat.taskerId else chat?.customerId

        val receiverClient = messageTO.senderClient.namespace.allClients.find { it.sessionId.toString() == receiverId }

        if (receiverClient != null) {
            receiverClient.sendEvent("newMessage", messageTO.messageText)
        } else {
            println("Receiver not connected")
        }

        messageTO.senderClient.sendEvent("messageDelivered", "Message sent successfully!")
    }

    @OnDisconnect
    fun onDisconnect(client: SocketIOClient) {
        println("Client disconnected: ${client.sessionId}")
    }
}