package com.deal.serviceApp.dto

import java.util.UUID

data class UserCreationRequest (
    val id: UUID,
    val email: String,
    val name: String,
    val role: String
)