package com.devportal.bff.service;

import com.devportal.bff.model.*;
import com.devportal.bff.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository repository;
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public List<SubmissionDto> getSubmissionsForDeveloper(String developerId) {
        return repository.findByDeveloperIdOrderBySubmittedAtDesc(developerId)
                .stream()
                .map(SubmissionDto::from)
                .toList();
    }

    public String createSubmission(String developerId, SubmitDslRequest request) {
        String id = "SUB-" + UUID.randomUUID().toString().substring(0, 8);
        SubmissionEntity entity = SubmissionEntity.builder()
                .id(id)
                .developerId(developerId)
                .moduleName(request.moduleName())
                .version(request.version())
                .dslCode(request.dslCode())
                .manifestXml(request.manifestXml())
                .status("PENDING")
                .build();
        repository.save(entity);
        log.info("Created submission {} for developer {}", id, developerId);
        return id;
    }

    public void registerEmitter(String submissionId, SseEmitter emitter) {
        emitters.put(submissionId, emitter);
        emitter.onCompletion(() -> emitters.remove(submissionId));
        emitter.onTimeout(() -> emitters.remove(submissionId));
        emitter.onError((e) -> emitters.remove(submissionId));
    }

    public void pushStatusEvent(String submissionId, String status, String message) {
        SseEmitter emitter = emitters.get(submissionId);
        if (emitter != null) {
            try {
                var event = Map.of(
                    "submissionId", submissionId,
                    "status", status,
                    "message", message,
                    "timestamp", java.time.Instant.now().toString()
                );
                emitter.send(SseEmitter.event().data(event));
                if ("ACTIVE".equals(status) || "ERROR".equals(status)) {
                    emitter.complete();
                }
            } catch (Exception e) {
                log.error("Failed to send SSE event for submission {}", submissionId, e);
                emitters.remove(submissionId);
            }
        }
        // Also update database
        repository.findById(submissionId).ifPresent(entity -> {
            entity.setStatus(status);
            if ("ERROR".equals(status)) entity.setErrorMessage(message);
            repository.save(entity);
        });
    }
}
