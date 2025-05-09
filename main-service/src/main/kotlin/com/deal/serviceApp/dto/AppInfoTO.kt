package com.deal.serviceApp.dto

data class AppInfoTO(
    val services: List<ServiceTypeTO>,
    val subServices: List<ServiceSubTypeTO>,
    val shopItems: List<PackageTO>)
