package com.deal.serviceApp.controller

import com.deal.serviceApp.dto.UserCreationRequest
import com.deal.serviceApp.service.UserService
import lombok.RequiredArgsConstructor
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
class UserController(private val userService: UserService) {

    @PostMapping("/create")
    fun create(@RequestBody request: UserCreationRequest) {
        userService.create(request)
    }
}
