package com.deal.serviceApp.messaging

import jakarta.annotation.PostConstruct
import org.springframework.amqp.core.Binding
import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.Queue
import org.springframework.amqp.core.TopicExchange
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter
import org.springframework.amqp.support.converter.MessageConverter
import org.springframework.amqp.rabbit.connection.ConnectionFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMqConfig {

    @Value("\${spring.rabbitmq.queue.name}")
    private val queueName: String? = null

    @Value("\${spring.rabbitmq.queue.exchangeName}")
    private val exchange: String? = null

    @Value("\${spring.rabbitmq.queue.routingKey}")
    private val routingKey: String? = null

    @PostConstruct
    fun init() {
        requireNotNull(queueName) { "Queue name must not be null" }
        requireNotNull(exchange) { "Exchange name must not be null" }
        requireNotNull(routingKey) { "Routing key must not be null" }
    }

    @Bean
    fun notificationQueue(): Queue {
        return Queue(queueName)
    }

    @Bean
    fun exchange(): TopicExchange {
        return TopicExchange(exchange)
    }

    @Bean
    fun jsonMessageConverter(): MessageConverter{
        return Jackson2JsonMessageConverter()
    }

    @Bean
    fun rabbitTemplate(connectionFactory: ConnectionFactory): RabbitTemplate {
        val rabbitTemplate = RabbitTemplate(connectionFactory)
        rabbitTemplate.messageConverter = jsonMessageConverter()
        return rabbitTemplate
    }

    @Bean
    fun binding(): Binding {
        return BindingBuilder
            .bind(notificationQueue())
            .to(exchange())
            .with(routingKey!!)
    }
}