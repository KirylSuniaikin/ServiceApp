package com.deal.serviceApp.dto

import java.time.LocalDate
import java.util.*

data class UserTO(
    val id: String,
    val email: String,
    val name: String,
    val role: String,
    val totalScore: Int?,
    val revCount: Int?,
    val balance: Float?,
    val expireDate: LocalDate?
)