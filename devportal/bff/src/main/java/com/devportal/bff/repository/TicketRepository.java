package com.devportal.bff.repository;

import com.devportal.bff.model.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, String> {
    List<TicketEntity> findAllByOrderByPostedAtDesc();
}
