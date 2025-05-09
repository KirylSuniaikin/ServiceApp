package com.deal.serviceApp.service;

import com.deal.serviceApp.dto.ServiceSubTypeTO
import com.deal.serviceApp.mapperImpl.ServiceSubTypeMapperImpl
import com.deal.serviceApp.repository.EnumServiceSubTypeRepository
import org.springframework.stereotype.Service

@Service
class ServiceSubTypeService(
    private val serviceSubTypeMapper: ServiceSubTypeMapperImpl,
    private val serviceSubTypeRepository: EnumServiceSubTypeRepository
) {
    fun getAllServiceSubTypes(): List<ServiceSubTypeTO> {
        return serviceSubTypeMapper.toTOList(serviceSubTypeRepository.findAll().toList())
    }
}