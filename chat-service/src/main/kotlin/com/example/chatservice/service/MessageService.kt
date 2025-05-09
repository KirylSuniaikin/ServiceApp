package com.example.chatservice.service

import com.corundumstudio.socketio.SocketIOClient
import com.example.chatservice.models.GetMessagesTO
import com.example.chatservice.models.MessageModel
import com.example.chatservice.models.MessageTO
import com.example.chatservice.repository.MessageRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class MessageService(
    private val messageRepository: MessageRepository
) {
    fun saveMessage(messageTO: MessageTO){
        val newMessage = MessageModel(
            messageId = UUID.randomUUID().toString(),
            userId = messageTO.senderId,
            chatId = messageTO.chatId,
            messageText = messageTO.messageText,
            sendTime = LocalDateTime.now().toString(),
            seen = false,
            delivered = false,
            receiverId = messageTO.receiverId
        )
        messageRepository.save(newMessage)
    }

    fun getMessages(getMessagesTO: GetMessagesTO): List<MessageModel>{
        return messageRepository.findByChatId(getMessagesTO.chatId)?.sortedBy { it.sendTime } ?: emptyList()
    }

    fun markMessagesAsDelivered(userId: String){
        val messages = messageRepository.findByAndReceiverIdAndDelivered(userId, false)
        messages?.forEach { message ->
            message.delivered = true
            messageRepository.save(message)
        }
    }

    fun markMessagesAsSeen(chatId:String){
        val messages = messageRepository.findByAndChatIdAndSeen(chatId, false)
        messages?.forEach {message ->
            message.seen = true
            messageRepository.save(message)
        }
    }
}