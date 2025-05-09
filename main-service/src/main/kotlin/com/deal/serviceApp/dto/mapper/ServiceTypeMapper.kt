package com.deal.serviceApp.dto.mapper

import com.deal.serviceApp.dto.ServiceTypeTO
import com.deal.serviceApp.entity.EnumServiceTypeEntity


interface ServiceTypeMapper {

    fun toEntity(serviceTypeTO: ServiceTypeTO): EnumServiceTypeEntity
    fun toTO(serviceTypeEntity: EnumServiceTypeEntity): ServiceTypeTO
    fun toEntityList(serviceTypeTOs: List<ServiceTypeTO>): List<EnumServiceTypeEntity>
    fun toTOList(serviceTypeEntities: List<EnumServiceTypeEntity>): List<ServiceTypeTO>
}