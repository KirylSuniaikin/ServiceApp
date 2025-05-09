package com.deal.serviceApp.repository

import com.deal.serviceApp.entity.EnumServiceSubTypeEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface EnumServiceSubTypeRepository : JpaRepository<EnumServiceSubTypeEntity, Long> {
    override fun getById(id: Long): EnumServiceSubTypeEntity
    fun getByName(name: String): EnumServiceSubTypeEntity?
}
