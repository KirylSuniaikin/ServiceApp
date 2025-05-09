package com.deal.serviceApp.repository

import com.deal.serviceApp.entity.QualificationEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface QualificationRepository : JpaRepository<QualificationEntity, UUID>
