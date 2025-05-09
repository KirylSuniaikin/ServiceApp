package com.example.chatservice.service


import com.example.chatservice.models.ChatModel
import com.example.chatservice.models.CreateChatTO
import com.example.chatservice.models.FindChatTO
import com.example.chatservice.models.GetUserChatsTO
import com.example.chatservice.repository.ChatRepository
import org.springframework.stereotype.Service
import java.util.UUID


@Service
class ChatService(
    private val chatRepository: ChatRepository
) {
    fun createChat(createChatTO: CreateChatTO): ChatModel{

        val existingChat = chatRepository.findByCustomerIdAndTaskerId(createChatTO.customerId, createChatTO.taskerId)
        if(existingChat!= null){
            return existingChat
        }

        val newChat = ChatModel(
            customerId = createChatTO.customerId,
            taskerId = createChatTO.taskerId,
            chatId = UUID.randomUUID().toString()
            )

        return chatRepository.save(newChat)

    }

    fun getUserChats(getUserChatsTO: GetUserChatsTO): List<ChatModel> {
        return chatRepository.findByOrCustomerIdOrTaskerId(getUserChatsTO.userId)
    }

    fun findChat(findChatTO: FindChatTO): ChatModel? {
        return chatRepository.findByCustomerIdAndTaskerId(findChatTO.customerId, findChatTO.taskerId)
    }
}