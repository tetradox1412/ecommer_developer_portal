package com.devportal.bff.service;

import com.devportal.bff.model.*;
import com.devportal.bff.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository repository;

    public List<TicketDto> getTicketsForDeveloper(String developerId) {
        return repository.findAllByOrderByPostedAtDesc()
                .stream()
                .map(e -> TicketDto.from(e, developerId))
                .toList();
    }

    public TicketDto claim(String ticketId, String developerId) {
        TicketEntity entity = repository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found: " + ticketId));

        if (!"OPEN".equals(entity.getStatus())) {
            throw new RuntimeException("Ticket is not in OPEN status");
        }

        entity.setClaimedByDeveloperId(developerId);
        entity.setStatus("IN_PROGRESS");
        repository.save(entity);
        log.info("Developer {} claimed ticket {}", developerId, ticketId);
        return TicketDto.from(entity, developerId);
    }
}
