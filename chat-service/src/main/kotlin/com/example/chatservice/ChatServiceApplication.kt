package com.example.chatservice

import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@EnableDynamoDBRepositories(basePackages = ["com.example.chatservice.repository"])
@SpringBootApplication
class ChatServiceApplication

fun main(args: Array<String>) {
	runApplication<ChatServiceApplication>(*args)
}
