package com.devportal.bff.controller;

import com.devportal.bff.model.TicketDto;
import com.devportal.bff.security.JwtUser;
import com.devportal.bff.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bff/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public ResponseEntity<List<TicketDto>> getTickets(@AuthenticationPrincipal JwtUser user) {
        return ResponseEntity.ok(ticketService.getTicketsForDeveloper(user.id()));
    }

    @PostMapping("/{ticketId}/claim")
    public ResponseEntity<TicketDto> claimTicket(@PathVariable String ticketId,
                                                 @AuthenticationPrincipal JwtUser user) {
        return ResponseEntity.ok(ticketService.claim(ticketId, user.id()));
    }
}
