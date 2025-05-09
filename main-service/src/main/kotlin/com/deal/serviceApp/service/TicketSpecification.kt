package com.deal.serviceApp.service

import com.deal.serviceApp.dto.FilterTO
import com.deal.serviceApp.entity.EnumServiceSubTypeEntity
import com.deal.serviceApp.entity.TicketEntity
import com.deal.serviceApp.repository.EnumServiceSubTypeRepository
import com.deal.serviceApp.repository.TicketStatusRepository
import jakarta.persistence.criteria.Predicate
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service

@Service
class TicketSpecification(
    private val enumServiceSubTypeRepository: EnumServiceSubTypeRepository,
    private val ticketStatusRepository: TicketStatusRepository,
)
{
    fun getSpecification(filterTO: FilterTO?): Specification<TicketEntity> {
        return Specification { root, query, cb ->
            val predicates = mutableListOf<Predicate>()
            if(filterTO!=null) {
                val minBud = filterTO.minBudget
                val maxBud = filterTO.maxBudget
                val serviceTypes = filterTO.serviceType


                // Add predicate for minBudget if it's not null
                minBud?.let {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("budget"), minBud))
                }

                // Add predicate for maxBudget if it's not null
                maxBud?.let {
                    predicates.add(cb.lessThanOrEqualTo(root.get("budget"), maxBud))
                }


                if (!serviceTypes.isNullOrEmpty()) {
                    val serviceTypeListEntity = serviceTypes.mapNotNull { name ->
                        enumServiceSubTypeRepository.getByName(name)
                    }

                    if (serviceTypeListEntity.isNotEmpty()) {
                        val serviceTypePredicate =
                            root.get<EnumServiceSubTypeEntity>("serviceSubType").`in`(serviceTypeListEntity)
                        predicates.add(serviceTypePredicate)
                    }
                }

                // Combine all predicates into a single predicate using cb.and()

            }
            val ticketStatusEntity = ticketStatusRepository.getByCode("O")
            val statusPredicate = cb.equal(root.get<Any>("status"), ticketStatusEntity)
            predicates.add(statusPredicate)
            cb.and(*predicates.toTypedArray())
            }
        }
    }








