package com.deal.serviceApp.mapperImpl

import com.deal.serviceApp.dto.ServiceTypeTO
import com.deal.serviceApp.dto.mapper.ServiceTypeMapper
import com.deal.serviceApp.entity.EnumServiceTypeEntity
import org.springframework.stereotype.Component

@Component
class ServiceTypeMapperImpl : ServiceTypeMapper {
    override fun toEntity(serviceTypeTO: ServiceTypeTO): EnumServiceTypeEntity {
        return EnumServiceTypeEntity(
            id = serviceTypeTO.id,
            name = serviceTypeTO.name
        )
    }

    override fun toTO(serviceTypeEntity: EnumServiceTypeEntity): ServiceTypeTO {
        return ServiceTypeTO(
            id = serviceTypeEntity.id,
            name = serviceTypeEntity.name
        )
    }

    override fun toEntityList(serviceTypeTOs: List<ServiceTypeTO>): List<EnumServiceTypeEntity> {
        return serviceTypeTOs.map { toEntity(it) }
    }

    override fun toTOList(serviceTypeEntities: List<EnumServiceTypeEntity>): List<ServiceTypeTO> {
        return serviceTypeEntities.map { toTO(it) }
    }

}