package com.deal.serviceApp.repository

import com.deal.serviceApp.entity.TicketStatusEntity
import org.springframework.data.jpa.repository.JpaRepository

interface TicketStatusRepository : JpaRepository<TicketStatusEntity, String> {
    fun getByCode(code: String): TicketStatusEntity?
}