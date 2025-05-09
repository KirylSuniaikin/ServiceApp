package com.deal.serviceApp.mapperImpl

import com.deal.serviceApp.dto.TicketTO
import com.deal.serviceApp.dto.mapper.TicketMapper
import com.deal.serviceApp.entity.TicketEntity
import com.deal.serviceApp.repository.EnumServiceSubTypeRepository
import com.deal.serviceApp.repository.TicketStatusRepository
import com.deal.serviceApp.repository.UserRepository
import org.springframework.stereotype.Component
import java.time.LocalDate
import java.util.*

@Component
class TicketMapperImpl(
    private val serviceSubTypeRepo: EnumServiceSubTypeRepository,
    private val userRepository: UserRepository,
    private val ticketStatusRepo: TicketStatusRepository,
    private val userMapper: UserMapperImpl
) : TicketMapper {


    override fun toEntity(ticketTO: TicketTO): TicketEntity? {
        val statusValue = ticketStatusRepo.getByCode(ticketTO.ticketStatus) ?: return null
        val authorId = userRepository.findById(ticketTO.authorId)
        val serviceSubTypeValue = serviceSubTypeRepo.getById(ticketTO.subType.toLong()) ?: return null

        return TicketEntity(
            description = ticketTO.description,
            status = statusValue,
            author = authorId.get(),
            subType = serviceSubTypeValue,
            budget = ticketTO.budget,
            finishDate = ticketTO.finishDate,
            creationDate = LocalDate.now(),
            location = ticketTO.location,
            lastNotificationDate = null
        )
    }

    override fun toTO(ticketEntity: TicketEntity): TicketTO {
        return TicketTO(
            subType = ticketEntity.subType.name,
            description = ticketEntity.description,
            budget = ticketEntity.budget,
            location = ticketEntity.location,
            creationDate = ticketEntity.creationDate,
            finishDate = ticketEntity.finishDate,
            authorId = ticketEntity.author.id,
            ticketStatus = ticketEntity.status.code,
            taskerId= ticketEntity.tasker?.id
        )
    }


    override fun toTOList(ticketEntities: List<TicketEntity>): List<TicketTO> {
        return ticketEntities.map { toTO(it) }
    }


}