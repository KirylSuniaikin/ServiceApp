package com.example.chatservice.controller

import com.example.chatservice.models.GetMessagesTO
import com.example.chatservice.models.MessageTO
import com.example.chatservice.service.MessageService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

//@RestController
//@RequestMapping("/chat")
//class MessageController(
//    private val messageService: MessageService
//) {
//    @PostMapping("/createMessage")
//    fun saveMessage(@RequestBody messageTO: MessageTO){
//        messageService.saveMessage(messageTO)
//    }
//
//    @PostMapping("/getMessages")
//    fun getMessages(@RequestBody getMessagesTO: GetMessagesTO){
//        messageService.getMessages(getMessagesTO)
//    }
//}