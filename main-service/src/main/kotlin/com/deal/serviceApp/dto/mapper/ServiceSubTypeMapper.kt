package com.deal.serviceApp.dto.mapper

import com.deal.serviceApp.dto.ServiceSubTypeTO
import com.deal.serviceApp.entity.EnumServiceSubTypeEntity


interface ServiceSubTypeMapper {
    fun toTO(serviceSubTypeEntity: EnumServiceSubTypeEntity): ServiceSubTypeTO
    fun toTOList(serviceSubTypeEntities: List<EnumServiceSubTypeEntity>): List<ServiceSubTypeTO>
}