package com.deal.serviceApp.mapperImpl

import com.deal.serviceApp.dto.ResponseTO
import com.deal.serviceApp.dto.mapper.ResponseMapper
import com.deal.serviceApp.entity.ResponseEntity
import com.deal.serviceApp.repository.ResponseStatusRepository
import com.deal.serviceApp.repository.TicketRepository
import com.deal.serviceApp.repository.UserRepository
import org.springframework.stereotype.Component
import java.util.*


@Component
class ResponseMapperImpl(
    private val ticketRepository: TicketRepository,
    private val userRepository: UserRepository,
    private val responseStatusRepo: ResponseStatusRepository,
) : ResponseMapper {

    override fun toEntity(responseTO: ResponseTO): ResponseEntity? {
        val responseStatusValue = responseStatusRepo.getByCode(responseTO.responseStatus) ?: return null
        val taskerValue = userRepository.findById(responseTO.taskerId)
        val ticketValue = ticketRepository.findById(responseTO.ticketId)
        if (taskerValue.isEmpty || ticketValue.isEmpty) {
            return null
        }
        return ResponseEntity(
            id = UUID.randomUUID(),
            tasker = taskerValue.get(),
            ticket = ticketValue.get(),
            budget = responseTO.budget,
            description = "",
            finishDate = responseTO.finishDate,
            responseStatus = responseStatusValue
        )
    }

    override fun toTO(responseEntity: ResponseEntity): ResponseTO {
        return ResponseTO(
            taskerId = responseEntity.tasker.id!!,
            ticketId = responseEntity.ticket.id!!,
            finishDate = responseEntity.finishDate,
            budget = responseEntity.budget,
            responseStatus = responseEntity.responseStatus.value
        )
    }

    override fun toTOList(responseEntities: List<ResponseEntity>): List<ResponseTO> {
        return responseEntities.map { toTO(it) }
    }
}
