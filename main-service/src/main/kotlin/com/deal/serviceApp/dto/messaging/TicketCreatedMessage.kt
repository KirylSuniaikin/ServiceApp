package com.deal.serviceApp.dto.messaging

import java.time.LocalDate

class TicketCreatedMessage (
    override val email: String,
    override val username: String,
    val subtype: String,
    val description: String,
    val budget: Int,
    val finishDate: LocalDate,
): GenericMessage