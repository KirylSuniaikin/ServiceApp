package com.deal.serviceApp.service

import com.deal.serviceApp.dto.ResponseTO
import com.deal.serviceApp.dto.mapper.ResponseMapper
import com.deal.serviceApp.dto.messaging.FirstTicketResponseMessage
import com.deal.serviceApp.messaging.GenericProducer
import com.deal.serviceApp.repository.ResponseRepository
import com.deal.serviceApp.repository.TicketRepository
import com.deal.serviceApp.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*

@Service
class ResponseService(
    private val responseRepository: ResponseRepository,
    private val responseMapper: ResponseMapper,
    private val ticketRepository: TicketRepository,
    private val emailProducer: GenericProducer,
    private val userRepository: UserRepository,
) {
    fun createResponse(responseTO: ResponseTO) {
        val responseEntity = responseMapper.toEntity(responseTO)
        if (responseEntity != null) {
            if (isFirstResponse(responseTO.ticketId)) {
                val ticket = ticketRepository.findById(responseTO.ticketId).get()
                val tasker = userRepository.findById(responseTO.taskerId).get()
                emailProducer.sendMessage(
                    FirstTicketResponseMessage(
                        ticket.author.email,
                        ticket.author.name,
                        tasker.name,
                        if (tasker.revCount != 0) tasker.totalScore.toFloat() / tasker.revCount else 0.0f,
                        tasker.revCount,
                        responseTO.budget,
                        ticket.subType.name
                    )
                )
                ticketRepository.updateLastNotificationDate(ticket.id!!, LocalDateTime.now())
            }
            responseRepository.save(responseEntity)
        } else println("Wrong response attribute")

    }

    fun getTicketResponses(ticketId: String): List<ResponseTO> {
        val responsesEntity = responseRepository.findAllByTicketId(UUID.fromString(ticketId))
        return responsesEntity.map { responseMapper.toTOList(it) }.orElseGet { emptyList() }
    }

    fun getMyResponses(userId: String): List<ResponseTO> {
        val responseEntities = responseRepository.findAllByTaskerId(UUID.fromString(userId))
        return responseEntities.map { responseMapper.toTOList(it) }.orElseGet { emptyList() }
    }

    fun isFirstResponse(ticketId: UUID): Boolean {
        val responses = responseRepository.findAllByTicketId(ticketId)
        return responses.isEmpty || responses.get().isEmpty()
    }
}