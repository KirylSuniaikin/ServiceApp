package com.deal.serviceApp.dto.mapper

import com.deal.serviceApp.dto.TicketTO
import com.deal.serviceApp.entity.TicketEntity


interface TicketMapper {

    fun toEntity(ticketTO: TicketTO): TicketEntity?
    fun toTO(ticketEntity: TicketEntity): TicketTO
    fun toTOList(ticketEntities: List<TicketEntity>): List<TicketTO>
}