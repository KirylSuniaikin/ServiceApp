package com.example.chatservice.models

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable
import java.time.LocalDateTime

@DynamoDBTable(tableName = "OnlineUsers")
data class OnlineUsersModel(

    @DynamoDBHashKey
    @DynamoDBAttribute(attributeName = "user_id")
    val userId: String,

    @DynamoDBAttribute(attributeName = "session_id")
    val sessionId: String,

    @DynamoDBAttribute(attributeName = "last_seen")
    val lastSeen: String = LocalDateTime.now().toString()
)
