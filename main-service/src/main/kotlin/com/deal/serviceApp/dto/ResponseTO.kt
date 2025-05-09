package com.deal.serviceApp.dto

import java.time.LocalDate
import java.util.*

data class ResponseTO(
    val taskerId: UUID,
    val ticketId: UUID,
    val finishDate: LocalDate,
    val budget: Int,
    val responseStatus: String
)
