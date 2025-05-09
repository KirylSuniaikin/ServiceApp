package com.deal.serviceApp.dto.messaging

data class RegistrationMessage (
    override val email: String,
    override val username: String,
): GenericMessage
