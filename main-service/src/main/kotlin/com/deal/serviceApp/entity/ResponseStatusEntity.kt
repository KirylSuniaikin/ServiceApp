package com.deal.serviceApp.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table


@Entity
@Table(name = "ResponseStatus")
data class ResponseStatusEntity(
    @Id
    val code: String,

    @Column(nullable = false)
    val value: String
)
