package com.deal.serviceApp.entity

import jakarta.persistence.*

@Entity
@Table(name = "EnumServiceSubType")
data class EnumServiceSubTypeEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    val name: String,

    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    val serviceType: EnumServiceTypeEntity
)
