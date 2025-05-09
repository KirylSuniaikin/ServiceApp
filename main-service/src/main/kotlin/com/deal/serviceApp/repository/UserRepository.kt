package com.deal.serviceApp.repository

import com.deal.serviceApp.entity.UserProfileEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.util.*


interface UserRepository : JpaRepository<UserProfileEntity, UUID> {

    fun findByEmail(email: String): UserProfileEntity?
    override fun findById(id: UUID): Optional<UserProfileEntity>


    @Query("SELECT u.expire_date FROM UserProfile u WHERE u.id = :id", nativeQuery = true)
    fun getExpireDateByUserId(@Param("id") id: UUID): LocalDate

    @Modifying
    @Transactional
    @Query(value = """
    UPDATE UserProfile SET balance = balance + :value WHERE id = :id
""", nativeQuery = true)
    fun updateBalance(@Param("id") id: UUID, @Param("value") balance: Float): Int

    @Modifying
    @Transactional
    @Query(
        value = "UPDATE UserProfile SET expire_date = CAST(:interval AS INTERVAL) WHERE id = :id",
        nativeQuery = true
    )
    fun updateExpiredDate(@Param("id") id: UUID, @Param("interval") interval: String)


    @Modifying
    @Transactional
    @Query(
        value = "UPDATE UserProfile SET expire_date = expire_date + CAST(:interval AS INTERVAL) WHERE id = :id",
        nativeQuery = true)
    fun updateExpireDate(@Param("id") id: UUID, @Param("interval") interval: String)

    }
