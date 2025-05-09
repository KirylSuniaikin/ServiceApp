package com.deal.serviceApp.entity

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table


import jakarta.persistence.*

@Entity
@Table(name = "TicketStatus")
data class TicketStatusEntity(
    @Id
    val code: String,

    @Column(nullable = false)
    val value: String
)


