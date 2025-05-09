package com.deal.serviceApp.service


import com.deal.serviceApp.dto.PackageTO
import com.deal.serviceApp.dto.PurchaseTO
import com.deal.serviceApp.mapperImpl.PackageMapperImpl
import com.deal.serviceApp.repository.PackageRepository
import com.deal.serviceApp.repository.UserRepository
import org.springframework.stereotype.Service;
import java.time.LocalDate
import java.time.ZoneId
import java.util.*

@Service
class PackageService(
    private val packageMapper: PackageMapperImpl,
    private val packageRepository: PackageRepository,
    private val userRepository: UserRepository,
) {
    fun getAllPackages(): List<PackageTO> {
        return packageMapper.toTOList(packageRepository.findAll().toList())
    }
    fun packagePurchase(purchaseTO: PurchaseTO): List<PackageTO> {
        val packageEntity = packageMapper.toEntity(purchaseTO.packageInfo)
        userRepository.updateBalance(UUID.fromString(purchaseTO.id), packageEntity.value.toFloat())
        val expireDate = userRepository.getExpireDateByUserId(UUID.fromString(purchaseTO.id))
        val activePerString: String = packageEntity.activePer.toString()

        if (expireDate <= LocalDate.now()) {
            userRepository.updateExpiredDate(UUID.fromString(purchaseTO.id),   "$activePerString months")
        } else {
            userRepository.updateExpireDate(UUID.fromString(purchaseTO.id), "$activePerString months")
        }
        return emptyList()
    }
}
