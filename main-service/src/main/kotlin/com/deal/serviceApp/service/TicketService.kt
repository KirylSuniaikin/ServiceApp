package com.deal.serviceApp.service

import com.deal.serviceApp.dto.FilterTO
import com.deal.serviceApp.dto.TicketTO
import com.deal.serviceApp.dto.mapper.TicketMapper
import com.deal.serviceApp.messaging.GenericProducer
import com.deal.serviceApp.repository.TicketRepository
import com.deal.serviceApp.repository.TicketStatusRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class TicketService(
    private val ticketMapper: TicketMapper,
    private val ticketRepository: TicketRepository,
    private val ticketStatusRepository: TicketStatusRepository,
    private val emailProducer: GenericProducer,
    private val ticketSpecification: TicketSpecification
) {
    fun createTicket(ticketTO: TicketTO) {
        val ticketEntity = ticketMapper.toEntity(ticketTO)
        if (ticketEntity != null) {
            ticketRepository.save(ticketEntity)
//            emailProducer.sendMessage(
//                TicketCreatedMessage(
//                ticketEntity.author.email,
//                ticketEntity.author.name,
//                ticketEntity.serviceSubType.name,
//                ticketEntity.description,
//                ticketEntity.budget,
//                ticketEntity.finishTimestamp
//                )
//            )
        } else println("Wrong ticket attributes.")
    }

    fun getOpenTickets(filterTO: FilterTO?): List<TicketTO> {

        val ticketSpecification = ticketSpecification.getSpecification(filterTO)
        val filteredTickets = ticketRepository.findAll(ticketSpecification)
        return filteredTickets?.map { ticketMapper.toTO(it) } ?: emptyList()

    }

    fun getMyTickets(userId: String): List<TicketTO> {
        val ticketsEntity = ticketRepository.findAllByAuthorId(UUID.fromString(userId))
        return ticketsEntity.map { ticketMapper.toTOList(it) }.orElseGet { emptyList() }
    }
}