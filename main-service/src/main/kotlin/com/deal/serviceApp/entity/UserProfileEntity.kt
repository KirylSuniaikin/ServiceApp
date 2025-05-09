package com.deal.serviceApp.entity

import com.akva.models.entity.UserType
import jakarta.persistence.*
import java.time.LocalDate
import java.util.*

@Entity
@Table(name = "UserProfile")
data class UserProfileEntity(
    @Id
    val id: UUID,

    @Column(nullable = false, unique = true)
    val email: String,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val role: UserType,

    @Column(nullable = false)
    val totalScore: Int = 0,

    @Column(nullable = false)
    val revCount: Int = 0,

    @Column
    val balance: Int? = 0,

    @Column
    val expireDate: LocalDate? = null
)
