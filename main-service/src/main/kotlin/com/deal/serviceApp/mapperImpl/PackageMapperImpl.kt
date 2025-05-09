package com.deal.serviceApp.mapperImpl

import com.deal.serviceApp.dto.PackageTO
import com.deal.serviceApp.dto.mapper.PackageMapper
import com.deal.serviceApp.entity.PackageEntity
import org.springframework.stereotype.Component

@Component
class PackageMapperImpl: PackageMapper {
    override fun toEntity(packageTO: PackageTO): PackageEntity {
        return PackageEntity(
            type = packageTO.type,
            price = packageTO.price,
            value = packageTO.value,
            activePer = packageTO.activePer
        )
    }
    override fun toTo(packageEntity: PackageEntity): PackageTO {
        return PackageTO(
            type = packageEntity.type,
            price = packageEntity.price,
            value = packageEntity.value,
            activePer = packageEntity.activePer
        )
    }
    override fun toEntityList(packageTOs: List<PackageTO>): List<PackageEntity> {
        return packageTOs.map { toEntity(it) }
    }
    override fun toTOList(packageEntities: List<PackageEntity>): List<PackageTO> {
        return packageEntities.map { toTo(it) }
    }




}