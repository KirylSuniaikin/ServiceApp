package com.deal.serviceApp.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "Packages")
data class PackageEntity(
    @Id
    val type: String,

    @Column(nullable = false)
    val value: Int,

    @Column(nullable = false)
    val activePer: Int,

    @Column(nullable = false)
    val price: Float
)