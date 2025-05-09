package com.deal.serviceApp.mapperImpl

import com.deal.serviceApp.dto.ServiceSubTypeTO
import com.deal.serviceApp.dto.mapper.ServiceSubTypeMapper
import com.deal.serviceApp.entity.EnumServiceSubTypeEntity
import org.springframework.stereotype.Component

@Component
class ServiceSubTypeMapperImpl : ServiceSubTypeMapper {


    override fun toTO(serviceSubTypeEntity: EnumServiceSubTypeEntity): ServiceSubTypeTO {
        return ServiceSubTypeTO(serviceSubTypeEntity.id, serviceSubTypeEntity.name, serviceSubTypeEntity.serviceType.id)
    }

    override fun toTOList(serviceSubTypeEntities: List<EnumServiceSubTypeEntity>): List<ServiceSubTypeTO> {
        return serviceSubTypeEntities.map { toTO(it) }
    }

}