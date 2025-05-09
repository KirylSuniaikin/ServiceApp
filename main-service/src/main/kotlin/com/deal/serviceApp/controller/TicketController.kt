package com.deal.serviceApp.controller


import com.deal.serviceApp.dto.FilterTO
import com.deal.serviceApp.dto.TicketTO
import com.deal.serviceApp.service.TicketService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/tickets")
class TicketController(private val ticketService: TicketService) {

    @PostMapping("/createTicket")
    fun createTicket(@RequestBody ticketTO: TicketTO) {
        ticketService.createTicket(ticketTO)
    }

    @PostMapping("/openTickets")
    fun getOpenTickets(@RequestBody(required = false) filterTO: FilterTO?): List<TicketTO> {
        return ticketService.getOpenTickets(filterTO)
    }

    @GetMapping("/myTickets/{userId}")
    fun getMyTickets(@PathVariable userId: String): List<TicketTO> {
        return ticketService.getMyTickets(userId)
    }
}