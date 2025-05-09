package com.deal.serviceApp.dto.messaging

data class FirstTicketResponseMessage(
    override val email: String,
    override val username: String,
    val taskerNickname: String,
    val taskerRating: Float,
    val completedJobsCount: Int,
    val counteroffer: Int,
    val subType: String,
//    val potentialTerm1: LocalDateTime,
//    val potentialTerm2: LocalDateTime,
//    val additionalInfo: String,
): GenericMessage

