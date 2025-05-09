package com.deal.serviceApp.service

import com.akva.models.entity.UserType
import com.deal.serviceApp.dto.UserCreationRequest
import com.deal.serviceApp.entity.UserProfileEntity
import com.deal.serviceApp.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class UserService(
    private val userRepo: UserRepository,
) {
    fun create(request: UserCreationRequest) {
        val user = UserProfileEntity(
            request.id,
            request.email,
            request.name,
            UserType.valueOf(request.role),
            0,
            0,
            300,
            LocalDate.now().plusMonths(3)
        )
        userRepo.save(user)
    }
}