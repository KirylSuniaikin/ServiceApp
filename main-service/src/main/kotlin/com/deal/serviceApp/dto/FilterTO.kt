package com.deal.serviceApp.dto

data class FilterTO(
    val minBudget : Int? = null,
    val maxBudget : Int? = null,
    val serviceType: Array<String>? = null
)
