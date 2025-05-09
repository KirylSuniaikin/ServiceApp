package com.deal.serviceApp.dto

import java.time.LocalDate
import java.util.UUID

data class TicketTO(
    val id: String? = null,
    val subType: String,
    val description: String,
    val budget: Float,
    val location: String,
    val creationDate: LocalDate? = LocalDate.now(),
    val finishDate: LocalDate,
    val authorId: UUID,
    val taskerId: UUID?,
    val ticketStatus: String
)