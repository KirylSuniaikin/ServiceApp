package com.deal.serviceApp.service

import com.deal.serviceApp.dto.ServiceTypeTO
import com.deal.serviceApp.dto.mapper.ServiceTypeMapper
import com.deal.serviceApp.repository.EnumServiceTypeRepository
import org.springframework.stereotype.Service

@Service
class ServiceTypeService(
    val serviceTypeMapper: ServiceTypeMapper, val serviceTypeRepository: EnumServiceTypeRepository
) {

    fun getAllServiceTypes(): List<ServiceTypeTO> {
        return serviceTypeMapper.toTOList(serviceTypeRepository.findAll().toList())
    }
}