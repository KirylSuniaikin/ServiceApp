package com.deal.serviceApp.controller

import com.deal.serviceApp.dto.ResponseTO
import com.deal.serviceApp.service.ResponseService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/responses")
class ResponseController(private val responseService: ResponseService) {

    @PostMapping("/createResponse")
    fun createResponse(@RequestBody responseTO: ResponseTO) {
        responseService.createResponse(responseTO)
    }

    @GetMapping("/ticketResponses/{ticketId}")
    fun getTicketResponses(@PathVariable ticketId: String): List<ResponseTO> {
        return responseService.getTicketResponses(ticketId)
    }

    @GetMapping("/myResponses/{userId}")
    fun getMyResponses(@PathVariable userId: String): List<ResponseTO> {
        return responseService.getMyResponses(userId)
    }
}
