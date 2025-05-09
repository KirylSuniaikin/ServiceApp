package com.deal.serviceApp.dto.mapper

import com.deal.serviceApp.dto.PackageTO
import com.deal.serviceApp.entity.PackageEntity


interface PackageMapper {
    fun toEntity(packageTO: PackageTO): PackageEntity
    fun toTo(packageEntity: PackageEntity): PackageTO
    fun toEntityList(packageTOs: List<PackageTO>): List<PackageEntity>
    fun toTOList(packageEntities: List<PackageEntity>): List<PackageTO>
}