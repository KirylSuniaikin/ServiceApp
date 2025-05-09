package com.example.chatservice.repository

import com.example.chatservice.models.MessageModel
import com.example.chatservice.models.MessageTO
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface MessageRepository: DynamoDBCrudRepository<MessageModel, String> {
    fun findByAndReceiverIdAndDelivered(userId: String, delivered: Boolean): List<MessageModel>?
    fun findByChatId(chatId: String): List<MessageModel>?
    fun findByAndChatIdAndSeen(chatId: String, seen: Boolean): List<MessageModel>?
}