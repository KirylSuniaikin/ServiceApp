package com.example.chatservice.models

import com.corundumstudio.socketio.SocketIOClient
import java.util.*

data class MessageTO(
    val senderId: String,
    val chatId: String,
    val messageText: String,
    val senderClient: SocketIOClient,
    val receiverId: String
)
