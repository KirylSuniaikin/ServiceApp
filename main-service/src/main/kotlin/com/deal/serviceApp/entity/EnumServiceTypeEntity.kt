package com.deal.serviceApp.entity

import jakarta.persistence.*

@Entity
@Table(name = "EnumServiceType")
data class EnumServiceTypeEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    val name: String
)

