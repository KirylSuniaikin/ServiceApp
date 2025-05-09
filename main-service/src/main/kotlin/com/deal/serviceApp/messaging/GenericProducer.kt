package com.deal.serviceApp.messaging

import com.deal.serviceApp.dto.messaging.GenericMessage
import jakarta.annotation.PostConstruct
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class GenericProducer(private val rabbitTemplate: RabbitTemplate) {

    @Value("\${spring.rabbitmq.queue.exchangeName}")
    private val exchange: String? = null

    @Value("\${spring.rabbitmq.queue.routingKey}")
    private val routingKey: String? = null

    @Value("\${spring.sendgrid.is-enable}")
    private val isEmailSendingEnable: Boolean = false

    @PostConstruct
    fun init() {
        requireNotNull(exchange) { "Exchange name must not be null" }
        requireNotNull(routingKey) { "Routing key must not be null" }
    }

    fun sendMessage(message: GenericMessage) {
        if (isEmailSendingEnable){
            rabbitTemplate.convertAndSend(exchange!!, routingKey!!, message)
            println("sent message to ${message.email} with username ${message.username}")
        }
    }
}