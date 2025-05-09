package com.example.chatservice.repository

import com.example.chatservice.models.ChatModel
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ChatRepository: DynamoDBCrudRepository<ChatModel, String> {
    fun findByCustomerIdAndTaskerId(customerId: String, taskerId: String): ChatModel?
    fun findByOrCustomerIdOrTaskerId(userId: String): List<ChatModel>
}

