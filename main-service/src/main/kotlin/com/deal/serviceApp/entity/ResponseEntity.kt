package com.deal.serviceApp.entity

import jakarta.persistence.*
import java.time.LocalDate
import java.util.*

@Entity
@Table(name = "Response")
data class ResponseEntity(
    @Id
    @GeneratedValue
    val id: UUID = UUID.randomUUID(),

    @ManyToOne
    @JoinColumn(name = "tasker_id", nullable = false)
    val tasker: UserProfileEntity,

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    val ticket: TicketEntity,

    @Column(nullable = false)
    val budget: Int,

    @Column(length = 500)
    val description: String? = null,

    @Column(nullable = false)
    val finishDate: LocalDate,

    @Column
    val updateDate: LocalDate? = null,

    @ManyToOne
    @JoinColumn(name = "response_status_code", nullable = false)
    val responseStatus: ResponseStatusEntity
)
