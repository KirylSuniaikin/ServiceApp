package com.deal.serviceApp.mapperImpl

import com.deal.serviceApp.dto.UserTO
import com.deal.serviceApp.dto.mapper.UserMapper
import com.deal.serviceApp.entity.UserProfileEntity
import org.springframework.stereotype.Component

@Component
class UserMapperImpl : UserMapper {

    override fun toTO(userEntity: UserProfileEntity): UserTO {
        return UserTO(
            id = userEntity.id.toString(),
            email = userEntity.email,
            name = userEntity.name,
            role = userEntity.role.userType,
            totalScore = userEntity.totalScore,
            revCount = userEntity.revCount,
            balance = userEntity.balance?.toFloat(),
            expireDate = userEntity.expireDate
        )
    }

}