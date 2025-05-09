package com.deal.serviceApp.dto.mapper

import com.deal.serviceApp.dto.UserTO
import com.deal.serviceApp.entity.UserProfileEntity


interface UserMapper {

    fun toTO(userEntity: UserProfileEntity): UserTO
}