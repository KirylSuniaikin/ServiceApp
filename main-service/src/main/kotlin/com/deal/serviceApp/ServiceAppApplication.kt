package com.deal.serviceApp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ServiceAppApplication

fun main(args: Array<String>) {
	runApplication<ServiceAppApplication>(*args)
}
