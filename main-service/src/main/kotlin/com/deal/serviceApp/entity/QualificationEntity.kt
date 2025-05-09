package com.deal.serviceApp.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "Qualification")
data class QualificationEntity(
    @Id
    @GeneratedValue
    val id: UUID = UUID.randomUUID(),

    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    val serviceType: EnumServiceTypeEntity,

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    val user: UserProfileEntity
)