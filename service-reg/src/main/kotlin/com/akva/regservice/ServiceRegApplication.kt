package com.akva.regservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer

@SpringBootApplication
@EnableEurekaServer
class ServiceRegApplication

fun main(args: Array<String>) {
	runApplication<ServiceRegApplication>(*args)
}
