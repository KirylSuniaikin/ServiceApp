package com.example.chatservice.repository

import com.example.chatservice.models.OnlineUsersModel
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBCrudRepository
import org.socialsignin.spring.data.dynamodb.repository.EnableScan
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories

@EnableScan
@EnableDynamoDBRepositories
interface OnlineUsersRepository: DynamoDBCrudRepository<OnlineUsersModel, String> {
}