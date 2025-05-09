package com.example.chatservice.socket

import com.corundumstudio.socketio.SocketIOServer
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component


@Component
class ServerCommandLineRunner(
    private val server: SocketIOServer
): CommandLineRunner {
    private val log: Logger = LoggerFactory.getLogger(ServerCommandLineRunner::class.java)

    override fun run(vararg args: String?) {
        server.start()
        log.info("SocketIOServer has started.")
    }
}