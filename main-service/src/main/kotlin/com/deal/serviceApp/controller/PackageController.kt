package com.deal.serviceApp.controller

import com.deal.serviceApp.dto.PurchaseTO
import com.deal.serviceApp.service.PackageService;
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/shop")
class PackageController(private val packageService: PackageService) {
    @PostMapping("/purchase")
    fun packagePurchase(@RequestBody purchaseTO: PurchaseTO) {
        packageService.packagePurchase(purchaseTO)
    }
}