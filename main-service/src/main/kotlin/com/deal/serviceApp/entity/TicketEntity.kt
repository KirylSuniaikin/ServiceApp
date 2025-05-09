package com.deal.serviceApp.entity

import jakarta.persistence.*
import java.time.LocalDate
import java.util.*

@Entity
@Table(name = "Ticket")
data class TicketEntity(
    @Id
    @GeneratedValue
    val id: UUID = UUID.randomUUID(),

    @Column(length = 500)
    val description: String,

    @ManyToOne
    @JoinColumn(name = "status_code", nullable = false)
    val status: TicketStatusEntity,

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    val author: UserProfileEntity,

    @ManyToOne
    @JoinColumn(name = "service_sub_type_id", nullable = false)
    val subType: EnumServiceSubTypeEntity,

    @Column
    val budget: Float,

    @Column(nullable = false)
    val finishDate: LocalDate,

    @Column(nullable = false)
    val creationDate: LocalDate = LocalDate.now(),

    @Column(nullable = false)
    val location: String,

    @Column
    val lastNotificationDate: LocalDate? = null,

    @ManyToOne
    @JoinColumn(name = "tasker_id")
    val tasker: UserProfileEntity? = null
)