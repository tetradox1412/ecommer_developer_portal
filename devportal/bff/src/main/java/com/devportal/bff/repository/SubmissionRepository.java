package com.devportal.bff.repository;

import com.devportal.bff.model.SubmissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<SubmissionEntity, String> {
    List<SubmissionEntity> findByDeveloperIdOrderBySubmittedAtDesc(String developerId);
}
