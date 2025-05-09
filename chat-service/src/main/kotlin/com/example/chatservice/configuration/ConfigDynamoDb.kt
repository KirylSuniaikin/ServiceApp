package com.example.chatservice.configuration

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain
import com.amazonaws.client.builder.AwsClientBuilder
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

@Configuration
class ConfigDynamoDb {

        @Value("\${aws.dynamodb.endpoint}")
        private val dynamodbEndpoint: String? = null

        @Value("\${aws.dynamodb.region}")
        private val awsRegion: String? = null

        @Bean
        fun amazonDynamoDB(): AmazonDynamoDB {
            return AmazonDynamoDBClientBuilder
                .standard()
                .withEndpointConfiguration(
                    AwsClientBuilder.EndpointConfiguration(
                        dynamodbEndpoint,
                        awsRegion
                    )
                )
//                .withCredentials(DefaultAWSCredentialsProviderChain())
                .withCredentials(AWSStaticCredentialsProvider(BasicAWSCredentials("AKIAXEVXYSIM3C7H7MSU", "3Q2i4x9RIB/eQze+B7lnJJxYcNj5XWSQYivh9/fW")))
                .build()
        }

        @Bean
        @Primary
        fun dynamoDBMapper(amazonDynamoDB: AmazonDynamoDB): DynamoDBMapper {
            return DynamoDBMapper(amazonDynamoDB)
        }

}