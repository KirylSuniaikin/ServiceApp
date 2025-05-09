package com.example.chatservice.models

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter
import java.time.LocalDateTime

class LocalDateTimeConverter: DynamoDBTypeConverter<String, LocalDateTime> {
    override fun convert(source: LocalDateTime): String {
        return source.toString()
    }

    override fun unconvert(source: String): LocalDateTime {
        return LocalDateTime.parse(source)
    }
}