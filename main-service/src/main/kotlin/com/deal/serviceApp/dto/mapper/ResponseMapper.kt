package com.deal.serviceApp.dto.mapper

import com.deal.serviceApp.dto.ResponseTO
import com.deal.serviceApp.entity.ResponseEntity


interface ResponseMapper {

    fun toEntity(responseTO: ResponseTO): ResponseEntity?
    fun toTO(responseEntity: ResponseEntity): ResponseTO
    fun toTOList(responseEntities: List<ResponseEntity>): List<ResponseTO>
}