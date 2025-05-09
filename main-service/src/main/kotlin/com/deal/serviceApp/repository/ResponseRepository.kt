package com.deal.serviceApp.repository

import com.deal.serviceApp.entity.ResponseEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*


interface ResponseRepository : JpaRepository<ResponseEntity, UUID> {
    fun findAllByTicketId(id: UUID): Optional<List<ResponseEntity>>
    fun findAllByTaskerId(id: UUID): Optional<List<ResponseEntity>>
}